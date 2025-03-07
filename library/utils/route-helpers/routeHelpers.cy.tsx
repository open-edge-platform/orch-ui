/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { createRef } from "react";
import { Location } from "react-router-dom";
import {
  getChildRoute,
  mapChildRoutes,
  RouteObjectWithRef,
} from "./routeHelpers";

describe("The routeHelpers", () => {
  const routes: RouteObjectWithRef[] = [
    {
      path: "/foo",
      element: <div />,
      nodeRef: createRef(),
    },
    {
      path: "/bar",
      element: <div />,
      nodeRef: createRef(),
    },
  ];
  it("should match a child route", () => {
    const matched = getChildRoute(
      { pathname: "/prefix/bar" } as Location,
      routes,
    );
    expect(matched.path).to.equal("/bar");
  });
  it("should remove nodeRef from a list of routes", () => {
    const mapped = mapChildRoutes(routes);
    mapped.forEach((m) => {
      expect(m).not.to.haveOwnProperty("nodeRef");
    });
  });
});
