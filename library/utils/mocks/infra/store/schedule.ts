/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice, infra } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import {
  assignedWorkloadHostFour,
  assignedWorkloadHostOne,
  assignedWorkloadHostTwo,
} from "./hosts";

// assignedWorkloadHostOne of type SCHEDULE_STATUS_MAINTENANCE (Active: Indefinitely)
const scheduleOne: infra.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule1",
  startSeconds: 1688148856,
  targetHost: assignedWorkloadHostOne,
  singleScheduleID: "schedule_A",
  resourceId: "schedule_A",
  endSeconds: 0,
};

// assignedWorkloadHostOne: not of type SCHEDULE_STATUS_MAINTENANCE (Active: Indefinitely)
const scheduleTwo: infra.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule2",
  startSeconds: 1688148956,
  targetHost: assignedWorkloadHostOne,
  singleScheduleID: "schedule_B",
  resourceId: "schedule_B",
  endSeconds: 0,
};

// assignedWorkloadHostTwo: not of type SCHEDULE_STATUS_MAINTENANCE (Active: but expires after 2067-11-10T12:19:19.000Z)
const scheduleThree: infra.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule3",
  startSeconds: 1688148906,
  endSeconds: 3088153159,
  targetHost: assignedWorkloadHostTwo,
  singleScheduleID: "schedule_C",
  resourceId: "schedule_C",
};

// assignedWorkloadHostFour (Active: Indefinitely)
export const scheduleFour: infra.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule4",
  startSeconds: 1688148956,
  targetHost: assignedWorkloadHostFour,
  singleScheduleID: "schedule_D",
  resourceId: "schedule_D",
  endSeconds: 0,
};

// assignedWorkloadHostFour (Expired)
const scheduleFive: infra.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule5",
  startSeconds: 1688153159,
  targetHost: assignedWorkloadHostFour,
  singleScheduleID: "schedule_E",
  resourceId: "schedule_E",
  endSeconds: 1688154159,
};

/* Start of schedule maintenance data for no-repeat type*/
export const noRepeatMaintenance: enhancedEimSlice.ScheduleMaintenance = {
  name: "schedule3",
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  type: "no-repeat",
  targetHost: assignedWorkloadHostOne,
  single: {
    startSeconds: 1688148806,
    endSeconds: 1688148980,
  },
};

export const noRepeatOpenEndedMaintenance: enhancedEimSlice.ScheduleMaintenance =
  {
    name: "no-repeat-openended-maintenance",
    scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
    type: "no-repeat",
    targetHost: assignedWorkloadHostOne,
    single: {
      startSeconds: 1688148956,
      endSeconds: 0,
    },
  };
/* Start of schedule maintenance data for no-repeat type*/

export class SingleSchedule2Store extends BaseStore<
  "resourceId",
  infra.SingleScheduleRead2,
  infra.SingleSchedule2
> {
  singleScheduleIndex = 0;
  constructor() {
    super("resourceId", [
      scheduleOne,
      scheduleTwo,
      scheduleThree,
      scheduleFour,
      scheduleFive,
    ]);
  }

  convert(
    singleSchedule: infra.SingleSchedule2,
    id?: string,
    targetRegion?: infra.RegionRead,
    targetSite?: infra.SiteRead,
    targetHost?: infra.HostRead,
  ): infra.SingleScheduleRead2 {
    const currentTimeStr = new Date().toISOString();
    return {
      ...singleSchedule,
      singleScheduleID: id ?? `schedule${this.singleScheduleIndex++}`,
      resourceId: id ?? `schedule${this.singleScheduleIndex++}`,
      endSeconds: singleSchedule.endSeconds ? singleSchedule.endSeconds : 0,
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
    singleSchedule: infra.SingleScheduleWrite2,
    targetRegion?: infra.RegionRead,
    targetSite?: infra.SiteRead,
    targetHost?: infra.HostRead,
  ): infra.SingleScheduleRead2 {
    const newSchedule = this.convert(
      singleSchedule,
      undefined,
      targetRegion,
      targetSite,
      targetHost,
    );
    this.resources.push(newSchedule);
    return newSchedule;
  }

  list(host?: infra.HostRead | null): infra.SingleScheduleRead2[] {
    if (host) {
      return this.resources.filter((h) => h.targetHost === host);
    }
    return this.resources;
  }
}
