/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
} from "../data/telemetryMetrics";
import { BaseStore } from "./baseStore";

const TelemetryMetricsGroups: infra.TelemetryMetricsGroupRead[] = [
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
];

export const telemetryMetricsGroupList: infra.TelemetryMetricsGroupListRead = {
  TelemetryMetricsGroups,
  hasNext: true,
  totalElements: TelemetryMetricsGroups.length,
};

export class TelemetryMetricsGroupListStore extends BaseStore<
  "telemetryMetricsGroupId",
  infra.TelemetryMetricsGroupRead
> {
  constructor() {
    super("telemetryMetricsGroupId", TelemetryMetricsGroups);
  }
  convert(
    body: infra.TelemetryMetricsGroupRead,
  ): infra.TelemetryMetricsGroupRead {
    return body;
  }
}
