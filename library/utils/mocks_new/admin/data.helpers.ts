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
  state?: omApi.StateDefinition,
  values?: Record<string, string>,
  rest?: Partial<
    Omit<omApi.AlertDefinition, "id" | "name" | "state" | "values">
  >,
): omApi.AlertDefinition => ({
  id,
  name,
  state: state ?? "applied",
  values: values ?? { threshold: "30", duration: "30s" },
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
  status?: omApi.Alert["status"],
  timeInfo?: {
    startsAt?: string;
    updatedAt?: string;
    endsAt?: string;
  },
  annotations?: Record<string, string>,
  fingerprint?: string,
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
  labels,
  status: status ?? { state: "active" },
  startsAt: timeInfo?.startsAt ?? "2023-07-08 11:30",
  updatedAt: timeInfo?.updatedAt ?? "2023-07-08 12:30",
  endsAt: timeInfo?.endsAt ?? "2023-07-08 13:30",
  annotations: annotations ?? { description: "accumsan ante sagittis ege" },
  fingerprint: fingerprint ?? "fingerprint",
  ...rest,
});
