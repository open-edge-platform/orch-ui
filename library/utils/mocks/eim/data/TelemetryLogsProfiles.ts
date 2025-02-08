/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { BaseStore } from "../store/baseStore";
import { telemetryLogsGroup1 } from "./TelemetryLogsGroupRead";

export const TelemetryLogsProfile1: eim.TelemetryLogsProfileRead = {
  profileId: "tmprofile1",
  targetInstance: "tinstance",
  targetSite: "tsite",
  targetRegion: "tregion",
  logLevel: "TELEMETRY_SEVERITY_LEVEL_DEBUG",
  logsGroupId: "telemetryloggroup1",
  logsGroup: telemetryLogsGroup1,
};
let index = 0;
export class TelemetryLogsProfilesStore extends BaseStore<
  "profileId",
  eim.TelemetryLogsProfileRead
> {
  convert(
    body: eim.TelemetryLogsProfileRead,
    id?: string | undefined,
  ): eim.TelemetryLogsProfileRead {
    return { profileId: id, ...body };
  }
  constructor() {
    super("profileId", [TelemetryLogsProfile1]);
  }

  create(body: eim.TelemetryLogsProfile): eim.TelemetryLogsProfileRead {
    const id = index++;
    const pid = `profile-${id}`;
    const data = this.convert(body, pid);
    this.resources.push(data);
    return data;
  }
}
