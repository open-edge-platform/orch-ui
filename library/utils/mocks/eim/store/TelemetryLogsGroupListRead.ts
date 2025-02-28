/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
} from "../data";
import { BaseStore } from "./baseStore";

const TelemetryLogsGroups: eim.TelemetryLogsGroupRead[] = [
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
];

export const telemetryLogsGroupList: eim.TelemetryLogsGroupListRead = {
  TelemetryLogsGroups,
  hasNext: true,
  totalElements: TelemetryLogsGroups.length,
};

export class TelemetryLogsGroupListStore extends BaseStore<
  "telemetryLogsGroupId",
  eim.TelemetryLogsGroupRead
> {
  constructor() {
    super("telemetryLogsGroupId", TelemetryLogsGroups);
  }

  convert(body: eim.TelemetryLogsGroupRead): eim.TelemetryLogsGroupRead {
    return body;
  }
}
