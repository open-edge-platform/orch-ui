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
  clusterCreateRoute,
  clusterDetailRoute,
  clusterEditRoute,
  clusterManagementRoute,
  clusterTemplateDetailRoute,
  clusterTemplateRoute,
  Role,
} from "@orch-ui/utils";
import { RouteObject } from "react-router-dom";
import ClusterCreation from "../components/pages/ClusterCreation/ClusterCreation";
import ClusterDetail from "../components/pages/ClusterDetail/ClusterDetail";
import ClusterEdit from "../components/pages/ClusterEdit/ClusterEdit";
import ClusterManagement from "../components/pages/ClusterManagement";
import ClusterTemplateDetails from "../components/pages/ClusterTemplateDetails/ClusterTemplateDetails";
import ClusterTemplates from "../components/pages/ClusterTemplates/ClusterTemplates";

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
    path: clusterTemplateRoute,
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
    path: clusterTemplateDetailRoute,
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
    path: clusterManagementRoute,
    element: (
      <RBACWrapper
        showTo={[Role.CLUSTERS_WRITE, Role.CLUSTER_TEMPLATES_READ]}
        missingRoleContent={<PermissionDenied />}
      >
        <ClusterManagement />
      </RBACWrapper>
    ),
  },
  { path: clusterDetailRoute, element: <ClusterDetail /> },
  { path: clusterEditRoute, element: <ClusterEdit /> },
  {
    path: clusterCreateRoute,
    element: <ClusterCreation />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
