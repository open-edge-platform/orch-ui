/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { RegionStore, regionUsWest } from "@orch-ui/utils";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

export type ApiAliases =
  | "getRegions"
  | "getRegions404"
  | "getRegionsError500"
  | "getSingleRegion"
  | "getRegionsEmpty";
const route = `**/v1/projects/${defaultActiveProject.name}/regions`;
const routeAll = `${route}?*`;
const singleRoute = `${route}/*`;

const regionsStore = new RegionStore();
const getRegions: CyApiDetail<eim.GetV1ProjectsByProjectNameRegionsApiResponse> =
  {
    route: `**/v1/projects/${defaultActiveProject.name}/regions?pageSize=*`,
    response: {
      regions: regionsStore.list(),
      totalElements: regionsStore.resources.length,
      hasNext: false,
    },
  };

export const endpoints: CyApiDetails<ApiAliases> = {
  getRegions,
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
    statusCode: 200,
    response: regionUsWest,
  },
};

class RegionsDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("regionsDropdown");
  constructor(public rootCy: string = "regionsDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}

export default RegionsDropdownPom;
