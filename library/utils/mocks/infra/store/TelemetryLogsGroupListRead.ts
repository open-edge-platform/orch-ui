/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
} from "../data";
import { BaseStore } from "./baseStore";

const TelemetryLogsGroups: infra.TelemetryLogsGroupRead[] = [
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
];

export const telemetryLogsGroupList: infra.TelemetryLogsGroupListRead = {
  TelemetryLogsGroups,
  hasNext: true,
  totalElements: TelemetryLogsGroups.length,
};

export class TelemetryLogsGroupListStore extends BaseStore<
  "telemetryLogsGroupId",
  infra.TelemetryLogsGroupRead
> {
  constructor() {
    super("telemetryLogsGroupId", TelemetryLogsGroups);
  }

  convert(body: infra.TelemetryLogsGroupRead): infra.TelemetryLogsGroupRead {
    return body;
  }
}
