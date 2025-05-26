/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import { AlertDefinitionIds } from "./ids/alert-definitions";

export const hostConnectionLostAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CONNECTION_LOST,
  "HostConnectionLost",
);

export const hostErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_ERROR,
  "HostError",
);

export const hostCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_CPU_USAGE,
  "HostCPUUsage",
);

export const hostRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.HOST_RAM_USAGE,
  "HostRAMUsage",
  "new",
);

export const deploymentDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_DOWN,
  "DeploymentDown",
);

export const deploymentErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_ERROR,
  "DeploymentError",
);

export const clusterDownAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_DOWN,
  "ClusterDown",
  "new",
);

export const clusterErrorAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_ERROR,
  "ClusterError",
);

export const clusterCpuUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_CPU_USAGE,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

export const clusterRamUsageAlertDefinition = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_RAM_USAGE,
  "ClusterRAMUsage",
);
