/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthWrapper, PageNotFound, SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import ExtensionHandler from "../components/atoms/ExtensionHandler/ExtensionHandler";
import { DashboardSummaries } from "../components/pages/DashboardSummaries/DashboardSummaries";
import Layout from "../layouts/Layout";

const AppOrchUI = RuntimeConfig.isEnabled("APP_ORCH")
  ? React.lazy(async () => await import("AppOrchUI/App"))
  : null;
const ClusterOrchUI = RuntimeConfig.isEnabled("CLUSTER_ORCH")
  ? React.lazy(async () => await import("ClusterOrchUI/App"))
  : null;
const EimUI = RuntimeConfig.isEnabled("INFRA") 
  ? React.lazy(async () => await import("EimUI/App")) 
  : null;
const Admin = RuntimeConfig.isEnabled("ADMIN")
  ? React.lazy(async () => await import("Admin/App"))
  : null;

export const childRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthWrapper>
        <DashboardSummaries />
      </AuthWrapper>
    ),
  },
  {
    // NOTE if we need to support different types of detailed views
    // we might want to switch to query parameter like:
    // dashboard?deploymentId=<1234>
    // dashboard?siteId=<abcde>
    path: "dashboard/:deploymentId?",
    element: (
      <AuthWrapper>
        <DashboardSummaries />
      </AuthWrapper>
    ),
  },
  {
    path: "/extension/:id/*",
    element: <ExtensionHandler />,
  },
  {
    path: "/applications/*",
    element: (
      <Suspense fallback={<SquareSpinner message="One moment..." />}>
        {AppOrchUI !== null ? <AppOrchUI /> : "Applications disabled"}
      </Suspense>
    ),
  },
  {
    path: "/cluster-orch/*",
    element: (
      <Suspense fallback={<SquareSpinner message="One moment..." />}>
        {ClusterOrchUI !== null ? <ClusterOrchUI /> : "Cluster Orchestration disabled"}
      </Suspense>
    ),
  },
  {
    path: "/infrastructure/*",
    element: (
      <Suspense fallback={<SquareSpinner message="One moment..." />}>
        {EimUI !== null ? <EimUI /> : "Infrastructure disabled"}
      </Suspense>
    ),
  },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={<SquareSpinner message="One moment..." />}>
        {Admin !== null ? <Admin /> : "Administration disabled"}
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: childRoutes,
  },
];

export default routes;
