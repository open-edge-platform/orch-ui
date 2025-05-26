/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import { AlertDefinitionIds } from "./ids/alert-definitions";

// Generate alert definitions using the helper function
export const alertDefinitionOne = generateAlertDefinition(
  AlertDefinitionIds.HOST_CONNECTION_LOST,
  "HostConnectionLost",
);

export const alertDefinitionTwo = generateAlertDefinition(
  AlertDefinitionIds.HOST_ERROR,
  "HostError",
);

export const alertDefinitionThree = generateAlertDefinition(
  AlertDefinitionIds.HOST_CPU_USAGE,
  "HostCPUUsage",
);

export const alertDefinitionFour = generateAlertDefinition(
  AlertDefinitionIds.HOST_RAM_USAGE,
  "HostRAMUsage",
  "new",
);

export const alertDefinitionFive = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_DOWN,
  "DeploymentDown",
);

export const alertDefinitionSix = generateAlertDefinition(
  AlertDefinitionIds.DEPLOYMENT_ERROR,
  "DeploymentError",
);

export const alertDefinitionSeven = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_DOWN,
  "ClusterDown",
  "new",
);

export const alertDefinitionEight = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_ERROR,
  "ClusterError",
);

export const alertDefinitionNine = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_CPU_USAGE,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

export const alertDefinitionTen = generateAlertDefinition(
  AlertDefinitionIds.CLUSTER_RAM_USAGE,
  "ClusterRAMUsage",
);
