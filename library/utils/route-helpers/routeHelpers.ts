/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createRef } from "react";
import { Location, RouteObject } from "react-router-dom";

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
