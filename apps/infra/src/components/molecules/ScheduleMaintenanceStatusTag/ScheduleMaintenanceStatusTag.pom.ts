/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessScheduleApiAliases =
  | "getEmptySchedules"
  | "getSchedulesMockSingle"
  | "getSchedulesMockRepeated";
//| "getScheduleMockInherited"; // TODO: upon completion of [NEX-2445] Maintenance inheritance

type ErrorScheduleApiAliases = "getSchedulesError";
type ApiAliases = SuccessScheduleApiAliases | ErrorScheduleApiAliases;

const emptyResponse: infra.ScheduleServiceListSchedulesApiResponse = {
  singleSchedules: [],
  repeatedSchedules: [],
  hasNext: false,
  totalElements: 0,
};

const successScheduleEndpoints: CyApiDetails<
  SuccessScheduleApiAliases,
  infra.ScheduleServiceListSchedulesApiResponse
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
      singleSchedules: [
        {
          scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
          name: "schedule123",
          startSeconds: 1688148856,
          targetHost: hostOne,
          singleScheduleID: "schedule_123",
          resourceId: "schedule_123",
        },
      ],
      repeatedSchedules: [],
      hasNext: false,
      totalElements: 1,
    },
  },
  getSchedulesMockRepeated: {
    route: "**/schedules*",
    response: {
      singleSchedules: [],
      repeatedSchedules: [
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
  infra.ScheduleServiceListSchedulesApiResponse
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
  constructor(public rootCy: string = "scheduleMaintenanceStatusTag") {
    super(rootCy, [...dataCySelectors], {
      ...successScheduleEndpoints,
      ...errorScheduleEndpoints,
    });
  }
}
