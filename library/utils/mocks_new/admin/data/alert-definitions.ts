/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import { AlertDefinitionIds } from "./ids/alert-definitions";

const hostConnectionLostAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CONNECTION_LOST,
  "HostConnectionLost",
);

const hostErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_ERROR,
  "HostError",
);

const hostCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CPU_USAGE,
  "HostCPUUsage",
);

const hostRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_RAM_USAGE,
  "HostRAMUsage",
  "new",
);

const deploymentDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_DOWN,
  "DeploymentDown",
);

const deploymentErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_ERROR,
  "DeploymentError",
);

const clusterDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_DOWN,
  "ClusterDown",
  "new",
);

const clusterErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_ERROR,
  "ClusterError",
);

const clusterCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_CPU_USAGE,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

const clusterRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_RAM_USAGE,
  "ClusterRAMUsage",
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
};
