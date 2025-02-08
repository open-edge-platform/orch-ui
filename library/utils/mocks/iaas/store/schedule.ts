/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import BaseStore from "./baseStore";
import { hostFour, hostOne, hostTwo } from "./hosts";

// hostOne
const scheduleOne: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule1",
  startSeconds: 1688148856,
  targetHost: hostOne,
  singleScheduleID: "schedule_A",
  endSeconds: 0,
};

// hostOne: not of type SCHEDULE_STATUS_MAINTENANCE
const scheduleTwo: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule3",
  startSeconds: 1688148956,
  targetHost: hostOne,
  singleScheduleID: "schedule_B",
  endSeconds: 0,
};

// hostTwo not of type SCHEDULE_STATUS_MAINTENANCE
const scheduleThree: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
  name: "schedule2",
  startSeconds: 1688148906,
  endSeconds: 1688153159,
  targetHost: hostTwo,
  singleScheduleID: "schedule_C",
};

// host Four
const scheduleFour: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule3",
  startSeconds: 1688148956,
  targetHost: hostFour,
  singleScheduleID: "schedule_D",
  endSeconds: 0,
};

// host Four
const scheduleFive: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule4",
  startSeconds: 1688153159,
  targetHost: hostFour,
  singleScheduleID: "schedule_E",
  endSeconds: 0,
};

export default class SingleScheduleStore extends BaseStore<
  "singleScheduleID",
  eim.SingleScheduleRead2
> {
  singleScheduleIndex = 0;
  constructor() {
    super("singleScheduleID", [
      scheduleOne,
      scheduleTwo,
      scheduleThree,
      scheduleFour,
      scheduleFive,
    ]);
  }

  list(hostId?: string | null): eim.SingleScheduleRead2[] {
    if (hostId) {
      return this.resources.filter((h) => h.targetHost?.resourceId === hostId);
    }
    return this.resources;
  }

  post(singleSchedule: eim.SingleScheduleRead2): eim.SingleScheduleRead2 {
    const newSchedule = {
      ...singleSchedule,
      singleScheduleID: `schedule${this.singleScheduleIndex++}`,
      end_seconds: singleSchedule.endSeconds ? singleSchedule.endSeconds : "0",
    };

    this.resources.push(newSchedule);

    return newSchedule;
  }

  convert(body: eim.SingleScheduleRead2): eim.SingleScheduleRead2 {
    return body;
  }
}
