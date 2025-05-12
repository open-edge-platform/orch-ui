/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PathParam, useNavigate } from "react-router-dom";
import { InfraRoute } from "./paths";
import { getInfraPath } from "./routeHelpers";

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
