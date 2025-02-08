/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import DashboardDeploymentsStatus from "./DashboardDeploymentsStatus";
import DashboardDeploymentsStatusPom from "./DashboardDeploymentsStatus.pom";

const pom = new DashboardDeploymentsStatusPom();
describe("<DashboardDeploymentsStatus />", () => {
  it("should render component on 500 error for API data", () => {
    pom.interceptApis([pom.api.deploymentsStatusError500]);
    cy.mount(<DashboardDeploymentsStatus />);
    pom.waitForApis();
    pom.deploymentStat.root.should(
      "contain.text",
      "Unfortunately an error occurred",
    );
  });

  // TODO: check how to fix message for tests
  xit("should render component on 403 error for API data", () => {
    pom.interceptApis([pom.api.deploymentsStatusError403]);
    cy.mount(<DashboardDeploymentsStatus />);
    pom.waitForApis();
    pom.deploymentStat.root.should(
      "contain.text",
      "Additional Permissions Needed",
    );
  });

  // TODO: After API update.
  // it("should render component with API data filterd on metadata labels provided", () => {});
});
