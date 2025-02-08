import { eimApi as api } from "./apiSlice";
export const addTagTypes = [
  "Compute",
  "Host",
  "Instance",
  "OS",
  "Schedule",
  "Workload",
  "Location",
  "Provider",
  "Region",
  "Site",
  "TelemetryLogsGroup",
  "TelemetryLogsProfile",
  "TelemetryMetricsGroup",
  "TelemetryMetricsProfile",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV1ProjectsByProjectNameCompute: build.query<
        GetV1ProjectsByProjectNameComputeApiResponse,
        GetV1ProjectsByProjectNameComputeApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            siteID: queryArg.siteId,
            instanceID: queryArg.instanceId,
            uuid: queryArg.uuid,
            metadata: queryArg.metadata,
            detail: queryArg.detail,
          },
        }),
        providesTags: ["Compute"],
      }),
      getV1ProjectsByProjectNameComputeHosts: build.query<
        GetV1ProjectsByProjectNameComputeHostsApiResponse,
        GetV1ProjectsByProjectNameComputeHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            siteID: queryArg.siteId,
            instanceID: queryArg.instanceId,
            uuid: queryArg.uuid,
            metadata: queryArg.metadata,
            detail: queryArg.detail,
          },
        }),
        providesTags: ["Host"],
      }),
      postV1ProjectsByProjectNameComputeHosts: build.mutation<
        PostV1ProjectsByProjectNameComputeHostsApiResponse,
        PostV1ProjectsByProjectNameComputeHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Host"],
      }),
      deleteV1ProjectsByProjectNameComputeHostsAndHostId: build.mutation<
        DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse,
        DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}`,
          method: "DELETE",
          body: queryArg.hostOperationWithNote,
        }),
        invalidatesTags: ["Host"],
      }),
      getV1ProjectsByProjectNameComputeHostsAndHostId: build.query<
        GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse,
        GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}`,
        }),
        providesTags: ["Host"],
      }),
      patchV1ProjectsByProjectNameComputeHostsAndHostId: build.mutation<
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse,
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["Host"],
      }),
      putV1ProjectsByProjectNameComputeHostsAndHostId: build.mutation<
        PutV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse,
        PutV1ProjectsByProjectNameComputeHostsAndHostIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Host"],
      }),
      putV1ProjectsByProjectNameComputeHostsAndHostIdInvalidate: build.mutation<
        PutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateApiResponse,
        PutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}/invalidate`,
          method: "PUT",
          body: queryArg.hostOperationWithNote,
        }),
        invalidatesTags: ["Host"],
      }),
      patchV1ProjectsByProjectNameComputeHostsAndHostIdOnboard: build.mutation<
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardApiResponse,
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}/onboard`,
          method: "PATCH",
        }),
        invalidatesTags: ["Host"],
      }),
      patchV1ProjectsByProjectNameComputeHostsAndHostIdRegister: build.mutation<
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiResponse,
        PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.hostId}/register`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["Host"],
      }),
      postV1ProjectsByProjectNameComputeHostsRegister: build.mutation<
        PostV1ProjectsByProjectNameComputeHostsRegisterApiResponse,
        PostV1ProjectsByProjectNameComputeHostsRegisterApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/register`,
          method: "POST",
          body: queryArg.hostRegisterInfo,
        }),
        invalidatesTags: ["Host"],
      }),
      getV1ProjectsByProjectNameComputeHostsSummary: build.query<
        GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse,
        GetV1ProjectsByProjectNameComputeHostsSummaryApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/summary`,
          params: { siteID: queryArg.siteId, filter: queryArg.filter },
        }),
        providesTags: ["Host"],
      }),
      getV1ProjectsByProjectNameComputeInstances: build.query<
        GetV1ProjectsByProjectNameComputeInstancesApiResponse,
        GetV1ProjectsByProjectNameComputeInstancesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            workloadMemberID: queryArg.workloadMemberId,
            hostID: queryArg.hostId,
            siteID: queryArg.siteId,
          },
        }),
        providesTags: ["Instance"],
      }),
      postV1ProjectsByProjectNameComputeInstances: build.mutation<
        PostV1ProjectsByProjectNameComputeInstancesApiResponse,
        PostV1ProjectsByProjectNameComputeInstancesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Instance"],
      }),
      deleteV1ProjectsByProjectNameComputeInstancesAndInstanceId:
        build.mutation<
          DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse,
          DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.instanceId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Instance"],
        }),
      getV1ProjectsByProjectNameComputeInstancesAndInstanceId: build.query<
        GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse,
        GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.instanceId}`,
        }),
        providesTags: ["Instance"],
      }),
      patchV1ProjectsByProjectNameComputeInstancesAndInstanceId: build.mutation<
        PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse,
        PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.instanceId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["Instance"],
      }),
      putV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidate:
        build.mutation<
          PutV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidateApiResponse,
          PutV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidateApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.instanceId}/invalidate`,
            method: "PUT",
          }),
          invalidatesTags: ["Instance"],
        }),
      getV1ProjectsByProjectNameComputeOs: build.query<
        GetV1ProjectsByProjectNameComputeOsApiResponse,
        GetV1ProjectsByProjectNameComputeOsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["OS"],
      }),
      postV1ProjectsByProjectNameComputeOs: build.mutation<
        PostV1ProjectsByProjectNameComputeOsApiResponse,
        PostV1ProjectsByProjectNameComputeOsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os`,
          method: "POST",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OS"],
      }),
      deleteV1ProjectsByProjectNameComputeOsAndOsResourceId: build.mutation<
        DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse,
        DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.osResourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OS"],
      }),
      getV1ProjectsByProjectNameComputeOsAndOsResourceId: build.query<
        GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse,
        GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.osResourceId}`,
        }),
        providesTags: ["OS"],
      }),
      patchV1ProjectsByProjectNameComputeOsAndOsResourceId: build.mutation<
        PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse,
        PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.osResourceId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["OS"],
      }),
      putV1ProjectsByProjectNameComputeOsAndOsResourceId: build.mutation<
        PutV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse,
        PutV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.osResourceId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["OS"],
      }),
      getV1ProjectsByProjectNameComputeSchedules: build.query<
        GetV1ProjectsByProjectNameComputeSchedulesApiResponse,
        GetV1ProjectsByProjectNameComputeSchedulesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            regionID: queryArg.regionId,
            siteID: queryArg.siteId,
            hostID: queryArg.hostId,
            unix_epoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["Schedule"],
      }),
      getV1ProjectsByProjectNameComputeWorkloads: build.query<
        GetV1ProjectsByProjectNameComputeWorkloadsApiResponse,
        GetV1ProjectsByProjectNameComputeWorkloadsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            kind: queryArg.kind,
          },
        }),
        providesTags: ["Workload"],
      }),
      postV1ProjectsByProjectNameComputeWorkloads: build.mutation<
        PostV1ProjectsByProjectNameComputeWorkloadsApiResponse,
        PostV1ProjectsByProjectNameComputeWorkloadsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads`,
          method: "POST",
          body: queryArg.workload,
        }),
        invalidatesTags: ["Workload"],
      }),
      deleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId:
        build.mutation<
          DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse,
          DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Workload"],
        }),
      getV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: build.query<
        GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse,
        GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}`,
        }),
        providesTags: ["Workload"],
      }),
      patchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: build.mutation<
        PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse,
        PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}`,
          method: "PATCH",
          body: queryArg.workload,
        }),
        invalidatesTags: ["Workload"],
      }),
      putV1ProjectsByProjectNameComputeWorkloadsAndWorkloadId: build.mutation<
        PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse,
        PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}`,
          method: "PUT",
          body: queryArg.workload,
        }),
        invalidatesTags: ["Workload"],
      }),
      getV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembers:
        build.query<
          GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse,
          GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg._workloadId}/members`,
            params: {
              offset: queryArg.offset,
              pageSize: queryArg.pageSize,
              filter: queryArg.filter,
              orderBy: queryArg.orderBy,
              workload_id: queryArg.workloadId,
            },
          }),
          providesTags: ["Workload"],
        }),
      postV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembers:
        build.mutation<
          PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse,
          PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}/members`,
            method: "POST",
            body: queryArg.workloadMember,
          }),
          invalidatesTags: ["Workload"],
        }),
      deleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberId:
        build.mutation<
          DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse,
          DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}/members/${queryArg.workloadMemberId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Workload"],
        }),
      getV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberId:
        build.query<
          GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse,
          GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadId}/members/${queryArg.workloadMemberId}`,
          }),
          providesTags: ["Workload"],
        }),
      getV1ProjectsByProjectNameLocations: build.query<
        GetV1ProjectsByProjectNameLocationsApiResponse,
        GetV1ProjectsByProjectNameLocationsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/locations`,
          params: {
            name: queryArg.name,
            showSites: queryArg.showSites,
            showRegions: queryArg.showRegions,
          },
        }),
        providesTags: ["Location"],
      }),
      getV1ProjectsByProjectNameProviders: build.query<
        GetV1ProjectsByProjectNameProvidersApiResponse,
        GetV1ProjectsByProjectNameProvidersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["Provider"],
      }),
      postV1ProjectsByProjectNameProviders: build.mutation<
        PostV1ProjectsByProjectNameProvidersApiResponse,
        PostV1ProjectsByProjectNameProvidersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers`,
          method: "POST",
          body: queryArg.provider,
        }),
        invalidatesTags: ["Provider"],
      }),
      deleteV1ProjectsByProjectNameProvidersAndProviderId: build.mutation<
        DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiResponse,
        DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers/${queryArg.providerId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Provider"],
      }),
      getV1ProjectsByProjectNameProvidersAndProviderId: build.query<
        GetV1ProjectsByProjectNameProvidersAndProviderIdApiResponse,
        GetV1ProjectsByProjectNameProvidersAndProviderIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers/${queryArg.providerId}`,
        }),
        providesTags: ["Provider"],
      }),
      getV1ProjectsByProjectNameRegions: build.query<
        GetV1ProjectsByProjectNameRegionsApiResponse,
        GetV1ProjectsByProjectNameRegionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            parent: queryArg.parent,
            showTotalSites: queryArg.showTotalSites,
          },
        }),
        providesTags: ["Region"],
      }),
      postV1ProjectsByProjectNameRegions: build.mutation<
        PostV1ProjectsByProjectNameRegionsApiResponse,
        PostV1ProjectsByProjectNameRegionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions`,
          method: "POST",
          body: queryArg.region,
        }),
        invalidatesTags: ["Region"],
      }),
      deleteV1ProjectsByProjectNameRegionsAndRegionId: build.mutation<
        DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiResponse,
        DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Region"],
      }),
      getV1ProjectsByProjectNameRegionsAndRegionId: build.query<
        GetV1ProjectsByProjectNameRegionsAndRegionIdApiResponse,
        GetV1ProjectsByProjectNameRegionsAndRegionIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}`,
        }),
        providesTags: ["Region"],
      }),
      patchV1ProjectsByProjectNameRegionsAndRegionId: build.mutation<
        PatchV1ProjectsByProjectNameRegionsAndRegionIdApiResponse,
        PatchV1ProjectsByProjectNameRegionsAndRegionIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}`,
          method: "PATCH",
          body: queryArg.region,
        }),
        invalidatesTags: ["Region"],
      }),
      putV1ProjectsByProjectNameRegionsAndRegionId: build.mutation<
        PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse,
        PutV1ProjectsByProjectNameRegionsAndRegionIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}`,
          method: "PUT",
          body: queryArg.region,
        }),
        invalidatesTags: ["Region"],
      }),
      getV1ProjectsByProjectNameRegionsAndRegionIdSites: build.query<
        GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse,
        GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
            ouID: queryArg.ouId,
          },
        }),
        providesTags: ["Site"],
      }),
      postV1ProjectsByProjectNameRegionsAndRegionIdSites: build.mutation<
        PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse,
        PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites`,
          method: "POST",
          body: queryArg.site,
        }),
        invalidatesTags: ["Site"],
      }),
      deleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId:
        build.mutation<
          DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse,
          DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.siteId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Site"],
        }),
      getV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: build.query<
        GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse,
        GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.siteId}`,
        }),
        providesTags: ["Site"],
      }),
      patchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: build.mutation<
        PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse,
        PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.siteId}`,
          method: "PATCH",
          body: queryArg.site,
        }),
        invalidatesTags: ["Site"],
      }),
      putV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteId: build.mutation<
        PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse,
        PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.siteId}`,
          method: "PUT",
          body: queryArg.site,
        }),
        invalidatesTags: ["Site"],
      }),
      getV1ProjectsByProjectNameSchedulesRepeated: build.query<
        GetV1ProjectsByProjectNameSchedulesRepeatedApiResponse,
        GetV1ProjectsByProjectNameSchedulesRepeatedApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            regionID: queryArg.regionId,
            siteID: queryArg.siteId,
            hostID: queryArg.hostId,
            unix_epoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["Schedule"],
      }),
      postV1ProjectsByProjectNameSchedulesRepeated: build.mutation<
        PostV1ProjectsByProjectNameSchedulesRepeatedApiResponse,
        PostV1ProjectsByProjectNameSchedulesRepeatedApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated`,
          method: "POST",
          body: queryArg.repeatedSchedule,
        }),
        invalidatesTags: ["Schedule"],
      }),
      deleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId:
        build.mutation<
          DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse,
          DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.repeatedScheduleId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Schedule"],
        }),
      getV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId:
        build.query<
          GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse,
          GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.repeatedScheduleId}`,
          }),
          providesTags: ["Schedule"],
        }),
      patchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId:
        build.mutation<
          PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse,
          PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.repeatedScheduleId}`,
            method: "PATCH",
            body: queryArg.repeatedSchedule,
          }),
          invalidatesTags: ["Schedule"],
        }),
      putV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleId:
        build.mutation<
          PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse,
          PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.repeatedScheduleId}`,
            method: "PUT",
            body: queryArg.repeatedSchedule,
          }),
          invalidatesTags: ["Schedule"],
        }),
      getV1ProjectsByProjectNameSchedulesSingle: build.query<
        GetV1ProjectsByProjectNameSchedulesSingleApiResponse,
        GetV1ProjectsByProjectNameSchedulesSingleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            regionID: queryArg.regionId,
            siteID: queryArg.siteId,
            hostID: queryArg.hostId,
            unix_epoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["Schedule"],
      }),
      postV1ProjectsByProjectNameSchedulesSingle: build.mutation<
        PostV1ProjectsByProjectNameSchedulesSingleApiResponse,
        PostV1ProjectsByProjectNameSchedulesSingleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single`,
          method: "POST",
          body: queryArg.singleSchedule,
        }),
        invalidatesTags: ["Schedule"],
      }),
      deleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId:
        build.mutation<
          DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse,
          DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.singleScheduleId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Schedule"],
        }),
      getV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId: build.query<
        GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse,
        GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.singleScheduleId}`,
        }),
        providesTags: ["Schedule"],
      }),
      patchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId:
        build.mutation<
          PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse,
          PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.singleScheduleId}`,
            method: "PATCH",
            body: queryArg.singleSchedule,
          }),
          invalidatesTags: ["Schedule"],
        }),
      putV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleId:
        build.mutation<
          PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse,
          PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.singleScheduleId}`,
            method: "PUT",
            body: queryArg.singleSchedule,
          }),
          invalidatesTags: ["Schedule"],
        }),
      getV1ProjectsByProjectNameTelemetryLoggroups: build.query<
        GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse,
        GetV1ProjectsByProjectNameTelemetryLoggroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryLogsGroup"],
      }),
      postV1ProjectsByProjectNameTelemetryLoggroups: build.mutation<
        PostV1ProjectsByProjectNameTelemetryLoggroupsApiResponse,
        PostV1ProjectsByProjectNameTelemetryLoggroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups`,
          method: "POST",
          body: queryArg.telemetryLogsGroup,
        }),
        invalidatesTags: ["TelemetryLogsGroup"],
      }),
      deleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupId:
        build.mutation<
          DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse,
          DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryLogsGroup"],
        }),
      getV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupId:
        build.query<
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse,
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}`,
          }),
          providesTags: ["TelemetryLogsGroup"],
        }),
      getV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofiles:
        build.query<
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse,
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles`,
            params: {
              offset: queryArg.offset,
              pageSize: queryArg.pageSize,
              siteId: queryArg.siteId,
              regionId: queryArg.regionId,
              instanceId: queryArg.instanceId,
              showInherited: queryArg.showInherited,
              orderBy: queryArg.orderBy,
            },
          }),
          providesTags: ["TelemetryLogsProfile"],
        }),
      postV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofiles:
        build.mutation<
          PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse,
          PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles`,
            method: "POST",
            body: queryArg.telemetryLogsProfile,
          }),
          invalidatesTags: ["TelemetryLogsProfile"],
        }),
      deleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileId:
        build.mutation<
          DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse,
          DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles/${queryArg.telemetryLogsProfileId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryLogsProfile"],
        }),
      getV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileId:
        build.query<
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse,
          GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles/${queryArg.telemetryLogsProfileId}`,
          }),
          providesTags: ["TelemetryLogsProfile"],
        }),
      patchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileId:
        build.mutation<
          PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse,
          PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles/${queryArg.telemetryLogsProfileId}`,
            method: "PATCH",
            body: queryArg.telemetryLogsProfile,
          }),
          invalidatesTags: ["TelemetryLogsProfile"],
        }),
      putV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileId:
        build.mutation<
          PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse,
          PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.telemetryLogsGroupId}/logprofiles/${queryArg.telemetryLogsProfileId}`,
            method: "PUT",
            body: queryArg.telemetryLogsProfile,
          }),
          invalidatesTags: ["TelemetryLogsProfile"],
        }),
      getV1ProjectsByProjectNameTelemetryMetricgroups: build.query<
        GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse,
        GetV1ProjectsByProjectNameTelemetryMetricgroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryMetricsGroup"],
      }),
      postV1ProjectsByProjectNameTelemetryMetricgroups: build.mutation<
        PostV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse,
        PostV1ProjectsByProjectNameTelemetryMetricgroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups`,
          method: "POST",
          body: queryArg.telemetryMetricsGroup,
        }),
        invalidatesTags: ["TelemetryMetricsGroup"],
      }),
      deleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupId:
        build.mutation<
          DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse,
          DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryMetricsGroup"],
        }),
      getV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupId:
        build.query<
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse,
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}`,
          }),
          providesTags: ["TelemetryMetricsGroup"],
        }),
      getV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofiles:
        build.query<
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse,
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles`,
            params: {
              offset: queryArg.offset,
              pageSize: queryArg.pageSize,
              siteId: queryArg.siteId,
              regionId: queryArg.regionId,
              instanceId: queryArg.instanceId,
              showInherited: queryArg.showInherited,
              orderBy: queryArg.orderBy,
            },
          }),
          providesTags: ["TelemetryMetricsProfile"],
        }),
      postV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofiles:
        build.mutation<
          PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse,
          PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles`,
            method: "POST",
            body: queryArg.telemetryMetricsProfile,
          }),
          invalidatesTags: ["TelemetryMetricsProfile"],
        }),
      deleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileId:
        build.mutation<
          DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse,
          DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles/${queryArg.telemetryMetricsProfileId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryMetricsProfile"],
        }),
      getV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileId:
        build.query<
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse,
          GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles/${queryArg.telemetryMetricsProfileId}`,
          }),
          providesTags: ["TelemetryMetricsProfile"],
        }),
      patchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileId:
        build.mutation<
          PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse,
          PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles/${queryArg.telemetryMetricsProfileId}`,
            method: "PATCH",
            body: queryArg.telemetryMetricsProfile,
          }),
          invalidatesTags: ["TelemetryMetricsProfile"],
        }),
      putV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileId:
        build.mutation<
          PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse,
          PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.telemetryMetricsGroupId}/metricprofiles/${queryArg.telemetryMetricsProfileId}`,
            method: "PUT",
            body: queryArg.telemetryMetricsProfile,
          }),
          invalidatesTags: ["TelemetryMetricsProfile"],
        }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as eim };
export type GetV1ProjectsByProjectNameComputeApiResponse =
  /** status 200 A compute object */ HostsListRead;
export type GetV1ProjectsByProjectNameComputeApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the compute elements that are assigned with the given siteID. If equals to 'null' then it returns all the hosts not associated to any site. */
  siteId?: string;
  /** Returns only the compute elements that are assigned to the given instanceID. If equals to 'null' then it returns all the hosts not associated to any instance. */
  instanceId?: string;
  /** Returns the compute elements associated with the given UUID. UUID field can't be null, if specified needs to be filled. */
  uuid?: string;
  /** Filter upon the metadata associated to the compute element. Values are expected to be in the form 'key=value'. */
  metadata?: string[];
  /** Indicates if compute elements identified by the filter need to be returned with all their respective child resources, e.g., USBs, Interfaces, Storages. */
  detail?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeHostsApiResponse =
  /** status 200 Array of all host objects */ HostsListRead;
export type GetV1ProjectsByProjectNameComputeHostsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the hosts that are assigned with the given siteID. If equals to 'null' then it returns all the hosts not associated to any site. */
  siteId?: string;
  /** Returns only the hosts that are assigned to the given instanceID. If equals to 'null' then it returns all the hosts not associated to any instance. */
  instanceId?: string;
  /** Returns the host associated with the given UUID. UUID field can't be null, if specified needs to be filled. */
  uuid?: string;
  /** Filter upon the metadata associated to the Host. Values are expected to be in the form 'key=value'. */
  metadata?: string[];
  /** Indicates if Host identified by the filter need to be returned with all their respective child resources, e.g., USBs, Interfaces, Storages. */
  detail?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeHostsApiResponse =
  /** status 201 The Host was created */ HostRead;
export type PostV1ProjectsByProjectNameComputeHostsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  body: HostWrite;
};
export type DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse =
  /** status 204 The host was deleted */ void;
export type DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  hostOperationWithNote: HostOperationWithNote;
};
export type GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse =
  /** status 200 The requested instance based on it's ID */ HostRead;
export type GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse =
  /** status 200 The host was patched */ HostRead;
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: HostWrite & {
    uuid?: any;
  };
};
export type PutV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse =
  /** status 200 The host was updated */ HostRead;
export type PutV1ProjectsByProjectNameComputeHostsAndHostIdApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: HostWrite & {
    uuid?: any;
  };
};
export type PutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateApiResponse =
  /** status 200 The host was invalidated */ void;
export type PutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  hostOperationWithNote: HostOperationWithNote;
};
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardApiResponse =
  /** status 200 The host was set to onboarded */ void;
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiResponse =
  /** status 200 The host registeration info was updated */ void;
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiArg = {
  /** The unique host identifier */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: HostRegisterInfo & {};
};
export type PostV1ProjectsByProjectNameComputeHostsRegisterApiResponse =
  /** status 201 The Host was registered */ HostRead;
export type PostV1ProjectsByProjectNameComputeHostsRegisterApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  hostRegisterInfo: HostRegisterInfo;
};
export type GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse =
  /** status 200 A summary of host objects associated to the given site ID.  */ HostsSummaryRead;
export type GetV1ProjectsByProjectNameComputeHostsSummaryApiArg = {
  /** The site ID the hosts belongs to. If not specified, returns the summary of all hosts. If specified, returns the summary of hosts that have the given site ID applied to them. */
  siteId?: string;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeInstancesApiResponse =
  /** status 200 Array of all instance objects */ InstanceListRead;
export type GetV1ProjectsByProjectNameComputeInstancesApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the instances that are assigned to the given workload member. If equals to 'null' returns all the instances not associated to any workload member. If equal to '' (empty string) returns all the instances that have a workload member associated. */
  workloadMemberId?: string;
  /** Returns the instances associated to the host with the given host ID. */
  hostId?: string;
  /** Returns the instances associated to the hosts in the site identified by the given siteID */
  siteId?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeInstancesApiResponse =
  /** status 201 The instance was created */ InstanceRead;
export type PostV1ProjectsByProjectNameComputeInstancesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  body: InstanceWrite;
};
export type DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 204 The instance was deleted */ void;
export type DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier */
  instanceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 200 The requested instance based on it's ID */ InstanceRead;
export type GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier */
  instanceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 200 The instance was patched */ InstanceRead;
export type PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier */
  instanceId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: InstanceWrite & {
    securityFeature?: any;
  };
};
export type PutV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidateApiResponse =
  /** status 200 The instance was invalidated */ void;
export type PutV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidateApiArg =
  {
    /** The unique instance identifier */
    instanceId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameComputeOsApiResponse =
  /** status 200 Array of all OS resource objects */ OperatingSystemResourceListRead;
export type GetV1ProjectsByProjectNameComputeOsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeOsApiResponse =
  /** status 201 The OS resource was created */ OperatingSystemResourceRead;
export type PostV1ProjectsByProjectNameComputeOsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  operatingSystemResource: OperatingSystemResource;
};
export type DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 204 The OS resource was deleted */ void;
export type DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 200 The requested OS resource */ OperatingSystemResourceRead;
export type GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 200 The OS resource was patched */ OperatingSystemResourceRead;
export type PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: OperatingSystemResource & {
    profileName?: any;
    securityFeature?: any;
    sha256?: any;
  };
};
export type PutV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 200 The OS resource was updated */ OperatingSystemResourceRead;
export type PutV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: OperatingSystemResource & {
    profileName?: any;
    securityFeature?: any;
    sha256?: any;
  };
};
export type GetV1ProjectsByProjectNameComputeSchedulesApiResponse =
  /** status 200 Arrays of all schedule objects */ SchedulesListJoinRead;
export type GetV1ProjectsByProjectNameComputeSchedulesApiArg = {
  /** Identifies the paging unique identifier for a single page, starts index at 1. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all schedules (given the other query params). If specified, returns the schedules that have the specified region ID applied to them, i.e., target including the inherited ones (parent region if not null). If null, returns all the schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all schedules (given the other query params). If specified, returns the schedules that have the specified site ID applied to them, i.e., target including the inherited ones. If null, returns all the schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the schedules. If not specified, returns all schedules (given the other query params). If specified, returns the schedules that have the specified host ID applied to them, i.e., target including the inherited ones (parent site if not null). If null, returns all the schedules without a host ID as target. */
  hostId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsApiResponse =
  /** status 200 Array of all workload objects */ WorkloadListRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  kind?: WorkloadKind;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeWorkloadsApiResponse =
  /** status 201 The workload was created */ WorkloadRead;
export type PostV1ProjectsByProjectNameComputeWorkloadsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 204 The workload was deleted */ void;
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The requested workload object given it's ID */ WorkloadRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The workload was patched */ WorkloadRead;
export type PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The workload was updated */ WorkloadRead;
export type PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse =
  /** status 200 The requested workload members */ WorkloadMemberListRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg =
  {
    /** Index of the first item to return. This allows skipping items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
    filter?: string;
    /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** The unique workload identifier */
    workloadId?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    _workloadId: string;
  };
export type PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse =
  /** status 201 The member was added */ WorkloadMemberRead;
export type PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
    workloadMember: WorkloadMemberWrite;
  };
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse =
  /** status 204 The workload member was removed */ void;
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg =
  {
    /** The unique identifier of the workload member */
    workloadMemberId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
  };
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse =
  /** status 200 The requested workload member */ WorkloadMemberRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg =
  {
    /** The unique identifier of the workload member */
    workloadMemberId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
  };
export type GetV1ProjectsByProjectNameLocationsApiResponse =
  /** status 200 Array of the location node objects containing the resources that match the query name parameter. For each type of location the maximum amount of resources to be returned is 20. */ LocationNodeListRead;
export type GetV1ProjectsByProjectNameLocationsApiArg = {
  /** The name of the resource to be queried, given it can be a region and/or site name, if the query parameters below are stated. */
  name?: string;
  /** Indicates if the filter should be applied on the site resources. */
  showSites?: boolean;
  /** Indicates if the filter should be applied on the region resources. */
  showRegions?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameProvidersApiResponse =
  /** status 200 Array of all Provider objects */ ProviderListRead;
export type GetV1ProjectsByProjectNameProvidersApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameProvidersApiResponse =
  /** status 201 The Provider resource was created */ ProviderRead;
export type PostV1ProjectsByProjectNameProvidersApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  provider: Provider;
};
export type DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiResponse =
  /** status 204 The Provider resource was deleted */ void;
export type DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiArg = {
  /** The Provider resource unique identifier */
  providerId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameProvidersAndProviderIdApiResponse =
  /** status 200 The requested Provider resource */ ProviderRead;
export type GetV1ProjectsByProjectNameProvidersAndProviderIdApiArg = {
  /** The Provider resource unique identifier */
  providerId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameRegionsApiResponse =
  /** status 200 Array of all region objects */ RegionsListRead;
export type GetV1ProjectsByProjectNameRegionsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** The parent regionID the regions belong to. If not specified, returns all regions. If specified, returns the regions that have the specified parent applied to them. If null, returns all the regions without a parent. */
  parent?: string;
  /** Indicates if the Region identified by the filter need to be returned with the field totalSites filled. */
  showTotalSites?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameRegionsApiResponse =
  /** status 201 The region was created */ RegionRead;
export type PostV1ProjectsByProjectNameRegionsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 204 The region was deleted */ void;
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The requested region */ RegionRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The region was patched */ RegionRead;
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The region was updated */ RegionRead;
export type PutV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  /** status 200 Array of all site objects */ SitesListRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only item of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** The region ID the sites belong to. If not specified, returns all sites (given the other query params). If specified, returns the sites that have the specified region ID applied to them. If null, returns all the sites without a regionID */
  regionId?: string;
  /** The OU ID the sites belong to. If not specified, returns all sites (given the other query params). If specified, returns the sites that have the specified OU ID applied to them. If null, returns all the sites without a ouID. */
  ouId?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  /** status 201 The site was created */ SiteRead;
export type PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 204 The site was deleted */ void;
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The requested site */ SiteRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
};
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The site was patched */ SiteRead;
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The site was updated */ SiteRead;
export type PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type GetV1ProjectsByProjectNameSchedulesRepeatedApiResponse =
  /** status 200 Array of all repeated schedule objects */ RepeatedSchedulesListRead;
export type GetV1ProjectsByProjectNameSchedulesRepeatedApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all repeated schedules (given the other query params). If specified, returns the schedules that have the specified region ID applied to them, i.e., target. If null, returns all repeated schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all repeated schedules (given the other query params). If specified, returns the schedules that have the specified site ID applied to them, i.e., target. If null, returns all repeated schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the repeated schedules. If not specified, returns all repeated schedules (given the other query params). If specified, returns the schedules that have the specified host ID applied to them, i.e., target. If null, returns all repeated schedules without a host ID as target. */
  hostId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameSchedulesRepeatedApiResponse =
  /** status 201 The repeated schedule was created */ SingleScheduleRead;
export type PostV1ProjectsByProjectNameSchedulesRepeatedApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  repeatedSchedule: SingleScheduleWrite;
};
export type DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 204 The repeated schedule was deleted */ void;
export type DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The requested repeated schedule */ SingleScheduleRead;
export type GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The repeated schedule was patched */ SingleScheduleRead;
export type PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    repeatedSchedule: SingleScheduleWrite;
  };
export type PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The repeated schedule was updated */ SingleScheduleRead;
export type PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    repeatedSchedule: SingleScheduleWrite;
  };
export type GetV1ProjectsByProjectNameSchedulesSingleApiResponse =
  /** status 200 Array of all single schedule objects */ SingleSchedulesListRead;
export type GetV1ProjectsByProjectNameSchedulesSingleApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all single schedules (given the other query params). If specified, returns the schedules that have the specified region ID applied to them, i.e., target. If null, returns all single schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all single schedules (given the other query params). If specified, returns the schedules that have the specified site ID applied to them, i.e., target. If null, returns all single schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the single schedules. If not specified, returns all single schedules (given the other query params). If specified, returns the schedules that have the specified host ID applied to them, i.e., target. If null, returns all single schedules without a host ID as target. */
  hostId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameSchedulesSingleApiResponse =
  /** status 201 The single schedule was created */ SingleScheduleRead2;
export type PostV1ProjectsByProjectNameSchedulesSingleApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  singleSchedule: SingleScheduleWrite2;
};
export type DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 204 The single schedule was deleted */ void;
export type DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The requested single schedule */ SingleScheduleRead2;
export type GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The single schedule was patched */ SingleScheduleRead2;
export type PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    singleSchedule: SingleScheduleWrite2;
  };
export type PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The single schedule was updated */ SingleScheduleRead2;
export type PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    singleSchedule: SingleScheduleWrite2;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse =
  /** status 200 Array of all telemetry logs groups */ TelemetryLogsGroupListRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameTelemetryLoggroupsApiResponse =
  /** status 201 The telemetry logs group was created */ TelemetryLogsGroupRead;
export type PostV1ProjectsByProjectNameTelemetryLoggroupsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  telemetryLogsGroup: TelemetryLogsGroup;
};
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse =
  /** status 204 The telemetry logs group was deleted */ void;
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier */
    telemetryLogsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse =
  /** status 200 The requested telemetry logs group */ TelemetryLogsGroupRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier */
    telemetryLogsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse =
  /** status 200 Array of all Telemetry Logs Profiles */ TelemetryLogsProfileListRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg =
  {
    /** Index of the first item to return. This allows skipping items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Returns only the telemetry profiles that are assigned with the given siteID. */
    siteId?: string;
    /** Returns only the telemetry profiles that are assigned with the given regionID. */
    regionId?: string;
    /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
    instanceId?: string;
    /** Indicates if listed telemetry profiles should be extended with telemetry profiles rendered from hierarchy. This flag is used along with one of siteId, regionId or instanceId. If siteId, regionId or instanceId are not set, this flag is ignored. */
    showInherited?: boolean;
    /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse =
  /** status 201 The telemetry profile was created */ TelemetryLogsProfileRead;
export type PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 204 The telemetry logs profile was deleted */ void;
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The requested telemetry logs profile */ TelemetryLogsProfileRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The telemetry logs profile was patched */ TelemetryLogsProfileRead;
export type PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The telemetry logs profile was updated */ TelemetryLogsProfileRead;
export type PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse =
  /** status 200 Array of all telemetry metrics groups */ TelemetryMetricsGroupListRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsApiArg = {
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse =
  /** status 201 The telemetry metrics group was created */ TelemetryMetricsGroupRead;
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  telemetryMetricsGroup: TelemetryMetricsGroup;
};
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse =
  /** status 204 The telemetry metrics group was deleted */ void;
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier */
    telemetryMetricsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse =
  /** status 200 The requested telemetry metrics group */ TelemetryMetricsGroupRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier */
    telemetryMetricsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse =
  /** status 200 Array of all telemetry metrics profiles */ TelemetryLogsProfileListRead2;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg =
  {
    /** Index of the first item to return. This allows skipping items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Returns only the telemetry profiles that are assigned with the given siteID. */
    siteId?: string;
    /** Returns only the telemetry profiles that are assigned with the given regionID. */
    regionId?: string;
    /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
    instanceId?: string;
    /** Indicates if listed telemetry profiles should be extended with telemetry profiles rendered from hierarchy. This flag is only used along with one of siteId, regionId or instanceId. If siteId, regionId or instanceId are not set, this flag is ignored. */
    showInherited?: boolean;
    /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse =
  /** status 201 The telemetry profile was created */ TelemetryMetricsProfileRead;
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
    telemetryMetricsProfile: TelemetryMetricsProfile;
  };
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 204 The telemetry metrics profile was deleted */ void;
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The requested telemetry metrics profile */ TelemetryMetricsProfileRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The telemetry metrics profile was patched */ TelemetryMetricsProfileRead;
export type PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
    telemetryMetricsProfile: TelemetryMetricsProfile;
  };
export type PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The telemetry metrics profile was updated */ TelemetryMetricsProfileRead;
export type PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
    telemetryMetricsProfile: TelemetryMetricsProfile;
  };
export type HostsList = {};
export type HostPowerState =
  | "POWER_STATE_UNSPECIFIED"
  | "POWER_STATE_ERROR"
  | "POWER_STATE_ON"
  | "POWER_STATE_OFF";
export type HostState =
  | "HOST_STATE_UNSPECIFIED"
  | "HOST_STATE_ERROR"
  | "HOST_STATE_DELETING"
  | "HOST_STATE_DELETED"
  | "HOST_STATE_ONBOARDED"
  | "HOST_STATE_UNTRUSTED"
  | "HOST_STATE_REGISTERED";
export type StatusIndicator =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type StatusIndicatorRead =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type GenericStatus = {
  indicator: StatusIndicator;
};
export type GenericStatusRead = {
  indicator: StatusIndicatorRead;
  /** A textual message describing carrying a status message. */
  message: string;
  /** A Unix, UTC timestamp when the status was last updated. */
  timestamp: number;
};
export type Metadata = {
  key: string;
  value: string;
}[];
export type MetadataJoin = {
  location?: Metadata;
  ou?: Metadata;
};
export type OperatingSystemProvider =
  | "OPERATING_SYSTEM_PROVIDER_UNSPECIFIED"
  | "OPERATING_SYSTEM_PROVIDER_EIM"
  | "OPERATING_SYSTEM_PROVIDER_LENOVO";
export type OperatingSystemType =
  | "OPERATING_SYSTEM_TYPE_UNSPECIFIED"
  | "OPERATING_SYSTEM_TYPE_MUTABLE"
  | "OPERATING_SYSTEM_TYPE_IMMUTABLE";
export type SecurityFeature =
  | "SECURITY_FEATURE_UNSPECIFIED"
  | "SECURITY_FEATURE_NONE"
  | "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
export type OperatingSystemResource = {
  /** The OS resource architecture. */
  architecture?: string;
  /** A unique identifier of OS image that can be retrieved from running OS. */
  imageId?: string;
  /** The URL repository of the OS image. If set, overwrites repoUrl. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Should not contain version info. */
  installedPackages?: string;
  /** The OS resource kernel command. */
  kernelCommand?: string;
  /** The OS resource name. */
  name?: string;
  osProvider?: OperatingSystemProvider;
  osType?: OperatingSystemType;
  /** Name of OS profile that the OS resource belongs to. */
  profileName?: string;
  /** The URL repository of the OS update sources. Deprecated. Use imageUrl to filter upon repoUrl. */
  repoUrl?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  /** The list of OS resource update sources. */
  updateSources: string[];
};
export type OperatingSystemResourceRead = {
  /** The OS resource architecture. */
  architecture?: string;
  /** A unique identifier of OS image that can be retrieved from running OS. */
  imageId?: string;
  /** The URL repository of the OS image. If set, overwrites repoUrl. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Should not contain version info. */
  installedPackages?: string;
  /** The OS resource kernel command. */
  kernelCommand?: string;
  /** The OS resource name. */
  name?: string;
  osProvider?: OperatingSystemProvider;
  /** The OS resource unique identifier. Alias of resourceId */
  osResourceID?: string;
  osType?: OperatingSystemType;
  /** Name of OS profile that the OS resource belongs to. */
  profileName?: string;
  /** Version of OS profile that the OS resource belongs to. */
  profileVersion?: string;
  /** The URL repository of the OS update sources. Deprecated. Use imageUrl to filter upon repoUrl. */
  repoUrl?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  /** The list of OS resource update sources. */
  updateSources: string[];
};
export type InstanceState =
  | "INSTANCE_STATE_UNSPECIFIED"
  | "INSTANCE_STATE_ERROR"
  | "INSTANCE_STATE_RUNNING"
  | "INSTANCE_STATE_UNTRUSTED"
  | "INSTANCE_STATE_DELETED";
export type InstanceKind = "INSTANCE_KIND_UNSPECIFIED" | "INSTANCE_KIND_METAL";
export type Instance = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: Host;
  instanceStatus?: GenericStatus;
  kind?: InstanceKind;
  /** The Instance Human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  provisioningStatus?: GenericStatus;
  securityFeature?: SecurityFeature;
  updateStatus?: GenericStatus;
};
export type WorkloadKind =
  | "WORKLOAD_KIND_UNSPECIFIED"
  | "WORKLOAD_KIND_CLUSTER";
export type Workload = {
  /** The ID of the external resource, used to link to resources outside or FM realm */
  externalId?: string;
  kind: WorkloadKind;
  /** Human-readable name for the Workload. */
  name?: string;
  /** Human-readable status of the Workload. */
  status?: string;
};
export type WorkloadRead = {
  /** The ID of the external resource, used to link to resources outside or FM realm */
  externalId?: string;
  kind: WorkloadKind;
  members: WorkloadMember[];
  /** Human-readable name for the Workload. */
  name?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  /** Human-readable status of the Workload. */
  status?: string;
  /** The Workload unique identifier. Alias of resourceId */
  workloadId?: string;
};
export type WorkloadWrite = {
  /** The ID of the external resource, used to link to resources outside or FM realm */
  externalId?: string;
  kind: WorkloadKind;
  /** Human-readable name for the Workload. */
  name?: string;
  /** Human-readable status of the Workload. */
  status?: string;
};
export type WorkloadMember = {
  instance?: Instance;
  /** Type of Workload Member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: Instance;
  workload?: Workload;
};
export type WorkloadMemberRead = {
  instance?: InstanceRead;
  /** Type of Workload Member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: InstanceRead;
  /** resource ID, generated by inventory on Create */
  resourceId: string;
  workload?: WorkloadRead;
  /** The Workload Member unique identifier. Alias of resourceId. */
  workloadMemberId: string;
};
export type WorkloadMemberWrite = {
  instance?: Instance;
  /** The unique identifier of the Instance. */
  instanceId: string;
  /** Type of Workload Member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: Instance;
  workload?: WorkloadWrite;
  /** The unique identifier of the workload. */
  workloadId: string;
};
export type InstanceRead = {
  currentOs?: OperatingSystemResourceRead;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResourceRead;
  desiredState?: InstanceState;
  host?: Host;
  /** The Instance unique identifier. Alias of resourceID. */
  instanceID?: string;
  instanceStatus?: GenericStatusRead;
  kind?: InstanceKind;
  /** The Instance Human-readable name. */
  name?: string;
  os?: OperatingSystemResourceRead;
  provisioningStatus?: GenericStatusRead;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  updateStatus?: GenericStatusRead;
  /** Beta: The detailed description of the Instance last software update. */
  updateStatusDetail?: string;
  /** The workload members associated with the Instance. */
  workloadMembers?: WorkloadMemberRead[];
};
export type InstanceWrite = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: Host;
  /** The host unique identifier associated with the instance. */
  hostID?: string;
  instanceStatus?: GenericStatus;
  kind?: InstanceKind;
  /** The Instance Human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  /** The unique identifier of OS resource that should be installed on the Instance. */
  osID?: string;
  provisioningStatus?: GenericStatus;
  securityFeature?: SecurityFeature;
  updateStatus?: GenericStatus;
};
export type ProviderKind =
  | "PROVIDER_KIND_UNSPECIFIED"
  | "PROVIDER_KIND_BAREMETAL"
  | "PROVIDER_KIND_LICENSING";
export type ProviderVendor =
  | "PROVIDER_VENDOR_UNSPECIFIED"
  | "PROVIDER_VENDOR_LENOVO_LXCA"
  | "PROVIDER_VENDOR_LENOVO_LOCA";
export type Provider = {
  /** The Provider list of credentials. */
  apiCredentials?: string[];
  /** The Provider API endpoint. */
  apiEndpoint: string;
  /** Opaque provider configuration. */
  config?: string;
  /** The Provider resource name. */
  name: string;
  providerKind: ProviderKind;
  providerVendor?: ProviderVendor;
};
export type ProviderRead = {
  /** The Provider list of credentials. */
  apiCredentials?: string[];
  /** The Provider API endpoint. */
  apiEndpoint: string;
  /** Opaque provider configuration. */
  config?: string;
  /** The Provider resource name. */
  name: string;
  /** The Provider resource unique identifier. Alias of resourceId */
  providerID?: string;
  providerKind: ProviderKind;
  providerVendor?: ProviderVendor;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
};
export type Ou = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The OU name. */
  name: string;
  /** The OU kind e.g., BU, client */
  ouKind?: string;
  /** The parent OU unique identifier that the OU is associated to, when existent. */
  parentOu?: string;
};
export type OuRead = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The OU name. */
  name: string;
  /** The OU unique identifier. Alias of resourceId */
  ouID?: string;
  /** The OU kind e.g., BU, client */
  ouKind?: string;
  /** The parent OU unique identifier that the OU is associated to, when existent. */
  parentOu?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
};
export type Proxy = {
  /** The FTP proxy. */
  ftpProxy?: string;
  /** The HTTP proxy. */
  httpProxy?: string;
  /** The HTTPS proxy. */
  httpsProxy?: string;
  /** The no proxy info. */
  noProxy?: string;
};
export type Region = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region name. */
  name?: string;
  parentRegion?: Region;
};
export type RegionRead = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region name. */
  name?: string;
  parentRegion?: RegionRead;
  /** The Region unique identifier. Alias of resourceId. */
  regionID?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  /** Total number of sites associated to this region directly or by child regions. */
  totalSites?: number;
};
export type RegionWrite = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region name. */
  name?: string;
  /** The parent Region unique identifier that the region is associated to, when existent. This field can not be used in filter. */
  parentId?: string;
  parentRegion?: RegionWrite;
};
export type Site = {
  /** The list of DNS servers, the Site has available. */
  dnsServers?: string[];
  /** The set of Docker registries, the Site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of Site available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The Site human readable name. */
  name?: string;
  ou?: Ou;
  provider?: Provider;
  proxy?: Proxy;
  region?: Region;
  /** The geolocation latitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLat should be in the range +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLng should be in the range +/- 180 degrees (inclusive). */
  siteLng?: number;
};
export type SiteRead = {
  /** The list of DNS servers, the Site has available. */
  dnsServers?: string[];
  /** The set of Docker registries, the Site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of Site available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The Site human readable name. */
  name?: string;
  ou?: OuRead;
  provider?: ProviderRead;
  proxy?: Proxy;
  region?: RegionRead;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  /** The Site unique identifier. Alias of resourceId. */
  siteID?: string;
  /** The geolocation latitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLat should be in the range +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLng should be in the range +/- 180 degrees (inclusive). */
  siteLng?: number;
};
export type SiteWrite = {
  /** The list of DNS servers, the Site has available. */
  dnsServers?: string[];
  /** The set of Docker registries, the Site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of Site available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The Site human readable name. */
  name?: string;
  ou?: Ou;
  /** The OU unique identifier that the Site is associated to, when existent. This field can not be used in filter. */
  ouId?: string;
  provider?: Provider;
  proxy?: Proxy;
  region?: RegionWrite;
  /** The region unique identifier that the Site is associated to. This field can not be used in filter. */
  regionId?: string;
  /** The geolocation latitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLat should be in the range +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the Site. Points are represented as latitude-longitude pairs in the E7 representation (degrees multiplied by 10**7 and rounded to the nearest integer). siteLng should be in the range +/- 180 degrees (inclusive). */
  siteLng?: number;
};
export type Host = {
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  hostStatus?: GenericStatus;
  inheritedMetadata?: MetadataJoin;
  instance?: Instance;
  licenseStatusIndicator?: StatusIndicator;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  onboardingStatus?: GenericStatus;
  provider?: Provider;
  registrationStatus?: GenericStatus;
  site?: Site;
  /** The host UUID identifier, UUID is unique an immutable. */
  uuid?: string;
};
export type Status = {
  /** The type of the status condition. */
  type:
    | "STATUS_CONDITION_UNSPECIFIED"
    | "STATUS_CONDITION_ERROR"
    | "STATUS_CONDITION_RUNNING"
    | "STATUS_CONDITION_STOPPED"
    | "STATUS_CONDITION_DELETED"
    | "STATUS_CONDITION_INVALIDATED";
};
export type StatusRead = {
  /** The condition of the status */
  condition: string;
  /** the details of the status. */
  details?: string;
  /** Explains the reason for a change of status condition */
  reason?: string;
  /** The last timestamp the condition of the status was updated */
  timestamp: string;
  /** The type of the status condition. */
  type:
    | "STATUS_CONDITION_UNSPECIFIED"
    | "STATUS_CONDITION_ERROR"
    | "STATUS_CONDITION_RUNNING"
    | "STATUS_CONDITION_STOPPED"
    | "STATUS_CONDITION_DELETED"
    | "STATUS_CONDITION_INVALIDATED";
};
export type HostResourcesGpu = {
  status?: Status;
};
export type HostResourcesGpuRead = {
  /** The specific GPU device capabilities (e.g., pciexpress, msi, pm). */
  capabilities?: string[];
  /** The human-readable GPU device description. */
  description?: string;
  /** The GPU device name. */
  deviceName?: string;
  /** The GPU device PCI identifier. */
  pciId?: string;
  /** The GPU device model. */
  product?: string;
  status?: StatusRead;
  /** The GPU device vendor. */
  vendor?: string;
};
export type LinkState = {};
export type LinkStateRead = {
  /** The last timestamp the Link State was updated. */
  timestamp: string;
  /** the type of the state. */
  type: "LINK_STATE_UNSPECIFIED" | "LINK_STATE_UP" | "LINK_STATE_DOWN";
};
export type Amount = string;
export type HostResourcesInterface = {
  linkState?: LinkState;
  mtu?: Amount;
  status?: Status;
};
export type IpAddress = {};
export type IpAddressRead = {
  /** CIDR representation of the IP Address. */
  address: any;
  /** Specifies how the ip address is configured. */
  configMethod:
    | "IP_ADDRESS_CONFIG_MODE_UNSPECIFIED"
    | "IP_ADDRESS_CONFIG_MODE_STATIC"
    | "IP_ADDRESS_CONFIG_MODE_DYNAMIC";
  /** The status of the ip address. */
  status?:
    | "IP_ADDRESS_STATUS_UNSPECIFIED"
    | "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR"
    | "IP_ADDRESS_STATUS_ASSIGNED"
    | "IP_ADDRESS_STATUS_CONFIGURATION_ERROR"
    | "IP_ADDRESS_STATUS_CONFIGURED"
    | "IP_ADDRESS_STATUS_RELEASED"
    | "IP_ADDRESS_STATUS_ERROR";
  /** The details of the status of the IP Address. */
  statusDetail?: string;
};
export type HostResourcesInterfaceRead = {
  /** Defines if the card is the bmc interface. */
  bmcInterface?: boolean;
  /** The interface name. */
  deviceName?: string;
  /** The interface IPAddress list. */
  ipaddresses?: IpAddressRead[];
  linkState?: LinkStateRead;
  /** The interface MAC address. */
  macAddr?: string;
  mtu?: Amount;
  /** The interface PCI identifier. */
  pciIdentifier?: string;
  /** A flag that represents if the interface has SR-IOV support. */
  sriovEnabled?: boolean;
  /** The number of VFs currently provisioned on the interface, if SR-IOV is supported. */
  sriovVfsNum?: number;
  /** The maximum number of VFs the interface supports, if SR-IOV is supported. */
  sriovVfsTotal?: number;
  status?: StatusRead;
};
export type HostResourcesStorage = {
  capacityBytes?: Amount;
  status?: Status;
};
export type HostResourcesStorageRead = {
  capacityBytes?: Amount;
  /** The storage device name. */
  deviceName?: string;
  /** The storage model. */
  model?: string;
  /** The storage device unique serial number. */
  serial?: string;
  status?: StatusRead;
  /** The storage vendor. */
  vendor?: string;
  /** The storage device unique identifier. */
  wwid?: string;
};
export type HostResourcesUsb = {
  status?: Status;
};
export type HostResourcesUsbRead = {
  /** USB Device number assigned by OS. */
  addr?: string;
  /** Bus number of device connected with. */
  bus?: string;
  /** Class defined by USB-IF. */
  class?: string;
  /** The USB device name. */
  deviceName?: string;
  /** Hexadecimal number representing ID of the USB device product. */
  idProduct?: string;
  /** Hexadecimal number representing ID of the USB device vendor. */
  idVendor?: string;
  /** Serial number of the USB device. */
  serial?: string;
  status?: StatusRead;
};
export type HostRead = {
  /** The release date of the host BIOS */
  biosReleaseDate?: string;
  /** The vendor of the host BIOS */
  biosVendor?: string;
  /** The version of the host BIOS */
  biosVersion?: string;
  /** BMC IP address, such as "192.0.0.1" */
  bmcIp?: string;
  /** Kind of BMC */
  bmcKind?:
    | "BAREMETAL_CONTROLLER_KIND_UNSPECIFIED"
    | "BAREMETAL_CONTROLLER_KIND_NONE"
    | "BAREMETAL_CONTROLLER_KIND_IPMI"
    | "BAREMETAL_CONTROLLER_KIND_VPRO"
    | "BAREMETAL_CONTROLLER_KIND_PDU"
    | "BAREMETAL_CONTROLLER_KIND_FDO";
  /** Architecture of the CPU model, e.g. x86_64 */
  cpuArchitecture?: string;
  /** String list of all CPU capabilities (possibly JSON) */
  cpuCapabilities?: string;
  /** Number of CPU cores */
  cpuCores?: number;
  /** CPU model of the Host */
  cpuModel?: string;
  /** Number of physical CPU sockets */
  cpuSockets?: number;
  /** Total Number of threads supported by the CPU */
  cpuThreads?: number;
  /** A JSON field describing CPU topology. The CPU topology may contain, among others, information about CPU core types, their layout and mapping to CPU sockets */
  cpuTopology?: string;
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  /** The list of GPU capabilities. */
  hostGpus?: HostResourcesGpuRead[];
  /** The list of interface capabilities. */
  hostNics?: HostResourcesInterfaceRead[];
  hostStatus?: GenericStatusRead;
  /** The list of storage capabilities. */
  hostStorages?: HostResourcesStorageRead[];
  /** The list of USB capabilities. */
  hostUsbs?: HostResourcesUsbRead[];
  /** The host name. */
  hostname?: string;
  inheritedMetadata?: MetadataJoin;
  instance?: InstanceRead;
  /** The timestamp when the host license expires. */
  licenseExpirationTimestamp?: number;
  /** The status of the host license. */
  licenseStatus?: string;
  licenseStatusIndicator?: StatusIndicatorRead;
  /** The timestamp when the host license status was last updated. */
  licenseStatusTimestamp?: number;
  /** Quantity of memory (RAM) in the system in bytes. */
  memoryBytes?: string;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  /** The note associated to the host */
  note?: string;
  onboardingStatus?: GenericStatusRead;
  /** The host product name */
  productName?: string;
  provider?: ProviderRead;
  registrationStatus?: GenericStatusRead;
  /** resource ID, generated on Create */
  resourceId?: string;
  /** SMBIOS device Serial Number */
  serialNumber?: string;
  site?: SiteRead;
  /** The host UUID identifier, UUID is unique an immutable. */
  uuid?: string;
};
export type HostWrite = {
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  hostStatus?: GenericStatus;
  inheritedMetadata?: MetadataJoin;
  instance?: InstanceWrite;
  licenseStatusIndicator?: StatusIndicator;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  onboardingStatus?: GenericStatus;
  provider?: Provider;
  registrationStatus?: GenericStatus;
  site?: SiteWrite;
  /** The site where the host is located. */
  siteId?: string;
  /** The host UUID identifier, UUID is unique an immutable. */
  uuid?: string;
};
export type HostsListRead = {
  /** Indicates if there are more hosts available to be retrieved. */
  hasNext: boolean;
  hosts: HostRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type HostsListWrite = {};
export type ProblemDetails = {};
export type ProblemDetailsRead = {
  /** Contains detailed information about the problem, such as its source data that can be used for debugging purposes. */
  message?: string;
};
export type HostOperationWithNote = {
  note: string;
};
export type HostRegisterInfo = {
  /** Set to enforce auto-onboarding of the host, meaning that no confirmation will be required when the host connects the first time to the orchestrator. */
  autoOnboard?: boolean;
  /** The host name. */
  name?: string;
  /** The host SMBIOS Serial Number. */
  serialNumber?: string;
  /** The host UUID identifier. */
  uuid?: string;
};
export type HostsSummary = {};
export type HostsSummaryRead = {
  error?: number;
  running?: number;
  total?: number;
  unallocated?: number;
};
export type InstanceList = {};
export type InstanceListRead = {
  /** Indicates if there are more Instance objects available to be retrieved. */
  hasNext: boolean;
  instances: InstanceRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type InstanceListWrite = {};
export type OperatingSystemResourceList = {};
export type OperatingSystemResourceListRead = {
  OperatingSystemResources: OperatingSystemResourceRead[];
  /** Indicates if there are more Operating System objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SchedulesListJoin = {};
export type ScheduleStatus =
  | "SCHEDULE_STATUS_UNSPECIFIED"
  | "SCHEDULE_STATUS_MAINTENANCE"
  | "SCHEDULE_STATUS_OS_UPDATE";
export type SingleSchedule = {
  cronDayMonth: string;
  cronDayWeek: string;
  cronHours: string;
  cronMinutes: string;
  cronMonth: string;
  /** The duration in seconds of the Repeated Schedule per each schedule. */
  durationSeconds: number;
  /** The schedule name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: Host;
  targetRegion?: Region;
  targetSite?: Site;
};
export type SingleScheduleRead = {
  cronDayMonth: string;
  cronDayWeek: string;
  cronHours: string;
  cronMinutes: string;
  cronMonth: string;
  /** The duration in seconds of the Repeated Schedule per each schedule. */
  durationSeconds: number;
  /** The schedule name. */
  name?: string;
  /** The Repeated Schedule unique identifier. Alias of resourceId. */
  repeatedScheduleID?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostRead;
  targetRegion?: RegionRead;
  targetSite?: SiteRead;
};
export type SingleScheduleWrite = {
  cronDayMonth: string;
  cronDayWeek: string;
  cronHours: string;
  cronMinutes: string;
  cronMonth: string;
  /** The duration in seconds of the Repeated Schedule per each schedule. */
  durationSeconds: number;
  /** The schedule name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostWrite;
  /** The target hostID of the schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionWrite;
  /** The target regionID of the Schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteWrite;
  /** The target siteID of the schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetSiteId?: string;
};
export type SingleSchedule2 = {
  /** The end time in seconds of the Single Schedule. The value of endSeconds must be equal or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds of the Single Schedule. */
  startSeconds: number;
  targetHost?: Host;
  targetRegion?: Region;
  targetSite?: Site;
};
export type SingleScheduleRead2 = {
  /** The end time in seconds of the Single Schedule. The value of endSeconds must be equal or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule name. */
  name?: string;
  /** resource ID, generated by inventory on Create */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  /** The Single Schedule unique identifier. Alias of resourceId. */
  singleScheduleID?: string;
  /** The start time in seconds of the Single Schedule. */
  startSeconds: number;
  targetHost?: HostRead;
  targetRegion?: RegionRead;
  targetSite?: SiteRead;
};
export type SingleScheduleWrite2 = {
  /** The end time in seconds of the Single Schedule. The value of endSeconds must be equal or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds of the Single Schedule. */
  startSeconds: number;
  targetHost?: HostWrite;
  /** The target hostID of the Schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionWrite;
  /** The target regionID of the Schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteWrite;
  /** The target siteID of the Schedule. Only one of target can be provided per each schedule. This field can not be used as filter. */
  targetSiteId?: string;
};
export type SchedulesListJoinRead = {
  /** Contains a flat list of Repeated Schedule possibly including all inherited ones. */
  RepeatedSchedules: SingleScheduleRead[];
  /** Contains a flat list of Single Schedule possibly including all inherited ones */
  SingleSchedules: SingleScheduleRead2[];
  /** Indicates if there are more Schedule objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SchedulesListJoinWrite = {};
export type WorkloadList = {};
export type WorkloadListRead = {
  Workloads: WorkloadRead[];
  /** Indicates if there are more Workload objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type WorkloadListWrite = {};
export type WorkloadMemberList = {};
export type WorkloadMemberListRead = {
  WorkloadMembers: WorkloadMemberRead[];
  /** Indicates if there are more Workload Members objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type WorkloadMemberListWrite = {};
export type LocationNodeList = {};
export type LocationType = "RESOURCE_KIND_REGION" | "RESOURCE_KIND_SITE";
export type LocationTypeRead = "RESOURCE_KIND_REGION" | "RESOURCE_KIND_SITE";
export type LocationNode = {
  type: LocationType;
};
export type LocationNodeRead = {
  /** The node human readable name. */
  name: string;
  /** The associated resource ID, of the parent resource of this Location node. In the case of a region, it could be empty or a regionId. In the case of a site, it could be empty or a regionId. */
  parentId: string;
  /** The associated node resource ID, generated by inventory on Create. */
  resourceId: string;
  type: LocationTypeRead;
};
export type LocationNodeListRead = {
  /** The ordered list of nodes (root to leaf) of the location hierarchy tree of regions and sites. The relationship of root to leaf is limited by the max depth of 7 items. */
  nodes: LocationNodeRead[];
  /** The number of items returned in the nodes array that match the query parameters of the request. */
  outputElements?: number;
  /** The total number of items that match the query parameters of the request. */
  totalElements?: number;
};
export type ProviderList = {};
export type ProviderListRead = {
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  providers: ProviderRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RegionsList = {};
export type RegionsListRead = {
  /** Indicates if there are more Location objects available to be retrieved. */
  hasNext: boolean;
  regions: RegionRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RegionsListWrite = {};
export type SitesList = {};
export type SitesListRead = {
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  sites: SiteRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SitesListWrite = {};
export type RepeatedSchedulesList = {};
export type RepeatedSchedulesListRead = {
  RepeatedSchedules: SingleScheduleRead[];
  /** Indicates if there are more Repeated Schedule objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RepeatedSchedulesListWrite = {};
export type SingleSchedulesList = {};
export type SingleSchedulesListRead = {
  SingleSchedules: SingleScheduleRead2[];
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SingleSchedulesListWrite = {};
export type TelemetryLogsGroupList = {};
export type TelemetryCollectorKind =
  | "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED"
  | "TELEMETRY_COLLECTOR_KIND_HOST"
  | "TELEMETRY_COLLECTOR_KIND_CLUSTER";
export type TelemetryLogsGroup = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the Log group */
  name: string;
};
export type TelemetryLogsGroupRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the Log group */
  name: string;
  /** Unique Identifier of the Telemetry Group. */
  telemetryLogsGroupId?: string;
};
export type TelemetryLogsGroupListRead = {
  TelemetryLogsGroups: TelemetryLogsGroupRead[];
  /** Indicates if there are more Logs Group objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryLogsProfileList = {};
export type TelemetrySeverityLevel =
  | "TELEMETRY_SEVERITY_LEVEL_UNSPECIFIED"
  | "TELEMETRY_SEVERITY_LEVEL_CRITICAL"
  | "TELEMETRY_SEVERITY_LEVEL_ERROR"
  | "TELEMETRY_SEVERITY_LEVEL_WARN"
  | "TELEMETRY_SEVERITY_LEVEL_INFO"
  | "TELEMETRY_SEVERITY_LEVEL_DEBUG";
export type TelemetryLogsProfile = {
  logLevel: TelemetrySeverityLevel;
  logsGroup?: TelemetryLogsGroup;
  /** The unique identifier of the telemetry logs group */
  logsGroupId: string;
  /** The ID of the Instance to which the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion.  */
  targetInstance?: string;
  /** The ID of the Region where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion. */
  targetRegion?: string;
  /** The ID of the Site where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion. */
  targetSite?: string;
};
export type TelemetryLogsProfileRead = {
  logLevel: TelemetrySeverityLevel;
  logsGroup?: TelemetryLogsGroupRead;
  /** The unique identifier of the telemetry logs group */
  logsGroupId: string;
  /** The ID of the telemetry profile */
  profileId?: string;
  /** The ID of the Instance to which the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion.  */
  targetInstance?: string;
  /** The ID of the Region where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion. */
  targetRegion?: string;
  /** The ID of the Site where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion. */
  targetSite?: string;
};
export type TelemetryLogsProfileListRead = {
  TelemetryLogsProfiles: TelemetryLogsProfileRead[];
  /** Indicates if there are more Telemetry Log Profiles objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryMetricsGroupList = {};
export type TelemetryMetricsGroup = {
  collectorKind: TelemetryCollectorKind;
  /** A list of Metrics Groups to collect. */
  groups: string[];
  /** Human-readable name for the Metrics Group */
  name: string;
};
export type TelemetryMetricsGroupRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of Metrics Groups to collect. */
  groups: string[];
  /** Human-readable name for the Metrics Group */
  name: string;
  /** Unique Identifier of the Telemetry Group. */
  telemetryMetricsGroupId?: string;
};
export type TelemetryMetricsGroupListRead = {
  TelemetryMetricsGroups: TelemetryMetricsGroupRead[];
  /** Indicates if there are more Telemetry Metrics Group objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryLogsProfileList2 = {};
export type TelemetryMetricsProfile = {
  metricsGroup?: TelemetryMetricsGroup;
  /** The unique identifier of the telemetry metrics group */
  metricsGroupId: string;
  /** Metrics interval (in seconds) for the telemetry profile. This field should only be defined if type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The ID of the Instance where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetInstance?: string;
  /** The ID of the Region where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetRegion?: string;
  /** The ID of the Site where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetSite?: string;
};
export type TelemetryMetricsProfileRead = {
  metricsGroup?: TelemetryMetricsGroupRead;
  /** The unique identifier of the telemetry metrics group */
  metricsGroupId: string;
  /** Metrics interval (in seconds) for the telemetry profile. This field should only be defined if type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The ID of the telemetry profile */
  profileId?: string;
  /** The ID of the Instance where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetInstance?: string;
  /** The ID of the Region where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetRegion?: string;
  /** The ID of the Site where the telemetry profile is assigned to. Can be only one of targetInstance, targetSite, targetRegion */
  targetSite?: string;
};
export type TelemetryLogsProfileListRead2 = {
  TelemetryMetricsProfiles: TelemetryMetricsProfileRead[];
  /** Indicates if there are more Telemetry Metrics Profiles objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export const {
  useGetV1ProjectsByProjectNameComputeQuery,
  useGetV1ProjectsByProjectNameComputeHostsQuery,
  usePostV1ProjectsByProjectNameComputeHostsMutation,
  useDeleteV1ProjectsByProjectNameComputeHostsAndHostIdMutation,
  useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery,
  usePatchV1ProjectsByProjectNameComputeHostsAndHostIdMutation,
  usePutV1ProjectsByProjectNameComputeHostsAndHostIdMutation,
  usePutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateMutation,
  usePatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardMutation,
  usePatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterMutation,
  usePostV1ProjectsByProjectNameComputeHostsRegisterMutation,
  useGetV1ProjectsByProjectNameComputeHostsSummaryQuery,
  useGetV1ProjectsByProjectNameComputeInstancesQuery,
  usePostV1ProjectsByProjectNameComputeInstancesMutation,
  useDeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdMutation,
  useGetV1ProjectsByProjectNameComputeInstancesAndInstanceIdQuery,
  usePatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdMutation,
  usePutV1ProjectsByProjectNameComputeInstancesAndInstanceIdInvalidateMutation,
  useGetV1ProjectsByProjectNameComputeOsQuery,
  usePostV1ProjectsByProjectNameComputeOsMutation,
  useDeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdMutation,
  useGetV1ProjectsByProjectNameComputeOsAndOsResourceIdQuery,
  usePatchV1ProjectsByProjectNameComputeOsAndOsResourceIdMutation,
  usePutV1ProjectsByProjectNameComputeOsAndOsResourceIdMutation,
  useGetV1ProjectsByProjectNameComputeSchedulesQuery,
  useGetV1ProjectsByProjectNameComputeWorkloadsQuery,
  usePostV1ProjectsByProjectNameComputeWorkloadsMutation,
  useDeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMutation,
  useGetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdQuery,
  usePatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMutation,
  usePutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMutation,
  useGetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersQuery,
  usePostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersMutation,
  useDeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdMutation,
  useGetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdQuery,
  useGetV1ProjectsByProjectNameLocationsQuery,
  useGetV1ProjectsByProjectNameProvidersQuery,
  usePostV1ProjectsByProjectNameProvidersMutation,
  useDeleteV1ProjectsByProjectNameProvidersAndProviderIdMutation,
  useGetV1ProjectsByProjectNameProvidersAndProviderIdQuery,
  useGetV1ProjectsByProjectNameRegionsQuery,
  usePostV1ProjectsByProjectNameRegionsMutation,
  useDeleteV1ProjectsByProjectNameRegionsAndRegionIdMutation,
  useGetV1ProjectsByProjectNameRegionsAndRegionIdQuery,
  usePatchV1ProjectsByProjectNameRegionsAndRegionIdMutation,
  usePutV1ProjectsByProjectNameRegionsAndRegionIdMutation,
  useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesQuery,
  usePostV1ProjectsByProjectNameRegionsAndRegionIdSitesMutation,
  useDeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdMutation,
  useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery,
  usePatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdMutation,
  usePutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdMutation,
  useGetV1ProjectsByProjectNameSchedulesRepeatedQuery,
  usePostV1ProjectsByProjectNameSchedulesRepeatedMutation,
  useDeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdMutation,
  useGetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdQuery,
  usePatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdMutation,
  usePutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdMutation,
  useGetV1ProjectsByProjectNameSchedulesSingleQuery,
  usePostV1ProjectsByProjectNameSchedulesSingleMutation,
  useDeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation,
  useGetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdQuery,
  usePatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation,
  usePutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation,
  useGetV1ProjectsByProjectNameTelemetryLoggroupsQuery,
  usePostV1ProjectsByProjectNameTelemetryLoggroupsMutation,
  useDeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdMutation,
  useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdQuery,
  useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesQuery,
  usePostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesMutation,
  useDeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation,
  useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdQuery,
  usePatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation,
  usePutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation,
  useGetV1ProjectsByProjectNameTelemetryMetricgroupsQuery,
  usePostV1ProjectsByProjectNameTelemetryMetricgroupsMutation,
  useDeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMutation,
  useGetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdQuery,
  useGetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesQuery,
  usePostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesMutation,
  useDeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation,
  useGetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdQuery,
  usePatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation,
  usePutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation,
} = injectedRtkApi;
