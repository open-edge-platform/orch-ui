/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRuntimeConfig } from "@orch-ui/utils";
import DashboardDeploymentsStatus from "./DashboardDeploymentsStatus";
import DashboardDeploymentsStatusPom from "./DashboardDeploymentsStatus.pom";

const pom = new DashboardDeploymentsStatusPom();

const runtimeConfig: IRuntimeConfig = {
  AUTH: "",
  KC_CLIENT_ID: "",
  KC_REALM: "",
  KC_URL: "",
  MFE: {
    APP_ORCH: "true",
  },
  OBSERVABILITY_URL: "",
  SESSION_TIMEOUT: 0,
  TITLE: "",
  API: {},
  DOCUMENTATION: [],
  VERSIONS: {},
};

describe("<DashboardDeploymentsStatus />", () => {
  it("should render component on 500 error for API data", () => {
    pom.interceptApis([pom.api.deploymentsStatusError500]);
    cy.mount(<DashboardDeploymentsStatus />, { runtimeConfig });
    pom.waitForApis();
    pom.deploymentStat.root.should(
      "contain.text",
      "Unfortunately an error occurred",
    );
  });

  // TODO: check how to fix message for tests
  xit("should render component on 403 error for API data", () => {
    pom.interceptApis([pom.api.deploymentsStatusError403]);
    cy.mount(<DashboardDeploymentsStatus />, { runtimeConfig });
    pom.waitForApis();
    pom.deploymentStat.root.should(
      "contain.text",
      "Additional Permissions Needed",
    );
  });

  // TODO: After API update.
  // it("should render component with API data filterd on metadata labels provided", () => {});
});
