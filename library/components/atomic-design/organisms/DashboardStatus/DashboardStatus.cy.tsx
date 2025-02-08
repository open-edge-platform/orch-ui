/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { DashboardStatus } from "./DashboardStatus";
import { DashboardStatusPom } from "./DashboardStatus.pom";

const pom = new DashboardStatusPom("dashboardStatus");
describe("Shared: Dashboard Status component testing", () => {
  it("should render default empty text and icon for empty component when `total` is zero (0).", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={0}
          error={0}
          running={0}
          isSuccess
        />
      </div>,
    );

    pom.root.should("contain.text", "Empty");
  });

  it("should render custom empty message and icon for empty component component when `total` is zero (0).", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={0}
          error={0}
          running={0}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.root.should("contain.text", "There are no hosts");
  });

  it("should render empty component when `total` is less than `running`.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={0}
          error={0}
          running={50}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.root.should("contain.text", "There are no hosts");
  });

  it("should render empty component when total is less than `error`.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={0}
          error={50}
          running={0}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.root.should("contain.text", "There are no hosts");
  });

  it("should render component when `total` is greater `error` and `running`.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={100}
          error={50}
          running={50}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.el.dashboardStatusTotal.should("contain.text", "100");
    pom.el.dashboardStatusError.should("contain.text", "50");
    pom.el.dashboardStatusRunning.should("contain.text", "50");
  });

  it("should disable error value when `error` is zero (0).", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={10}
          error={0}
          running={10}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.el.dashboardStatusTotal.should("contain.text", "10");
    pom.el.dashboardStatusError.should("contain.text", "-");
    pom.el.dashboardStatusRunning.should("contain.text", "10");
  });

  it("should render disabled running value when `running` is zero (0).", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={10}
          error={10}
          running={0}
          isSuccess
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.el.dashboardStatusTotal.should("contain.text", "10");
    pom.el.dashboardStatusError.should("contain.text", "10");
    pom.el.dashboardStatusRunning.should("contain.text", "-");
  });
  it("should render additional permissions needed when recieve eror with status 403.", () => {
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardStatus
          cardTitle="Host Status"
          total={0}
          error={0}
          running={0}
          isError
          apiError={{ status: 403, data: {} }}
          empty={{
            icon: "desktop",
            text: "There are no hosts",
          }}
        />
      </div>,
    );

    pom.root.should("contain.text", "Additional Permissions Needed");
  });
});
