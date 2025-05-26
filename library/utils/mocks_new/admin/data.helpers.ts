/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { AlertDefinitionId } from "./data/ids/alert-definitions";

/**
 * Generates a mock alert definition object for testing purposes
 *
 * @param id - Unique identifier for the alert definition
 * @param name - Display name of the alert definition
 * @param state - Current state of the alert definition (defaults to "applied")
 * @param values - Configuration values for the alert definition, including threshold and duration (defaults to {threshold: "30", duration: "30s"})
 * @param rest - Additional properties to include in the alert definition (optional)
 * @returns An object conforming to the omApi.AlertDefinition interface
 */
export const generateAlertDefinition = (
  id: AlertDefinitionId,
  name: string,
  state: omApi.StateDefinition = "applied",
  values: Record<string, string> = { threshold: "30", duration: "30s" },
  rest?: Partial<
    Omit<omApi.AlertDefinition, "id" | "name" | "state" | "values">
  >,
): omApi.AlertDefinition => ({
  id,
  name,
  state,
  values,
  ...rest,
});
