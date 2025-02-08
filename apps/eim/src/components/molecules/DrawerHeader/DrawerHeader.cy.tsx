/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { regionAshland, siteBoston } from "@orch-ui/utils";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerHeaderPom } from "./DrawerHeader.pom";

const pom = new DrawerHeaderPom();
describe("<DrawerHeader/>", () => {
  it("should show name component", () => {
    cy.mount(
      <DrawerHeader targetEntity={siteBoston} targetEntityType="site" />,
    );
    pom.root.should("contain.text", siteBoston.name);
  });

  describe("maintenance tag", () => {
    it("should show maintenance tag", () => {
      pom.maintenanceStatusTag.interceptApis([
        pom.maintenanceStatusTag.api.getSchedulesMockSingle,
      ]);
      cy.mount(
        <DrawerHeader targetEntity={regionAshland} targetEntityType="region" />,
      );
      pom.maintenanceStatusTag.root.should("contain.text", "In Maintenance");
    });
    it("should not show maintenance tag", () => {
      pom.maintenanceStatusTag.interceptApis([
        pom.maintenanceStatusTag.api.getEmptySchedules,
      ]);
      cy.mount(
        <DrawerHeader targetEntity={regionAshland} targetEntityType="region" />,
      );
      pom.maintenanceStatusTag.root.should("not.exist");
    });
    it("should call the schedule api on region", () => {
      pom.maintenanceStatusTag.interceptApis([
        pom.maintenanceStatusTag.api.getSchedulesMockSingle,
      ]);
      cy.mount(
        <DrawerHeader targetEntity={regionAshland} targetEntityType="region" />,
      );
      cy.get(`@${pom.maintenanceStatusTag.api.getSchedulesMockSingle}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(`regionID=${regionAshland.resourceId!}`);
          expect(match && match.length > 0).to.be.eq(true);
        });
    });
    it("should call the schedule api on site", () => {
      pom.maintenanceStatusTag.interceptApis([
        pom.maintenanceStatusTag.api.getSchedulesMockSingle,
      ]);
      cy.mount(
        <DrawerHeader targetEntity={siteBoston} targetEntityType="site" />,
      );
      cy.get(`@${pom.maintenanceStatusTag.api.getSchedulesMockSingle}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(`siteID=${siteBoston.resourceId!}`);
          expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });

  describe("on header prefix button", () => {
    it("should see cross button when the header prefix or back button is not shown", () => {
      cy.mount(
        <DrawerHeader targetEntity={siteBoston} targetEntityType="site" />,
      );
      pom.el.crossButton.should("exist");
      pom.el.backButton.should("not.exist");
    });
    it("should see header prefix or back button and not the cross button", () => {
      cy.mount(
        <DrawerHeader
          targetEntity={siteBoston}
          targetEntityType="site"
          prefixButtonShown
        />,
      );
      pom.el.backButton.should("exist");
    });
  });
});
