/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { customersKey, customersOne } from "@orch-ui/utils";
import DashboardHostStatus from "./DashboardHostStatus";
import DashboardHostStatusPom from "./DashboardHostStatus.pom";

const pom = new DashboardHostStatusPom("dashboardHostStatus");
describe("<DashboardHostStatus>", () => {
  it("should render component with API data", () => {
    pom.interceptApis([pom.api.getHostSummary]);
    cy.mount(<DashboardHostStatus />);
    pom.waitForApis();

    pom.hostStat.el.dashboardStatusTotal.should("contain.text", "18");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "1");
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "3");
  });
  it("should render component on 500 error for API data", () => {
    pom.interceptApis([pom.api.getHostSummaryError]);
    cy.mount(<DashboardHostStatus />);
    pom.waitForApis();

    pom.root.should("contain.text", "Unfortunately an error occurred");
  });

  it("should render expected message on empty Host list from API data", () => {
    pom.interceptApis([pom.api.getHostSummaryEmpty]);
    cy.mount(<DashboardHostStatus />);
    pom.waitForApis();

    pom.root.should("contain.text", "There are no hosts");
  });

  it("shows component on single metadata label filter", () => {
    pom.interceptApis([pom.api.getHostSummaryWithSingleMetadataFilter]);
    cy.mount(
      <DashboardHostStatus
        metadata={{
          pairs: [
            {
              key: customersKey,
              value: customersOne,
            },
          ],
        }}
      />,
    );
    pom.waitForApis();
    pom.hostStat.el.dashboardStatusTotal.should("contain.text", "8");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "1");
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "2");
  });

  it("shows component on multiple metadata label filter", () => {
    pom.interceptApis([pom.api.getHostSummaryWithMultipleMetadataFilter]);
    cy.mount(
      <DashboardHostStatus
        metadata={{
          pairs: [
            {
              key: customersKey,
              value: customersOne,
            },
          ],
        }}
      />,
    );
    pom.waitForApis();
    pom.hostStat.el.dashboardStatusTotal.should("contain.text", "2");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "-");
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "-");
  });
});
