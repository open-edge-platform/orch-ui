/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra, infraSlice, mbSlice } from "@orch-ui/apis";

const RegionTag = "Region";
const RegionListTag = "RegionList";
const SiteTag = "Site";
const SiteListTag = "SiteList";
const OUListTag = "OUList";
const HostTag = "Host";
const HostListTag = "HostList";
const ScheduleTag = "Schedule";
const ScheduleListTag = "ScheduleList";
const OSTag = "OS";
const OSListTag = "OSList";
const WorkloadTag = "Workload";
const WorkloadListTag = "WorkloadList";
const InstanceListTag = "InstanceList";

export interface InstanceReadModified extends infra.InstanceResourceRead {
  host?: infra.HostRead;
}

export type ScheduleMaintenanceTargetEntity =
  | infra.HostRead
  | infra.SiteRead
  | infra.RegionRead;
export type ScheduleMaintenanceTargetEntityType = "host" | "site" | "region";
/** Schedule Maintenance targets that are fed into the APIs based on the Target Entity type */
export interface ScheduleMaintenanceTargetData {
  targetHostId?: string;
  targetSiteId?: string;
  targetRegionId?: string;
}
export type ScheduleMaintenanceType =
  | "repeat-weekly"
  | "repeat-monthly"
  | "no-repeat";

type commonMaintenanceFields = "name" | "scheduleStatus";
type commonMaintenanceTargets = "targetHost" | "targetSite" | "targetRegion";
interface _ScheduleMaintenance {
  type: ScheduleMaintenanceType;
  targetHost?: infra.HostRead;
  targetSite?: infra.SiteRead;
  targetRegion?: infra.RegionRead;
  single?: Partial<
    Omit<
      infra.SingleSchedule2,
      commonMaintenanceFields | commonMaintenanceTargets
    >
  > & { isOpenEnded?: boolean };
  repeated?: Partial<
    Omit<
      infra.SingleSchedule,
      commonMaintenanceFields | commonMaintenanceTargets
    >
  > & {
    countPrevMonthOnTzGMT?: boolean;
    countNextMonthOnTzGMT?: boolean;
  };
}

export type ScheduleMaintenance = _ScheduleMaintenance &
  Pick<infra.SingleSchedule2, commonMaintenanceFields>;
export interface ScheduleMaintenanceRead extends ScheduleMaintenance {
  resourceId?: string;
}
type commonScheduleTypeFields =
  | commonMaintenanceFields
  | commonMaintenanceTargets
  | "resourceId"
  | "type";
export type RepeatedMaintenance = Pick<
  ScheduleMaintenanceRead,
  commonScheduleTypeFields
> & {
  repeated: Omit<
    infra.SingleSchedule,
    commonMaintenanceFields | commonMaintenanceTargets
  > & {
    countPrevMonthOnTzGMT?: boolean;
    countNextMonthOnTzGMT?: boolean;
  };
};
export type SingleMaintenance = Pick<
  ScheduleMaintenanceRead,
  commonScheduleTypeFields
> & {
  single: Omit<
    infra.SingleSchedule2,
    commonMaintenanceFields | commonMaintenanceTargets
  > & { isOpenEnded?: boolean };
};

