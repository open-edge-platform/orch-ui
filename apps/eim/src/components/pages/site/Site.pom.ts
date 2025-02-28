/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ConfirmationDialogPom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { SiteStore } from "@orch-ui/utils";
import { ScheduleMaintenanceDrawerPom } from "../../../components/organism/ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer.pom";

const dataCySelectors = ["add"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getSites"
  | "getSitesMocked"
  | "getSitesAfterDeleteMocked"
  | "getSitesUpdatedMocked"
  | "deleteSite"
  | "deleteSiteMocked";

const siteStore = new SiteStore();
const sites = siteStore.list();

const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites`;

const allSitesUpdated = structuredClone(sites);
if (allSitesUpdated)
  allSitesUpdated[0].name = allSitesUpdated
    ? `${allSitesUpdated[0].name} Updated`
    : "Updated";

let oneSiteRemoved = structuredClone(sites);
oneSiteRemoved = oneSiteRemoved ? oneSiteRemoved.slice(1) : [];

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse | undefined
> = {
  getSites: {
    route: `${route}?*`,
  },
  getSitesMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      sites,
      totalElements: sites.length,
    },
  },
  getSitesAfterDeleteMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      sites: oneSiteRemoved,
      totalElements: oneSiteRemoved.length,
    },
  },
  getSitesUpdatedMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      sites: allSitesUpdated,
      totalElements: allSitesUpdated.length,
    },
  },
  deleteSite: {
    route: `${route}/*`,
    method: "DELETE",
  },
  deleteSiteMocked: {
    route: `${route}/*`,
    statusCode: 200,
    method: "DELETE",
  },
};

class SitePom extends CyPom<Selectors, ApiAliases> {
  public table: SiTablePom;
  confirmationDialogPom: ConfirmationDialogPom;
  public maintenancePom: ScheduleMaintenanceDrawerPom;

  constructor(public rootCy: string = "site") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom("sitesTable");
    this.confirmationDialogPom = new ConfirmationDialogPom();
    this.maintenancePom = new ScheduleMaintenanceDrawerPom();
  }

  public getResponse(isUpdate: boolean) {
    if (CyPom.isResponseMocked) {
      return isUpdate
        ? this.api.getSitesUpdatedMocked
        : this.api.getSitesMocked;
    } else return this.api.getSites;
  }

  public gotoAddNewSite(): void {
    this.el.add.click();
  }

  public gotoUpdateSite(name: string): void {
    this.table.getCellBySearchText(name).find("a").click();
  }

  public deleteSite(siteID: string, name: string) {
    this.table
      .getRowBySearchText(name)
      .find("[data-cy='sitePopup']")
      .click()
      .get("[data-cy='Delete']")
      .click();

    this.interceptApis([
      CyPom.isResponseMocked ? this.api.deleteSiteMocked : this.api.deleteSite,
      CyPom.isResponseMocked
        ? this.api.getSitesAfterDeleteMocked
        : this.api.getSites,
    ]);
    this.confirmationDialogPom.el.confirmBtn.contains("Delete").click();
    this.waitForApis();
    cy.get(
      `@${
        CyPom.isResponseMocked ? this.api.deleteSiteMocked : this.api.deleteSite
      }`,
    )
      .its("request.url")
      .then((url: string) => {
        const match = url.match(siteID);
        expect(match && match.length > 0).to.eq(true);
      });
  }
}

export default SitePom;
