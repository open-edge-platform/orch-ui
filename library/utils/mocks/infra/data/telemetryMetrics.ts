/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

export const telemetryMetricsGroup1: infra.TelemetryMetricsGroupResourceRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup1",
  name: "HW usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
  groups: ["cpu", "disk", "mem"],
};

export const telemetryMetricsGroup2: infra.TelemetryMetricsGroupResourceRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup2",
  name: "Network usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["net", "netstat", "ethtool"],
};

export const telemetryMetricsGroup3: infra.TelemetryMetricsGroupResourceRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup3",
  name: "Power usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["Intel_Powerstat", "temp"],
};
