/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { regionUsWestId, SiteStore } from "@orch-ui/utils";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

export type ApiAliases =
  | "getAllSites"
  | "getSitesByRegion"
  | "getSingleSite"
  | "getSitesError500"
  | "getAllSitesEmpty"
  | "getSites404";

const sitesStore = new SiteStore();
const sites = sitesStore.list();

const getSites: CyApiDetail<eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse> =
  {
    route: `**/v1/projects/${defaultActiveProject.name}/regions/**/sites?pageSize=*`,
    response: {
      sites: sitesStore.list(),
      totalElements: sitesStore.resources.length,
      hasNext: false,
    },
  };

const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites`;
const routeAll = `${route}?*`;
const routeSingle = `${route}/site-**`;
const routeByRegion = `**/v1/projects/${defaultActiveProject.name}/regions/${regionUsWestId}/sites?pageSize=*`;

interface ErrorResponse {
  detail?: string;
  status?: number;
}

export const endpoints: CyApiDetails<
  ApiAliases,
  | eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
  | ErrorResponse
> = {
  getAllSites: getSites,
  getAllSitesEmpty: {
    route: routeAll,
    statusCode: 200,
    response: {
      sites: [],
      hasNext: false,
      totalElements: 0,
    },
  },
  getSingleSite: {
    route: routeSingle,
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
  getSitesError500: {
    route: routeAll,
    statusCode: 500,
  },
  getSitesByRegion: {
    route: routeByRegion,
    statusCode: 200,
    response: {
      sites: sites,
      hasNext: false,
      totalElements: sites.length,
    },
  },
};

class SitesDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("sitesDropdown");
  constructor(public rootCy: string = "sitesDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default SitesDropdownPom;
