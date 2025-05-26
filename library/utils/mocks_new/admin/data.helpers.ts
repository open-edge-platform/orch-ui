/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { AlertDefinition } from "./data/ids/alert-definitions";

/**
 * Generates a mock alert definition object for testing purposes
 *
 * @param id - Unique identifier for the alert definition
 * @param name - Display name of the alert definition
 * @param state - Current state of the alert definition
 * @param values - Configuration values for the alert definition, including threshold and duration
 * @returns An object conforming to the omApi.AlertDefinition interface
 */
export const generateAlertDefinition = (
  id: AlertDefinition,
  name: string,
  state: omApi.StateDefinition = "applied",
  values: Record<string, string> = { threshold: "30", duration: "30s" },
): omApi.AlertDefinition => ({
  id,
  name,
  state,
  values,
});
