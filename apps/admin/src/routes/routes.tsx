/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PageNotFound,
  PermissionDenied,
  RBACWrapper,
} from "@orch-ui/components";
import {
  hasRole,
  mapChildRoutes,
  Role,
  RouteObjectWithRef,
  RuntimeConfig,
} from "@orch-ui/utils";
import React, { ComponentType, createRef, LazyExoticComponent } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import About from "../components/pages/About/About";
import AlertDefinitions from "../components/pages/AlertDefinitions/AlertDefinitions";
import Alerts from "../components/pages/Alerts/Alerts";
import Projects from "../components/pages/Projects/Projects";
import SshKeys from "../components/pages/SshKeys/SshKeys";
import Layout from "../components/templates/Layout";

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;

let ClusterTemplates: RemoteComponent = null;
let ClusterTemplateDetails: RemoteComponent = null;
let OSProfiles: RemoteComponent = null;

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  ClusterTemplates = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplates"),
  );
  ClusterTemplateDetails = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplateDetails"),
  );
}

if (RuntimeConfig.isEnabled("INFRA")) {
  OSProfiles = React.lazy(async () => await import("EimUI/OSProfiles"));
}

const isProjectAdmin = hasRole([
  Role.PROJECT_READ,
  Role.PROJECT_WRITE,
  Role.PROJECT_UPDATE,
  Role.PROJECT_DELETE,
]);

const hasAlertPermission = hasRole([Role.ALERTS_READ, Role.ALERTS_WRITE]);

const hasClusterPermission = hasRole([
  Role.CLUSTER_TEMPLATES_READ,
  Role.CLUSTER_TEMPLATES_WRITE,
]);

const hasInfraPermission = hasRole([
  Role.INFRA_MANAGER_READ,
  Role.INFRA_MANAGER_WRITE,
]);

const getHomeRoute = () => {
  if (isProjectAdmin) {
    return "/admin/projects";
  }

  if (hasAlertPermission) {
    return "/admin/alert-definitions";
  }

  if (hasClusterPermission) {
    return "/admin/cluster-templates";
  }

  if (OSProfiles && hasInfraPermission) {
    return "/admin/os-profiles";
  }

  return "/admin/about";
};

// user with different roles have a different home page,
// this component is responsible for redirecting the user to the correct home page
const redirectToHome = <Navigate to={getHomeRoute()} replace={true} />;

export const childRoutes = [
  {
    path: "projects",
    // NOTE we don't do RBAC on the project page as even if the user doesn't have
    // permission to manage projects they should still be able to see the access the page (which renders a modal with instructions)
    element: <Projects />,
  },
  {
    path: "alert-definitions",
    element: (
      <RBACWrapper
        showTo={[Role.ALERTS_READ, Role.ALERTS_WRITE]}
        missingRoleContent={<PermissionDenied />}
      >
        <AlertDefinitions />
      </RBACWrapper>
    ),
  },
  {
    path: "ssh-keys",
    element: (
      <RBACWrapper
        showTo={[Role.INFRA_MANAGER_WRITE, Role.INFRA_MANAGER_READ]}
        missingRoleContent={<PermissionDenied />}
      >
        <SshKeys />
      </RBACWrapper>
    ),
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "*",
    element: <PageNotFound />,
    nodeRef: createRef(),
  },
  {
    path: "",
    element: redirectToHome,
    nodeRef: createRef(),
  },
];

// Adds a ref property to help with page transitions in <Layout />
export const childRoutesWithRef: RouteObjectWithRef[] = childRoutes.map(
  (route) => ({
    ...route,
    nodeRef: createRef(),
  }),
);

const addClusterRoute = (path: string, Element: RemoteComponent) => {
  if (Element)
    childRoutes.push({
      path,
      element: (
        <RBACWrapper
          showTo={[Role.CLUSTER_TEMPLATES_READ, Role.CLUSTER_TEMPLATES_WRITE]}
          missingRoleContent={<PermissionDenied />}
        >
          <Element />
        </RBACWrapper>
      ),
    });
};

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  addClusterRoute("cluster-templates", ClusterTemplates);
  addClusterRoute(
    "cluster-templates/:templateName/:templateVersion/view",
    ClusterTemplateDetails,
  );
}

if (RuntimeConfig.isEnabled("INFRA")) {
  if (OSProfiles) {
    childRoutes.push({
      path: "os-profiles",
      element: <OSProfiles />,
    });
  }
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: mapChildRoutes(childRoutes),
  },
  {
    path: "alerts",
    element: (
      <RBACWrapper
        showTo={[Role.ALERTS_READ, Role.ALERTS_WRITE]}
        missingRoleContent={<PermissionDenied />}
      >
        <Alerts />
      </RBACWrapper>
    ),
  },
];

export default routes;
