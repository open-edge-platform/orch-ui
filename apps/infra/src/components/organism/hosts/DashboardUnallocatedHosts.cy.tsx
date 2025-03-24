/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DashboardUnallocatedHostsPom from "./DashboardUnallocatedHosts.pom";
import DashboardUnallocatedHostsWheel from "./DashboardUnallocatedHostsWheel";

const pom = new DashboardUnallocatedHostsPom();
xdescribe("EIM: Dashboard Host Status component testing", () => {
  it("should render component with API data", () => {
    pom.interceptApis([pom.api.unallocatedHostsListSuccess]);
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardUnallocatedHostsWheel />
      </div>,
    );
    pom.waitForApis();

    pom.wheelStat.el.counterWheelText.should("contain.text", "2 out of 2");
  });
  it("should render component on 500 error for API data", () => {
    pom.interceptApis([pom.api.hostsListError500]);
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardUnallocatedHostsWheel />
      </div>,
    );
    pom.waitForApis();

    pom.root.should("contain.text", "Unable to get Hosts stat data");
  });
  it("should render component on 400 error for API data", () => {
    pom.interceptApis([pom.api.hostsListError500]);
    cy.mount(
      <div style={{ minHeight: "19rem" }}>
        <DashboardUnallocatedHostsWheel />
      </div>,
    );
    pom.waitForApis();

    pom.root.should("contain.text", "Unable to get Hosts stat data");
  });
});
