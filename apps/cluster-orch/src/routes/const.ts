/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CollapsableListItem } from "@orch-ui/components";

export const homeBreadcrumb = {
  text: "Home",
  link: "/dashboard",
};

export const clustersBreadcrumb = {
  text: "Clusters",
  link: "../clusters",
};

export const clusterTemplatesBreadcrumb = {
  text: "Cluster Templates",
  link: "../cluster-templates",
};

export const clustersMenuItem: CollapsableListItem<string> = {
  route: "clusters",
  icon: "globe",
  value: "Clusters",
};

export const clusterTemplatesMenuItem: CollapsableListItem<string> = {
  route: "cluster-templates",
  icon: "globe",
  value: "Cluster Templates",
};

export const menuItems: CollapsableListItem<string>[] = [
  clustersMenuItem,
  clusterTemplatesMenuItem,
];
