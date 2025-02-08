/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterTwo, regionUsWest, regionUsWestId } from "@orch-ui/utils";

const dataCySelectors = ["loader", "error"] as const;
type Selectors = (typeof dataCySelectors)[number];
type ClusterApiAliases = "getClusterSuccess" | "getCluster500";

type HostApiAliases = "getHostByUuidSuccess" | "getHostByUuid500";
type SiteApiAliases = "getSiteSalem" | "getSiteSuccess" | "getSite500";
type ApiAliases = ClusterApiAliases | HostApiAliases | SiteApiAliases;

export const regionId = regionUsWestId;
export const siteRestaurantTwo: eim.SiteRead = {
  resourceId: "test-site",
  siteID: "test-site",
  name: "Restaurant Two",
  // regionId: regionId,
  region: regionUsWest,
};
const hostTwo: eim.HostRead = {
  name: "Edge Node",
  resourceId: "test-host",
  site: siteRestaurantTwo,
  // siteId: siteRestaurantTwo.resourceId,
};

const siteEndpoints: CyApiDetails<
  SiteApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
> = {
  getSiteSalem: {
    route: "**/clusters/restaurant-salem",
    statusCode: 200,
    response: siteRestaurantTwo,
  },
  getSiteSuccess: {
    route: "/v1/projects/**/regions/**/sites/**",
    response: siteRestaurantTwo,
    statusCode: 200,
  },
  getSite500: {
    route: "/v1/projects/**/regions/**/sites/**",
    networkError: true,
  },
};

const hostEndpoints: CyApiDetails<
  HostApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getHostByUuidSuccess: {
    route: "/v1/projects/**/compute/hosts?uuid=*",
    response: {
      hasNext: false,
      hosts: [hostTwo],
      totalElements: 1,
    },
  },
  getHostByUuid500: {
    route: "/v1/projects/**/compute/hosts?uuid=*",
    networkError: true,
  },
};

const clusterEndpoints: CyApiDetails<
  ClusterApiAliases,
  ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse
> = {
  getClusterSuccess: {
    route: `**v1/**/clusters/${clusterTwo.name}`,
    response: clusterTwo,
  },
  getCluster500: {
    route: `**v1/**/clusters/${clusterTwo.name}`,
    networkError: true,
  },
};

class SiteByClusterPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "SiteByCluster") {
    super(rootCy, [...dataCySelectors], {
      ...siteEndpoints,
      ...hostEndpoints,
      ...clusterEndpoints,
    });
  }
}
export default SiteByClusterPom;
