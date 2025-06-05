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

const telemetryLogsGroups: infra.TelemetryLogsGroupResourceRead[] = [
  telemetryLogsGroup1,
  telemetryLogsGroup2,
  telemetryLogsGroup3,
];

export const telemetryLogsGroupList: infra.ListTelemetryLogsGroupsResponse = {
  telemetryLogsGroups,
  hasNext: true,
  totalElements: telemetryLogsGroups.length,
};

export class TelemetryLogsGroupListStore extends BaseStore<
  "telemetryLogsGroupId",
  infra.TelemetryLogsGroupResourceRead
> {
  constructor() {
    super("telemetryLogsGroupId", telemetryLogsGroups);
  }

  convert(
    body: infra.TelemetryLogsGroupResourceRead,
  ): infra.TelemetryLogsGroupResourceRead {
    return body;
  }
}
