/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { dataCy } from "./TelemetryProfileLogs";

const dataCySelectors = [
  "log",
  "source",
  "level",
  "empty",
  "apiError",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRegionTelemetryLogs"
  | "getRegionTelemetryLogsMocked"
  | "getRegionTelemetryLogsEmpty"
  | "getRegionTelemetryLogs500";

const regionUrl = "**/logprofiles?regionId=region-1.0";
export const regionTelemetryLogResponse: eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse =
  {
    TelemetryLogsProfiles: [
      {
        logsGroupId: "1",
        logLevel: "TELEMETRY_SEVERITY_LEVEL_INFO",
        logsGroup: {
          name: "log1",
          collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
          groups: [],
        },
      },
    ],
    hasNext: false,
    totalElements: 1,
  };
const endpoints: CyApiDetails<ApiAliases> = {
  getRegionTelemetryLogs: { route: "**/logprofiles*", statusCode: 200 },
  getRegionTelemetryLogsMocked: {
    route: regionUrl,
    statusCode: 200,
    response: regionTelemetryLogResponse,
  },
  getRegionTelemetryLogsEmpty: {
    route: regionUrl,
    response: {},
  },
  getRegionTelemetryLogs500: {
    route: regionUrl,
    statusCode: 500,
  },
};

export class TelemetryProfileLogsPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
