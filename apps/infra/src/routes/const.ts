/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { BreadcrumbPiece, CollapsableListItem } from "@orch-ui/components";

export const clusterManagementRoute = "clusters";
export const clusterDetailRoute = "cluster/:clusterName";
export const clusterEditRoute = "cluster/:clusterName/edit";
export const clusterCreateRoute = "clusters/create";
export const locationRoute = "locations";
export const addRegionRoute = "regions/:regionId";
export const addSubRegionRoute = "regions/parent/:parentRegionId/:regionId";
export const addSiteRoute = "regions/:regionId/sites/:siteId";

export const regionsRoute = "regions";
export const sitesRoute = "sites";
export const hostsRoute = "hosts";
export const summary = "summary";
export const hostDetailsRoute = "host/:id";
export const unassignedDetailsRoute = "unassigned-host/:id";
export const unconfiguredDetailsRoute = "unconfigured-host/:id";
export const hostDetailsGuidRoute = "host/uuid/:uuid";
export const unconfiguredDetailsGuidRoute = "unconfigured-host/uuid/:uuid";
export const hostConfigureRoute = "unconfigured-host/configure";

export const allClusterRoutes = [
  clusterManagementRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterCreateRoute,
];
export const allHostRoutes = [hostsRoute, hostDetailsRoute, hostConfigureRoute];
export const allLocationRoutes = [
  locationRoute,
  addRegionRoute,
  addSubRegionRoute,
  addSiteRoute,
];

export type InfraRoute =
  | typeof regionsRoute
  | typeof sitesRoute
  | typeof hostsRoute
  | typeof hostDetailsRoute
  | typeof hostDetailsGuidRoute
  | typeof unconfiguredDetailsRoute
  | typeof unconfiguredDetailsGuidRoute
  | typeof hostConfigureRoute
  | typeof summary;

export const homeBreadcrumb = {
  text: "Home",
  link: "/",
};

export const locationsBreadcrumb = {
  text: "Locations",
  link: "/locations",
};

export const infrastructureBreadcrumb = {
  text: "Infrastructure",
  link: "/infrastructure",
};

export const regionsBreadcrumb = {
  text: "Regions",
  link: `${regionsRoute}`,
};

export const getRegionsByIdBreadcrumb = (
  regionId: string,
  regionName?: string,
) => ({
  text: regionName ?? regionId,
  link: `${regionsRoute}/${regionId}`,
});

export const regionsCreateBreadcrumb = {
  text: "Add New Region",
  link: `${regionsRoute}/new`,
};

export const sitesBreadcrumb: BreadcrumbPiece = {
  text: "Sites",
  link: `${sitesRoute}`,
};
export const sitesCreateBreadcrumb = {
  text: "Add New Site",
  link: `${sitesRoute}/new`,
};

export const hostsBreadcrumb = {
  text: "Hosts",
  link: `${hostsRoute}`,
};

export const configuredBreadcrumb = {
  text: "Configured Hosts",
  link: "unassigned-hosts",
};

export const unconfiguredBreadcrumb = {
  text: "Onboarded Hosts",
  link: "unconfigured-hosts",
};

// only used in Development
export const summaryMenuItem: CollapsableListItem<InfraRoute> = {
  route: summary,
  icon: "graph-chart",
  value: "Summary",
};

export const regionsMenuItem: CollapsableListItem<InfraRoute> = {
  route: regionsRoute,
  icon: "globe-pointer",
  value: "Regions",
};

export const sitesMenuItem: CollapsableListItem<InfraRoute> = {
  route: sitesRoute,
  icon: "pin",
  value: "Sites",
};

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

export const hostsActiveNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "hosts",
  icon: "pulse",
  value: "Active",
  isIndented: true,
};

export const hostsConfiguredNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "unassigned-hosts",
  icon: "pulse",
  value: "Configured",
  isIndented: true,
};

export const hostsOnboardedNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "unconfigured-hosts",
  icon: "pulse",
  value: "Onboarded",
  isIndented: true,
};

export const hostsDeauthorizedNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "deauthorized-hosts",
  icon: "pulse",
  value: "Deauthorized",
  divider: true,
  isIndented: true,
};

export const locationsNavItem: CollapsableListItem<string> = {
  ...defaultNavItem,
  route: "locations",
  icon: "cube-detached",
  value: "Locations",
  divider: true,
};
