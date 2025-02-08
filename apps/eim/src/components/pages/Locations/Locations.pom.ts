/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import * as _ from "lodash";
import { DrawerHeaderPom } from "../../../components/molecules/DrawerHeader/DrawerHeader.pom";
import { RegionSiteTreePom } from "../../../components/organism/locations/RegionSiteTree/RegionSiteTree.pom";
import { RegionViewPom } from "../../../components/organism/locations/RegionView/RegionView.pom";
import { ScheduleMaintenanceDrawerPom } from "../../../components/organism/ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer.pom";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "deleteRegionMocked" | "deleteSiteBySiteId";

const endpoints: CyApiDetails<ApiAliases> = {
  deleteRegionMocked: {
    method: "DELETE",
    route: "**/regions/*",
    statusCode: 200,
  },
  deleteSiteBySiteId: {
    method: "DELETE",
    route: "**/regions/*/sites/*",
    statusCode: 200,
  },
};

export class LocationsPom extends CyPom<Selectors, ApiAliases> {
  public regionSiteTreePom = new RegionSiteTreePom();
  public scheduleDrawerPom: ScheduleMaintenanceDrawerPom;
  public regionViewPom: RegionViewPom;
  public drawerHeaderPom: DrawerHeaderPom;
  public dialog = new ConfirmationDialogPom("dialog");
  constructor(public rootCy: string = "locations") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.scheduleDrawerPom = new ScheduleMaintenanceDrawerPom();
    this.regionViewPom = new RegionViewPom();
    this.drawerHeaderPom = new DrawerHeaderPom();
  }

  /**
   * Navigate to the Add Region page by clicking either CTA
   */
  public gotoAddNewRegion(): void {
    this.root.contains("Add Region").click();
  }

  public goToAddSubRegion(parentName: string): void {
    this.root
      .dataCy("region")
      .contains(parentName)
      .parent()
      .parent()
      .within(() => {
        cy.dataCy("regionTreePopup").click();
      });
    cy.contains("Add Subregion").click();
  }

  public goToAddSite(parentRegions: string[]): void {
    const lastRegion = parentRegions.slice(-1)[0];

    _.forEach(parentRegions.slice(0, -1), (r) => {
      this.regionSiteTreePom.expandRegion(r);
    });

    this.root
      .dataCy("region")
      .contains(lastRegion)
      .parent()
      .parent()
      .within(() => {
        cy.dataCy("regionTreePopup").click();
      });
    cy.contains("Add Site").click();
    cy.url().should("contain", "sites/new");
  }
}
