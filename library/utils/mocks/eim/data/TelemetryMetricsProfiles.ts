/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../store/baseStore";
import { telemetryMetricsGroup1 } from "./TelemetryMetricsGroupRead";

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
  eim.TelemetryMetricsProfileRead
> {
  convert(
    body: eim.TelemetryMetricsProfileRead,
    id?: string | undefined,
  ): eim.TelemetryMetricsProfileRead {
    return { profileId: id, ...body };
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
