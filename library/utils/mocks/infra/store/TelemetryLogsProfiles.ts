/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { telemetryLogsGroup1 } from "../data";
import { BaseStore } from "./baseStore";

export const TelemetryLogsProfile1: infra.TelemetryLogsProfileRead = {
  profileId: "tmprofile1",
  targetInstance: "tinstance",
  targetSite: "tsite",
  targetRegion: "tregion",
  logLevel: "TELEMETRY_SEVERITY_LEVEL_DEBUG",
  logsGroupId: "telemetryloggroup1",
  logsGroup: telemetryLogsGroup1,
};

export class TelemetryLogsProfilesStore extends BaseStore<
  "profileId",
  infra.TelemetryLogsProfileRead,
  infra.TelemetryLogsProfile
> {
  index = 0;

  constructor() {
    super("profileId", [TelemetryLogsProfile1]);
  }

  convert(
    body: infra.TelemetryLogsProfile,
    id?: string | undefined,
  ): infra.TelemetryLogsProfileRead {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      profileId: id,
      logsGroup: {
        collectorKind: "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED",
        groups: [],
        name: `loggroup-${id}`,
      },
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }

  create(body: infra.TelemetryLogsProfile): infra.TelemetryLogsProfileRead {
    const id = this.index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
