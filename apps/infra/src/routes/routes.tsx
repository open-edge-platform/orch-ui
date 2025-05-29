/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PageNotFound,
  PermissionDenied,
  RBACWrapper,
  SquareSpinner,
} from "@orch-ui/components";
import {
  clusterCreateRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterManagementRoute,
  hostDetailsRoute,
  hostEditRoute,
  hostProvisioningRoute,
  hostProvisionRoute,
  hostRegisterRoute,
  hostsRoute,
  locationRoute,
  regionRoute,
  regionSiteRoute,
  Role,
  RuntimeConfig,
  siteRoute,
  subRegionRoute,
} from "@orch-ui/utils";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import HostDetails from "../components/pages/HostDetails/HostDetails";
import Hosts from "../components/pages/Hosts/Hosts";
import RegionForm from "../components/pages/region/RegionForm";
import SiteForm from "../components/pages/site/SiteForm";

import { HostConfig } from "../components/pages/HostConfig/HostConfig";
import HostEdit from "../components/pages/HostEdit";
import HostProvision from "../components/pages/HostProvision/HostProvision";
import { Locations } from "../components/pages/Locations/Locations";
import RegisterHosts from "../components/pages/RegisterHosts/RegisterHosts";

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;

let ClusterManagement: RemoteComponent = null,
  ClusterCreation: RemoteComponent = null,
  ClusterDetail: RemoteComponent = null,
  ClusterEdit: RemoteComponent = null;

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  ClusterManagement = React.lazy(
    async () => await import("ClusterOrchUI/ClusterManagement"),
  );
  ClusterCreation = React.lazy(
    async () => await import("ClusterOrchUI/ClusterCreation"),
  );
  ClusterDetail = React.lazy(
    async () => await import("ClusterOrchUI/ClusterDetail"),
  );
  ClusterEdit = React.lazy(
    async () => await import("ClusterOrchUI/ClusterEdit"),
  );
}

export const createChildRoutes = () => {
  const routes: RouteObject[] = [];

  routes.push(
    {
      path: "",
      element: <Navigate to={hostsRoute} replace />,
    },
    {
      path: regionRoute,
      element: <RegionForm />,
    },
    {
      path: subRegionRoute,
      element: <RegionForm />,
    },
    {
      path: regionSiteRoute,
      element: <SiteForm />,
    },
    {
      path: siteRoute,
      element: <SiteForm />,
    },
    {
      path: locationRoute,
      element: <Locations />,
    },
    {
      path: hostsRoute,
      element: <Hosts />,
    },
    {
      path: hostProvisioningRoute,
      element: <HostConfig />,
    },
    {
      path: hostProvisionRoute,
      element: <HostProvision />,
    },
    {
      path: hostRegisterRoute,
      element: (
        <RBACWrapper
          showTo={[Role.INFRA_MANAGER_WRITE]}
          missingRoleContent={<PermissionDenied />}
        >
          <RegisterHosts />
        </RBACWrapper>
      ),
    },
    {
      path: hostEditRoute,
      element: <HostEdit />,
    },
    {
      path: hostDetailsRoute,
      element: <HostDetails />,
    },
  );

  routes.push({
    path: "*",
    element: <PageNotFound />,
  });

  return routes;
};
const routes = createChildRoutes();

const addClusterRoute = (path: string, SubComponent: RemoteComponent) => {
  if (SubComponent)
    routes.push({
      path,
      element: (
        <Suspense fallback={<SquareSpinner message="One moment..." />}>
          <SubComponent />
        </Suspense>
      ),
    });
};

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  addClusterRoute(clusterManagementRoute, ClusterManagement);
  addClusterRoute(clusterDetailRoute, ClusterDetail);
  addClusterRoute(clusterEditRoute, ClusterEdit);
  addClusterRoute(clusterCreateRoute, ClusterCreation);
}

export const childRoutes = routes;
