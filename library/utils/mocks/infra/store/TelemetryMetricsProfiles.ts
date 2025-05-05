/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { telemetryMetricsGroup1 } from "../data";
import { BaseStore } from "./baseStore";

export const TelemetryMetricsProfile1: infra.TelemetryMetricsProfileRead = {
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
  infra.TelemetryMetricsProfileRead,
  infra.TelemetryMetricsProfile
> {
  convert(
    body: infra.TelemetryMetricsProfile,
    id?: string | undefined,
  ): infra.TelemetryMetricsProfileRead {
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

  create(
    body: infra.TelemetryMetricsProfile,
  ): infra.TelemetryMetricsProfileRead {
    const id = index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
