/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { hostOne, regionAshland, siteBoston } from "@orch-ui/utils";
import { ScheduleMaintenanceStatusTag } from "./ScheduleMaintenanceStatusTag";
import { ScheduleMaintenanceStatusTagPom } from "./ScheduleMaintenanceStatusTag.pom";

const pom = new ScheduleMaintenanceStatusTagPom();
describe("<ScheduleMaintenanceStatusTag/>", () => {
  describe("getting host maintenance status", () => {
    it("should not show badge when no maintenance is set", () => {
      pom.interceptApis([pom.api.getEmptySchedules]);
      cy.mount(
        <ScheduleMaintenanceStatusTag
          targetEntity={hostOne}
          targetEntityType="host"
        />,
      );
      pom.waitForApis();
      pom.root.should("not.exist");

      cy.get(`@${pom.api.getEmptySchedules}`)
        .its("request.query")
        .should("deep.include", {
          hostID: hostOne.resourceId,
        });
    });
    it("should show badge when single maintenance is seen", () => {
      pom.interceptApis([pom.api.getSchedulesMockSingle]);
      cy.mount(
        <ScheduleMaintenanceStatusTag
          targetEntity={hostOne}
          targetEntityType="host"
        />,
      );
      pom.waitForApis();
      pom.root.should("contain.text", "In Maintenance");
    });
    it("should show badge when repeated maintenance is seen", () => {
      pom.interceptApis([pom.api.getSchedulesMockRepeated]);
      cy.mount(
        <ScheduleMaintenanceStatusTag
          targetEntity={hostOne}
          targetEntityType="host"
        />,
      );
      pom.waitForApis();
      pom.root.should("contain.text", "In Maintenance");
    });
  });

  it("should check for region maintenance", () => {
    pom.interceptApis([pom.api.getEmptySchedules]);
    cy.mount(
      <ScheduleMaintenanceStatusTag
        targetEntity={regionAshland}
        targetEntityType="region"
      />,
    );
    pom.waitForApis();
    pom.root.should("not.exist");
    cy.get(`@${pom.api.getEmptySchedules}`)
      .its("request.query")
      .should("deep.include", {
        regionID: regionAshland.resourceId,
      });
  });

  it("should check for site maintenance", () => {
    pom.interceptApis([pom.api.getEmptySchedules]);
    cy.mount(
      <ScheduleMaintenanceStatusTag
        targetEntity={siteBoston}
        targetEntityType="site"
      />,
    );
    pom.waitForApis();
    pom.root.should("not.exist");
    cy.get(`@${pom.api.getEmptySchedules}`)
      .its("request.query")
      .should("deep.include", {
        siteID: siteBoston.resourceId,
      });
  });
});
