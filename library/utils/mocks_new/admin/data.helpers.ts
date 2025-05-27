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
 * @param state - Current state of the alert definition
 * @param values - Configuration values for the alert definition, including threshold and duration
 * @param rest - Additional optional properties to include in the alert definition
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

/**
 * Generates a mock alert object for testing purposes
 *
 * @param alertDefinitionId - ID of the alert definition this alert is based on
 * @param labels - Labels associated with the alert providing context information
 * @param status - Current status of the alert
 * @param timeInfo - Object containing timing information for the alert
 * @param annotations - Additional annotations for the alert
 * @param fingerprint - Unique fingerprint for the alert
 * @param rest - Additional optional properties to include in the alert
 * @returns An object conforming to the omApi.Alert interface
 */
export const generateAlert = (
  alertDefinitionId: string,
  labels: Record<string, string>,
  status: omApi.Alert["status"] = { state: "active" },
  timeInfo: {
    startsAt?: string;
    updatedAt?: string;
    endsAt?: string;
  } = {
    startsAt: "2023-07-08 11:30",
    updatedAt: "2023-07-08 12:30",
    endsAt: "2023-07-08 13:30",
  },
  annotations: Record<string, string> = {
    description: "accumsan ante sagittis ege",
  },
  fingerprint: string = "fingerprint",
  rest?: Partial<
    Omit<
      omApi.Alert,
      | "alertDefinitionId"
      | "status"
      | "labels"
      | "startsAt"
      | "updatedAt"
      | "endsAt"
      | "annotations"
      | "fingerprint"
    >
  >,
): omApi.Alert => ({
  alertDefinitionId,
  startsAt: timeInfo.startsAt,
  updatedAt: timeInfo.updatedAt,
  endsAt: timeInfo.endsAt,
  status,
  fingerprint,
  labels,
  annotations,
  ...rest,
});
