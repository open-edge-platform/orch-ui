/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  regionUsWest,
  siteOregonPortland,
  siteSantaClara,
  SiteStore,
} from "@orch-ui/utils";

interface ErrorResponse {
  status?: number;
  detail?: string;
}

const dataCySelectors = ["empty", "addSiteButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type SiteListApiAliases =
  | "getAllSites"
  | "getAllSitesEmpty"
  | "getAllSitesMocked"
  | "getAllSitesMockedWithFilter"
  | "getAllSitesMockedWithOffset"
  | "getAllSitesMockedSingle"
  | "getSites404"
  | "getSitesError500";
type SiteApiAliases =
  | "getSitesByRegion"
  | "getSitesByRegionMocked"
  | "getSingleSite"
  | "getSingleSiteMocked";
type RegionApiAliases = "getSingleRegionMocked";
type ApiAliases = SiteListApiAliases | SiteApiAliases | RegionApiAliases;

const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites`;
const routeAll = `${route}?*`;
const routeSingle = `${route}/site-**`;
const routeByRegion = `${route}?*regionID=**`;
const siteStore = new SiteStore();
const siteMocks = siteStore.list();
const siteResponse = {
  sites: siteMocks,
  hasNext: false,
  totalElements: siteMocks.length,
};

const sitesEndpoints: CyApiDetails<
  SiteListApiAliases,
  | infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
  | ErrorResponse
> = {
  getAllSites: {
    route: routeAll,
  },
  getAllSitesMocked: {
    route: routeAll,
    statusCode: 200,
    response: siteResponse,
  },
  getAllSitesMockedWithFilter: {
    route: `${routeAll}filter=name%3D%22testingSearch%22%20OR%20resourceId%3D%22testingSearch%22%20OR%20region.name%3D%22testingSearch%22%20OR%20region.resourceId%3D%22testingSearch%22&offset=0&orderBy=name%20asc&pageSize=10`,
    statusCode: 200,
    response: siteResponse,
  },
  getAllSitesMockedWithOffset: {
    route: `${routeAll}offset=10&pageSize=10`,
    statusCode: 200,
    response: siteResponse,
  },
  getAllSitesEmpty: {
    route: routeAll,
    statusCode: 200,
    response: {
      sites: [],
      hasNext: false,
      totalElements: 0,
    },
  },
  getAllSitesMockedSingle: {
    route: routeAll,
    statusCode: 200,
    response: {
      sites: [siteOregonPortland],
      hasNext: false,
      totalElements: 1,
    },
  },
  getSitesError500: {
    route: routeAll,
    statusCode: 500,
    response: {
      detail:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"9dfa85f8-1e80-4c13-bc57-020ad8d49177"  filter:{kind:RESOURCE_KIND_REGION  limit:20}',
      status: 404,
    },
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

const singleSiteEndpoints: CyApiDetails<
  SiteApiAliases,
  infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
> = {
  getSingleSite: {
    route: routeSingle,
  },
  getSingleSiteMocked: {
    route: routeSingle,
    statusCode: 200,
    response: siteOregonPortland,
  },
  getSitesByRegion: {
    route: routeByRegion,
  },
  getSitesByRegionMocked: {
    route: routeByRegion,
    statusCode: 200,
    response: siteSantaClara,
  },
};

const singleRegionEndpoints: CyApiDetails<
  RegionApiAliases,
  infra.GetV1ProjectsByProjectNameRegionsAndRegionIdApiResponse
> = {
  getSingleRegionMocked: {
    route: "**/regions/*",
    statusCode: 200,
    response: regionUsWest,
  },
};

class SitesTablePom extends CyPom<Selectors, ApiAliases> {
  public table = new SiTablePom("sitesTable");
  public _table = new TablePom("sitesTable");
  constructor(public rootCy: string = "sitesTable") {
    super(rootCy, [...dataCySelectors], {
      ...singleRegionEndpoints,
      ...singleSiteEndpoints,
      ...sitesEndpoints,
    });
  }

  public select(site: infra.SiteRead) {
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
