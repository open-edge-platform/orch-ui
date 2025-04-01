/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";

export const telemetryMetricsGroup1: eim.TelemetryMetricsGroupRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup1",
  name: "HW usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
  groups: ["cpu", "disk", "mem"],
};

export const telemetryMetricsGroup2: eim.TelemetryMetricsGroupRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup2",
  name: "Network usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["net", "netstat", "ethtool"],
};

export const telemetryMetricsGroup3: eim.TelemetryMetricsGroupRead = {
  telemetryMetricsGroupId: "telemetrymetricgroup3",
  name: "Power usage",
  collectorKind: "TELEMETRY_COLLECTOR_KIND_HOST",
  groups: ["Intel_Powerstat", "temp"],
};
