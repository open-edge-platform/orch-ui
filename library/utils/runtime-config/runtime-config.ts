/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../index.d.ts"/>

// type DocsSource = { src: string; dest: string }[];
type DocsSource = { [version: string]: { src: string; dest: string }[] };

export interface IRuntimeConfig {
  AUTH: string;
  KC_URL: string;
  KC_REALM: string;
  KC_CLIENT_ID: string;
  SESSION_TIMEOUT: number;
  OBSERVABILITY_URL: string;
  MFE: {
    APP_ORCH?: string;
    INFRA?: string;
    CLUSTER_ORCH?: string;
    ADMIN?: string;
  };
  TITLE: string;
  DOCUMENTATION_URL?: string;
  DOCUMENTATION: DocsSource;
  API: { [key in ApiServer]?: string };
  VERSIONS: { [key in Components]?: string };
}

export type MFE = keyof IRuntimeConfig["MFE"];
export const apiServers = [
  "CATALOG",
  "ADM",
  "ARM",
  "INFRA",
  "CO",
  "MB",
  "ALERT",
  "TM",
  "RPS",
  "MPS",
] as const;
export type ApiServer = (typeof apiServers)[number];

export const components = ["orchestrator"];
export type Components = (typeof components)[number];

export class RuntimeConfig {
  public static get title(): string {
    return window.__RUNTIME_CONFIG__?.TITLE ?? "";
  }

  public static get documentationUrl(): string {
    return (
      window.__RUNTIME_CONFIG__?.DOCUMENTATION_URL ??
      "https://docs.openedgeplatform.intel.com/edge-manage-docs/main"
    );
  }

  public static documentation(
    version: string,
  ): { src: string; dest: string }[] {
    return window.__RUNTIME_CONFIG__?.DOCUMENTATION?.[version] ?? [];
  }

  /**
   * Returns the API URL for Catalog
   */
  public static get catalogApiUrl(): string {
    return this.getApiUrl("CATALOG");
  }

  /**
   * Returns the API URL for App Deployment Manager
   */
  public static get admApiUrl(): string {
    return this.getApiUrl("ADM");
  }

  /**
   * Returns the API URL for App Resource Manager
   */
  public static get armApiUrl(): string {
    return this.getApiUrl("ARM");
  }

  /**
   * Returns the API URL for infra
   */
  public static get infraApiUrl(): string {
    return this.getApiUrl("INFRA");
  }

  /**
   * Returns the API URL for Cluster Orch
   */
  public static get coApiUrl(): string {
    return this.getApiUrl("CO");
  }

  /**
   * Returns the API URL for Metadata Broker
   */
  public static get mbApiUrl(): string {
    return this.getApiUrl("MB");
  }

  /**
   * Returns the API URL for Alert Manager
   */
  public static get alertApiUrl(): string {
    return this.getApiUrl("ALERT");
  }

  /**
   * Returns the API URL for Licensing
   */
  public static get tmApiUrl(): string {
    return this.getApiUrl("TM");
  }

  /**
   * Returns the API URL for Remote Provisioning server
   */
  public static get rpsApiUrl(): string {
    return this.getApiUrl("RPS");
  }

  /**
   * Returns the API URL for Management Presense server
   */
  public static get mpsApiUrl(): string {
    return this.getApiUrl("MPS");
  }

  public static getComponentVersion(component: Components) {
    const versions = window.__RUNTIME_CONFIG__?.VERSIONS;
    if (!versions) {
      throw new Error("VERSIONS configuration is missing from RuntimeConfig");
    }
    if (!versions[component] || versions[component] === undefined) {
      throw new Error(`${component} VERSION is missing from RuntimeConfig`);
    }
    return versions[component] as string;
  }

  public static isEnabled = (mfe: MFE): boolean => {
    const mfes = window.__RUNTIME_CONFIG__?.MFE;
    if (!mfes) return false;

    return mfes[mfe] === "true";
  };

  public static isAuthEnabled = (): boolean => {
    // NOTE that when used in the project this assignment has not effects,
    // it is added so it's easy to override the value in unit tests
    const processEnv =
      window.Cypress?.testingType === "component" ? {} : { ...process.env };
    const env = { ...processEnv, ...window.process?.env };
    if (env.REACT_MOCK_API && env.REACT_MOCK_API === "true") {
      // if the mock server is enabled then we don't need authentication
      return false;
    }
    return (
      window.__RUNTIME_CONFIG__ && window.__RUNTIME_CONFIG__.AUTH === "true"
    );
  };

  /**
   * Returns the API url for one of the supported backends.
   * If `REACT_MOCK_API` is set to true, then it returns the current URL
   */
  private static getApiUrl(server: ApiServer): string {
    const env = { ...process.env, ...window.process?.env };

    // FIXME somehow this method is invoked during the E2E tests,
    // and the RuntimeConfig is not loaded, so it would throw an error
    // by returning the default URL when running in the test setup (process.env.test is set via webpack config in tests/webpack.config.js) we can avoid the error
    // NOTE that this is a workaround, the correct solution would be to avoid call this method when its not needed (eg during E2E tests)

    if (env.REACT_MOCK_API === "true" || process.env.test) {
      return window.location.origin;
    }
    const urls = window.__RUNTIME_CONFIG__?.API;
    if (!urls) {
      throw new Error("API Server configuration is missing from RuntimeConfig");
    }
    if (!urls[server] || urls[server] === undefined) {
      throw new Error(
        `${server} Server configuration is missing from RuntimeConfig`,
      );
    }
    return urls[server] as string;
  }
}
