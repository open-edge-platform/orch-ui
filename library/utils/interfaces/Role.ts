/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Role {
  ALERTS_READ = "alrt-r",
  ALERTS_WRITE = "alrt-rw",
  AO_WRITE = "ao-rw",
  CATALOG_READ = "cat-r",
  CATALOG_WRITE = "cat-rw",
  CLUSTERS_READ = "cl-r",
  CLUSTERS_WRITE = "cl-rw",
  CLUSTER_TEMPLATES_READ = "cl-tpl-r",
  CLUSTER_TEMPLATES_WRITE = "cl-tpl-rw",
  INFRA_MANAGER_READ = "im-r",
  INFRA_MANAGER_WRITE = "im-rw",
  TELEMETRY_READ = "tc-r",
  PROJECT_READ = "project-read-role",
  PROJECT_WRITE = "project-write-role",
  PROJECT_UPDATE = "project-update-role",
  PROJECT_DELETE = "project-delete-role",
}
