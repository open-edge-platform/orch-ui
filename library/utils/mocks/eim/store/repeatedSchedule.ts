/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import { assignedWorkloadHostFour, assignedWorkloadHostOne } from "./hosts";
import { regionUsWest } from "./regions";
import { siteBoston } from "./sites";

// Day of month example
export const repeatedScheduleOne: eim.SingleScheduleRead = {
  repeatedScheduleID: "repeated-schedule1",
  name: "r-schedule1",
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  targetHost: assignedWorkloadHostFour,
  cronDayMonth:
    "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
  cronDayWeek: "*",
  cronHours: "14",
  cronMinutes: "24",
  cronMonth: "1,2,3,4,5,6,7,8,9,10,11",
  durationSeconds: 5000,
};

/* Start of schedule maintenance data for repeat type*/
export const repeatWeeklyMaintenanceFor11PMUTC: enhancedEimSlice.ScheduleMaintenance =
  {
    name: "r-schedule1",
    scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
    type: "repeat-weekly",
    targetHost: assignedWorkloadHostOne,
    repeated: {
      cronDayMonth: "*",
      cronDayWeek: "2,4,6",
      cronHours: "23",
      cronMinutes: "00",
      cronMonth: "2,3,4,5,6,7,8,9,10,11,12",
      durationSeconds: 5000,
    },
  };

export const repeatWeeklyMaintenanceFor11AMUTC: enhancedEimSlice.ScheduleMaintenance =
  {
    name: "r-schedule1",
    scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
    type: "repeat-weekly",
    targetHost: assignedWorkloadHostOne,
    repeated: {
      cronDayMonth: "*",
      cronDayWeek: "2,4,6",
      cronHours: "11",
      cronMinutes: "00",
      cronMonth: "1,2,3,4,5,6,7,8,9,10,11",
      durationSeconds: 5000,
    },
  };

export const maintenanceRepeatDaysFor11PMUTC: enhancedEimSlice.ScheduleMaintenance =
  {
    name: "r-schedule1",
    scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
    type: "repeat-monthly",
    targetHost: assignedWorkloadHostOne,
    repeated: {
      cronDayMonth:
        "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
      cronDayWeek: "*",
      cronHours: "23",
      cronMinutes: "00",
      cronMonth: "1,2,3,4,5,6,7,8,9,10,11",
      durationSeconds: 5000,
    },
  };

export const maintenanceRepeatDaysFor11AMUTC: enhancedEimSlice.ScheduleMaintenance =
  {
    name: "r-schedule1",
    scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
    type: "repeat-monthly",
    targetHost: assignedWorkloadHostOne,
    repeated: {
      cronDayMonth:
        "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
      cronDayWeek: "*",
      cronHours: "11",
      cronMinutes: "00",
      cronMonth: "1,2,3,4,5,6,7,8,9,10,11",
      durationSeconds: 5000,
    },
  };
/* End of schedule maintenance data for repeat type*/

// Day of week example
const repeatedScheduleTwo: eim.SingleScheduleRead = {
  repeatedScheduleID: "repeated-schedule2",
  name: "r-schedule2",
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  targetHost: assignedWorkloadHostFour,
  cronDayMonth: "*",
  cronDayWeek: "0,1,2,4,5,6",
  cronHours: "8",
  cronMinutes: "30",
  cronMonth: "1,2,3,4,5,6,7,8,9,10,11",
  durationSeconds: 20,
};

// Maintenance all days (user may have set this by repeat - days of month's or day of week's select all)
const repeatedScheduleThree: eim.SingleScheduleRead = {
  repeatedScheduleID: "repeated-schedule3",
  name: "r-schedule3",
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  targetHost: assignedWorkloadHostFour,
  cronDayMonth: "*",
  cronDayWeek: "*",
  cronHours: "0",
  cronMinutes: "0",
  cronMonth: "*",
  durationSeconds: 1800,
};

export const repeatedScheduleOnSite: eim.SingleScheduleRead = {
  repeatedScheduleID: "repeated-schedule-site",
  name: "r-schedule-site",
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  targetSite: siteBoston,
  cronDayMonth: "*",
  cronDayWeek: "*",
  cronHours: "0",
  cronMinutes: "0",
  cronMonth: "*",
  durationSeconds: 1800,
};
export const repeatedScheduleOnRegion: eim.SingleScheduleRead = {
  repeatedScheduleID: "repeated-schedule-region",
  name: "r-schedule-region",
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  targetRegion: regionUsWest,
  cronDayMonth: "*",
  cronDayWeek: "*",
  cronHours: "0",
  cronMinutes: "0",
  cronMonth: "*",
  durationSeconds: 1800,
};

export class RepeatedScheduleStore extends BaseStore<
  "repeatedScheduleID",
  eim.SingleScheduleRead,
  eim.SingleSchedule
> {
  repeatedScheduleIndex = 0;
  constructor() {
    super("repeatedScheduleID", [
      repeatedScheduleOne,
      repeatedScheduleTwo,
      repeatedScheduleThree,
      repeatedScheduleOnSite,
      repeatedScheduleOnRegion,
    ]);
  }

  convert(
    repeatedSchedule: eim.SingleSchedule,
    id?: string,
    targetRegion?: eim.RegionRead,
    targetSite?: eim.SiteRead,
    targetHost?: eim.HostRead,
  ): eim.SingleScheduleRead {
    const currentTimeStr = new Date().toISOString();
    return {
      ...repeatedSchedule,
      repeatedScheduleID: id ?? `schedule${this.repeatedScheduleIndex++}`,
      resourceId: id ?? `schedule${this.repeatedScheduleIndex++}`,
      targetHost,
      targetRegion,
      targetSite,
      timestamps: {
        createdAt: currentTimeStr,
        updatedAt: currentTimeStr,
      },
    };
  }

  post(
    repeatedSchedule: eim.SingleScheduleWrite,
    targetRegion?: eim.RegionRead,
    targetSite?: eim.SiteRead,
    targetHost?: eim.HostRead,
  ): eim.SingleScheduleRead {
    const newSchedule = this.convert(
      repeatedSchedule,
      undefined,
      targetRegion,
      targetSite,
      targetHost,
    );
    this.resources.push(newSchedule);
    return newSchedule;
  }

  list(host?: eim.HostRead | null): eim.SingleScheduleRead[] {
    if (host) {
      return this.resources.filter((h) => h.targetHost === host);
    }
    return this.resources;
  }
}
