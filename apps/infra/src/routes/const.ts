/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CollapsableListItem } from "@orch-ui/components";

export const clusterManagementRoute = "clusters";
export const clusterDetailRoute = "cluster/:clusterName";
export const clusterEditRoute = "cluster/:clusterName/edit";
export const clusterCreateRoute = "clusters/create";
export const locationRoute = "locations";
export const regionRoute = "regions/:regionId";
export const subRegionRoute = "regions/parent/:parentRegionId/:regionId";
export const regionSiteRoute = "regions/:regionId/sites/:siteId";
export const siteRoute = "sites/:siteId";
export const hostsRoute = "hosts";
export const hostDetailsRoute = "host/:id";
export const hostEditRoute = "host/:id/edit";
export const hostRegisterRoute = "register-hosts";
export const hostProvisioningRoute = "/hosts/set-up-provisioning";

// Path generators for all dynamic routes
export const getClusterDetailPath = (clusterName: string) =>
  clusterDetailRoute.replace(":clusterName", clusterName);

export const getClusterEditPath = (clusterName: string) =>
  clusterEditRoute.replace(":clusterName", clusterName);

export const getRegionPath = (regionId: string) =>
  regionRoute.replace(":regionId", regionId);

export const getSubRegionPath = (parentRegionId: string, regionId: string) =>
  subRegionRoute
    .replace(":parentRegionId", parentRegionId)
    .replace(":regionId", regionId);

export const getRegionSitePath = (regionId: string, siteId: string) =>
  regionSiteRoute.replace(":regionId", regionId).replace(":siteId", siteId);

export const getSitePath = (siteId: string) =>
  siteRoute.replace(":siteId", siteId);

export const getHostDetailsPath = (id: string) =>
  hostDetailsRoute.replace(":id", id);

export const getHostEditPath = (id: string) => hostEditRoute.replace(":id", id);

export const allClusterRoutes = [
  clusterManagementRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterCreateRoute,
];
export const allHostRoutes = [
  hostsRoute,
  hostDetailsRoute,
  hostEditRoute,
  hostRegisterRoute,
  hostProvisioningRoute,
];
export const allLocationRoutes = [
  locationRoute,
  regionRoute,
  subRegionRoute,
  regionSiteRoute,
  siteRoute,
];
export type InfraRoute =
  | typeof hostsRoute
  | typeof hostDetailsRoute
  | typeof hostEditRoute
  | typeof hostRegisterRoute
  | typeof hostProvisioningRoute
  | typeof locationRoute
  | typeof subRegionRoute
  | typeof regionSiteRoute
  | typeof siteRoute
  | typeof clusterManagementRoute
  | typeof clusterDetailRoute
  | typeof clusterEditRoute
  | typeof clusterCreateRoute;

const defaultNavItem: CollapsableListItem<string> = {
  icon: "minus",
  route: "",
  value: "",
};

export const clusterNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "clusters",
  icon: "globe",
  value: "Clusters",
  divider: true,
};

export const hostsNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "hosts",
  value: "Hosts",
  isBold: false,
  divider: true,
};

export const locationsNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "locations",
  icon: "cube-detached",
  value: "Locations",
  divider: true,
};
