/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

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
export const hostProvisioningRoute = "hosts/set-up-provisioning";
export const newHostProvisioningRoute = "hosts/provision";
export const hostProvisionRoute = "hosts/provision";
export const clusterTemplateRoute = "cluster-templates";
export const clusterTemplateDetailRoute =
  "cluster-templates/:templateName/:templateVersion/view";
export const deploymentClusterDetailRoute = "deployment/:deplId/cluster/:name";

export const allClusterRoutes = [
  clusterManagementRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterCreateRoute,
] as const;
export const allClusterTemplateRoutes = [
  clusterTemplateRoute,
  clusterTemplateDetailRoute,
] as const;
export const allHostRoutes = [
  hostsRoute,
  hostDetailsRoute,
  hostEditRoute,
  hostRegisterRoute,
  hostProvisioningRoute,
  hostProvisionRoute,
] as const;
export const allLocationRoutes = [
  locationRoute,
  regionRoute,
  subRegionRoute,
  regionSiteRoute,
  siteRoute,
] as const;
export const allDeploymentsRoutes = [deploymentClusterDetailRoute] as const;

export const allInfraRoutes = [
  ...allClusterRoutes,
  ...allHostRoutes,
  ...allLocationRoutes,
] as const;

export const allClusterOrchRoutes = [
  ...allClusterRoutes,
  ...allClusterTemplateRoutes,
] as const;

//TODO : more to be added during Admin routing update
export const allAdminRoutes = [...allClusterTemplateRoutes] as const;
//TODO : more to be added during Admin routing update
export const allAppOrchRoutes = [...allDeploymentsRoutes] as const;

type InfraRoutesTuple = typeof allInfraRoutes;
type ClusterOrchRoutesTuple = typeof allClusterOrchRoutes;
type AppOrchRoutesTuple = typeof allAppOrchRoutes;
type AdminRoutesTuple = typeof allAdminRoutes;

export type InfraRoute = InfraRoutesTuple[number];
export type ClusterOrchRoute = ClusterOrchRoutesTuple[number];
export type AppOrchRoute = AppOrchRoutesTuple[number];
export type AdminRoute = AdminRoutesTuple[number];
