/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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

    pom.hostStat.el.dashboardStatusTotal.should("contain.text", "16");
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "6");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "1");
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

    pom.root.should("contain.text", "There are no provisioned hosts");
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
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "5");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "1");
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
    pom.hostStat.el.dashboardStatusTotal.should("contain.text", "1");
    pom.hostStat.el.dashboardStatusRunning.should("contain.text", "-");
    pom.hostStat.el.dashboardStatusError.should("contain.text", "-");
  });
});
