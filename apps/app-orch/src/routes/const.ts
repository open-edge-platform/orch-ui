/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CollapsableListItem } from "@orch-ui/components";

export const homeBreadcrumb = {
  text: "Home",
  link: "/dashboard",
};
export const appOrchestrationBreadcrumb = {
  text: "App Orchestration",
  link: "/applications",
};

export interface BreadcrumbItem {
  text: string;
  link: string;
}

export const getBreadcrumbItem = (
  text: string,
  link: string,
): BreadcrumbItem => ({
  text,
  link,
});

export const deploymentPackageBreadcrumb = getBreadcrumbItem(
  "Package",
  "/applications/packages",
);
export const cloneDeploymentPackageBreadcrumb = getBreadcrumbItem(
  "Clone Deployment Package",
  "/applications/packages/clone",
);
export const createDeploymentPackageBreadcrumb = getBreadcrumbItem(
  "Create Deployment Package",
  "/applications/packages/create",
);
export const editDeploymentPackageBreadcrumb = getBreadcrumbItem(
  "Edit Deployment Package",
  "/applications/packages/edit",
);
export const importDeploymentPackageBreadcrumb = getBreadcrumbItem(
  "Import Deployment Package",
  "/applications/packages/import",
);
export const deployDeploymentPackageBreadcrumb = getBreadcrumbItem(
  "Deploy Deployment Package",
  "/applications/packages/deploy",
);
export const applicationBreadcrumb = getBreadcrumbItem(
  "Applications",
  "/applications/applications",
);
export const addApplicationBreadcrumb = getBreadcrumbItem(
  "Add Application",
  "/applications/applications/add",
);
export const editApplicationBreadcrumb = getBreadcrumbItem(
  "Edit Application",
  "/applications/applications/edit",
);
export const deploymentBreadcrumb = getBreadcrumbItem(
  "Deployments",
  "/applications/deployments",
);
export const createDeploymentBreadcrumb = getBreadcrumbItem(
  "Setup a Deployment",
  "/applications/deployments/setup-deployment",
);

export const deploymentDetailsSitesBreadcrumb = (
  deploymentName: string,
  deploymentId: string,
) => ({
  text: deploymentName,
  link: `/applications/deployment/${deploymentId}`,
});

export const deploymentsNavItem: CollapsableListItem<string> = {
  route: "deployments",
  icon: "pulse",
  value: "Deployments",
  divider: true,
};

export const packagesNavItem: CollapsableListItem<string> = {
  route: "packages",
  icon: "cube-detached",
  value: "Deployment Packages",
};

export const applicationsNavItem: CollapsableListItem<string> = {
  route: "applications/apps",
  icon: "cube-detached",
  value: "Applications",
  divider: true,
};

export const menuItems: CollapsableListItem<string>[] = [
  deploymentsNavItem,
  packagesNavItem,
  applicationsNavItem,
];
