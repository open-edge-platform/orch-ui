/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";

export const telemetryLogsGroup1: eim.TelemetryLogsGroupRead = {
  telemetryLogsGroupId: "telemetryLogGroup1",
  name: "Fleet Agent",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
  groups: ["lpke", "HW agent", "Cluster agent"],
};

export const telemetryLogsGroup2: eim.TelemetryLogsGroupRead = {
  telemetryLogsGroupId: "telemetryLogGroup2",
  name: "Security",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["agent-status", "vault-status"],
};

export const telemetryLogsGroup3: eim.TelemetryLogsGroupRead = {
  telemetryLogsGroupId: "telemetryLogGroup3",
  name: "RKE",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["RKE Agent", "RKE Server"],
};
