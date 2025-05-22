/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { telemetryLogsGroup1 } from "../data";
import { BaseStore } from "./baseStore";

export const TelemetryLogsProfile1: infra.TelemetryLogsProfileResourceRead = {
  profileId: "tmprofile1",
  targetInstance: "tinstance",
  targetSite: "tsite",
  targetRegion: "tregion",
  logLevel: "SEVERITY_LEVEL_DEBUG",
  logsGroupId: "telemetryloggroup1",
  logsGroup: telemetryLogsGroup1,
};

export class TelemetryLogsProfilesStore extends BaseStore<
  "profileId",
  infra.TelemetryLogsProfileResourceRead,
  infra.TelemetryLogsProfileResource
> {
  index = 0;

  constructor() {
    super("profileId", [TelemetryLogsProfile1]);
  }

  convert(
    body: infra.TelemetryLogsProfileResource,
    id?: string | undefined,
  ): infra.TelemetryLogsProfileResourceRead {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      profileId: id,
      logsGroup: {
        collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
        groups: [],
        name: `loggroup-${id}`,
      },
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }

  create(
    body: infra.TelemetryLogsProfileResource,
  ): infra.TelemetryLogsProfileResourceRead {
    const id = this.index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
