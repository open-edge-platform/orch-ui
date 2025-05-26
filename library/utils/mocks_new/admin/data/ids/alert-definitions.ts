/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export const AlertDefinitionIds = {
  // Host alerts
  HOST_CONNECTION_LOST: "Host-ConnectionLost-ID",
  HOST_ERROR: "Host-Error-ID",
  HOST_CPU_USAGE: "Host-CPU-Usage-ID",
  HOST_RAM_USAGE: "Host-RAM-Usage-ID",

  // Deployment alerts
  DEPLOYMENT_DOWN: "Deployment-Down-ID",
  DEPLOYMENT_ERROR: "Deployment-Error-ID",

  // Cluster alerts
  CLUSTER_DOWN: "Cluster-Down-ID",
  CLUSTER_ERROR: "Cluster-Error-ID",
  CLUSTER_CPU_USAGE: "Cluster-CPU-Usage-ID",
  CLUSTER_RAM_USAGE: "Cluster-RAM-Usage-ID",
} as const;

export type AlertDefinitionId =
  (typeof AlertDefinitionIds)[keyof typeof AlertDefinitionIds];
