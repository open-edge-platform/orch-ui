/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog, cm } from "@orch-ui/apis";
import { cyGet } from "../../support/cyBase";
import Chainable = Cypress.Chainable;

// --- Interfaces ---
export interface RegistryChart {
  chartName?: string;
  chartVersion?: string;
}
export interface TestData {
  registry?: Partial<catalog.Registry>;
  registryChart?: RegistryChart;
  application: catalog.Application;
  applicationProfile?: catalog.Profile;
  deploymentPackage: catalog.DeploymentPackage;
  deployments: adm.Deployment;
  applications: catalog.Application[];
  deployment_package: catalog.DeploymentPackage;
  region: string;
  site: string;
  // clusterName: string;
  hostName: string;
  cluster: cm.ClusterSpec;
}

// --- Interface Type Checking (for `data/*.json` use) ---
export function isRegistry(arg: any): arg is Partial<catalog.Registry> {
  return "displayName" in arg && "rootUrl" in arg && "type" in arg;
}
export function isApplication(arg: any): arg is Partial<catalog.Application> {
  return "name" in arg && "version" in arg;
}
export function isDeploymentPackage(
  arg: any,
): arg is Partial<catalog.DeploymentPackage> {
  return "displayName" in arg && "version" in arg && "description" in arg;
}

// --- Test Data Checking (let your test know if your `data/*.json` is completely provided) ---
export function isRegistryTestDataPresent(arg: any) {
  return "registry" in arg && isRegistry(arg.registry);
}
export function isRegistryChartTestDataPresent(arg: any) {
  return (
    "registryChart" in arg &&
    "chartName" in arg.registryChart &&
    "chartVersion" in arg.registryChart
  );
}
export function isApplicationTestDataPresent(arg: any) {
  return "application" in arg && isApplication(arg.application);
}

export function isApplicationProfileTestDataPresent(arg: any) {
  return (
    "applicationProfile" in arg &&
    "name" in arg.applicationProfile &&
    "description" in arg.applicationProfile &&
    "chartValues" in arg.applicationProfile
  );
}

export function isDeploymentPackageTestDataPresent(arg: any) {
  return (
    "deploymentPackage" in arg && isDeploymentPackage(arg.deploymentPackage)
  );
}
export function isDeploymentTestDataPresent(arg: any) {
  return "deployments" in arg; // && isDeployment(arg.deployment);
}

export function isClusterCreateTestDataPresent(testData) {
  return (
    "region" in testData &&
    "site" in testData &&
    "hostName" in testData &&
    "cluster" in testData
  );
}

// --- Helper Functions ---
export function navigateToDeploymentTab() {
  cy.visit("/");
  getDeploymentsMFETab().click();
}

/** get Deployments navigation button */
export function getDeploymentsMFETab() {
  return cy
    .dataCy("headerItemLink")
    .contains("Deployments", { timeout: 2 * 60 * 1000 })
    .should("be.visible");
}

/** get sidebar option by name */
export function getSidebarTabByName(tabName: string) {
  return cyGet("sidebar")
    .contains(tabName, { timeout: 2 * 60 * 1000 })
    .should("be.visible");
}

export const createApplicationViaApi = (
  project: string,
  application: catalog.Application,
): Chainable => {
  return cy
    .authenticatedRequest<catalog.Application>({
      method: "POST",
      url: `/v3/projects/${project}/catalog/applications`,
      body: application,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    });
};

export const createDeploymentPackageViaApi = (
  project: string,
  deploymentPackage: catalog.DeploymentPackage,
): Chainable => {
  return cy
    .authenticatedRequest<catalog.DeploymentPackage>({
      method: "POST",
      url: `/v3/projects/${project}/catalog/deployment_packages`,
      body: deploymentPackage,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    });
};

export const deleteApplicationViaApi = (
  project: string,
  applicationName: string,
  version: string,
): Chainable => {
  return cy
    .authenticatedRequest<catalog.Application>({
      method: "DELETE",
      url: `/v3/projects/${project}/catalog/applications/${applicationName}/versions/${version}`,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    });
};

export const deleteDeploymentPackageViaApi = (
  project: string,
  deploymentPackageName: string,
  version: string,
): Chainable => {
  return cy
    .authenticatedRequest<catalog.DeploymentPackage>({
      method: "DELETE",
      url: `/v3/projects/${project}/catalog/deployment_packages/${deploymentPackageName}/versions/${version}`,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    });
};