export const metadataEnhancedApi = mbSlice.enhanceEndpoints({
  addTagTypes: [SiteTag],
  endpoints: {
    metadataServiceCreateOrUpdateMetadata: {
      invalidatesTags: [SiteTag],
    },
  },
});
export const miEnhancedApi = infraSlice.enhanceEndpoints({
  addTagTypes: [
    RegionListTag,
    SiteListTag,
    OUListTag,
    HostListTag,
    ScheduleListTag,
    OSListTag,
    WorkloadListTag,
    InstanceListTag,
  ],
  endpoints: {
    // Regions
    getV1ProjectsByProjectNameRegions: {
      providesTags: [RegionListTag],
    },
    postV1ProjectsByProjectNameRegions: {
      invalidatesTags: [RegionListTag],
    },
    deleteV1ProjectsByProjectNameRegionsAndRegionId: {
      invalidatesTags: [RegionListTag],
    },
    patchV1ProjectsByProjectNameRegionsAndRegionId: {
      invalidatesTags: [RegionListTag, RegionTag],
    },
    putV1ProjectsByProjectNameRegionsAndRegionId: {
      invalidatesTags: [RegionListTag, RegionTag],
    },

    // Sites
    getV1ProjectsByProjectNameRegionsAndRegionIdSites: {
      providesTags: [SiteListTag],
    },
    postV1ProjectsByProjectNameRegionsAndRegionIdSites: {
      invalidatesTags: [SiteListTag],
    },
    deleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: {
      invalidatesTags: [SiteListTag],
    },
    patchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: {
      invalidatesTags: [SiteListTag, SiteTag],
    },
    putV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: {
      invalidatesTags: [SiteListTag, SiteTag],
    },
    // Hosts
    getV1ProjectsByProjectNameComputeHosts: {
      providesTags: [HostListTag],
    },
    postV1ProjectsByProjectNameComputeHosts: {
      invalidatesTags: [HostListTag],
    },
    deleteV1ProjectsByProjectNameComputeHostsAndHostId: {
      invalidatesTags: [HostListTag],
    },
    patchV1ProjectsByProjectNameComputeHostsAndHostId: {
      invalidatesTags: [HostListTag, HostTag, InstanceListTag],
    },
    putV1ProjectsByProjectNameComputeHostsAndHostId: {
      invalidatesTags: [HostListTag, HostTag, InstanceListTag],
    },
    putV1ProjectsByProjectNameComputeHostsAndHostIdInvalidate: {
      invalidatesTags: [HostListTag, HostTag, InstanceListTag],
    },

    // Schedules
    getV1ProjectsByProjectNameComputeSchedules: {
      providesTags: [ScheduleListTag],
    },
    getV1ProjectsByProjectNameSchedulesRepeated: {
      providesTags: [ScheduleListTag],
    },
    getV1ProjectsByProjectNameSchedulesSingle: {
      providesTags: [ScheduleListTag],
    },
    postV1ProjectsByProjectNameSchedulesSingle: {
      invalidatesTags: [ScheduleListTag],
    },
    postV1ProjectsByProjectNameSchedulesRepeated: {
      invalidatesTags: [ScheduleListTag],
    },
    deleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId: {
      invalidatesTags: [ScheduleListTag],
    },
    deleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId: {
      invalidatesTags: [ScheduleListTag],
    },
    patchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId: {
      invalidatesTags: [ScheduleListTag, ScheduleTag],
    },
    putV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId: {
      invalidatesTags: [ScheduleListTag, ScheduleTag],
    },
    patchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId: {
      invalidatesTags: [ScheduleListTag, ScheduleTag],
    },
    putV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId: {
      invalidatesTags: [ScheduleListTag, ScheduleTag],
    },

    // OS
    getV1ProjectsByProjectNameComputeOs: {
      providesTags: [OSListTag],
    },
    postV1ProjectsByProjectNameComputeOs: {
      invalidatesTags: [OSListTag],
    },
    deleteV1ProjectsByProjectNameComputeOsAndOsResourceId: {
      invalidatesTags: [OSListTag],
    },
    patchV1ProjectsByProjectNameComputeOsAndOsResourceId: {
      invalidatesTags: [OSListTag, OSTag],
    },
    putV1ProjectsByProjectNameComputeOsAndOsResourceId: {
      invalidatesTags: [OSListTag, OSTag],
    },

    // Workloads
    getV1ProjectsByProjectNameComputeWorkloads: {
      providesTags: [WorkloadListTag],
    },
    postV1ProjectsByProjectNameComputeWorkloads: {
      invalidatesTags: [WorkloadListTag],
    },
    postV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembers: {
      invalidatesTags: [WorkloadListTag],
    },
    deleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: {
      invalidatesTags: [WorkloadListTag],
    },
    deleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberId:
      {
        invalidatesTags: [WorkloadListTag],
      },
    patchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: {
      invalidatesTags: [WorkloadListTag, WorkloadTag],
    },
    putV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: {
      invalidatesTags: [WorkloadListTag, WorkloadTag],
    },

    // Instances
    getV1ProjectsByProjectNameComputeInstances: {
      providesTags: [InstanceListTag],
    },
    postV1ProjectsByProjectNameComputeInstances: {
      invalidatesTags: [InstanceListTag],
    },
    deleteV1ProjectsByProjectNameComputeInstancesAndInstanceId: {
      invalidatesTags: [InstanceListTag],
    },
  },
});
