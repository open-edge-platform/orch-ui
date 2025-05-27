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
 * @param rest - Additional optional properties to include in the alert definition
 * @returns An object conforming to the omApi.AlertDefinition interface
 */
export const generateAlertDefinition = (
  id: AlertDefinitionId,
  name: string,
  rest?: Partial<Omit<omApi.AlertDefinition, "id" | "name">>,
): omApi.AlertDefinition => ({
  id,
  name,
  state: "applied",
  values: { threshold: "30", duration: "30s" },
  ...rest,
});

/**
 * Generates a mock alert object for testing purposes
 *
 * @param alertDefinitionId - ID of the alert definition this alert is based on
 * @param labels - Labels associated with the alert providing context information
 * @param rest - Additional optional properties to include in the alert
 * @returns An object conforming to the omApi.Alert interface
 */
export const generateAlert = (
  alertDefinitionId: string,
  labels: Record<string, string>,
  rest?: Partial<Omit<omApi.Alert, "alertDefinitionId" | "labels">>,
): omApi.Alert => ({
  alertDefinitionId,
  labels,
  status: { state: "active" },
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  annotations: { description: "accumsan ante sagittis ege" },
  fingerprint: "fingerprint",
  ...rest,
});
