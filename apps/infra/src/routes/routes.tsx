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
import { Role, RuntimeConfig } from "@orch-ui/utils";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import HostDetails from "../components/pages/HostDetails/HostDetails";
import Hosts from "../components/pages/Hosts/Hosts";
import RegionForm from "../components/pages/region/RegionForm";
import SiteForm from "../components/pages/site/SiteForm";
import {
  hostConfigureRoute,
  hostDetailsGuidRoute,
  hostDetailsRoute,
  hostsRoute,
  unassignedDetailsRoute,
  unconfiguredDetailsGuidRoute,
  unconfiguredDetailsRoute,
} from "./const";

import { BreadcrumbWrapper } from "../components/atom/BreadcrumbWrapper/BreadcrumbWrapper";
import { HostConfig } from "../components/pages/HostConfig/HostConfig";
import HostEdit from "../components/pages/HostEdit";
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

const Admin = RuntimeConfig.isEnabled("ADMIN")
  ? React.lazy(async () => await import("Admin/App"))
  : null;

export const createChildRoutes = () => {
  const routes: RouteObject[] = [];

  routes.push(
    {
      path: "",
      element: <Navigate to={hostsRoute} replace />,
    },
    {
      path: "regions/:regionId",
      element: <RegionForm />,
    },
    {
      path: "regions/parent/:parentRegionId/:regionId",
      element: <RegionForm />,
    },
    {
      path: "regions/:regionId/sites/:siteId",
      element: <SiteForm />,
    },
    {
      path: "sites/:siteId",
      element: <SiteForm />,
    },
    {
      path: "locations",
      element: <Locations />,
    },
    {
      path: hostsRoute,
      element: <Hosts />,
    },
    {
      path: `${hostsRoute}/set-up-provisioning`,
      element: <HostConfig />,
    },
    {
      path: "register-hosts",
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
      path: `${hostDetailsRoute}/edit`,
      element: <HostEdit />,
    },
    {
      path: `${unassignedDetailsRoute}/edit`,
      element: <HostEdit />,
    },
    {
      path: hostDetailsRoute,
      element: <HostDetails />,
    },
    {
      path: unassignedDetailsRoute,
      element: <HostDetails />,
    },
    {
      path: hostDetailsGuidRoute,
      element: <HostDetails />,
    },
    {
      path: unconfiguredDetailsRoute,
      element: <HostDetails />,
    },
    {
      path: unconfiguredDetailsGuidRoute,
      element: <HostDetails />,
    },
    {
      path: hostConfigureRoute,
      element: (
        <RBACWrapper
          showTo={[Role.INFRA_MANAGER_WRITE]}
          missingRoleContent={<PermissionDenied />}
        >
          <HostConfig />
        </RBACWrapper>
      ),
    },
    {
      path: "/admin/*",
      element: (
        <RBACWrapper
          showTo={[Role.ALERTS_READ, Role.ALERTS_WRITE]}
          missingRoleContent={<PermissionDenied />}
        >
          <Suspense fallback={<SquareSpinner message="One moment..." />}>
            {Admin !== null ? <Admin /> : "Administration disabled"}
          </Suspense>
        </RBACWrapper>
      ),
    },
  );

  routes.push({
    path: "*",
    element: <PageNotFound />,
  });

  return routes;
};
const routes = createChildRoutes();

const addClusterRoute = (path: string, subComponent: RemoteComponent) => {
  if (subComponent)
    routes.push({
      path,
      element: <BreadcrumbWrapper subComponent={subComponent} />,
    });
};

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  addClusterRoute("clusters", ClusterManagement);
  addClusterRoute("cluster/:clusterName", ClusterDetail);
  addClusterRoute("cluster/:clusterName/edit", ClusterEdit);
  addClusterRoute("clusters/create", ClusterCreation);
}

export const childRoutes = routes;
