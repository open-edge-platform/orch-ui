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
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import ClusterCreation from "../components/pages/ClusterCreation/ClusterCreation";
import ClusterDetail from "../components/pages/ClusterDetail/ClusterDetail";
import ClusterEdit from "../components/pages/ClusterEdit/ClusterEdit";
import ClusterManagement from "../components/pages/ClusterManagement";
import ClusterTemplateDetails from "../components/pages/ClusterTemplateDetails/ClusterTemplateDetails";
import ClusterTemplates from "../components/pages/ClusterTemplates/ClusterTemplates";

const Admin = RuntimeConfig.isEnabled("ADMIN")
  ? React.lazy(async () => await import("Admin/App"))
  : null;

export const childRoutes: RouteObject[] = [
  {
    path: "",
    element: (
      <RBACWrapper
        showTo={[Role.CLUSTERS_WRITE, Role.CLUSTER_TEMPLATES_READ]}
        missingRoleContent={<PermissionDenied />}
      >
        <ClusterManagement />
      </RBACWrapper>
    ),
  },
  {
    path: "cluster-templates",
    element: (
      <RBACWrapper
        showTo={[Role.CLUSTER_TEMPLATES_READ, Role.CLUSTER_TEMPLATES_WRITE]}
        missingRoleContent={<PermissionDenied />}
      >
        <ClusterTemplates />
      </RBACWrapper>
    ),
  },
  {
    path: "cluster-templates/:templateName/:templateVersion/view",
    element: (
      <RBACWrapper
        showTo={[Role.CLUSTER_TEMPLATES_READ, Role.CLUSTER_TEMPLATES_WRITE]}
        missingRoleContent={<PermissionDenied />}
      >
        <ClusterTemplateDetails />
      </RBACWrapper>
    ),
  },
  {
    path: "clusters",
    element: (
      <RBACWrapper
        showTo={[Role.CLUSTERS_WRITE, Role.CLUSTER_TEMPLATES_READ]}
        missingRoleContent={<PermissionDenied />}
      >
        <ClusterManagement />
      </RBACWrapper>
    ),
  },
  { path: "cluster/:clusterName", element: <ClusterDetail /> },
  { path: "cluster/:clusterName/edit", element: <ClusterEdit /> },

  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "clusters/create",
    element: <ClusterCreation />,
  },
  {
    path: "admin/*",
    element: (
      <Suspense fallback={<SquareSpinner message="One moment..." />}>
        {Admin !== null ? <Admin /> : "Administration disabled"}
      </Suspense>
    ),
  },
];
