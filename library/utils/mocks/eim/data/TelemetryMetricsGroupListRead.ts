/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../store/baseStore";
import {
  telemetryMetricsGroup1,
  telemetryMetricsGroup2,
  telemetryMetricsGroup3,
} from "./TelemetryMetricsGroupRead";

export const telemetryMetricsGroupList1: eim.TelemetryMetricsGroupList = {
  TelemetryMetricsGroups: [
    telemetryMetricsGroup1,
    telemetryMetricsGroup2,
    telemetryMetricsGroup3,
  ],
  hasNext: "true",
};

export class TelemetryMetricsGroupListStore extends BaseStore<
  "telemetryMetricsGroupId",
  eim.TelemetryMetricsGroupRead
> {
  constructor() {
    super("telemetryMetricsGroupId", [
      telemetryMetricsGroup1,
      telemetryMetricsGroup2,
      telemetryMetricsGroup3,
    ]);
  }
  convert(body: eim.TelemetryMetricsGroupRead): eim.TelemetryMetricsGroupRead {
    return body;
  }
}
