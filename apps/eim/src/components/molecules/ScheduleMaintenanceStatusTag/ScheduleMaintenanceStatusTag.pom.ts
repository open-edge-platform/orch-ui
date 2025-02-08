/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { hostOne } from "@orch-ui/utils";
import { dataCy } from "./ScheduleMaintenanceStatusTag";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessScheduleApiAliases =
  | "getEmptySchedules"
  | "getSchedulesMockSingle"
  | "getSchedulesMockRepeated";
//| "getScheduleMockInherited"; // TODO: upon completion of [NEX-2445] Maintenance inheritance

type ErrorScheduleApiAliases = "getSchedulesError";
type ApiAliases = SuccessScheduleApiAliases | ErrorScheduleApiAliases;

const emptyResponse: eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse =
  {
    SingleSchedules: [],
    RepeatedSchedules: [],
    hasNext: false,
    totalElements: 0,
  };

const successScheduleEndpoints: CyApiDetails<
  SuccessScheduleApiAliases,
  eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse
> = {
  getEmptySchedules: {
    route: "**/schedules*",
    statusCode: 200,
    response: emptyResponse,
  },
  getSchedulesMockSingle: {
    route: "**/schedules*",
    statusCode: 200,
    response: {
      SingleSchedules: [
        {
          scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
          name: "schedule123",
          startSeconds: 1688148856,
          targetHost: hostOne,
          singleScheduleID: "schedule_123",
          resourceId: "schedule_123",
        },
      ],
      RepeatedSchedules: [],
      hasNext: false,
      totalElements: 1,
    },
  },
  getSchedulesMockRepeated: {
    route: "**/schedules*",
    response: {
      SingleSchedules: [],
      RepeatedSchedules: [
        {
          scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
          name: "RepeatSchedule123",
          targetHost: hostOne,
          repeatedScheduleID: "r-schedule_123",
          resourceId: "r-schedule_123",
          cronDayMonth: "4",
          cronDayWeek: "*",
          cronMonth: "4",
          cronHours: "4",
          cronMinutes: "4",
          durationSeconds: 40,
        },
      ],
      hasNext: false,
      totalElements: 1,
    },
  },
};

const errorScheduleEndpoints: CyApiDetails<
  ErrorScheduleApiAliases,
  eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse
> = {
  getSchedulesError: {
    route: "**/schedules*",
    statusCode: 500,
  },
};

export class ScheduleMaintenanceStatusTagPom extends CyPom<
  Selectors,
  ApiAliases
> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      ...successScheduleEndpoints,
      ...errorScheduleEndpoints,
    });
  }
}
