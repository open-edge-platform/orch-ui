/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { telemetryMetricsGroup1 } from "../data";
import { BaseStore } from "./baseStore";

export const TelemetryMetricsProfile1: infra.TelemetryMetricsProfileResourceRead =
  {
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
  infra.TelemetryMetricsProfileResourceRead,
  infra.TelemetryMetricsProfileResource
> {
  convert(
    body: infra.TelemetryMetricsProfileResource,
    id?: string | undefined,
  ): infra.TelemetryMetricsProfileResourceRead {
    return {
      ...body,
      profileId: id,
      metricsGroup: {
        collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
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
    body: infra.TelemetryMetricsProfileResource,
  ): infra.TelemetryMetricsProfileResourceRead {
    const id = index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
