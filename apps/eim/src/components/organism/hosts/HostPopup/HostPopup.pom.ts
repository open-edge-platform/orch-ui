/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { hostOne, instanceOne, SingleSchedule2Store } from "@orch-ui/utils";
import { ScheduleMaintenanceDrawerPom } from "../../ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ScheduleHostApiAliases =
  | "getEmptyHostSchedules"
  | "getHostSchedules"
  | "getHostSchedulesError"
  | "postHostSchedule"
  | "postHostScheduleError"
  | "deleteHostSchedule"
  | "deleteHostScheduleError"
  | "getSchedulesAfterPostMocked";
type DeauthorizedHostsApiAlises = "postDeauthorizeHost";
type DeleteHostApiAliases =
  | "getInstanceWithWorkload"
  | "deleteInstance"
  | "deleteHost";

type ApiAliases =
  | DeleteHostApiAliases
  | ScheduleHostApiAliases
  | DeauthorizedHostsApiAlises;

// Mock for get `/schedules`
const ssStore = new SingleSchedule2Store();
const emptyResponse: eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse =
  {
    hasNext: false,
    SingleSchedules: [],
    RepeatedSchedules: [],
    totalElements: 0,
  };

// Mock for post `/schedules`
const postSchedule123: eim.SingleScheduleRead2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule123",
  startSeconds: 1688148856,
  targetHost: hostOne,
  singleScheduleID: "schedule_123",
  resourceId: "schedule_123",
};

const afterPostScheduleMock: eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse =
  {
    hasNext: false,
    SingleSchedules: [postSchedule123],
    RepeatedSchedules: [],
    totalElements: 1,
  };

const deleteEndpoints: CyApiDetails<
  DeleteHostApiAliases,
  | eim.DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
  | eim.DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse
  | eim.GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse
> = {
  deleteInstance: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/compute/instances/**`,
    statusCode: 200,
  },
  deleteHost: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`,
    statusCode: 200,
  },
  getInstanceWithWorkload: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/instances/**`,
    statusCode: 200,
    response: instanceOne,
  },
};

const scheduleEndpoints: CyApiDetails<
  ScheduleHostApiAliases,
  | eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse
  | eim.PostV1ProjectsByProjectNameSchedulesSingleApiResponse
> = {
  getEmptyHostSchedules: {
    route: "**/schedules*",
    statusCode: 200,
    response: emptyResponse,
  },
  getHostSchedules: {
    route: "**/schedules*",
    statusCode: 200,
    response: {
      hasNext: false,
      SingleSchedules: ssStore.list(),
      RepeatedSchedules: [],
      totalElements: ssStore.list().length,
    },
  },
  getHostSchedulesError: {
    route: "**/schedules*",
    statusCode: 500,
  },
  postHostSchedule: {
    method: "POST",
    route: "**/schedules/single*",
    statusCode: 200,
    response: postSchedule123,
  },
  getSchedulesAfterPostMocked: {
    route: "**/schedules*",
    statusCode: 200,
    response: afterPostScheduleMock,
  },
  postHostScheduleError: {
    method: "POST",
    route: "**/schedules/single*",
    statusCode: 500,
  },
  deleteHostSchedule: {
    method: "DELETE",
    route: "**/schedules/single/*",
    statusCode: 200,
  },
  deleteHostScheduleError: {
    method: "DELETE",
    route: "**/schedules/single**",
    statusCode: 500,
  },
};

const deauthorizedEndpoints: CyApiDetails<DeauthorizedHostsApiAlises> = {
  postDeauthorizeHost: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**/invalidate`,
    method: "PUT",
    statusCode: 200,
    response: undefined,
  },
};

class HostPopupPom extends CyPom<Selectors, ApiAliases> {
  maintenanceDrawerPom: ScheduleMaintenanceDrawerPom;
  constructor(public rootCy: string = "hostPopup") {
    super(rootCy, [...dataCySelectors], {
      ...scheduleEndpoints,
      ...deauthorizedEndpoints,
      ...deleteEndpoints,
    });
    this.maintenanceDrawerPom = new ScheduleMaintenanceDrawerPom();
  }
}

export default HostPopupPom;
