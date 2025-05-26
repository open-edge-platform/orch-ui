/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import { AlertDefinitions } from "./ids/alert-definitions";

// Generate alert definitions using the helper function
export const alertDefinitionOne = generateAlertDefinition(
  AlertDefinitions.HOST_CONNECTION_LOST,
  "HostConnectionLost",
);

export const alertDefinitionTwo = generateAlertDefinition(
  AlertDefinitions.HOST_ERROR,
  "HostError",
);

export const alertDefinitionThree = generateAlertDefinition(
  AlertDefinitions.HOST_CPU_USAGE,
  "HostCPUUsage",
);

export const alertDefinitionFour = generateAlertDefinition(
  AlertDefinitions.HOST_RAM_USAGE,
  "HostRAMUsage",
  "new",
);

export const alertDefinitionFive = generateAlertDefinition(
  AlertDefinitions.DEPLOYMENT_DOWN,
  "DeploymentDown",
);

export const alertDefinitionSix = generateAlertDefinition(
  AlertDefinitions.DEPLOYMENT_ERROR,
  "DeploymentError",
);

export const alertDefinitionSeven = generateAlertDefinition(
  AlertDefinitions.CLUSTER_DOWN,
  "ClusterDown",
  "new",
);

export const alertDefinitionEight = generateAlertDefinition(
  AlertDefinitions.CLUSTER_ERROR,
  "ClusterError",
);

export const alertDefinitionNine = generateAlertDefinition(
  AlertDefinitions.CLUSTER_CPU_USAGE,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

export const alertDefinitionTen = generateAlertDefinition(
  AlertDefinitions.CLUSTER_RAM_USAGE,
  "ClusterRAMUsage",
);
