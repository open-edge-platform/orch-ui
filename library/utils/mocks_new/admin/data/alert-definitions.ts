/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { generateAlertDefinition } from "../data.helpers";
import {
  ALERT_DEFINITION_EIGHT_ID,
  ALERT_DEFINITION_FIVE_ID,
  ALERT_DEFINITION_FOUR_ID,
  ALERT_DEFINITION_NINE_ID,
  ALERT_DEFINITION_ONE_ID,
  ALERT_DEFINITION_SEVEN_ID,
  ALERT_DEFINITION_SIX_ID,
  ALERT_DEFINITION_TEN_ID,
  ALERT_DEFINITION_THREE_ID,
  ALERT_DEFINITION_TWO_ID,
} from "./ids/alert-definitions";

// Generate alert definitions using the helper function
export const alertDefinitionOne = generateAlertDefinition(
  ALERT_DEFINITION_ONE_ID,
  "HostConnectionLost",
);

export const alertDefinitionTwo = generateAlertDefinition(
  ALERT_DEFINITION_TWO_ID,
  "HostError",
);

export const alertDefinitionThree = generateAlertDefinition(
  ALERT_DEFINITION_THREE_ID,
  "HostCPUUsage",
);

export const alertDefinitionFour = generateAlertDefinition(
  ALERT_DEFINITION_FOUR_ID,
  "HostRAMUsage",
  "new",
);

export const alertDefinitionFive = generateAlertDefinition(
  ALERT_DEFINITION_FIVE_ID,
  "DeploymentDown",
);

export const alertDefinitionSix = generateAlertDefinition(
  ALERT_DEFINITION_SIX_ID,
  "DeploymentError",
);

export const alertDefinitionSeven = generateAlertDefinition(
  ALERT_DEFINITION_SEVEN_ID,
  "ClusterDown",
  "new",
);

export const alertDefinitionEight = generateAlertDefinition(
  ALERT_DEFINITION_EIGHT_ID,
  "ClusterError",
);

export const alertDefinitionNine = generateAlertDefinition(
  ALERT_DEFINITION_NINE_ID,
  "ClusterCPUUsage",
  "applied",
  { threshold: "30", duration: "5m" },
);

export const alertDefinitionTen = generateAlertDefinition(
  ALERT_DEFINITION_TEN_ID,
  "ClusterRAMUsage",
);
