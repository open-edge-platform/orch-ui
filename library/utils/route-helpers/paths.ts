/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Determines the prefix path for infrastructure micro-frontend routes.
 * Returns '/' when the application is running on port 8082 or in Cypress component testing mode,
 * otherwise returns '/infrastructure/'. Logics need to be more optimised
 *
 * @constant
 * @type {string}
 */
export const infraMfePrefix = "/infrastructure/";

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

export const allClusterRoutes = [
  clusterManagementRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterCreateRoute,
] as const;
export const allHostRoutes = [
  hostsRoute,
  hostDetailsRoute,
  hostEditRoute,
  hostRegisterRoute,
  hostProvisioningRoute,
] as const;
export const allLocationRoutes = [
  locationRoute,
  regionRoute,
  subRegionRoute,
  regionSiteRoute,
  siteRoute,
] as const;

export const allInfraRoutes = [
  ...allClusterRoutes,
  ...allHostRoutes,
  ...allLocationRoutes,
] as const;

type RoutesTuple = typeof allInfraRoutes;

export type InfraRoute = RoutesTuple[number];
