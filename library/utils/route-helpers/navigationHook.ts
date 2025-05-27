/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathParam, useNavigate } from "react-router-dom";
import { AdminRoute, AppOrchRoute, InfraRoute } from "./paths";
import { getAdminPath, getAppOrchPath, getInfraPath } from "./routeHelpers";

/**
 * Custom hook that provides a strongly typed navigation function for infrastructure routes.
 *
 * @returns A function that accepts:
 * - `route` - The infrastructure route path to navigate to
 * - `params` - Optional URL parameters mapped to the route's path parameters
 * - `query` - Optional query string to append to the URL
 *
 * @example
 * const navigateToInfra = useInfraNavigate();
 * // Navigate to a route with parameters
 * navigateToInfra('region', { id: '123' });
 */

export type InfraNavigateFunction = <InfraPath extends InfraRoute>(
  route: InfraPath,
  params?: { [key in PathParam<InfraPath>]: string | null },
  query?: string,
) => void;

export const useInfraNavigate = () => {
  const navigate = useNavigate();
  return <InfraPath extends InfraRoute>(
    route: InfraPath,
    params?: {
      [key in PathParam<InfraPath>]: string | null;
    },
    query?: string,
  ) => navigate(getInfraPath(route, params, query));
};
export const useAdminNavigate = () => {
  const navigate = useNavigate();
  return <AdminPath extends AdminRoute>(
    route: AdminPath,
    params?: {
      [key in PathParam<AdminPath>]: string | null;
    },
    query?: string,
  ) => navigate(getAdminPath(route, params, query));
};

export const useAppOrchNavigate = () => {
  const navigate = useNavigate();
  return <AppOrchPath extends AppOrchRoute>(
    route: AppOrchPath,
    params?: {
      [key in PathParam<AppOrchPath>]: string | null;
    },
    query?: string,
  ) => navigate(getAppOrchPath(route, params, query));
};
