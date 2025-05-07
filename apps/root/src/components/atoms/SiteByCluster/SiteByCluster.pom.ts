/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterTwo, regionUsWest, regionUsWestId } from "@orch-ui/utils";

const dataCySelectors = ["loader", "error"] as const;
type Selectors = (typeof dataCySelectors)[number];
type ClusterApiAliases = "getClusterSuccess" | "getCluster500";

type HostApiAliases = "getHostByResourceIdSuccess" | "getHostByResourceId500";
type SiteApiAliases = "getSiteSalem" | "getSiteSuccess" | "getSite500";
type ApiAliases = ClusterApiAliases | HostApiAliases | SiteApiAliases;

export const regionId = regionUsWestId;
export const siteRestaurantTwo: infra.SiteRead = {
  resourceId: "test-site",
  siteID: "test-site",
  name: "Restaurant Two",
  // regionId: regionId,
  region: regionUsWest,
};
const hostTwo: infra.HostRead = {
  name: "Edge Node",
  resourceId: "test-host",
  site: siteRestaurantTwo,
  // siteId: siteRestaurantTwo.resourceId,
};

const siteEndpoints: CyApiDetails<
  SiteApiAliases,
  infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
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
  infra.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getHostByResourceIdSuccess: {
    route: "**/compute/hosts?filter=resourceId%3D**",
    statusCode: 200,
    response: {
      hasNext: false,
      hosts: [hostTwo],
      totalElements: 1,
    },
  },
  getHostByResourceId500: {
    route: "**/compute/hosts?filter=resourceId%3D**",
    statusCode: 500,
    networkError: true,
  },
};

const clusterEndpoints: CyApiDetails<
  ClusterApiAliases,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusterSuccess: {
    route: `**v2/**/clusters/${clusterTwo.name}`,
    response: clusterTwo,
  },
  getCluster500: {
    route: `**v2/**/clusters/${clusterTwo.name}`,
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
