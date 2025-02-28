import { eimApi as api } from "./apiSlice";
export const addTagTypes = [
  "Compute",
  "Host",
  "Instance",
  "OS",
  "Schedule",
  "Workload",
  "LocalAccount",
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
      getV1ProjectsByProjectNameLocalAccounts: build.query<
        GetV1ProjectsByProjectNameLocalAccountsApiResponse,
        GetV1ProjectsByProjectNameLocalAccountsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts`,
          params: {
            offset: queryArg.offset,
            pageSize: queryArg.pageSize,
            filter: queryArg.filter,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["LocalAccount"],
      }),
      postV1ProjectsByProjectNameLocalAccounts: build.mutation<
        PostV1ProjectsByProjectNameLocalAccountsApiResponse,
        PostV1ProjectsByProjectNameLocalAccountsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts`,
          method: "POST",
          body: queryArg.localAccount,
        }),
        invalidatesTags: ["LocalAccount"],
      }),
      deleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountId:
        build.mutation<
          DeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiResponse,
          DeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/localAccounts/${queryArg.localAccountId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["LocalAccount"],
        }),
      getV1ProjectsByProjectNameLocalAccountsAndLocalAccountId: build.query<
        GetV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiResponse,
        GetV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts/${queryArg.localAccountId}`,
        }),
        providesTags: ["LocalAccount"],
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
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the compute elements that are assigned with the given site ID. If equals to 'null', then it returns all the hosts not associated with any site. */
  siteId?: string;
  /** Returns only the compute elements that are assigned to the given instanceID. If equals to 'null', then it returns all the hosts not associated with any instance. */
  instanceId?: string;
  /** Returns the compute elements associated with the given UUID. UUID field cannot be null, if specified needs to be filled. */
  uuid?: string;
  /** Filters the metadata associated with the compute element. Values are expected to be in the form of 'key=value'. */
  metadata?: string[];
  /** Indicates if compute elements identified by the filter need to be returned with all their respective child resources, e.g., USBs, Interfaces, Storages. */
  detail?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeHostsApiResponse =
  /** status 200 Array of all host objects */ HostsListRead;
export type GetV1ProjectsByProjectNameComputeHostsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the hosts that are assigned with the given site ID. If equals to 'null', then it returns all the hosts not associated with any site. */
  siteId?: string;
  /** Returns only the hosts that are assigned to the given instanceID. If equals to 'null', then it returns all the hosts not associated with any instance. */
  instanceId?: string;
  /** Returns the host associated with the given UUID. UUID field cannot be null, if specified needs to be filled. */
  uuid?: string;
  /** Filters the metadata associated with the Host. Values are expected to be in the form 'key=value'. */
  metadata?: string[];
  /** Indicates if the host identified by the filter needs to be returned with all their respective child resources, e.g., USBs, interfaces, and storages. */
  detail?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeHostsApiResponse =
  /** status 201 The host was created. */ HostRead;
export type PostV1ProjectsByProjectNameComputeHostsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  body: HostWrite;
};
export type DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse =
  /** status 204 The host was deleted. */ void;
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
  /** status 200 The host was patched. */ HostRead;
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
  /** status 200 The host was onboarded. */ void;
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardApiArg = {
  /** The unique host identifier. */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiResponse =
  /** status 200 The host registration information was updated. */ void;
export type PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiArg = {
  /** The unique host identifier. */
  hostId: string;
  /** unique projectName for the resource */
  projectName: string;
  body: HostRegisterInfo & {};
};
export type PostV1ProjectsByProjectNameComputeHostsRegisterApiResponse =
  /** status 201 The host was registered. */ HostRead;
export type PostV1ProjectsByProjectNameComputeHostsRegisterApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  hostRegisterInfo: HostRegisterInfo;
};
export type GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse =
  /** status 200 A summary of host objects associated with the given site ID.  */ HostsSummaryRead;
export type GetV1ProjectsByProjectNameComputeHostsSummaryApiArg = {
  /** The site ID the hosts belong to. If not specified, returns the summary of all hosts. If specified, returns the summary of hosts that have the given site ID applied to them. */
  siteId?: string;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeInstancesApiResponse =
  /** status 200 Array of all instance objects. */ InstanceListRead;
export type GetV1ProjectsByProjectNameComputeInstancesApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the instances that are assigned to the given workload member. If equals to 'null', returns all instances not associated with any workload member. If equal to '' (empty string), returns all instances that have a workload member associated. */
  workloadMemberId?: string;
  /** Returns the instances associated with the host with the given host ID. */
  hostId?: string;
  /** Returns the instances associated with the hosts in the site identified. by the given siteID */
  siteId?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeInstancesApiResponse =
  /** status 201 The instance was created. */ InstanceRead;
export type PostV1ProjectsByProjectNameComputeInstancesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  body: InstanceWrite;
};
export type DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 204 The instance was deleted. */ void;
export type DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier. */
  instanceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 200 The requested instance based on its ID. */ InstanceRead;
export type GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier. */
  instanceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse =
  /** status 200 The instance was patched. */ InstanceRead;
export type PatchV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg = {
  /** The unique instance identifier. */
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
    /** The unique instance identifier. */
    instanceId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameComputeOsApiResponse =
  /** status 200 Array of all OS resource objects. */ OperatingSystemResourceListRead;
export type GetV1ProjectsByProjectNameComputeOsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeOsApiResponse =
  /** status 201 The OS resource was created. */ OperatingSystemResourceRead;
export type PostV1ProjectsByProjectNameComputeOsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  operatingSystemResource: OperatingSystemResource;
};
export type DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 204 The OS resource was deleted. */ void;
export type DeleteV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier. */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 200 The requested OS resource. */ OperatingSystemResourceRead;
export type GetV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier. */
  osResourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiResponse =
  /** status 200 The OS resource was patched. */ OperatingSystemResourceRead;
export type PatchV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier. */
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
  /** status 200 The OS resource was updated. */ OperatingSystemResourceRead;
export type PutV1ProjectsByProjectNameComputeOsAndOsResourceIdApiArg = {
  /** The unique OS resource identifier. */
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
  /** status 200 Arrays of all schedule objects. */ SchedulesListJoinRead;
export type GetV1ProjectsByProjectNameComputeSchedulesApiArg = {
  /** Identifies the paging unique identifier for a single page, starts index at 1. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all schedules (given the other query parameters). If specified, returns the schedules that have the specified region ID applied to them, i.e., target including the inherited ones (parent region if not null). If null, returns all schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all schedules (given the other query parameters). If specified, returns the schedules that have the specified site ID applied to them, i.e., target including the inherited ones. If null, returns all schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the schedules. If not specified, returns all schedules (given the other query parameters). If specified, returns the schedules that have the specified host ID applied to them, i.e., target including the inherited ones (parent site if not null). If null, returns all schedules without a host ID as target. */
  hostId?: string;
  /** Filters based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsApiResponse =
  /** status 200 Array of all workload objects. */ WorkloadListRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  kind?: WorkloadKind;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameComputeWorkloadsApiResponse =
  /** status 201 The workload was created. */ WorkloadRead;
export type PostV1ProjectsByProjectNameComputeWorkloadsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 204 The workload was deleted. */ void;
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier. */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The requested workload object given its ID. */ WorkloadRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier. */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The workload was patched. */ WorkloadRead;
export type PatchV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier. */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse =
  /** status 200 The workload was updated. */ WorkloadRead;
export type PutV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg = {
  /** The unique workload identifier. */
  workloadId: string;
  /** unique projectName for the resource */
  projectName: string;
  workload: WorkloadWrite;
};
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse =
  /** status 200 The requested workload members. */ WorkloadMemberListRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg =
  {
    /** Index of the first item to return. This allows skipping of items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
    filter?: string;
    /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** The unique workload identifier. */
    workloadId?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    _workloadId: string;
  };
export type PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiResponse =
  /** status 201 The member was added. */ WorkloadMemberRead;
export type PostV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
    workloadMember: WorkloadMemberWrite;
  };
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse =
  /** status 204 The workload member was removed. */ void;
export type DeleteV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg =
  {
    /** The unique identifier of the workload member. */
    workloadMemberId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
  };
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiResponse =
  /** status 200 The requested workload member. */ WorkloadMemberRead;
export type GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdMembersWorkloadMemberIdApiArg =
  {
    /** The unique identifier of the workload member. */
    workloadMemberId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique workloadID for the resource */
    workloadId: string;
  };
export type GetV1ProjectsByProjectNameLocalAccountsApiResponse =
  /** status 200 Array of all local account objects. */ LocalAccountListRead;
export type GetV1ProjectsByProjectNameLocalAccountsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameLocalAccountsApiResponse =
  /** status 201 Local account created successfully. */ LocalAccountRead;
export type PostV1ProjectsByProjectNameLocalAccountsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  localAccount: LocalAccount;
};
export type DeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiResponse =
  /** status 204 The locallaccount was removed. */ void;
export type DeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiArg =
  {
    /** The unique identifier of the local account. */
    localAccountId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiResponse =
  /** status 200 Local account object. */ LocalAccountRead;
export type GetV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdApiArg = {
  /** The unique identifier of the local account. */
  localAccountId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameLocationsApiResponse =
  /** status 200 Array of the location node objects containing the resources that match the query name parameter. For each type of location, the maximum amount of resources to be returned is 20. */ LocationNodeListRead;
export type GetV1ProjectsByProjectNameLocationsApiArg = {
  /** The name of the resource to be queried; it can be a region and/or site name, if the query parameters below are stated. */
  name?: string;
  /** Indicates if the filter will be applied on the site resources. */
  showSites?: boolean;
  /** Indicates if the filter will be applied on the region resources. */
  showRegions?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameProvidersApiResponse =
  /** status 200 Array of all provider objects. */ ProviderListRead;
export type GetV1ProjectsByProjectNameProvidersApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. Takes precedence over other filter parameters, if set. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameProvidersApiResponse =
  /** status 201 The provider resource was created. */ ProviderRead;
export type PostV1ProjectsByProjectNameProvidersApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  provider: Provider;
};
export type DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiResponse =
  /** status 204 The provider resource was deleted. */ void;
export type DeleteV1ProjectsByProjectNameProvidersAndProviderIdApiArg = {
  /** The provider resource's unique identifier. */
  providerId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameProvidersAndProviderIdApiResponse =
  /** status 200 The requested provider resource. */ ProviderRead;
export type GetV1ProjectsByProjectNameProvidersAndProviderIdApiArg = {
  /** The provider resource's unique identifier. */
  providerId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameRegionsApiResponse =
  /** status 200 Array of all region objects. */ RegionsListRead;
export type GetV1ProjectsByProjectNameRegionsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** The parent region ID that the region belongs to. If not specified, returns all regions. If specified, returns the regions that have the specified parent applied to them. If null, returns all the regions without a parent. */
  parent?: string;
  /** Indicates if the region identified by the filter needs to be returned with the field totalSites filled. */
  showTotalSites?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameRegionsApiResponse =
  /** status 201 The region was created. */ RegionRead;
export type PostV1ProjectsByProjectNameRegionsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 204 The region was deleted. */ void;
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The requested region. */ RegionRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The region was patched. */ RegionRead;
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse =
  /** status 200 The region was updated. */ RegionRead;
export type PutV1ProjectsByProjectNameRegionsAndRegionIdApiArg = {
  /** The unique region identifier */
  regionId: string;
  /** unique projectName for the resource */
  projectName: string;
  region: RegionWrite;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  /** status 200 Array of all site objects. */ SitesListRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional filter to return only items of interest. See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** The region ID that the sites belong to. If not specified, returns all sites (given the other query params). If specified, returns the sites that have the specified region ID applied to them. If null, returns all sites without a region ID. */
  regionId: string;
  /** The OUID that the sites belong to. If not specified, returns all sites (given the other query parameters). If specified, returns the sites that have the specified OUID applied to them. If null, returns all sites without an OUID. */
  ouId?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse =
  /** status 201 The site was created. */ SiteRead;
export type PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 204 The site was deleted. */ void;
export type DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier. */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
};
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The requested site. */ SiteRead;
export type GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier. */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
};
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The site was patched. */ SiteRead;
export type PatchV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier. */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse =
  /** status 200 The site was updated. */ SiteRead;
export type PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg = {
  /** The unique site identifier. */
  siteId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionID for the resource */
  regionId: string;
  site: SiteWrite;
};
export type GetV1ProjectsByProjectNameSchedulesRepeatedApiResponse =
  /** status 200 Arrays of all repeated schedule objects. */ RepeatedSchedulesListRead;
export type GetV1ProjectsByProjectNameSchedulesRepeatedApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all repeated schedules (given the other query parameters). If specified, returns the schedules that have the specified region ID applied to them, i.e., target. If null, returns all repeated schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all repeated schedules (given the other query parameters). If specified, returns the schedules that have the specified site ID applied to them, i.e., target. If null, returns all repeated schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the repeated schedules. If not specified, returns all repeated schedules (given the other query parameters). If specified, returns the schedules that have the specified host ID applied to them, i.e., target. If null, returns all repeated schedules without a host ID as target. */
  hostId?: string;
  /** Filters based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds. */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameSchedulesRepeatedApiResponse =
  /** status 201 The repeated schedule was created. */ SingleScheduleRead;
export type PostV1ProjectsByProjectNameSchedulesRepeatedApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  repeatedSchedule: SingleScheduleWrite;
};
export type DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 204 The repeated schedule was deleted. */ void;
export type DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier. */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The requested repeated schedule. */ SingleScheduleRead;
export type GetV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier. */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The repeated schedule was patched. */ SingleScheduleRead;
export type PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier. */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    repeatedSchedule: SingleScheduleWrite;
  };
export type PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiResponse =
  /** status 200 The repeated schedule was updated. */ SingleScheduleRead;
export type PutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg =
  {
    /** The unique repeated schedule identifier. */
    repeatedScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    repeatedSchedule: SingleScheduleWrite;
  };
export type GetV1ProjectsByProjectNameSchedulesSingleApiResponse =
  /** status 200 Arrays of all single schedule objects. */ SingleSchedulesListRead;
export type GetV1ProjectsByProjectNameSchedulesSingleApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** The region ID target of the schedules. If not specified, returns all single schedules (given the other query parameters). If specified, returns the schedules that have the specified region ID applied to them, i.e., target. If null, returns all single schedules without a region ID as target. */
  regionId?: string;
  /** The site ID target of the schedules. If not specified, returns all single schedules (given the other query parameters). If specified, returns the schedules that have the specified site ID applied to them, i.e., target. If null, returns all single schedules without a site ID as target. */
  siteId?: string;
  /** The host ID target of the single schedules. If not specified, returns all single schedules (given the other query parameters). If specified, returns the schedules that have the specified host ID applied to them, i.e., target. If null, returns all single schedules without a host ID as target. */
  hostId?: string;
  /** Filters based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameSchedulesSingleApiResponse =
  /** status 201 The single schedule was created. */ SingleScheduleRead2;
export type PostV1ProjectsByProjectNameSchedulesSingleApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  singleSchedule: SingleScheduleWrite2;
};
export type DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 204 The single schedule was deleted. */ void;
export type DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier. */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The requested single schedule. */ SingleScheduleRead2;
export type GetV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier. */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The single schedule was patched. */ SingleScheduleRead2;
export type PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier. */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    singleSchedule: SingleScheduleWrite2;
  };
export type PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse =
  /** status 200 The single schedule was updated. */ SingleScheduleRead2;
export type PutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg =
  {
    /** The unique single schedule identifier. */
    singleScheduleId: string;
    /** unique projectName for the resource */
    projectName: string;
    singleSchedule: SingleScheduleWrite2;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse =
  /** status 200 Array of all telemetry log groups. */ TelemetryLogsGroupListRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameTelemetryLoggroupsApiResponse =
  /** status 201 The telemetry log group was created. */ TelemetryLogsGroupRead;
export type PostV1ProjectsByProjectNameTelemetryLoggroupsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  telemetryLogsGroup: TelemetryLogsGroup;
};
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse =
  /** status 204 The telemetry log group was deleted. */ void;
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier. */
    telemetryLogsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse =
  /** status 200 The requested telemetry log group. */ TelemetryLogsGroupRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier. */
    telemetryLogsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse =
  /** status 200 Array of all telemetry log profiles. */ TelemetryLogsProfileListRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg =
  {
    /** Index of the first item to return. This allows skipping of items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Returns only the telemetry profiles that are assigned with the given site ID. */
    siteId?: string;
    /** Returns only the telemetry profiles that are assigned with the given region ID. */
    regionId?: string;
    /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
    instanceId?: string;
    /** Indicates if the listed telemetry profiles will be extended with telemetry profiles rendered from the hierarchy. This flag is used along with one of site ID, region ID or instance ID. If site ID, region ID, or instance ID are not set, this flag is ignored. */
    showInherited?: boolean;
    /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse =
  /** status 201 The telemetry profile was created. */ TelemetryLogsProfileRead;
export type PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 204 The telemetry log profile was deleted. */ void;
export type DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The requested telemetry log profile. */ TelemetryLogsProfileRead;
export type GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
  };
export type PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The telemetry log profile was patched. */ TelemetryLogsProfileRead;
export type PatchV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse =
  /** status 200 The telemetry log profile was updated. */ TelemetryLogsProfileRead;
export type PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryLogsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryLogsGroupId for the resource */
    telemetryLogsGroupId: string;
    telemetryLogsProfile: TelemetryLogsProfile;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse =
  /** status 200 Array of all telemetry metric groups. */ TelemetryMetricsGroupListRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsApiArg = {
  /** Index of the first item to return. This allows skipping of items. */
  offset?: number;
  /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
  pageSize?: number;
  /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse =
  /** status 201 The telemetry metric group was created. */ TelemetryMetricsGroupRead;
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  telemetryMetricsGroup: TelemetryMetricsGroup;
};
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse =
  /** status 204 The telemetry metric group was deleted. */ void;
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier. */
    telemetryMetricsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiResponse =
  /** status 200 The requested telemetry metric group. */ TelemetryMetricsGroupRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdApiArg =
  {
    /** The unique telemetry group resource identifier. */
    telemetryMetricsGroupId: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse =
  /** status 200 Array of all telemetry metric profiles. */ TelemetryLogsProfileListRead2;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg =
  {
    /** Index of the first item to return. This allows skipping of items. */
    offset?: number;
    /** Defines the amount of items to be contained in a single page, min of 1 and max of 100, default of 20. */
    pageSize?: number;
    /** Returns only the telemetry profiles that are assigned with the given site ID. */
    siteId?: string;
    /** Returns only the telemetry profiles that are assigned with the given region ID. */
    regionId?: string;
    /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
    instanceId?: string;
    /** Indicates if the listed telemetry profiles will be extended with telemetry profiles rendered from the hierarchy. This flag is only used along with one of site ID, region ID or instance ID. If site ID, region ID, or instance ID are not set, this flag is ignored. */
    showInherited?: boolean;
    /** Optional comma-separated list of fields to specify a sorting order. See https://google.aip.dev/132 for details. */
    orderBy?: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse =
  /** status 201 The telemetry profile was created. */ TelemetryMetricsProfileRead;
export type PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
    telemetryMetricsProfile: TelemetryMetricsProfile;
  };
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 204 The telemetry metric profile was deleted. */ void;
export type DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The requested telemetry metric profile. */ TelemetryMetricsProfileRead;
export type GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
  };
export type PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The telemetry metric profile was patched. */ TelemetryMetricsProfileRead;
export type PatchV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
    telemetryMetricsProfileId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique telemetryMetricsGroupId for the resource */
    telemetryMetricsGroupId: string;
    telemetryMetricsProfile: TelemetryMetricsProfile;
  };
export type PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse =
  /** status 200 The telemetry metric profile was updated. */ TelemetryMetricsProfileRead;
export type PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg =
  {
    /** The unique telemetry profile identifier. */
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
  | "OPERATING_SYSTEM_PROVIDER_INFRA"
  | "OPERATING_SYSTEM_PROVIDER_LENOVO";
export type OperatingSystemType =
  | "OPERATING_SYSTEM_TYPE_UNSPECIFIED"
  | "OPERATING_SYSTEM_TYPE_MUTABLE"
  | "OPERATING_SYSTEM_TYPE_IMMUTABLE";
export type SecurityFeature =
  | "SECURITY_FEATURE_UNSPECIFIED"
  | "SECURITY_FEATURE_NONE"
  | "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
export type Timestamps = {};
export type TimestampsRead = {
  /** Timestamp for the creation of the resource. */
  createdAt: string;
  /** Timestamp for the last update of the resource. */
  updatedAt?: string;
};
export type OperatingSystemResource = {
  /** The OS resource's architecture. */
  architecture?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  /** The URL repository of the OS image. If set, overwrites repoUrl. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information. */
  installedPackages?: string;
  /** The OS resource's kernel command. */
  kernelCommand?: string;
  /** The OS resource's name. */
  name?: string;
  osProvider?: OperatingSystemProvider;
  osType?: OperatingSystemType;
  /** Name of the OS profile that the OS resource belongs to. */
  profileName?: string;
  /** The URL repository of the OS update sources. Deprecated. Use imageUrl to filter repoUrl. */
  repoUrl?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  timestamps?: Timestamps;
  /** The list of OS resource update sources. */
  updateSources: string[];
};
export type OperatingSystemResourceRead = {
  /** The OS resource's architecture. */
  architecture?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  /** The URL repository of the OS image. If set, overwrites repoUrl. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information. */
  installedPackages?: string;
  /** The OS resource's kernel command. */
  kernelCommand?: string;
  /** The OS resource's name. */
  name?: string;
  osProvider?: OperatingSystemProvider;
  /** The OS resource's unique identifier. Alias of resourceId. */
  osResourceID?: string;
  osType?: OperatingSystemType;
  /** Opaque JSON field storing references to custom installation script(s) that supplements the base OS with additional OS-level dependencies/configurations. If empty, the default OS installation will be used. */
  platformBundle?: string;
  /** Name of the OS profile that the OS resource belongs to. */
  profileName?: string;
  /** Version of OS profile that the OS resource belongs to. */
  profileVersion?: string;
  /** The URL repository of the OS update sources. Deprecated. Use imageUrl to filter repoUrl. */
  repoUrl?: string;
  /** Resource ID, generated by inventory on Create */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  timestamps?: TimestampsRead;
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
export type LocalAccount = {
  /** The local account's sshkey. */
  sshKey: string;
  timestamps?: Timestamps;
  /** The local account's username. */
  username: string;
};
export type LocalAccountRead = {
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The local account's sshkey. */
  sshKey: string;
  timestamps?: TimestampsRead;
  /** The local account's username. */
  username: string;
};
export type Instance = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: Host;
  instanceStatusIndicator?: StatusIndicator;
  kind?: InstanceKind;
  localAccount?: LocalAccount;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  provisioningStatusIndicator?: StatusIndicator;
  securityFeature?: SecurityFeature;
  timestamps?: Timestamps;
  updateStatusIndicator?: StatusIndicator;
};
export type WorkloadKind =
  | "WORKLOAD_KIND_UNSPECIFIED"
  | "WORKLOAD_KIND_CLUSTER";
export type Workload = {
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** Human-readable status of the workload. */
  status?: string;
  timestamps?: Timestamps;
};
export type WorkloadRead = {
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  kind: WorkloadKind;
  members: WorkloadMember[];
  /** Human-readable name for the workload. */
  name?: string;
  /** resource ID, generated by the inventory on Create */
  resourceId?: string;
  /** Human-readable status of the workload. */
  status?: string;
  timestamps?: TimestampsRead;
  /** The workload's unique identifier. Alias of resourceId. */
  workloadId?: string;
};
export type WorkloadWrite = {
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** Human-readable status of the workload. */
  status?: string;
  timestamps?: Timestamps;
};
export type WorkloadMember = {
  instance?: Instance;
  /** Type of workload member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: Instance;
  timestamps?: Timestamps;
  workload?: Workload;
};
export type WorkloadMemberRead = {
  instance?: InstanceRead;
  /** Type of workload member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: InstanceRead;
  /** resource ID, generated by the inventory on Create */
  resourceId: string;
  timestamps?: TimestampsRead;
  workload?: WorkloadRead;
  /** The workload member's unique identifier. Alias of resourceId. */
  workloadMemberId: string;
};
export type WorkloadMemberWrite = {
  instance?: Instance;
  /** The unique identifier of the instance. */
  instanceId: string;
  /** Type of workload member. */
  kind:
    | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
    | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
  member?: Instance;
  timestamps?: Timestamps;
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
  /** The instance's unique identifier. Alias of resourceID. */
  instanceID?: string;
  /** The instance's lifecycle status message. */
  instanceStatus?: string;
  /** The detailed status of the instance's software components. */
  instanceStatusDetail?: string;
  instanceStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the instance's lifecycle status was last updated. */
  instanceStatusTimestamp?: number;
  kind?: InstanceKind;
  localAccount?: LocalAccountRead;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResourceRead;
  /** The instance's provisioning status message. */
  provisioningStatus?: string;
  provisioningStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the instance's provisioning status was last updated. */
  provisioningStatusTimestamp?: number;
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  timestamps?: TimestampsRead;
  /** The instance's software update status message. */
  updateStatus?: string;
  /** Beta: The detailed description of the instance's last software update. */
  updateStatusDetail?: string;
  updateStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the instance's software update status was last updated. */
  updateStatusTimestamp?: number;
  /** The workload members associated with the instance. */
  workloadMembers?: WorkloadMemberRead[];
};
export type InstanceWrite = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: Host;
  /** The host's unique identifier associated with the instance. */
  hostID?: string;
  instanceStatusIndicator?: StatusIndicator;
  kind?: InstanceKind;
  localAccount?: LocalAccount;
  /** The unique identifier of local account will be associated with the instance. */
  localAccountID?: string;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  /** The unique identifier of OS resource that must be installed on the instance. */
  osID?: string;
  provisioningStatusIndicator?: StatusIndicator;
  securityFeature?: SecurityFeature;
  timestamps?: Timestamps;
  updateStatusIndicator?: StatusIndicator;
};
export type ProviderKind =
  | "PROVIDER_KIND_UNSPECIFIED"
  | "PROVIDER_KIND_BAREMETAL";
export type ProviderVendor =
  | "PROVIDER_VENDOR_UNSPECIFIED"
  | "PROVIDER_VENDOR_LENOVO_LXCA"
  | "PROVIDER_VENDOR_LENOVO_LOCA";
export type Provider = {
  /** The provider resource's list of credentials. */
  apiCredentials?: string[];
  /** The provider resource's API endpoint. */
  apiEndpoint: string;
  /** Opaque provider configuration. */
  config?: string;
  /** The provider resource's name. */
  name: string;
  providerKind: ProviderKind;
  providerVendor?: ProviderVendor;
  timestamps?: Timestamps;
};
export type ProviderRead = {
  /** The provider resource's list of credentials. */
  apiCredentials?: string[];
  /** The provider resource's API endpoint. */
  apiEndpoint: string;
  /** Opaque provider configuration. */
  config?: string;
  /** The provider resource's name. */
  name: string;
  /** The provider resource's unique identifier. Alias of resourceId. */
  providerID?: string;
  providerKind: ProviderKind;
  providerVendor?: ProviderVendor;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  timestamps?: TimestampsRead;
};
export type Ou = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The OU's name. */
  name: string;
  /** The kind of OU resource, e.g. BU and client. */
  ouKind?: string;
  /** The parent OU's unique identifier that the OU is associated to, when it exists. */
  parentOu?: string;
  timestamps?: Timestamps;
};
export type OuRead = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The OU's name. */
  name: string;
  /** The OU resource's unique identifier. Alias of resourceId. */
  ouID?: string;
  /** The kind of OU resource, e.g. BU and client. */
  ouKind?: string;
  /** The parent OU's unique identifier that the OU is associated to, when it exists. */
  parentOu?: string;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  timestamps?: TimestampsRead;
};
export type Proxy = {
  /** The FTP proxy. */
  ftpProxy?: string;
  /** The HTTP proxy. */
  httpProxy?: string;
  /** The HTTPS proxy. */
  httpsProxy?: string;
  /** The no-proxy info. */
  noProxy?: string;
};
export type Region = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region's name. */
  name?: string;
  parentRegion?: Region;
  timestamps?: Timestamps;
};
export type RegionRead = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region's name. */
  name?: string;
  parentRegion?: RegionRead;
  /** The region's unique identifier. Alias of resourceId. */
  regionID?: string;
  /** resource ID, generated by the inventory on Create */
  resourceId?: string;
  timestamps?: TimestampsRead;
  /** Total number of sites associated to this region, directly or by child regions. */
  totalSites?: number;
};
export type RegionWrite = {
  inheritedMetadata?: Metadata;
  metadata?: Metadata;
  /** The region's name. */
  name?: string;
  /** The parent region's unique identifier that the region is associated to, if it exists. This field cannot be used in filter. */
  parentId?: string;
  parentRegion?: RegionWrite;
  timestamps?: Timestamps;
};
export type Site = {
  /** The list of DNS servers that the site has available. */
  dnsServers?: string[];
  /** The set of Docker* registries that the site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of site-available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The site's human-readable name. */
  name?: string;
  ou?: Ou;
  provider?: Provider;
  proxy?: Proxy;
  region?: Region;
  /** The geolocation latitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: Timestamps;
};
export type SiteRead = {
  /** The list of DNS servers that the site has available. */
  dnsServers?: string[];
  /** The set of Docker* registries that the site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of site-available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The site's human-readable name. */
  name?: string;
  ou?: OuRead;
  provider?: ProviderRead;
  proxy?: Proxy;
  region?: RegionRead;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The site's unique identifier. Alias of resourceId. */
  siteID?: string;
  /** The geolocation latitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: TimestampsRead;
};
export type SiteWrite = {
  /** The list of DNS servers that the site has available. */
  dnsServers?: string[];
  /** The set of Docker* registries that the site has available. */
  dockerRegistries?: string[];
  inheritedMetadata?: MetadataJoin;
  metadata?: Metadata;
  /** The set of site-available metrics, specified in a single JSON object. */
  metricsEndpoint?: string;
  /** The site's human-readable name. */
  name?: string;
  ou?: Ou;
  /** The OU unique identifier that the site is associated to, if it exists. This field cannot be used in filter. */
  ouId?: string;
  provider?: Provider;
  proxy?: Proxy;
  region?: RegionWrite;
  /** The region's unique identifier that the site is associated to. This field cannot be used in filter. */
  regionId?: string;
  /** The geolocation latitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site. Points are represented as latitude-longitude pairs in the E7 representation (degrees are multiplied by 10**7 and rounded to the nearest integer). siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: Timestamps;
};
export type Host = {
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  hostStatusIndicator?: StatusIndicator;
  inheritedMetadata?: MetadataJoin;
  instance?: Instance;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  onboardingStatusIndicator?: StatusIndicator;
  provider?: Provider;
  registrationStatusIndicator?: StatusIndicator;
  site?: Site;
  timestamps?: Timestamps;
  /** The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
};
export type HostResourcesGpu = {
  timestamps?: Timestamps;
};
export type HostResourcesGpuRead = {
  /** The specific GPU device capabilities [e.g., PCI Express*, MSI*, power management (PM)]. */
  capabilities?: string[];
  /** The human-readable GPU device description. */
  description?: string;
  /** The GPU device name. */
  deviceName?: string;
  /** The GPU device's PCI identifier. */
  pciId?: string;
  /** The GPU device model. */
  product?: string;
  timestamps?: TimestampsRead;
  /** The GPU device vendor. */
  vendor?: string;
};
export type LinkState = {
  timestamps?: Timestamps;
};
export type LinkStateRead = {
  /** The timestamp when the link state was last updated. */
  timestamp: string;
  timestamps?: TimestampsRead;
  /** the type of the state. */
  type: "LINK_STATE_UNSPECIFIED" | "LINK_STATE_UP" | "LINK_STATE_DOWN";
};
export type Amount = string;
export type HostResourcesInterface = {
  linkState?: LinkState;
  mtu?: Amount;
  timestamps?: Timestamps;
};
export type IpAddress = {
  timestamps?: Timestamps;
};
export type IpAddressRead = {
  /** CIDR representation of the IP address. */
  address: any;
  /** Specifies how the IP address is configured. */
  configMethod:
    | "IP_ADDRESS_CONFIG_MODE_UNSPECIFIED"
    | "IP_ADDRESS_CONFIG_MODE_STATIC"
    | "IP_ADDRESS_CONFIG_MODE_DYNAMIC";
  /** The status of the IP address. */
  status?:
    | "IP_ADDRESS_STATUS_UNSPECIFIED"
    | "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR"
    | "IP_ADDRESS_STATUS_ASSIGNED"
    | "IP_ADDRESS_STATUS_CONFIGURATION_ERROR"
    | "IP_ADDRESS_STATUS_CONFIGURED"
    | "IP_ADDRESS_STATUS_RELEASED"
    | "IP_ADDRESS_STATUS_ERROR";
  /** The details of the status of the IP address. */
  statusDetail?: string;
  timestamps?: TimestampsRead;
};
export type HostResourcesInterfaceRead = {
  /** Defines if the card is the Baseboard Management Controller (BMC) interface. */
  bmcInterface?: boolean;
  /** The interface name. */
  deviceName?: string;
  /** The interface's IP address list. */
  ipaddresses?: IpAddressRead[];
  linkState?: LinkStateRead;
  /** The interface's MAC address. */
  macAddr?: string;
  mtu?: Amount;
  /** The interface's PCI identifier. */
  pciIdentifier?: string;
  /** Flag that represents if the interface has SR-IOV support. */
  sriovEnabled?: boolean;
  /** The number of virtual functions (VFs) currently provisioned on the interface, if SR-IOV is supported. */
  sriovVfsNum?: number;
  /** The maximum number of VFs the interface supports, if SR-IOV is supported. */
  sriovVfsTotal?: number;
  timestamps?: TimestampsRead;
};
export type HostResourcesStorage = {
  capacityBytes?: Amount;
  timestamps?: Timestamps;
};
export type HostResourcesStorageRead = {
  capacityBytes?: Amount;
  /** The storage device name. */
  deviceName?: string;
  /** The storage model. */
  model?: string;
  /** The storage device's unique serial number. */
  serial?: string;
  timestamps?: TimestampsRead;
  /** The storage vendor. */
  vendor?: string;
  /** The storage device's unique identifier. */
  wwid?: string;
};
export type HostResourcesUsb = {
  timestamps?: Timestamps;
};
export type HostResourcesUsbRead = {
  /** USB device number assigned by the OS. */
  addr?: string;
  /** Bus number that the device connects to. */
  bus?: string;
  /** Class defined by USB Implementers Forum, Inc (USB-IF). */
  class?: string;
  /** The USB device name. */
  deviceName?: string;
  /** Hexadecimal number representing the ID of the USB device product. */
  idProduct?: string;
  /** Hexadecimal number representing the ID of the USB device vendor. */
  idVendor?: string;
  /** Serial number of the USB device. */
  serial?: string;
  timestamps?: TimestampsRead;
};
export type HostRead = {
  /** The release date of the host BIOS. */
  biosReleaseDate?: string;
  /** The vendor of the host BIOS. */
  biosVendor?: string;
  /** The version of the host BIOS. */
  biosVersion?: string;
  /** BMC IP address, such as "192.0.0.1". */
  bmcIp?: string;
  /** The type of BMC. */
  bmcKind?:
    | "BAREMETAL_CONTROLLER_KIND_UNSPECIFIED"
    | "BAREMETAL_CONTROLLER_KIND_NONE"
    | "BAREMETAL_CONTROLLER_KIND_IPMI"
    | "BAREMETAL_CONTROLLER_KIND_VPRO"
    | "BAREMETAL_CONTROLLER_KIND_PDU";
  /** Architecture of the CPU model, e.g. x86_64. */
  cpuArchitecture?: string;
  /** String list of all CPU capabilities (possibly JSON). */
  cpuCapabilities?: string;
  /** Number of CPU cores. */
  cpuCores?: number;
  /** CPU model of the host. */
  cpuModel?: string;
  /** Number of physical CPU sockets. */
  cpuSockets?: number;
  /** Total number of threads supported by the CPU. */
  cpuThreads?: number;
  /** A JSON field describing the CPU topology. The CPU topology may contain, among others, information about CPU core types, their layout, and mapping to CPU sockets. */
  cpuTopology?: string;
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  /** The list of GPU capabilities. */
  hostGpus?: HostResourcesGpuRead[];
  /** The list of interface capabilities. */
  hostNics?: HostResourcesInterfaceRead[];
  /** The host's lifecycle status message. */
  hostStatus?: string;
  hostStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the host's lifecycle status was last updated. */
  hostStatusTimestamp?: number;
  /** The list of storage capabilities. */
  hostStorages?: HostResourcesStorageRead[];
  /** The list of USB capabilities. */
  hostUsbs?: HostResourcesUsbRead[];
  /** The host name. */
  hostname?: string;
  inheritedMetadata?: MetadataJoin;
  instance?: InstanceRead;
  /** Quantity of the RAM in the system, in bytes. */
  memoryBytes?: string;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  /** The note associated with the host. */
  note?: string;
  /** The host's onboarding status message. */
  onboardingStatus?: string;
  onboardingStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the host's onboarding status was last updated. */
  onboardingStatusTimestamp?: number;
  /** The host's product name. */
  productName?: string;
  provider?: ProviderRead;
  /** The host's registration status message. */
  registrationStatus?: string;
  registrationStatusIndicator?: StatusIndicatorRead;
  /** A Unix, UTC timestamp when the host's registration status was last updated. */
  registrationStatusTimestamp?: number;
  /** Resource ID, generated on Create. */
  resourceId?: string;
  /** SMBIOS device serial number. */
  serialNumber?: string;
  site?: SiteRead;
  timestamps?: TimestampsRead;
  /** The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
};
export type HostWrite = {
  currentPowerState?: HostPowerState;
  currentState?: HostState;
  desiredPowerState?: HostPowerState;
  desiredState?: HostState;
  hostStatusIndicator?: StatusIndicator;
  inheritedMetadata?: MetadataJoin;
  instance?: InstanceWrite;
  metadata?: Metadata;
  /** The host name. */
  name: string;
  onboardingStatusIndicator?: StatusIndicator;
  provider?: Provider;
  registrationStatusIndicator?: StatusIndicator;
  site?: SiteWrite;
  /** The site where the host is located. */
  siteId?: string;
  timestamps?: Timestamps;
  /** The host UUID identifier; UUID is unique and immutable. */
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
  /** Set to enforce auto-onboarding of the host, which means that no confirmation will be required when the host connects for the first time, to Edge Orchestrator. */
  autoOnboard?: boolean;
  /** The host name. */
  name?: string;
  /** The host's SMBIOS serial number. */
  serialNumber?: string;
  timestamps?: Timestamps;
  /** The host's UUID identifier. */
  uuid?: string;
};
export type HostRegisterInfoRead = {
  /** Set to enforce auto-onboarding of the host, which means that no confirmation will be required when the host connects for the first time, to Edge Orchestrator. */
  autoOnboard?: boolean;
  /** The host name. */
  name?: string;
  /** The host's SMBIOS serial number. */
  serialNumber?: string;
  timestamps?: TimestampsRead;
  /** The host's UUID identifier. */
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
  /** Indicates if there are more instance objects available to be retrieved. */
  hasNext: boolean;
  instances: InstanceRead[];
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type InstanceListWrite = {};
export type OperatingSystemResourceList = {};
export type OperatingSystemResourceListRead = {
  OperatingSystemResources: OperatingSystemResourceRead[];
  /** Indicates if there are more OS objects available to be retrieved. */
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
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: Host;
  targetRegion?: Region;
  targetSite?: Site;
  timestamps?: Timestamps;
};
export type SingleScheduleRead = {
  cronDayMonth: string;
  cronDayWeek: string;
  cronHours: string;
  cronMinutes: string;
  cronMonth: string;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  /** The repeated schedule's unique identifier. Alias of resourceId. */
  repeatedScheduleID?: string;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostRead;
  targetRegion?: RegionRead;
  targetSite?: SiteRead;
  timestamps?: TimestampsRead;
};
export type SingleScheduleWrite = {
  cronDayMonth: string;
  cronDayWeek: string;
  cronHours: string;
  cronMinutes: string;
  cronMonth: string;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostWrite;
  /** The target host ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionWrite;
  /** The target region ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteWrite;
  /** The target site ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetSiteId?: string;
  timestamps?: Timestamps;
};
export type SingleSchedule2 = {
  /** The end time in seconds, of the single schedule. The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: Host;
  targetRegion?: Region;
  targetSite?: Site;
  timestamps?: Timestamps;
};
export type SingleScheduleRead2 = {
  /** The end time in seconds, of the single schedule. The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  /** The single schedule resource's unique identifier. Alias of resourceId. */
  singleScheduleID?: string;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: HostRead;
  targetRegion?: RegionRead;
  targetSite?: SiteRead;
  timestamps?: TimestampsRead;
};
export type SingleScheduleWrite2 = {
  /** The end time in seconds, of the single schedule. The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: HostWrite;
  /** The target host ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionWrite;
  /** The target region ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteWrite;
  /** The target site ID of the schedule. Only one target can be provided per schedule. This field cannot be used as filter. */
  targetSiteId?: string;
  timestamps?: Timestamps;
};
export type SchedulesListJoinRead = {
  /** Contains a flat list of repeated schedules, possibly including all inherited ones. */
  RepeatedSchedules: SingleScheduleRead[];
  /** Contains a flat list of single schedules, possibly including all inherited ones. */
  SingleSchedules: SingleScheduleRead2[];
  /** Indicates if there are more schedule objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SchedulesListJoinWrite = {};
export type WorkloadList = {};
export type WorkloadListRead = {
  Workloads: WorkloadRead[];
  /** Indicates if there are more workload objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type WorkloadListWrite = {};
export type WorkloadMemberList = {};
export type WorkloadMemberListRead = {
  WorkloadMembers: WorkloadMemberRead[];
  /** Indicates if there are more workload members objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items the request would return, if not limited by pagination. */
  totalElements: number;
};
export type WorkloadMemberListWrite = {};
export type LocalAccountList = {};
export type LocalAccountListRead = {
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  /** Array of local account objects. */
  localAccounts: LocalAccountRead[];
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type LocationNodeList = {};
export type LocationType = "RESOURCE_KIND_REGION" | "RESOURCE_KIND_SITE";
export type LocationTypeRead = "RESOURCE_KIND_REGION" | "RESOURCE_KIND_SITE";
export type LocationNode = {
  type: LocationType;
};
export type LocationNodeRead = {
  /** The node's human-readable name. */
  name: string;
  /** The associated resource ID of the parent resource of this location node. For a region, it could be empty or a regionId. For a site, it could be empty or a regionId. */
  parentId: string;
  /** The associated node's resource ID, generated by the inventory on Create. */
  resourceId: string;
  type: LocationTypeRead;
};
export type LocationNodeListRead = {
  /** The ordered list of nodes (root to leaf) of the location's hierarchy tree of regions and sites. The relationship of the root to leaf is limited by the maximum depth of seven items. */
  nodes: LocationNodeRead[];
  /** The number of items returned in the nodes's array that match the query parameters of the request. */
  outputElements?: number;
  /** The total number of items that match the query parameters of the request. */
  totalElements?: number;
};
export type ProviderList = {};
export type ProviderListRead = {
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  providers: ProviderRead[];
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RegionsList = {};
export type RegionsListRead = {
  /** Indicates if there are more location objects available to be retrieved. */
  hasNext: boolean;
  regions: RegionRead[];
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RegionsListWrite = {};
export type SitesList = {};
export type SitesListRead = {
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  sites: SiteRead[];
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SitesListWrite = {};
export type RepeatedSchedulesList = {};
export type RepeatedSchedulesListRead = {
  RepeatedSchedules: SingleScheduleRead[];
  /** Indicates if there are more repeated schedule objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type RepeatedSchedulesListWrite = {};
export type SingleSchedulesList = {};
export type SingleSchedulesListRead = {
  SingleSchedules: SingleScheduleRead2[];
  /** Indicates if there are more objects available to be retrieved. */
  hasNext: boolean;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type SingleSchedulesListWrite = {};
export type TelemetryLogsGroupList = {
  timestamps?: Timestamps;
};
export type TelemetryCollectorKind =
  | "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED"
  | "TELEMETRY_COLLECTOR_KIND_HOST"
  | "TELEMETRY_COLLECTOR_KIND_CLUSTER";
export type TelemetryLogsGroup = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group */
  name: string;
  timestamps?: Timestamps;
};
export type TelemetryLogsGroupRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group */
  name: string;
  /** Unique ID of the telemetry group. */
  telemetryLogsGroupId?: string;
  timestamps?: TimestampsRead;
};
export type TelemetryLogsGroupListRead = {
  TelemetryLogsGroups: TelemetryLogsGroupRead[];
  /** Indicates if there are more log group objects available to be retrieved. */
  hasNext: boolean;
  timestamps?: TimestampsRead;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryLogsProfileList = {
  timestamps?: Timestamps;
};
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
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** The ID of the instance that the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type TelemetryLogsProfileRead = {
  logLevel: TelemetrySeverityLevel;
  logsGroup?: TelemetryLogsGroupRead;
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the instance that the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: TimestampsRead;
};
export type TelemetryLogsProfileListRead = {
  TelemetryLogsProfiles: TelemetryLogsProfileRead[];
  /** Indicates if there are more telemetry log profile objects available to be retrieved. */
  hasNext: boolean;
  timestamps?: TimestampsRead;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryMetricsGroupList = {
  timestamps?: Timestamps;
};
export type TelemetryMetricsGroup = {
  collectorKind: TelemetryCollectorKind;
  /** A list of metric groups to collect. */
  groups: string[];
  /** Human-readable name for the metric group. */
  name: string;
  timestamps?: Timestamps;
};
export type TelemetryMetricsGroupRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of metric groups to collect. */
  groups: string[];
  /** Human-readable name for the metric group. */
  name: string;
  /** Unique ID of the telemetry group. */
  telemetryMetricsGroupId?: string;
  timestamps?: TimestampsRead;
};
export type TelemetryMetricsGroupListRead = {
  TelemetryMetricsGroups: TelemetryMetricsGroupRead[];
  /** Indicates if there are more telemetry metric group objects available to be retrieved. */
  hasNext: boolean;
  timestamps?: TimestampsRead;
  /** Total number of items that the request would return, if not limited by pagination. */
  totalElements: number;
};
export type TelemetryLogsProfileList2 = {
  timestamps?: Timestamps;
};
export type TelemetryMetricsProfile = {
  metricsGroup?: TelemetryMetricsGroup;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** Metric interval (in seconds) for the telemetry profile. This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The ID of the instance that the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type TelemetryMetricsProfileRead = {
  metricsGroup?: TelemetryMetricsGroupRead;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** Metric interval (in seconds) for the telemetry profile. This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the instance that the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to. Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: TimestampsRead;
};
export type TelemetryLogsProfileListRead2 = {
  TelemetryMetricsProfiles: TelemetryMetricsProfileRead[];
  /** Indicates if there are more telemetry metric profile objects available to be retrieved. */
  hasNext: boolean;
  timestamps?: TimestampsRead;
  /** Total number of items that the request would return, if not limited by pagination. */
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
  useGetV1ProjectsByProjectNameLocalAccountsQuery,
  usePostV1ProjectsByProjectNameLocalAccountsMutation,
  useDeleteV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdMutation,
  useGetV1ProjectsByProjectNameLocalAccountsAndLocalAccountIdQuery,
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
