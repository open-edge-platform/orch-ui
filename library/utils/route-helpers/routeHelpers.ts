/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createRef } from "react";
import {
  generatePath,
  Location,
  PathParam,
  RouteObject,
} from "react-router-dom";
import { AdminRoute, AppOrchRoute, InfraRoute } from "./paths";

export type RouteObjectWithRef = RouteObject & {
  nodeRef: React.RefObject<HTMLDivElement>;
};

export const getChildRoute = (
  location: Location,
  routes: RouteObjectWithRef[],
): RouteObjectWithRef => {
  const found = routes.find((route) =>
    route.path ? location.pathname.includes(route.path) : false,
  );
  return found ? found : { nodeRef: createRef() };
};

export const mapChildRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => ({
    index: route.path === "/",
    path: route.path === "/" ? undefined : route.path,
    element: route.element,
  }));
};

// matches .page $transition-duration in transitions.scss
export const innerTransitionTimeout = 300;

/**
 * Generates a complete infrastructure path by combining the infrastructure micro-frontend prefix,
 * route path with parameters, and query string.
 *
 * @template Path - Type extending InfraRoute for type-safe route handling
 * @param route - The infrastructure route path
 * @param params - Optional object containing route parameters where keys are path parameters and values are strings or null
 * @param query - Optional query string to append to the URL (defaults to empty string)
 * @returns Full infrastructure path string with prefix, generated path, and query
 */
export const infraMfePrefix = "/infrastructure/";
export const adminMfePrefix = "/admin/";
export const appOrchMfePrefix = "/applications/";
export const getInfraPath = <Path extends InfraRoute>(
  route: Path,
  params?: {
    [key in PathParam<Path>]: string | null;
  },
  query: string = "",
): string => `${infraMfePrefix + generatePath<Path>(route, params) + query}`;

export const getAdminPath = <Path extends AdminRoute>(
  route: Path,
  params?: {
    [key in PathParam<Path>]: string | null;
  },
  query: string = "",
): string => `${adminMfePrefix + generatePath<Path>(route, params) + query}`;

export const getAppOrchPath = <Path extends AppOrchRoute>(
  route: Path,
  params?: {
    [key in PathParam<Path>]: string | null;
  },
  query: string = "",
): string => `${appOrchMfePrefix + generatePath<Path>(route, params) + query}`;
