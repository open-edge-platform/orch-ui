/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
} from "../data";
import { BaseStore } from "./baseStore";

const telemetryMetricsGroups: infra.TelemetryMetricsGroupResourceRead[] = [
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
];

export const telemetryMetricsGroupList: infra.ListTelemetryMetricsGroupsResponse =
  {
    telemetryMetricsGroups,
    hasNext: true,
    totalElements: telemetryMetricsGroups.length,
  };

export class TelemetryMetricsGroupListStore extends BaseStore<
  "telemetryMetricsGroupId",
  infra.TelemetryMetricsGroupResourceRead
> {
  constructor() {
    super("telemetryMetricsGroupId", telemetryMetricsGroups);
  }
  convert(
    body: infra.TelemetryMetricsGroupResourceRead,
  ): infra.TelemetryMetricsGroupResourceRead {
    return body;
  }
}
