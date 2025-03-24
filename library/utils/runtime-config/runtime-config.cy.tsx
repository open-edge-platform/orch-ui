/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiServers, IRuntimeConfig, RuntimeConfig } from "./runtime-config";

const runtimeConfig: IRuntimeConfig = {
  AUTH: "",
  KC_CLIENT_ID: "",
  KC_REALM: "",
  KC_URL: "",
  MFE: {},
  OBSERVABILITY_URL: "",
  SESSION_TIMEOUT: 1000,
  TITLE: "test-title",
  DOCUMENTATION_URL: "doc-link",
  DOCUMENTATION: [{ src: "src", dest: "dest" }],
  API: {
    CATALOG: "CATALOG",
    ADM: "ADM",
    ARM: "ARM",
    INFRA: "INFRA",
    CO: "CO",
    MB: "MB",
    ALERT: "ALERT",
    TM: "TM",
  },
  VERSIONS: {
    orchestrator: "test-version",
  },
};

const infraStandalone: IRuntimeConfig = {
  ...runtimeConfig,
  MFE: {
    APP_ORCH: "false",
    CLUSTER_ORCH: "false",
    INFRA: "true",
    ADMIN: "false",
  },
};

const allMFEs: IRuntimeConfig = {
  ...runtimeConfig,
  MFE: {
    APP_ORCH: "true",
    CLUSTER_ORCH: "true",
    INFRA: "true",
    ADMIN: "false",
  },
};

const comboConfig: IRuntimeConfig = {
  ...runtimeConfig,
  MFE: {
    APP_ORCH: "true",
    CLUSTER_ORCH: "true",
    INFRA: "false",
    ADMIN: "false",
  },
};

describe("RuntimeConfig", () => {
  beforeEach(() => {
    window.process = { env: { REACT_LP_MOCK_API: "false" } };
  });
  it("should return the title", () => {
    window.__RUNTIME_CONFIG__ = runtimeConfig;
    expect(RuntimeConfig.title).to.equal(runtimeConfig.TITLE);
  });

  it("should return the documentation link", () => {
    expect(RuntimeConfig.documentationUrl).to.equal("doc-link");
  });

  it("should return the documentation mappings", () => {
    expect(RuntimeConfig.documentation).to.deep.equal([
      { src: "src", dest: "dest" },
    ]);
  });

  describe("with INFRA standalone configuration", () => {
    beforeEach(() => {
      window.__RUNTIME_CONFIG__ = infraStandalone;
    });

    it("reports false for CLUSTER_ORCH enablement", () => {
      const result = RuntimeConfig.isEnabled("CLUSTER_ORCH");
      expect(result).to.equal(false);
    });
  });

  describe("with all MFE's on", () => {
    beforeEach(() => {
      window.__RUNTIME_CONFIG__ = allMFEs;
    });
    it("reports true for all  checks", () => {
      const appOrch = RuntimeConfig.isEnabled("APP_ORCH");
      const infra = RuntimeConfig.isEnabled("INFRA");
      const clusterOrch = RuntimeConfig.isEnabled("CLUSTER_ORCH");

      expect(appOrch).to.equal(true);
      expect(infra).to.equal(true);
      expect(clusterOrch).to.equal(true);
    });
  });

  describe("with a combo config", () => {
    beforeEach(() => {
      window.__RUNTIME_CONFIG__ = comboConfig;
    });
    it("reports false on INFRA check", () => {
      const appOrch = RuntimeConfig.isEnabled("APP_ORCH");
      const infra = RuntimeConfig.isEnabled("INFRA");
      const clusterOrch = RuntimeConfig.isEnabled("CLUSTER_ORCH");

      expect(appOrch).to.equal(true);
      expect(infra).to.equal(false);
      expect(clusterOrch).to.equal(true);
    });
  });

  describe("with config missing", () => {
    beforeEach(() => {
      window.__RUNTIME_CONFIG__ = {} as RuntimeConfig;
    });

    it("reports false for RuntimeConfig.isEnabled check", () => {
      const appOrch = RuntimeConfig.isEnabled("APP_ORCH");
      const clusterOrch = RuntimeConfig.isEnabled("CLUSTER_ORCH");
      const infra = RuntimeConfig.isEnabled("INFRA");

      expect(appOrch).to.equal(false);
      expect(clusterOrch).to.equal(false);
      expect(infra).to.equal(false);
    });

    it("should return an empty title", () => {
      expect(RuntimeConfig.title).to.equal("");
    });

    it("should return the default documentation link", () => {
      expect(RuntimeConfig.documentationUrl).to.equal(
        "https://edc.intel.com/content/www/us/en/secure/design/confidential/tools/edge-orchestration/",
      );
    });
  });

  describe("isAuthEnabled", () => {
    describe("when Auth is enabled", () => {
      beforeEach(() => {
        const cfg: IRuntimeConfig = {
          ...runtimeConfig,
          AUTH: "true",
        };
        window.__RUNTIME_CONFIG__ = cfg;
      });
      it("should return true", () => {
        // eslint-disable-next-line
        expect(RuntimeConfig.isAuthEnabled()).to.be.true;
      });
      describe("when the REACT_LP_MOCK_API is true", () => {
        it("should return false", () => {
          window.process = { env: { REACT_LP_MOCK_API: "true" } };
          expect(RuntimeConfig.isAuthEnabled()).to.be.false;
        });
      });
    });
  });

  describe("should handle API URLs", () => {
    beforeEach(() => {
      const cfg: IRuntimeConfig = {
        ...runtimeConfig,
        AUTH: "true",
      };
      window.__RUNTIME_CONFIG__ = cfg;
    });
    describe("when the REACT_LP_MOCK_API is true", () => {
      it("should return the current origin", () => {
        window.process = { env: { REACT_LP_MOCK_API: "true" } };
        expect(RuntimeConfig.infraApiUrl).to.eq(window.location.origin);
      });
    });
    describe("when the configuration is missing", () => {
      it("should throw an error", () => {
        // @ts-ignore
        delete window.__RUNTIME_CONFIG__.API;
        expect(() => RuntimeConfig.infraApiUrl).to.throw();
      });
    });
    describe("when the configuration is present", () => {
      for (const s of apiServers) {
        it(`should return the API URL for ${s}`, () => {
          const getter =
            `${s.toLowerCase()}ApiUrl` as keyof typeof RuntimeConfig;
          expect(RuntimeConfig[getter]).to.equal(s);
        });
      }
    });
  });
  describe("should handle Components versions", () => {
    beforeEach(() => {
      window.__RUNTIME_CONFIG__ = runtimeConfig;
    });
    it("should return the correct version", () => {
      expect(RuntimeConfig.getComponentVersion("orchestrator")).to.equal(
        runtimeConfig.VERSIONS["orchestrator"],
      );
    });
  });
});
