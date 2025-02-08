/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import { hostFour, hostOne, hostTwo } from "./hosts";

// hostOne of type SCHEDULE_STATUS_MAINTENANCE (Active: Indefinitely)
const scheduleOne: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule1",
  startSeconds: 1688148856,
  targetHost: hostOne,
  singleScheduleID: "schedule_A",
  resourceId: "schedule_A",
  endSeconds: 0,
};

// hostOne: not of type SCHEDULE_STATUS_MAINTENANCE (Active: Indefinitely)
const scheduleTwo: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule2",
  startSeconds: 1688148956,
  targetHost: hostOne,
  singleScheduleID: "schedule_B",
  resourceId: "schedule_B",
  endSeconds: 0,
};

// hostTwo: not of type SCHEDULE_STATUS_MAINTENANCE (Active: but expires after 2067-11-10T12:19:19.000Z)
const scheduleThree: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule3",
  startSeconds: 1688148906,
  endSeconds: 3088153159,
  targetHost: hostTwo,
  singleScheduleID: "schedule_C",
  resourceId: "schedule_C",
};

// host Four (Active: Indefinitely)
export const scheduleFour: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule4",
  startSeconds: 1688148956,
  targetHost: hostFour,
  singleScheduleID: "schedule_D",
  resourceId: "schedule_D",
  endSeconds: 0,
};

// host Four (Expired)
const scheduleFive: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule5",
  startSeconds: 1688153159,
  targetHost: hostFour,
  singleScheduleID: "schedule_E",
  resourceId: "schedule_E",
  endSeconds: 1688154159,
};

/* Start of schedule maintenance data for no-repeat type*/
export const noRepeatMaintenance: enhancedEimSlice.ScheduleMaintenance = {
  name: "schedule3",
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  type: "no-repeat",
  targetHost: hostOne,
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
    targetHost: hostOne,
    single: {
      startSeconds: 1688148956,
      endSeconds: 0,
    },
  };
/* Start of schedule maintenance data for no-repeat type*/

export class SingleSchedule2Store extends BaseStore<
  "resourceId",
  eim.SingleScheduleRead2
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

  list(host?: eim.HostRead | null): eim.SingleScheduleRead2[] {
    if (host) {
      return this.resources.filter((h) => h.targetHost === host);
    }
    return this.resources;
  }

  post(singleSchedule: eim.SingleScheduleWrite2): eim.SingleScheduleRead2 {
    const currentTime = +new Date();
    const newSchedule: eim.SingleScheduleRead2 = {
      ...singleSchedule,
      targetHost: {
        ...singleSchedule.targetHost,
        onboardingStatus: {
          indicator:
            singleSchedule.targetHost?.onboardingStatus?.indicator ??
            "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
        hostStatus: {
          indicator:
            singleSchedule.targetHost?.hostStatus?.indicator ??
            "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
        registrationStatus: {
          indicator:
            singleSchedule.targetHost?.registrationStatus?.indicator ??
            "STATUS_INDICATION_UNSPECIFIED",
          message: "Host executing normally!",
          timestamp: currentTime,
        },
        instance: undefined,
        name: singleSchedule.targetHost?.name ?? "",
      },
      singleScheduleID: `schedule${this.singleScheduleIndex++}`,
      resourceId: `schedule${this.singleScheduleIndex++}`,
      endSeconds: singleSchedule.endSeconds ? singleSchedule.endSeconds : 0,
    };

    this.resources.push(newSchedule);

    return newSchedule;
  }

  convert(body: eim.SingleScheduleRead2): eim.SingleScheduleRead2 {
    return body;
  }
}
