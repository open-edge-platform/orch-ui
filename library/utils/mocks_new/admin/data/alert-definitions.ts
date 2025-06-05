/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import { AlertDefinitionIds } from "./ids/alert-definitions";

const hostConnectionLostAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CONNECTION_LOST,
  "Host-ConnectionLost-ID",
);

const hostErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_ERROR,
  "Host-Error-ID",
);

const hostCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CPU_USAGE,
  "Host-CPU-Usage-ID",
);

const hostRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_RAM_USAGE,
  "Host-RAM-Usage-ID",
  { state: "new" },
);

const deploymentDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_DOWN,
  "Deployment-Down-ID",
);

const deploymentErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_ERROR,
  "Deployment-Error-ID",
);

const clusterDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_DOWN,
  "Cluster-Down-ID",
  { state: "new" },
);

const clusterErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_ERROR,
  "Cluster-Error-ID",
);

const clusterCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_CPU_USAGE,
  "Cluster-CPU-Usage-ID",
  { values: { threshold: "30", duration: "5m" } },
);

const clusterRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_RAM_USAGE,
  "Cluster-RAM-Usage-ID",
);

const clusterRamUsageAlertNoSourceDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_RAM_USAGE,
  "Cluster-RAM-Usage-ID",
);

export const alertDefinitionMocks = {
  hostConnectionLostAlertDefinition,
  hostErrorAlertDefinition,
  hostCpuUsageAlertDefinition,
  hostRamUsageAlertDefinition,
  deploymentDownAlertDefinition,
  deploymentErrorAlertDefinition,
  clusterDownAlertDefinition,
  clusterErrorAlertDefinition,
  clusterCpuUsageAlertDefinition,
  clusterRamUsageAlertDefinition,
  clusterRamUsageAlertNoSourceDefinition,
};
