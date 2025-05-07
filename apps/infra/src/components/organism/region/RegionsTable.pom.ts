/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { regions, regionUsWest } from "@orch-ui/utils";

const dataCySelectors = [
  "title",
  "buy",
  "metaValue",
  "emptyActionBtn",
  "search",
  "addRegionsButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRegions"
  | "getRegionsMocked"
  | "getRegionsMockedWithFilter"
  | "getRegionsMockedWithOffset"
  | "getRegions404"
  | "getRegionsError500"
  | "getSingleRegion"
  | "getRegionsEmpty"
  | "getSingleRegionMocked";
const route = `**/v1/projects/${defaultActiveProject.name}/regions`;
const routeAll = `${route}?*`;
const singleRoute = `${route}/*`;

const endpoints: CyApiDetails<ApiAliases> = {
  getRegions: {
    route: routeAll,
  },
  getRegionsMocked: {
    route: routeAll,
    statusCode: 200,
    response: {
      ...regions,
      totalElements: 20,
    },
  },
  getRegionsMockedWithFilter: {
    route: `${routeAll}filter=name%3D%22testingSearch%22%20OR%20resourceId%3D%22testingSearch%22%20OR%20parentRegion.name%3D%22testingSearch%22&offset=0&pageSize=10`,
    statusCode: 200,
    response: regions,
  },
  getRegionsMockedWithOffset: {
    route: `${routeAll}offset=10&pageSize=10`,
    statusCode: 200,
    response: {
      ...regions,
      totalElements: 20,
    },
  },
  getRegions404: {
    route: routeAll,
    statusCode: 404,
    response: {
      detail:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"9dfa85f8-1e80-4c13-bc57-020ad8d49177"  filter:{kind:RESOURCE_KIND_REGION  limit:20}',
      status: 404,
    },
  },
  getRegionsError500: {
    route: routeAll,
    statusCode: 500,
    response: [],
  },

  getRegionsEmpty: {
    route: routeAll,
    statusCode: 200,
    response: {
      regions: [],
    },
  },

  getSingleRegion: {
    route: singleRoute,
  },
  getSingleRegionMocked: {
    route: singleRoute,
    statusCode: 200,
    response: regionUsWest,
  },
};

class RegionsTablePom extends CyPom<Selectors, ApiAliases> {
  public table = new SiTablePom("regionsTable");
  public regionsTable = new TablePom("regionsTable");
  constructor(public rootCy: string = "regionsTable") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
  //Helps you
  public getSecondTableRow(): Cy {
    return this.root.find("tr:nth-child(2)");
  }

  public select(region: infra.RegionRead) {
    const row = this.table.getRowBySearchText(region.name!);
    row.find(".spark-table-cell:nth-child(2) button").click();
  }

  public selectByName(name: string) {
    const row = this.table.getRowBySearchText(name);
    row.find(".spark-table-cell:nth-child(3) button").click();
  }

  public radioByName(name: string) {
    const row = this.table.getRowBySearchText(name);
    row.find(".spark-table-cell:nth-child(1) input").check();
  }

  public selectFirstRow(): void {
    this.table.getRow(1).find(".spark-table-cell:nth-child(3) button").click();
  }

  public getResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getRegionsMocked
      : this.api.getRegions;
  }

  public getSingleResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getSingleRegionMocked
      : this.api.getSingleRegion;
  }
}
export default RegionsTablePom;
