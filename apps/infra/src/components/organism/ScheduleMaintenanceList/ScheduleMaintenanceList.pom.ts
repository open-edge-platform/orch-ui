/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  repeatedScheduleOne,
  RepeatedScheduleStore,
  SingleSchedule2Store,
} from "@orch-ui/utils";

const dataCySelectors = [
  "scheduleType",
  "timezone",
  "footerButtons",
  //Single schedule
  "startTime",
  "startDate",
  "endTime",
  "endDate",
  // Repeated Schedule
  "duration",
  "month",
  "dayOfMonth",
  "dayOfWeek",
] as const;
type Selectors = (typeof dataCySelectors)[number];
export const repeatedScheduleStore = new RepeatedScheduleStore();
export const singleScheduleStore = new SingleSchedule2Store();

const singleScheduleList = singleScheduleStore.list();
const repeatedScheduleList = repeatedScheduleStore.list();
type CrudMaintenanceApiAliases =
  | "deleteSingleMaintenance"
  | "deleteRepeatedMaintenance";
type MaintenanceApiAliases =
  | "getMaintenance"
  | "getMaintenanceRepeatWeekdaysFor11PMUTC"
  | "getMaintenanceRepeatWeekdaysFor11AMUTC"
  | "getMaintenanceRepeatDaysFor11PMUTC"
  | "getMaintenanceRepeatDaysFor11AMUTC";
type ApiAliases = CrudMaintenanceApiAliases | MaintenanceApiAliases;

const crudMaintenanceIntercepts: CyApiDetails<CrudMaintenanceApiAliases> = {
  deleteSingleMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/single/**`,
    method: "DELETE",
    statusCode: 200,
  },
  deleteRepeatedMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/schedules/repeated/**`,
    method: "DELETE",
    statusCode: 200,
  },
};
const maintenanceIntercepts: CyApiDetails<
  MaintenanceApiAliases,
  infra.GetV1ProjectsByProjectNameComputeSchedulesApiResponse
> = {
  getMaintenance: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/schedules?**`,
    method: "GET",
    statusCode: 200,
    response: {
      hasNext: false,
      RepeatedSchedules: repeatedScheduleList,
      SingleSchedules: singleScheduleList,
      totalElements: repeatedScheduleList.length + singleScheduleList.length,
    },
  },
  getMaintenanceRepeatWeekdaysFor11PMUTC: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/schedules?**`,
    method: "GET",
    statusCode: 200,
    response: {
      hasNext: false,
      RepeatedSchedules: [
        {
          ...repeatedScheduleOne,
          cronDayMonth: "*",
          cronDayWeek: "2,4,6",
          cronHours: "23",
          cronMinutes: "00",
        },
      ],
      SingleSchedules: [],
      totalElements: 1,
    },
  },
  getMaintenanceRepeatWeekdaysFor11AMUTC: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/schedules?**`,
    method: "GET",
    statusCode: 200,
    response: {
      hasNext: false,
      RepeatedSchedules: [
        {
          ...repeatedScheduleOne,
          cronDayMonth: "*",
          cronDayWeek: "2,4,6",
          cronHours: "11",
          cronMinutes: "00",
        },
      ],
      SingleSchedules: [],
      totalElements: 1,
    },
  },
  getMaintenanceRepeatDaysFor11PMUTC: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/schedules?**`,
    method: "GET",
    statusCode: 200,
    response: {
      hasNext: false,
      RepeatedSchedules: [
        {
          ...repeatedScheduleOne,
          cronDayMonth:
            "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
          cronDayWeek: "*",
          cronHours: "23",
          cronMinutes: "00",
        },
      ],
      SingleSchedules: [],
      totalElements: 1,
    },
  },
  getMaintenanceRepeatDaysFor11AMUTC: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/schedules?**`,
    method: "GET",
    statusCode: 200,
    response: {
      hasNext: false,
      RepeatedSchedules: [
        {
          ...repeatedScheduleOne,
          cronDayMonth:
            "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
          cronDayWeek: "*",
          cronHours: "11",
          cronMinutes: "00",
        },
      ],
      SingleSchedules: [],
      totalElements: 1,
    },
  },
};

export class ScheduleMaintenanceListPom extends CyPom<Selectors, ApiAliases> {
  tablePom: SiTablePom; // Todo: remove or replace after completing LPUUH-2101
  maintenanceTable: TablePom;
  constructor(public rootCy: string = "scheduleMaintenanceList") {
    super(rootCy, [...dataCySelectors], {
      ...maintenanceIntercepts,
      ...crudMaintenanceIntercepts,
    });
    this.tablePom = new SiTablePom();
    this.maintenanceTable = new TablePom();
  }
}
