/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageNotFound, SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import React, { Suspense } from "react";
import DeploymentPackageImportFromHelmChart from "src/components/pages/DeploymentPackageImportFromHelmChart/DeploymentPackageImportFromHelmChart";
import DashboardDeploymentsStatus from "../components/organisms/deployments/DashboardDeploymentsStatus/DashboardDeploymentsStatus";
import ApplicationCreateEdit from "../components/pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ApplicationDetails from "../components/pages/ApplicationDetails/ApplicationDetails";
import Applications from "../components/pages/Applications/Applications";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import DeploymentDetails from "../components/pages/DeploymentDetails/DeploymentDetails";
import DeploymentInstanceDetail from "../components/pages/DeploymentInstanceDetails/DeploymentInstanceDetail";
import DeploymentPackageClone from "../components/pages/DeploymentPackageClone/DeploymentPackageClone";
import DeploymentPackageCreate from "../components/pages/DeploymentPackageCreate/DeploymentPackageCreate";
import DeploymentPackageDetails from "../components/pages/DeploymentPackageDetails/DeploymentPackageDetails";
import DeploymentPackageEdit from "../components/pages/DeploymentPackageEdit/DeploymentPackageEdit";
import DeploymentPackageImport from "../components/pages/DeploymentPackageImport/DeploymentPackageImport";
import DeploymentPackages from "../components/pages/DeploymentPackages/DeploymentPackages";
import Deployments from "../components/pages/Deployments/Deployments";
import EditDeployment from "../components/pages/EditDeployment/EditDeployment";
import SetupDeployment from "../components/pages/SetupDeployment/SetupDeployment";

const Admin =
  RuntimeConfig.isEnabled("ADMIN") &&
  window?.Cypress?.testingType !== "component"
    ? React.lazy(async () => await import("Admin/App"))
    : null;

export const childRoutes = [
  {
    path: "",
    element: <Deployments />,
  },
  {
    path: "packages",
    element: <DeploymentPackages />,
  },
  {
    path: "packages/create",
    element: <DeploymentPackageCreate />,
  },
  {
    path: "packages/import-from-helm-chart",
    element: <DeploymentPackageImportFromHelmChart />,
  },
  {
    path: "packages/import",
    element: <DeploymentPackageImport />,
  },
  {
    path: "packages/edit/:appName/version/:version",
    element: <DeploymentPackageEdit />,
  },
  {
    path: "packages/clone/:appName/version/:version",
    element: <DeploymentPackageClone />,
  },
  {
    path: "applications/add",
    element: <ApplicationCreateEdit />,
  },
  {
    path: "applications/*",
    element: <Applications />,
  },
  {
    path: "applications/edit/:appName/version/:version",
    element: <ApplicationCreateEdit />,
  },
  {
    path: "package/:appName/version/:version",
    element: <DeploymentPackageDetails />,
  },
  {
    path: "package/deploy/:appName/version/:version",
    element: <SetupDeployment />,
  },
  {
    path: "application/:appName/version/:version",
    element: <ApplicationDetails />,
  },
  {
    path: "deployments",
    element: <Deployments />,
  },
  {
    path: "deployments/setup-deployment",
    element: <SetupDeployment />,
  },
  {
    path: "deployment/:id",
    element: <DeploymentDetails />,
  },
  {
    path: "deployment/:id/edit",
    element: <EditDeployment />,
  },
  {
    path: "deployment/:deplId/cluster/:name",
    element: <DeploymentInstanceDetail />,
  },
  // DEBUG Route: This path is not on the UI but can be used to test out the
  // dashboard component in isolation.
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "deployment-status",
    element: <DashboardDeploymentsStatus />,
  },
  {
    path: "admin/*",
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
