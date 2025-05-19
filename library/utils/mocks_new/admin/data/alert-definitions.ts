/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import {
  alertDefinitionEightId,
  alertDefinitionFiveId,
  alertDefinitionFourId,
  alertDefinitionNineId,
  alertDefinitionOneId,
  alertDefinitionSevenId,
  alertDefinitionSixId,
  alertDefinitionTenId,
  alertDefinitionThreeId,
  alertDefinitionTwoId,
} from "./ids/alert-definitions";

// Generate alert definitions using the helper function
export const alertDefinitionOne = generateAlertDefinition(
  alertDefinitionOneId,
  "HostConnectionLost",
);

export const alertDefinitionTwo = generateAlertDefinition(
  alertDefinitionTwoId,
  "HostError",
);

export const alertDefinitionThree = generateAlertDefinition(
  alertDefinitionThreeId,
  "HostCPUUsage",
);

export const alertDefinitionFour = generateAlertDefinition(
  alertDefinitionFourId,
  "HostRAMUsage",
  "new",
);

export const alertDefinitionFive = generateAlertDefinition(
  alertDefinitionFiveId,
  "DeploymentDown",
);

export const alertDefinitionSix = generateAlertDefinition(
  alertDefinitionSixId,
  "DeploymentError",
);

export const alertDefinitionSeven = generateAlertDefinition(
  alertDefinitionSevenId,
  "ClusterDown",
  "new",
);

export const alertDefinitionEight = generateAlertDefinition(
  alertDefinitionEightId,
  "ClusterError",
);

export const alertDefinitionNine = generateAlertDefinition(
  alertDefinitionNineId,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

export const alertDefinitionTen = generateAlertDefinition(
  alertDefinitionTenId,
  "ClusterRAMUsage",
);
