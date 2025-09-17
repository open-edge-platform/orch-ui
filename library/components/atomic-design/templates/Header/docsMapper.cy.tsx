/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRuntimeConfig } from "@orch-ui/utils";
import { getDocsForUrl } from "./docMapper";

const testCases = [
  {
    url: "/dashboard",
    expected:
      "https://test.com/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
  },
  {
    url: "/applications/deployment/test-deployment-id",
    expected:
      "https://test.com/docs/content/dev_guide/package_software/deployment_details.html",
  },
  {
    url: "/applications/deployment/test-deployment-id/cluster/test-cluster-id",
    expected:
      "https://test.com/docs/content/dev_guide/package_software/deployment_details_2.html",
  },
  {
    url: "/infrastructure/unconfigured-host/test-host-id",
    expected:
      "https://test.com/docs/content/dev_guide/set_up_edge_infra/onboard_host_details.html",
  },
  {
    url: "/infrastructure/unconfigured-host/configure",
    expected:
      "https://test.com/docs/content/dev_guide/set_up_edge_infra/configure_host.html",
  },
  {
    url: "/url-with-no-link-mapping",
    expected:
      "https://test.com/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
  },
  {
    url: "/infrastructure/regions/new",
    expected:
      "https://test.com/docs/content/dev_guide/set_up_edge_infra/location/add_region.html",
  },
  {
    url: "/infrastructure/regions/test-reg-id",
    expected:
      "https://test.com/docs/content/dev_guide/set_up_edge_infra/location/view_region_detail.html",
  },
  {
    url: "/infrastructure/regions/test-reg-id/sites/new",
    expected:
      "https://test.com/docs/content/dev_guide/set_up_edge_infra/location/add_site.html",
  },
];

const createTestConfig = (
  overrides: Partial<IRuntimeConfig> = {},
): IRuntimeConfig => ({
  DOCUMENTATION_URL:
    "https://docs.openedgeplatform.intel.com/edge-manage-docs/main",
  DOCUMENTATION: {
    "3.1": [
      {
        src: "/dashboard",
        dest: "/user_guide/monitor_deployments/index.html",
      },
    ],
    main: [
      {
        src: "/dashboard",
        dest: "/user_guide/monitor_deployments/index.html",
      },
    ],
  },
  AUTH: "false",
  KC_URL: "",
  KC_REALM: "",
  KC_CLIENT_ID: "",
  TITLE: "",
  SESSION_TIMEOUT: 1800,
  OBSERVABILITY_URL: "",
  MFE: {},
  API: {},
  VERSIONS: {
    orchestrator: "v3.1.0-dev-f478801",
  },
  ...overrides,
});

describe("test mapping url to docs link", () => {
  beforeEach(() => {
    const cfg: IRuntimeConfig = {
      DOCUMENTATION_URL: "https://test.com/",
      DOCUMENTATION: {
        "3.1": [
          {
            src: "/dashboard",
            dest: "/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
          },
          {
            src: "/applications/deployment/*",
            dest: "/docs/content/dev_guide/package_software/deployment_details.html",
          },
          {
            src: "/applications/deployment/*/cluster/*",
            dest: "/docs/content/dev_guide/package_software/deployment_details_2.html",
          },
          {
            src: "/infrastructure/unconfigured-host/*",
            dest: "/docs/content/dev_guide/set_up_edge_infra/onboard_host_details.html",
          },
          {
            src: "/infrastructure/unconfigured-host/configure",
            dest: "/docs/content/dev_guide/set_up_edge_infra/configure_host.html",
          },
          {
            src: "/infrastructure/regions/new",
            dest: "/docs/content/dev_guide/set_up_edge_infra/location/add_region.html",
          },
          {
            src: "/infrastructure/regions/*",
            dest: "/docs/content/dev_guide/set_up_edge_infra/location/view_region_detail.html",
          },
          {
            src: "/infrastructure/regions/*/sites/new",
            dest: "/docs/content/dev_guide/set_up_edge_infra/location/add_site.html",
          },
        ],
      },
      AUTH: "false",
      KC_URL: "",
      KC_REALM: "",
      KC_CLIENT_ID: "",
      TITLE: "",
      SESSION_TIMEOUT: 1800,
      OBSERVABILITY_URL: "",
      MFE: {},
      API: {},
      VERSIONS: {
        orchestrator: "v3.1.0-dev-f478801",
      },
    };
    window.__RUNTIME_CONFIG__ = cfg;
  });

  testCases.forEach(({ url, expected }) => {
    it(url, () => {
      expect(getDocsForUrl(url)).to.equal(expected);
    });
  });
});

describe("test no mapping", () => {
  it("default link", () => {
    const cfg: IRuntimeConfig = {
      DOCUMENTATION_URL: "",
      DOCUMENTATION: {
        "3.1": [],
        main: [],
      },
      AUTH: "false",
      KC_URL: "",
      KC_REALM: "",
      KC_CLIENT_ID: "",
      TITLE: "",
      SESSION_TIMEOUT: 1800,
      OBSERVABILITY_URL: "",
      MFE: {},
      API: {},
      VERSIONS: {
        orchestrator: "v3.1.0-dev-f478801",
      },
    };
    window.__RUNTIME_CONFIG__ = cfg;
    expect(getDocsForUrl("/random")).to.equal("http://localhost:8000/docs");
  });
});

describe("doc URL tests for orchestrator versions", () => {
  it("Should construct URL with release version 3.1", () => {
    window.__RUNTIME_CONFIG__ = createTestConfig({
      VERSIONS: {
        orchestrator: "v3.1.0-dev-f478801",
      },
    });
    expect(getDocsForUrl("/dashboard")).to.equal(
      "https://docs.openedgeplatform.intel.com/edge-manage-docs/3.1/user_guide/monitor_deployments/index.html",
    );
  });

  it("Should construct URL with release version 3.0", () => {
    window.__RUNTIME_CONFIG__ = createTestConfig({
      DOCUMENTATION: {
        "3.0": [
          {
            src: "/dashboard",
            dest: "/user_guide/monitor_deployments/index.html",
          },
        ],
        main: [
          {
            src: "/dashboard",
            dest: "/user_guide/monitor_deployments/index.html",
          },
        ],
      },
      VERSIONS: {
        orchestrator: "v3.0.0-dev-f478801",
      },
    });
    expect(getDocsForUrl("/dashboard")).to.equal(
      "https://docs.openedgeplatform.intel.com/edge-manage-docs/3.0/user_guide/monitor_deployments/index.html",
    );
  });

  it("Should construct URL with mainline doc version if orchestrator version is not available", () => {
    window.__RUNTIME_CONFIG__ = createTestConfig({
      VERSIONS: {},
    });
    expect(getDocsForUrl("/dashboard")).to.equal(
      "https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/monitor_deployments/index.html",
    );
  });

  it("Should construct URL with mainline doc version if orchestrator version is received in unknown format", () => {
    window.__RUNTIME_CONFIG__ = createTestConfig({
      VERSIONS: {
        orchestrator: "3.0.0",
      },
    });
    expect(getDocsForUrl("/dashboard")).to.equal(
      "https://docs.openedgeplatform.intel.com/edge-manage-docs/main/user_guide/monitor_deployments/index.html",
    );
  });
});
