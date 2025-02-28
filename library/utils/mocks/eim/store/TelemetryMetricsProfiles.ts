/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { telemetryMetricsGroup1 } from "../data";
import { BaseStore } from "./baseStore";

export const TelemetryMetricsProfile1: eim.TelemetryMetricsProfileRead = {
  profileId: "tmprofile1",
  targetInstance: "tinstance",
  targetSite: "tsite",
  targetRegion: "tregion",
  metricsInterval: 30,
  metricsGroupId: "telemetrymetricgroup1",
  metricsGroup: telemetryMetricsGroup1,
};

let index = 0;
export class TelemetryMetricsProfilesStore extends BaseStore<
  "profileId",
  eim.TelemetryMetricsProfileRead,
  eim.TelemetryMetricsProfile
> {
  convert(
    body: eim.TelemetryMetricsProfile,
    id?: string | undefined,
  ): eim.TelemetryMetricsProfileRead {
    return {
      ...body,
      profileId: id,
      metricsGroup: {
        collectorKind: "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED",
        groups: [],
        name: `metricgroup-${id}`,
      },
      timestamps: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }
  constructor() {
    super("profileId", [TelemetryMetricsProfile1]);
  }

  create(body: eim.TelemetryMetricsProfile): eim.TelemetryMetricsProfileRead {
    const id = index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
