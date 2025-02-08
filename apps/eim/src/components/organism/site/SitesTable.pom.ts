/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  allSites,
  getSitesByRegion,
  regionUsWest,
  regionUsWestId,
  sitePortland,
} from "@orch-ui/utils";

import { eim } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
const dataCySelectors = ["empty", "addSiteButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getAllSites"
  | "getAllSitesMocked"
  | "getAllSitesMockedWithFilter"
  | "getAllSitesMockedWithOffset"
  | "getAllSitesMockedSingle"
  | "getSitesByRegion"
  | "getSitesByRegionMocked"
  | "getSingleSite"
  | "getSitesError500"
  | "getAllSitesEmpty"
  | "getSingleSiteMocked"
  | "getSingleRegionMocked"
  | "getSites404";
const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites`;
const routeAll = `${route}?*`;
const routeSingle = `${route}/site-**`;
const routeByRegion = `${route}?*regionID=**`;

const endpoints: CyApiDetails<ApiAliases> = {
  getAllSites: {
    route: routeAll,
  },
  getAllSitesMocked: {
    route: routeAll,
    statusCode: 200,
    response: { ...allSites, totalElements: 20 },
  },
  getAllSitesMockedWithFilter: {
    route: `${routeAll}filter=name%3D%22testingSearch%22%20OR%20resourceId%3D%22testingSearch%22%20OR%20region.name%3D%22testingSearch%22%20OR%20region.resourceId%3D%22testingSearch%22&offset=0&orderBy=name%20asc&pageSize=10`,
    statusCode: 200,
    response: allSites,
  },
  getAllSitesMockedWithOffset: {
    route: `${routeAll}offset=10&pageSize=10`,
    statusCode: 200,
    response: { ...allSites, totalElements: 20 },
  },
  getAllSitesEmpty: {
    route: routeAll,
    statusCode: 200,
    response: {
      sites: [],
      totalElements: 0,
    },
  },
  getAllSitesMockedSingle: {
    route: routeAll,
    statusCode: 200,
    response: {
      sites: [sitePortland],
      totalElements: 1,
    },
  },
  getSitesByRegion: {
    route: routeByRegion,
  },
  getSitesByRegionMocked: {
    route: routeByRegion,
    statusCode: 200,
    response: getSitesByRegion(regionUsWestId),
  },
  getSingleSite: {
    route: routeSingle,
  },
  getSingleSiteMocked: {
    route: routeSingle,
    statusCode: 200,
    response: sitePortland,
  },
  getSingleRegionMocked: {
    route: "**/regions/*",
    statusCode: 200,
    response: regionUsWest,
  },
  getSitesError500: {
    route: routeAll,
    statusCode: 500,
    response: allSites,
  },

  getSites404: {
    route: routeAll,
    statusCode: 404,
    response: {
      detail:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"9dfa85f8-1e80-4c13-bc57-020ad8d49177"  filter:{kind:RESOURCE_KIND_REGION  limit:20}',
      status: 404,
    },
  },
};

class SitesTablePom extends CyPom<Selectors, ApiAliases> {
  public table = new SiTablePom("sitesTable");
  public _table = new TablePom("sitesTable");
  constructor(public rootCy: string = "sitesTable") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public select(site: eim.SiteRead) {
    const row = this.table.getRowBySearchText(site.name!);
    row.find(".spark-table-cell:nth-child(3) button").click();
  }

  public siteName(name: string) {
    return this.root.contains(name).closest("tr");
  }

  public selectByName(name: string) {
    const row = this.table.getRowBySearchText(name);
    row.find(".spark-table-cell:nth-child(4) button").click();
  }
  public radioByName(name: string) {
    const row = this.table.getRowBySearchText(name);
    row.find(".spark-table-cell:nth-child(1) input").check();
  }

  public selectFirstRow(): void {
    this.table.getRow(1).find(".spark-table-cell:nth-child(4) button").click();
  }

  public getAllResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getAllSitesMocked
      : this.api.getAllSites;
  }

  public getByRegionResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getSitesByRegionMocked
      : this.api.getSitesByRegion;
  }

  public getSingleResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getSingleSiteMocked
      : this.api.getSingleSite;
  }
}
export default SitesTablePom;
