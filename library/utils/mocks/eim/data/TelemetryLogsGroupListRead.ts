/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../store/baseStore";
import {
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
} from "./TelemetryLogsGroupRead";

export const telemetryLogsGroupList1: eim.TelemetryLogsGroupList = {
  TelemetryLogsGroups: [
    telemetryLogsGroup1,
    telemetryLogsGroup2,
    telemetryLogsGroup3,
  ],
  hasNext: "true",
};

export class TelemetryLogsGroupListStore extends BaseStore<
  "telemetryLogsGroupId",
  eim.TelemetryLogsGroupRead
> {
  constructor() {
    super("telemetryLogsGroupId", [
      telemetryLogsGroup1,
      telemetryLogsGroup2,
      telemetryLogsGroup3,
    ]);
  }

  convert(body: eim.TelemetryLogsGroupRead): eim.TelemetryLogsGroupRead {
    return body;
  }
}
