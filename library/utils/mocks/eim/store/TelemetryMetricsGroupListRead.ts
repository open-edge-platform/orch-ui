/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
} from "../data/telemetryMetrics";
import { BaseStore } from "./baseStore";

const TelemetryMetricsGroups: eim.TelemetryMetricsGroupRead[] = [
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
];

export const telemetryMetricsGroupList: eim.TelemetryMetricsGroupListRead = {
  TelemetryMetricsGroups,
  hasNext: true,
  totalElements: TelemetryMetricsGroups.length,
};

export class TelemetryMetricsGroupListStore extends BaseStore<
  "telemetryMetricsGroupId",
  eim.TelemetryMetricsGroupRead
> {
  constructor() {
    super("telemetryMetricsGroupId", TelemetryMetricsGroups);
  }
  convert(body: eim.TelemetryMetricsGroupRead): eim.TelemetryMetricsGroupRead {
    return body;
  }
}
