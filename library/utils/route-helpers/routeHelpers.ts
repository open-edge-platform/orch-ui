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
import { infraMfePrefix, InfraRoute } from "./paths";

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

export const getInfraPath = (
  route: InfraRoute,
  params?: {
    [key in PathParam<InfraRoute>]: string | null;
  },
): string => `${infraMfePrefix + generatePath(route, params ?? {})}`;
