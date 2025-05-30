import { infraApi as api } from "./apiSlice";
export const addTagTypes = [
  "HostService",
  "InstanceService",
  "OperatingSystemService",
  "ScheduleService",
  "WorkloadService",
  "WorkloadMemberService",
  "LocalAccountService",
  "LocationService",
  "ProviderService",
  "RegionService",
  "SiteService",
  "TelemetryLogsGroupService",
  "TelemetryLogsProfileService",
  "TelemetryMetricsGroupService",
  "TelemetryMetricsProfileService",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      hostServiceListHosts: build.query<
        HostServiceListHostsApiResponse,
        HostServiceListHostsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["HostService"],
      }),
      hostServiceCreateHost: build.mutation<
        HostServiceCreateHostApiResponse,
        HostServiceCreateHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts`,
          method: "POST",
          body: queryArg.hostResource,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceDeleteHost: build.mutation<
        HostServiceDeleteHostApiResponse,
        HostServiceDeleteHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceGetHost: build.query<
        HostServiceGetHostApiResponse,
        HostServiceGetHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
        }),
        providesTags: ["HostService"],
      }),
      hostServicePatchHost: build.mutation<
        HostServicePatchHostApiResponse,
        HostServicePatchHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.hostResource,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceUpdateHost: build.mutation<
        HostServiceUpdateHostApiResponse,
        HostServiceUpdateHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.hostResource,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceInvalidateHost: build.mutation<
        HostServiceInvalidateHostApiResponse,
        HostServiceInvalidateHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}/invalidate`,
          method: "PUT",
          params: { note: queryArg.note },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceOnboardHost: build.mutation<
        HostServiceOnboardHostApiResponse,
        HostServiceOnboardHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}/onboard`,
          method: "PATCH",
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceRegisterUpdateHost: build.mutation<
        HostServiceRegisterUpdateHostApiResponse,
        HostServiceRegisterUpdateHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}/register`,
          method: "PATCH",
          body: queryArg.hostRegister,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceRegisterHost: build.mutation<
        HostServiceRegisterHostApiResponse,
        HostServiceRegisterHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/register`,
          method: "POST",
          body: queryArg.hostRegister,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceGetHostsSummary: build.query<
        HostServiceGetHostsSummaryApiResponse,
        HostServiceGetHostsSummaryApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/summary`,
          params: { filter: queryArg.filter },
        }),
        providesTags: ["HostService"],
      }),
      instanceServiceListInstances: build.query<
        InstanceServiceListInstancesApiResponse,
        InstanceServiceListInstancesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["InstanceService"],
      }),
      instanceServiceCreateInstance: build.mutation<
        InstanceServiceCreateInstanceApiResponse,
        InstanceServiceCreateInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances`,
          method: "POST",
          body: queryArg.instanceResource,
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceDeleteInstance: build.mutation<
        InstanceServiceDeleteInstanceApiResponse,
        InstanceServiceDeleteInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceGetInstance: build.query<
        InstanceServiceGetInstanceApiResponse,
        InstanceServiceGetInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
        }),
        providesTags: ["InstanceService"],
      }),
      instanceServicePatchInstance: build.mutation<
        InstanceServicePatchInstanceApiResponse,
        InstanceServicePatchInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.instanceResource,
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceUpdateInstance: build.mutation<
        InstanceServiceUpdateInstanceApiResponse,
        InstanceServiceUpdateInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.instanceResource,
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceInvalidateInstance: build.mutation<
        InstanceServiceInvalidateInstanceApiResponse,
        InstanceServiceInvalidateInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}/invalidate`,
          method: "PUT",
        }),
        invalidatesTags: ["InstanceService"],
      }),
      operatingSystemServiceListOperatingSystems: build.query<
        OperatingSystemServiceListOperatingSystemsApiResponse,
        OperatingSystemServiceListOperatingSystemsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceCreateOperatingSystem: build.mutation<
        OperatingSystemServiceCreateOperatingSystemApiResponse,
        OperatingSystemServiceCreateOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os`,
          method: "POST",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceDeleteOperatingSystem: build.mutation<
        OperatingSystemServiceDeleteOperatingSystemApiResponse,
        OperatingSystemServiceDeleteOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceGetOperatingSystem: build.query<
        OperatingSystemServiceGetOperatingSystemApiResponse,
        OperatingSystemServiceGetOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServicePatchOperatingSystem: build.mutation<
        OperatingSystemServicePatchOperatingSystemApiResponse,
        OperatingSystemServicePatchOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceUpdateOperatingSystem: build.mutation<
        OperatingSystemServiceUpdateOperatingSystemApiResponse,
        OperatingSystemServiceUpdateOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      scheduleServiceListSchedules: build.query<
        ScheduleServiceListSchedulesApiResponse,
        ScheduleServiceListSchedulesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      workloadServiceListWorkloads: build.query<
        WorkloadServiceListWorkloadsApiResponse,
        WorkloadServiceListWorkloadsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServiceCreateWorkload: build.mutation<
        WorkloadServiceCreateWorkloadApiResponse,
        WorkloadServiceCreateWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads`,
          method: "POST",
          body: queryArg.workloadResource,
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceDeleteWorkload: build.mutation<
        WorkloadServiceDeleteWorkloadApiResponse,
        WorkloadServiceDeleteWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceGetWorkload: build.query<
        WorkloadServiceGetWorkloadApiResponse,
        WorkloadServiceGetWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServicePatchWorkload: build.mutation<
        WorkloadServicePatchWorkloadApiResponse,
        WorkloadServicePatchWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.workloadResource,
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceUpdateWorkload: build.mutation<
        WorkloadServiceUpdateWorkloadApiResponse,
        WorkloadServiceUpdateWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.workloadResource,
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadMemberServiceListWorkloadMembers: build.query<
        WorkloadMemberServiceListWorkloadMembersApiResponse,
        WorkloadMemberServiceListWorkloadMembersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}/members`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceCreateWorkloadMember: build.mutation<
        WorkloadMemberServiceCreateWorkloadMemberApiResponse,
        WorkloadMemberServiceCreateWorkloadMemberApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}/members`,
          method: "POST",
          body: queryArg.workloadMember,
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceDeleteWorkloadMember: build.mutation<
        WorkloadMemberServiceDeleteWorkloadMemberApiResponse,
        WorkloadMemberServiceDeleteWorkloadMemberApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadResourceId}/members/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceGetWorkloadMember: build.query<
        WorkloadMemberServiceGetWorkloadMemberApiResponse,
        WorkloadMemberServiceGetWorkloadMemberApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.workloadResourceId}/members/${queryArg.resourceId}`,
        }),
        providesTags: ["WorkloadMemberService"],
      }),
      localAccountServiceListLocalAccounts: build.query<
        LocalAccountServiceListLocalAccountsApiResponse,
        LocalAccountServiceListLocalAccountsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["LocalAccountService"],
      }),
      localAccountServiceCreateLocalAccount: build.mutation<
        LocalAccountServiceCreateLocalAccountApiResponse,
        LocalAccountServiceCreateLocalAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts`,
          method: "POST",
          body: queryArg.localAccountResource,
        }),
        invalidatesTags: ["LocalAccountService"],
      }),
      localAccountServiceDeleteLocalAccount: build.mutation<
        LocalAccountServiceDeleteLocalAccountApiResponse,
        LocalAccountServiceDeleteLocalAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["LocalAccountService"],
      }),
      localAccountServiceGetLocalAccount: build.query<
        LocalAccountServiceGetLocalAccountApiResponse,
        LocalAccountServiceGetLocalAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts/${queryArg.resourceId}`,
        }),
        providesTags: ["LocalAccountService"],
      }),
      locationServiceListLocations: build.query<
        LocationServiceListLocationsApiResponse,
        LocationServiceListLocationsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/locations`,
          params: {
            name: queryArg.name,
            showSites: queryArg.showSites,
            showRegions: queryArg.showRegions,
          },
        }),
        providesTags: ["LocationService"],
      }),
      providerServiceListProviders: build.query<
        ProviderServiceListProvidersApiResponse,
        ProviderServiceListProvidersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["ProviderService"],
      }),
      providerServiceCreateProvider: build.mutation<
        ProviderServiceCreateProviderApiResponse,
        ProviderServiceCreateProviderApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers`,
          method: "POST",
          body: queryArg.providerResource,
        }),
        invalidatesTags: ["ProviderService"],
      }),
      providerServiceDeleteProvider: build.mutation<
        ProviderServiceDeleteProviderApiResponse,
        ProviderServiceDeleteProviderApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ProviderService"],
      }),
      providerServiceGetProvider: build.query<
        ProviderServiceGetProviderApiResponse,
        ProviderServiceGetProviderApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers/${queryArg.resourceId}`,
        }),
        providesTags: ["ProviderService"],
      }),
      regionServiceListRegions: build.query<
        RegionServiceListRegionsApiResponse,
        RegionServiceListRegionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            showTotalSites: queryArg.showTotalSites,
          },
        }),
        providesTags: ["RegionService"],
      }),
      regionServiceCreateRegion: build.mutation<
        RegionServiceCreateRegionApiResponse,
        RegionServiceCreateRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions`,
          method: "POST",
          body: queryArg.regionResource,
        }),
        invalidatesTags: ["RegionService"],
      }),
      siteServiceDeleteSite: build.mutation<
        SiteServiceDeleteSiteApiResponse,
        SiteServiceDeleteSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionResourceId}/sites/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceGetSite: build.query<
        SiteServiceGetSiteApiResponse,
        SiteServiceGetSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionResourceId}/sites/${queryArg.resourceId}`,
        }),
        providesTags: ["SiteService"],
      }),
      siteServicePatchSite: build.mutation<
        SiteServicePatchSiteApiResponse,
        SiteServicePatchSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionResourceId}/sites/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.siteResource,
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceUpdateSite: build.mutation<
        SiteServiceUpdateSiteApiResponse,
        SiteServiceUpdateSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionResourceId}/sites/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.siteResource,
        }),
        invalidatesTags: ["SiteService"],
      }),
      regionServiceDeleteRegion: build.mutation<
        RegionServiceDeleteRegionApiResponse,
        RegionServiceDeleteRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RegionService"],
      }),
      regionServiceGetRegion: build.query<
        RegionServiceGetRegionApiResponse,
        RegionServiceGetRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}`,
        }),
        providesTags: ["RegionService"],
      }),
      regionServicePatchRegion: build.mutation<
        RegionServicePatchRegionApiResponse,
        RegionServicePatchRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.regionResource,
        }),
        invalidatesTags: ["RegionService"],
      }),
      regionServiceUpdateRegion: build.mutation<
        RegionServiceUpdateRegionApiResponse,
        RegionServiceUpdateRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.regionResource,
        }),
        invalidatesTags: ["RegionService"],
      }),
      siteServiceListSites: build.query<
        SiteServiceListSitesApiResponse,
        SiteServiceListSitesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}/sites`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceCreateSite: build.mutation<
        SiteServiceCreateSiteApiResponse,
        SiteServiceCreateSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}/sites`,
          method: "POST",
          body: queryArg.siteResource,
        }),
        invalidatesTags: ["SiteService"],
      }),
      scheduleServiceListRepeatedSchedules: build.query<
        ScheduleServiceListRepeatedSchedulesApiResponse,
        ScheduleServiceListRepeatedSchedulesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceCreateRepeatedSchedule: build.mutation<
        ScheduleServiceCreateRepeatedScheduleApiResponse,
        ScheduleServiceCreateRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated`,
          method: "POST",
          body: queryArg.repeatedScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteRepeatedSchedule: build.mutation<
        ScheduleServiceDeleteRepeatedScheduleApiResponse,
        ScheduleServiceDeleteRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetRepeatedSchedule: build.query<
        ScheduleServiceGetRepeatedScheduleApiResponse,
        ScheduleServiceGetRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServicePatchRepeatedSchedule: build.mutation<
        ScheduleServicePatchRepeatedScheduleApiResponse,
        ScheduleServicePatchRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.repeatedScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateRepeatedSchedule: build.mutation<
        ScheduleServiceUpdateRepeatedScheduleApiResponse,
        ScheduleServiceUpdateRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.repeatedScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceListSingleSchedules: build.query<
        ScheduleServiceListSingleSchedulesApiResponse,
        ScheduleServiceListSingleSchedulesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceCreateSingleSchedule: build.mutation<
        ScheduleServiceCreateSingleScheduleApiResponse,
        ScheduleServiceCreateSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single`,
          method: "POST",
          body: queryArg.singleScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteSingleSchedule: build.mutation<
        ScheduleServiceDeleteSingleScheduleApiResponse,
        ScheduleServiceDeleteSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetSingleSchedule: build.query<
        ScheduleServiceGetSingleScheduleApiResponse,
        ScheduleServiceGetSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServicePatchSingleSchedule: build.mutation<
        ScheduleServicePatchSingleScheduleApiResponse,
        ScheduleServicePatchSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.singleScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateSingleSchedule: build.mutation<
        ScheduleServiceUpdateSingleScheduleApiResponse,
        ScheduleServiceUpdateSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.singleScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      telemetryLogsGroupServiceListTelemetryLogsGroups: build.query<
        TelemetryLogsGroupServiceListTelemetryLogsGroupsApiResponse,
        TelemetryLogsGroupServiceListTelemetryLogsGroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceCreateTelemetryLogsGroup: build.mutation<
        TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiResponse,
        TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups`,
          method: "POST",
          body: queryArg.telemetryLogsGroupResource,
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsProfileServiceDeleteTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.loggroupResourceId}/logprofiles/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceGetTelemetryLogsProfile: build.query<
        TelemetryLogsProfileServiceGetTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.loggroupResourceId}/logprofiles/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServicePatchTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServicePatchTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServicePatchTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.loggroupResourceId}/logprofiles/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.telemetryLogsProfileResource,
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceUpdateTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.loggroupResourceId}/logprofiles/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.telemetryLogsProfileResource,
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsGroupServiceDeleteTelemetryLogsGroup: build.mutation<
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiResponse,
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceGetTelemetryLogsGroup: build.query<
        TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse,
        TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsProfileServiceListTelemetryLogsProfiles: build.query<
        TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse,
        TelemetryLogsProfileServiceListTelemetryLogsProfilesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.resourceId}/logprofiles`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            instanceId: queryArg.instanceId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            showInherited: queryArg.showInherited,
          },
        }),
        providesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceCreateTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.resourceId}/logprofiles`,
          method: "POST",
          body: queryArg.telemetryLogsProfileResource,
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryMetricsGroupServiceListTelemetryMetricsGroups: build.query<
        TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiResponse,
        TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceCreateTelemetryMetricsGroup: build.mutation<
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiResponse,
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups`,
          method: "POST",
          body: queryArg.telemetryMetricsGroupResource,
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsProfileServiceDeleteTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.metricgroupResourceId}/metricprofiles/${queryArg.resourceId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceGetTelemetryMetricsProfile: build.query<
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiResponse,
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.metricgroupResourceId}/metricprofiles/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryMetricsProfileService"],
      }),
      telemetryMetricsProfileServicePatchTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.metricgroupResourceId}/metricprofiles/${queryArg.resourceId}`,
            method: "PATCH",
            body: queryArg.telemetryMetricsProfileResource,
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceUpdateTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.metricgroupResourceId}/metricprofiles/${queryArg.resourceId}`,
            method: "PUT",
            body: queryArg.telemetryMetricsProfileResource,
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsGroupServiceDeleteTelemetryMetricsGroup: build.mutation<
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiResponse,
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceGetTelemetryMetricsGroup: build.query<
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiResponse,
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsProfileServiceListTelemetryMetricsProfiles: build.query<
        TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse,
        TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.resourceId}/metricprofiles`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            instanceId: queryArg.instanceId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            showInherited: queryArg.showInherited,
          },
        }),
        providesTags: ["TelemetryMetricsProfileService"],
      }),
      telemetryMetricsProfileServiceCreateTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.resourceId}/metricprofiles`,
            method: "POST",
            body: queryArg.telemetryMetricsProfileResource,
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as infra };
export type HostServiceListHostsApiResponse =
  /** status 200 Success */ ListHostsResponseRead;
export type HostServiceListHostsApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type HostServiceCreateHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceCreateHostApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The host to create. */
  hostResource: HostResourceWrite;
};
export type HostServiceDeleteHostApiResponse =
  /** status 200 Success */ DeleteHostResponse;
export type HostServiceDeleteHostApiArg = {
  /** Name of the host host to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type HostServiceGetHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceGetHostApiArg = {
  /** Name of the requested host. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type HostServicePatchHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServicePatchHostApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceUpdateHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceUpdateHostApiArg = {
  /** Name of the host host to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceInvalidateHostApiResponse =
  /** status 200 Success */ InvalidateHostResponse;
export type HostServiceInvalidateHostApiArg = {
  /** Host resource ID */
  resourceId: string;
  /** user-provided reason for change or a freeform field */
  note?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type HostServiceOnboardHostApiResponse =
  /** status 200 Success */ OnboardHostResponse;
export type HostServiceOnboardHostApiArg = {
  /** Host resource ID */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type HostServiceRegisterUpdateHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceRegisterUpdateHostApiArg = {
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  hostRegister: HostRegister;
};
export type HostServiceRegisterHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceRegisterHostApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  hostRegister: HostRegister;
};
export type HostServiceGetHostsSummaryApiResponse =
  /** status 200 Success */ GetHostSummaryResponseRead;
export type HostServiceGetHostsSummaryApiArg = {
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type InstanceServiceListInstancesApiResponse =
  /** status 200 Success */ ListInstancesResponseRead;
export type InstanceServiceListInstancesApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type InstanceServiceCreateInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceCreateInstanceApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The instance to create. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceDeleteInstanceApiResponse =
  /** status 200 Success */ DeleteInstanceResponse;
export type InstanceServiceDeleteInstanceApiArg = {
  /** Name of the instance instance to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type InstanceServiceGetInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceGetInstanceApiArg = {
  /** Name of the requested instance. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type InstanceServicePatchInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServicePatchInstanceApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceUpdateInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceUpdateInstanceApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceInvalidateInstanceApiResponse =
  /** status 200 Success */ InvalidateInstanceResponse;
export type InstanceServiceInvalidateInstanceApiArg = {
  /** Instance resource ID */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type OperatingSystemServiceListOperatingSystemsApiResponse =
  /** status 200 Success */ ListOperatingSystemsResponseRead;
export type OperatingSystemServiceListOperatingSystemsApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type OperatingSystemServiceCreateOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceCreateOperatingSystemApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The os to create. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceDeleteOperatingSystemApiResponse =
  /** status 200 Success */ DeleteOperatingSystemResponse;
export type OperatingSystemServiceDeleteOperatingSystemApiArg = {
  /** Name of the os os to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type OperatingSystemServiceGetOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceGetOperatingSystemApiArg = {
  /** Name of the requested os. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type OperatingSystemServicePatchOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServicePatchOperatingSystemApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceUpdateOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceUpdateOperatingSystemApiArg = {
  /** Name of the os os to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type ScheduleServiceListSchedulesApiResponse =
  /** status 200 Success */ ListSchedulesResponseRead;
export type ScheduleServiceListSchedulesApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** The host ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified host ID applied to them, i.e., target including the inherited ones
     (parent site if not null). If null, returns all the schedules without a host ID as target. */
  hostId?: string;
  /** The site ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified site ID applied to them, i.e., target including the inherited ones.
     If null, returns all the schedules without a site ID as target */
  siteId?: string;
  /** The region ID target of the schedules. If not specified,
     returns all schedules (given the other query params).
     If specified, returns the schedules that have the specified region ID applied to them,
     i.e., target including the inherited ones (parent region if not null).
     If null, returns all the schedules without a region ID as target. */
  regionId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds. */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type WorkloadServiceListWorkloadsApiResponse =
  /** status 200 Success */ ListWorkloadsResponseRead;
export type WorkloadServiceListWorkloadsApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type WorkloadServiceCreateWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceCreateWorkloadApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The workload to create. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceDeleteWorkloadApiResponse =
  /** status 200 Success */ DeleteWorkloadResponse;
export type WorkloadServiceDeleteWorkloadApiArg = {
  /** Name of the workload workload to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type WorkloadServiceGetWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceGetWorkloadApiArg = {
  /** Name of the requested workload. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type WorkloadServicePatchWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServicePatchWorkloadApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceUpdateWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceUpdateWorkloadApiArg = {
  /** Name of the workload workload to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadMemberServiceListWorkloadMembersApiResponse =
  /** status 200 Success */ ListWorkloadMembersResponseRead;
export type WorkloadMemberServiceListWorkloadMembersApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
};
export type WorkloadMemberServiceCreateWorkloadMemberApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceCreateWorkloadMemberApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
  /** The workload_member to create. */
  workloadMember: WorkloadMemberWrite;
};
export type WorkloadMemberServiceDeleteWorkloadMemberApiResponse =
  /** status 200 Success */ DeleteWorkloadMemberResponse;
export type WorkloadMemberServiceDeleteWorkloadMemberApiArg = {
  /** Name of the workload_member workload_member to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique workloadResourceId for the resource */
  workloadResourceId: string;
};
export type WorkloadMemberServiceGetWorkloadMemberApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceGetWorkloadMemberApiArg = {
  /** Name of the requested workload_member. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique workloadResourceId for the resource */
  workloadResourceId: string;
};
export type LocalAccountServiceListLocalAccountsApiResponse =
  /** status 200 Success */ ListLocalAccountsResponseRead;
export type LocalAccountServiceListLocalAccountsApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type LocalAccountServiceCreateLocalAccountApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceCreateLocalAccountApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The localaccount to create. */
  localAccountResource: LocalAccountResource;
};
export type LocalAccountServiceDeleteLocalAccountApiResponse =
  /** status 200 Success */ DeleteLocalAccountResponse;
export type LocalAccountServiceDeleteLocalAccountApiArg = {
  /** Name of the localaccount to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type LocalAccountServiceGetLocalAccountApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceGetLocalAccountApiArg = {
  /** Name of the requested localaccount. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type LocationServiceListLocationsApiResponse =
  /** status 200 Success */ ListLocationsResponse;
export type LocationServiceListLocationsApiArg = {
  /** Filter locations by name */
  name?: string;
  /** Return site locations */
  showSites?: boolean;
  /** Return region locations */
  showRegions?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type ProviderServiceListProvidersApiResponse =
  /** status 200 Success */ ListProvidersResponseRead;
export type ProviderServiceListProvidersApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type ProviderServiceCreateProviderApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceCreateProviderApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The provider to create. */
  providerResource: ProviderResource;
};
export type ProviderServiceDeleteProviderApiResponse =
  /** status 200 Success */ DeleteProviderResponse;
export type ProviderServiceDeleteProviderApiArg = {
  /** Name of the provider provider to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ProviderServiceGetProviderApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceGetProviderApiArg = {
  /** Name of the requested provider. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type RegionServiceListRegionsApiResponse =
  /** status 200 Success */ ListRegionsResponseRead;
export type RegionServiceListRegionsApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Flag to signal if the total amount of site in a region should be returned. */
  showTotalSites?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type RegionServiceCreateRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceCreateRegionApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The region to create. */
  regionResource: RegionResourceWrite;
};
export type SiteServiceDeleteSiteApiResponse =
  /** status 200 Success */ DeleteSiteResponse;
export type SiteServiceDeleteSiteApiArg = {
  /** Name of the site site to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionResourceId for the resource */
  regionResourceId: string;
};
export type SiteServiceGetSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceGetSiteApiArg = {
  /** Name of the requested site. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionResourceId for the resource */
  regionResourceId: string;
};
export type SiteServicePatchSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServicePatchSiteApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionResourceId for the resource */
  regionResourceId: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceUpdateSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceUpdateSiteApiArg = {
  /** Name of the site site to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique regionResourceId for the resource */
  regionResourceId: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type RegionServiceDeleteRegionApiResponse =
  /** status 200 Success */ DeleteRegionResponse;
export type RegionServiceDeleteRegionApiArg = {
  /** Name of the region region to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type RegionServiceGetRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceGetRegionApiArg = {
  /** Name of the requested region. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type RegionServicePatchRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServicePatchRegionApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type RegionServiceUpdateRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceUpdateRegionApiArg = {
  /** Name of the region region to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type SiteServiceListSitesApiResponse =
  /** status 200 Success */ ListSitesResponseRead;
export type SiteServiceListSitesApiArg = {
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
};
export type SiteServiceCreateSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceCreateSiteApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
  /** The site to create. */
  siteResource: SiteResourceWrite;
};
export type ScheduleServiceListRepeatedSchedulesApiResponse =
  /** status 200 Success */ ListRepeatedSchedulesResponseRead;
export type ScheduleServiceListRepeatedSchedulesApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** The host ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified host ID applied to them, i.e., target including the inherited ones
     (parent site if not null). If null, returns all the schedules without a host ID as target. */
  hostId?: string;
  /** The site ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified site ID applied to them, i.e., target including the inherited ones.
     If null, returns all the schedules without a site ID as target */
  siteId?: string;
  /** The region ID target of the schedules. If not specified,
     returns all schedules (given the other query params).
     If specified, returns the schedules that have the specified region ID applied to them,
     i.e., target including the inherited ones (parent region if not null).
     If null, returns all the schedules without a region ID as target. */
  regionId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds. */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServiceCreateRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceCreateRepeatedScheduleApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The repeated_schedule to create. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceDeleteRepeatedScheduleApiResponse =
  /** status 200 Success */ DeleteRepeatedScheduleResponse;
export type ScheduleServiceDeleteRepeatedScheduleApiArg = {
  /** Name of the repeated_schedule repeated_schedule to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServiceGetRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceGetRepeatedScheduleApiArg = {
  /** Name of the requested repeated_schedule. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServicePatchRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServicePatchRepeatedScheduleApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceUpdateRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceUpdateRepeatedScheduleApiArg = {
  /** Name of the repeated_schedule repeated_schedule to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceListSingleSchedulesApiResponse =
  /** status 200 Success */ ListSingleSchedulesResponseRead;
export type ScheduleServiceListSingleSchedulesApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** The host ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified host ID applied to them, i.e., target including the inherited ones
     (parent site if not null). If null, returns all the schedules without a host ID as target. */
  hostId?: string;
  /** The site ID target of the schedules. If not specified, returns all schedules
     (given the other query params). If specified, returns the schedules that have
     the specified site ID applied to them, i.e., target including the inherited ones.
     If null, returns all the schedules without a site ID as target */
  siteId?: string;
  /** The region ID target of the schedules. If not specified,
     returns all schedules (given the other query params).
     If specified, returns the schedules that have the specified region ID applied to them,
     i.e., target including the inherited ones (parent region if not null).
     If null, returns all the schedules without a region ID as target. */
  regionId?: string;
  /** Filter based on the timestamp, expected to be UNIX epoch UTC timestamp in seconds. */
  unixEpoch?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServiceCreateSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceCreateSingleScheduleApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The single_schedule to create. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceDeleteSingleScheduleApiResponse =
  /** status 200 Success */ DeleteSingleScheduleResponse;
export type ScheduleServiceDeleteSingleScheduleApiArg = {
  /** Name of the single_schedule single_schedule to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServiceGetSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceGetSingleScheduleApiArg = {
  /** Name of the requested single_schedule. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ScheduleServicePatchSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServicePatchSingleScheduleApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceUpdateSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceUpdateSingleScheduleApiArg = {
  /** Name of the single_schedule single_schedule to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type TelemetryLogsGroupServiceListTelemetryLogsGroupsApiResponse =
  /** status 200 Success */ ListTelemetryLogsGroupsResponseRead;
export type TelemetryLogsGroupServiceListTelemetryLogsGroupsApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The telemetry_logs_group to create. */
  telemetryLogsGroupResource: TelemetryLogsGroupResource;
};
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsProfileResponse;
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg = {
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique loggroupResourceId for the resource */
  loggroupResourceId: string;
};
export type TelemetryLogsProfileServiceGetTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg = {
  /** Name of the requested telemetry_logs_profile. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique loggroupResourceId for the resource */
  loggroupResourceId: string;
};
export type TelemetryLogsProfileServicePatchTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServicePatchTelemetryLogsProfileApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique loggroupResourceId for the resource */
  loggroupResourceId: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiArg = {
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique loggroupResourceId for the resource */
  loggroupResourceId: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsGroupResponse;
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiArg = {
  /** Name of the telemetry_logs_group telemetry_logs_group to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg = {
  /** Name of the requested telemetry_logs_group. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse =
  /** status 200 Success */ ListTelemetryLogsProfilesResponseRead;
export type TelemetryLogsProfileServiceListTelemetryLogsProfilesApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
  instanceId?: string;
  /** Returns only the telemetry profiles that are assigned with the given siteID. */
  siteId?: string;
  /** Returns only the telemetry profiles that are assigned with the given regionID. */
  regionId?: string;
  /** Indicates if listed telemetry profiles should be extended with telemetry
     profiles rendered from hierarchy. This flag is only used along with one
     of siteId, regionId or instanceId. If siteId, regionId or instanceId are
     not set, this flag is ignored. */
  showInherited?: boolean;
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
};
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
  /** The telemetry_logs_profile to create. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiResponse =
  /** status 200 Success */ ListTelemetryMetricsGroupsResponseRead;
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The telemetry_metrics_group to create. */
  telemetryMetricsGroupResource: TelemetryMetricsGroupResource;
};
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsProfileResponse;
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg =
  {
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be deleted. */
    resourceId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique metricgroupResourceId for the resource */
    metricgroupResourceId: string;
  };
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg = {
  /** Name of the requested telemetry_metrics_profile. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique metricgroupResourceId for the resource */
  metricgroupResourceId: string;
};
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** unique metricgroupResourceId for the resource */
  metricgroupResourceId: string;
  /** Updated values for the telemetry_metrics_profile. */
  telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
};
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiArg =
  {
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be updated. */
    resourceId: string;
    /** unique projectName for the resource */
    projectName: string;
    /** unique metricgroupResourceId for the resource */
    metricgroupResourceId: string;
    /** Updated values for the telemetry_metrics_profile. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsGroupResponse;
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiArg = {
  /** Name of the telemetry_metrics_group telemetry_metrics_group to be deleted. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiArg = {
  /** Name of the requested telemetry_metrics_group. */
  resourceId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse =
  /** status 200 Success */ ListTelemetryMetricsProfilesResponseRead;
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Returns only the telemetry profiles that are assigned with the given instance identifier. */
  instanceId?: string;
  /** Returns only the telemetry profiles that are assigned with the given siteID. */
  siteId?: string;
  /** Returns only the telemetry profiles that are assigned with the given regionID. */
  regionId?: string;
  /** Indicates if listed telemetry profiles should be extended with telemetry
     profiles rendered from hierarchy. This flag is only used along with one
     of siteId, regionId or instanceId. If siteId, regionId or instanceId are
     not set, this flag is ignored. */
  showInherited?: boolean;
  /** unique projectName for the resource */
  projectName: string;
  /** unique resourceId for the resource */
  resourceId: string;
};
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiArg =
  {
    /** unique projectName for the resource */
    projectName: string;
    /** unique resourceId for the resource */
    resourceId: string;
    /** The telemetry_metrics_profile to create. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type BaremetalControllerKind =
  | "BAREMETAL_CONTROLLER_KIND_UNSPECIFIED"
  | "BAREMETAL_CONTROLLER_KIND_NONE"
  | "BAREMETAL_CONTROLLER_KIND_IPMI"
  | "BAREMETAL_CONTROLLER_KIND_VPRO"
  | "BAREMETAL_CONTROLLER_KIND_PDU";
export type PowerState =
  | "POWER_STATE_UNSPECIFIED"
  | "POWER_STATE_ERROR"
  | "POWER_STATE_ON"
  | "POWER_STATE_OFF";
export type HostState =
  | "HOST_STATE_UNSPECIFIED"
  | "HOST_STATE_DELETED"
  | "HOST_STATE_ONBOARDED"
  | "HOST_STATE_UNTRUSTED"
  | "HOST_STATE_REGISTERED";
export type StatusIndication =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type OsProviderKind =
  | "OS_PROVIDER_KIND_UNSPECIFIED"
  | "OS_PROVIDER_KIND_INFRA"
  | "OS_PROVIDER_KIND_LENOVO";
export type OsType =
  | "OS_TYPE_UNSPECIFIED"
  | "OS_TYPE_MUTABLE"
  | "OS_TYPE_IMMUTABLE";
export type SecurityFeature =
  | "SECURITY_FEATURE_UNSPECIFIED"
  | "SECURITY_FEATURE_NONE"
  | "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
export type GoogleProtobufTimestamp = string;
export type Timestamps = {
  createdAt?: GoogleProtobufTimestamp;
  updatedAt?: GoogleProtobufTimestamp;
};
export type OperatingSystemResource = {
  /** The OS resource's CPU architecture. */
  architecture?: string;
  description?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  /** The URL repository of the OS image. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information. */
  installedPackages?: string;
  /** The OS resource's kernel Command Line Options. */
  kernelCommand?: string;
  /** The OS resource's name. */
  name?: string;
  osProvider?: OsProviderKind;
  osType?: OsType;
  /** Name of an OS profile that the OS resource belongs to. Uniquely identifies a family of OS resources. */
  profileName?: string;
  /** Deprecated. OS image URL. URL of the original installation source. */
  repoUrl?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  timestamps?: Timestamps;
  /** The list of OS resource update sources.
     Should be in 'DEB822 Source Format' for Debian style OSs */
  updateSources: string[];
};
export type OperatingSystemResourceRead = {
  /** The OS resource's CPU architecture. */
  architecture?: string;
  description?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  /** The URL repository of the OS image. */
  imageUrl?: string;
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information. */
  installedPackages?: string;
  /** The OS resource's kernel Command Line Options. */
  kernelCommand?: string;
  /** The OS resource's name. */
  name?: string;
  osProvider?: OsProviderKind;
  /** Deprecated, The OS resource's unique identifier. Alias of resourceId. */
  osResourceID?: string;
  osType?: OsType;
  /** Opaque JSON field storing references to custom installation script(s) that
     supplements the base OS with additional OS-level dependencies/configurations.
     If empty, the default OS installation will be used. */
  platformBundle?: string;
  /** Name of an OS profile that the OS resource belongs to. Uniquely identifies a family of OS resources. */
  profileName?: string;
  /** Version of OS profile that the OS resource belongs to. */
  profileVersion?: string;
  /** Deprecated. OS image URL. URL of the original installation source. */
  repoUrl?: string;
  /** Resource ID, generated by inventory on Create. */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  timestamps?: Timestamps;
  /** The list of OS resource update sources.
     Should be in 'DEB822 Source Format' for Debian style OSs */
  updateSources: string[];
};
export type InstanceState =
  | "INSTANCE_STATE_UNSPECIFIED"
  | "INSTANCE_STATE_RUNNING"
  | "INSTANCE_STATE_DELETED"
  | "INSTANCE_STATE_UNTRUSTED";
export type InstanceKind = "INSTANCE_KIND_UNSPECIFIED" | "INSTANCE_KIND_METAL";
export type LocalAccountResource = {
  /** SSH Public Key of EN */
  sshKey: string;
  timestamps?: Timestamps;
  /** Username provided by admin */
  username: string;
};
export type LocalAccountResourceRead = {
  /** Deprecated, The local account resource's unique identifier. Alias of resourceId. */
  localAccountID?: string;
  /** resource identifier */
  resourceId?: string;
  /** SSH Public Key of EN */
  sshKey: string;
  timestamps?: Timestamps;
  /** Username provided by admin */
  username: string;
};
export type InstanceResource = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: HostResource;
  instanceStatusIndicator?: StatusIndication;
  kind?: InstanceKind;
  localaccount?: LocalAccountResource;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  provisioningStatusIndicator?: StatusIndication;
  securityFeature?: SecurityFeature;
  timestamps?: Timestamps;
  trustedAttestationStatusIndicator?: StatusIndication;
  updateStatusIndicator?: StatusIndication;
};
export type WorkloadMemberKind =
  | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
  | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
export type WorkloadKind =
  | "WORKLOAD_KIND_UNSPECIFIED"
  | "WORKLOAD_KIND_CLUSTER";
export type WorkloadResource = {
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** Human-readable status of the workload. */
  status?: string;
  timestamps?: Timestamps;
};
export type WorkloadResourceRead = {
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  kind: WorkloadKind;
  /** The members of the workload. */
  members: WorkloadMember[];
  /** Human-readable name for the workload. */
  name?: string;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** Human-readable status of the workload. */
  status?: string;
  timestamps?: Timestamps;
  /** Deprecated, The workload unique identifier. Alias of resourceId. */
  workloadId?: string;
};
export type WorkloadResourceWrite = {
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
  instance?: InstanceResource;
  kind: WorkloadMemberKind;
  member?: InstanceResource;
  timestamps?: Timestamps;
  workload?: WorkloadResource;
};
export type WorkloadMemberRead = {
  instance?: InstanceResourceRead;
  kind: WorkloadMemberKind;
  member?: InstanceResourceRead;
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  timestamps?: Timestamps;
  workload?: WorkloadResourceRead;
  /** Deprecated, The workload unique identifier. Alias of resourceId. */
  workloadMemberId?: string;
};
export type WorkloadMemberWrite = {
  instance?: InstanceResource;
  /** The unique identifier of the instance. */
  instanceId: string;
  kind: WorkloadMemberKind;
  member?: InstanceResource;
  timestamps?: Timestamps;
  workload?: WorkloadResourceWrite;
  /** The workload unique identifier. */
  workloadId: string;
};
export type InstanceResourceRead = {
  currentOs?: OperatingSystemResourceRead;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResourceRead;
  desiredState?: InstanceState;
  host?: HostResource;
  /** Deprecated, The instance's unique identifier. Alias of resourceID. */
  instanceID?: string;
  /** textual message that describes the current instance status. Set by RMs only. */
  instanceStatus?: string;
  /** Textual message that gives detailed status of the instance's software components. */
  instanceStatusDetail?: string;
  instanceStatusIndicator?: StatusIndication;
  /** UTC timestamp when instance_status was last changed. Set by RMs only. */
  instanceStatusTimestamp?: number;
  kind?: InstanceKind;
  localaccount?: LocalAccountResourceRead;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResourceRead;
  /** textual message that describes the provisioning status of Instance. Set by RMs only. */
  provisioningStatus?: string;
  provisioningStatusIndicator?: StatusIndication;
  /** UTC timestamp when provisioning_status was last changed. Set by RMs only. */
  provisioningStatusTimestamp?: number;
  /** Resource ID, generated on Create. */
  resourceId?: string;
  securityFeature?: SecurityFeature;
  timestamps?: Timestamps;
  /** textual message that describes the trusted_attestation status of Instance. Set by RMs only. */
  trustedAttestationStatus?: string;
  trustedAttestationStatusIndicator?: StatusIndication;
  /** UTC timestamp when trusted_attestation_status was last changed. Set by RMs only. */
  trustedAttestationStatusTimestamp?: number;
  /** textual message that describes the update status of Instance. Set by RMs only. */
  updateStatus?: string;
  /** JSON field storing details of Instance update status. Set by RMs only. Beta, subject to change. */
  updateStatusDetail?: string;
  updateStatusIndicator?: StatusIndication;
  /** UTC timestamp when update_status was last changed. Set by RMs only. */
  updateStatusTimestamp?: number;
  /** The workload members associated with the instance. back-reference to the Workload Members associated to this Instance */
  workloadMembers?: WorkloadMemberRead[];
};
export type InstanceResourceWrite = {
  currentOs?: OperatingSystemResource;
  currentState?: InstanceState;
  desiredOs?: OperatingSystemResource;
  desiredState?: InstanceState;
  host?: HostResource;
  /** The host's unique identifier associated with the instance. */
  hostID?: string;
  instanceStatusIndicator?: StatusIndication;
  kind?: InstanceKind;
  /** The unique identifier of local account will be associated with the instance. */
  localAccountID?: string;
  localaccount?: LocalAccountResource;
  /** The instance's human-readable name. */
  name?: string;
  os?: OperatingSystemResource;
  /** The unique identifier of OS resource that must be installed on the instance. */
  osID?: string;
  provisioningStatusIndicator?: StatusIndication;
  securityFeature?: SecurityFeature;
  timestamps?: Timestamps;
  trustedAttestationStatusIndicator?: StatusIndication;
  updateStatusIndicator?: StatusIndication;
};
export type MetadataItem = {
  /** The metadata key. */
  key: string;
  /** The metadata value. */
  value: string;
};
export type ProviderKind =
  | "PROVIDER_KIND_UNSPECIFIED"
  | "PROVIDER_KIND_BAREMETAL";
export type ProviderVendor =
  | "PROVIDER_VENDOR_UNSPECIFIED"
  | "PROVIDER_VENDOR_LENOVO_LXCA"
  | "PROVIDER_VENDOR_LENOVO_LOCA";
export type ProviderResource = {
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
export type ProviderResourceRead = {
  /** The provider resource's list of credentials. */
  apiCredentials?: string[];
  /** The provider resource's API endpoint. */
  apiEndpoint: string;
  /** Opaque provider configuration. */
  config?: string;
  /** The provider resource's name. */
  name: string;
  /** Deprecated, The provider resource's unique identifier. Alias of resourceId. */
  providerID?: string;
  providerKind: ProviderKind;
  providerVendor?: ProviderVendor;
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  timestamps?: Timestamps;
};
export type RegionResource = {
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The user-provided, human-readable name of region */
  name?: string;
  parentRegion?: RegionResource;
  timestamps?: Timestamps;
};
export type RegionResourceRead = {
  /** The rendered metadata from the Region parent(s)
     that can be inherited by the Region, represented by a list of key:value pairs.
     This field can not be used in filter. */
  inheritedMetadata?: MetadataItem[];
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The user-provided, human-readable name of region */
  name?: string;
  parentRegion?: RegionResourceRead;
  /** Deprecated, The Region unique identifier. Alias of resourceId. */
  regionID?: string;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  timestamps?: Timestamps;
  /** The total number of sites in the region. */
  totalSites?: number;
};
export type RegionResourceWrite = {
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The user-provided, human-readable name of region */
  name?: string;
  /** The parent Region unique identifier
     that the region is associated to, when existent.
     This field can not be used in filter. */
  parentId?: string;
  parentRegion?: RegionResourceWrite;
  timestamps?: Timestamps;
};
export type SiteResource = {
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The site's human-readable name. */
  name?: string;
  provider?: ProviderResource;
  region?: RegionResource;
  /** The geolocation latitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: Timestamps;
};
export type SiteResourceRead = {
  /** The rendered metadata from the Region parent(s)
     that can be inherited by the Region, represented by a list of key:value pairs.
     This field can not be used in filter. */
  inheritedMetadata?: MetadataItem[];
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The site's human-readable name. */
  name?: string;
  provider?: ProviderResourceRead;
  region?: RegionResourceRead;
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** Deprecated, The site unique identifier. Alias of resourceId. */
  siteID?: string;
  /** The geolocation latitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: Timestamps;
};
export type SiteResourceWrite = {
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The site's human-readable name. */
  name?: string;
  provider?: ProviderResource;
  region?: RegionResourceWrite;
  /** The region's unique identifier
     that the site is associated to. This field cannot be used in filter. */
  regionId?: string;
  /** The geolocation latitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLat must be in the range of +/- 90 degrees. */
  siteLat?: number;
  /** The geolocation longitude of the site.
     Points are represented as latitude-longitude pairs in the E7 representation
     (degrees are multiplied by 10**7 and rounded to the nearest integer).
     siteLng must be in the range of +/- 180 degrees (inclusive). */
  siteLng?: number;
  timestamps?: Timestamps;
};
export type HostResource = {
  bmcKind?: BaremetalControllerKind;
  currentPowerState?: PowerState;
  currentState?: HostState;
  desiredPowerState?: PowerState;
  desiredState?: HostState;
  hostStatusIndicator?: StatusIndication;
  instance?: InstanceResource;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The host name. */
  name: string;
  onboardingStatusIndicator?: StatusIndication;
  provider?: ProviderResource;
  registrationStatusIndicator?: StatusIndication;
  site?: SiteResource;
  timestamps?: Timestamps;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
};
export type HostgpuResource = {
  timestamps?: Timestamps;
};
export type HostgpuResourceRead = {
  /** The features of this GPU device, comma separated. */
  capabilities?: string[];
  /** The human-readable GPU device description. */
  description?: string;
  /** GPU name as reported by OS. */
  deviceName?: string;
  /** The GPU device PCI identifier. */
  pciId?: string;
  /** The GPU device model. */
  product?: string;
  timestamps?: Timestamps;
  /** The GPU device vendor. */
  vendor?: string;
};
export type LinkState =
  | "NETWORK_INTERFACE_LINK_STATE_UNSPECIFIED"
  | "NETWORK_INTERFACE_LINK_STATE_UP"
  | "NETWORK_INTERFACE_LINK_STATE_DOWN";
export type NetworkInterfaceLinkState = {
  timestamps?: Timestamps;
  type?: LinkState;
};
export type HostnicResource = {
  linkState?: NetworkInterfaceLinkState;
  timestamps?: Timestamps;
};
export type IpAddressConfigMethod =
  | "IP_ADDRESS_CONFIG_METHOD_UNSPECIFIED"
  | "IP_ADDRESS_CONFIG_METHOD_STATIC"
  | "IP_ADDRESS_CONFIG_METHOD_DYNAMIC";
export type IpAddressStatus =
  | "IP_ADDRESS_STATUS_UNSPECIFIED"
  | "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR"
  | "IP_ADDRESS_STATUS_ASSIGNED"
  | "IP_ADDRESS_STATUS_CONFIGURATION_ERROR"
  | "IP_ADDRESS_STATUS_CONFIGURED"
  | "IP_ADDRESS_STATUS_RELEASED"
  | "IP_ADDRESS_STATUS_ERROR";
export type IpAddressResource = {
  configMethod?: IpAddressConfigMethod;
  status?: IpAddressStatus;
  timestamps?: Timestamps;
};
export type IpAddressResourceRead = {
  /** CIDR representation of the IP address. */
  address?: string;
  configMethod?: IpAddressConfigMethod;
  /** Resource ID, generated by Inventory on Create */
  resourceId?: string;
  status?: IpAddressStatus;
  /** User-friendly status to provide details about the resource state */
  statusDetail?: string;
  timestamps?: Timestamps;
};
export type HostnicResourceRead = {
  /** Whether this is a bmc interface or not. */
  bmcInterface?: boolean;
  /** The device name (OS provided, like eth0, enp1s0, etc.). */
  deviceName?: string;
  /** The interface's IP address list. */
  ipaddresses?: IpAddressResourceRead[];
  linkState?: NetworkInterfaceLinkState;
  /** The interface MAC address. */
  macAddr?: string;
  /** Maximum transmission unit of the interface. */
  mtu?: number;
  /** PCI identifier string for this network interface. */
  pciIdentifier?: string;
  /** If the interface has SRIOV enabled. */
  sriovEnabled?: boolean;
  /** The number of VFs currently provisioned on the interface, if SR-IOV is supported. */
  sriovVfsNum?: number;
  /** The maximum number of VFs the interface supports, if SR-IOV is supported. */
  sriovVfsTotal?: number;
  timestamps?: Timestamps;
};
export type HoststorageResource = {
  timestamps?: Timestamps;
};
export type HoststorageResourceRead = {
  /** The storage device Capacity (size) in bytes. */
  capacityBytes?: string;
  /** The storage device device name (OS provided, like sda, sdb, etc.) */
  deviceName?: string;
  /** The storage device model. */
  model?: string;
  /** The storage device unique serial number. */
  serial?: string;
  timestamps?: Timestamps;
  /** The Storage device vendor. */
  vendor?: string;
  /** The storage device unique identifier. */
  wwid?: string;
};
export type HostusbResource = {
  timestamps?: Timestamps;
};
export type HostusbResourceRead = {
  /** USB Device number assigned by OS. */
  addr?: number;
  /** Bus number of device connected with. */
  bus?: number;
  /** class defined by USB-IF. */
  class?: string;
  /** the OS-provided device name. */
  deviceName?: string;
  /** Hexadecimal number representing ID of the USB device product. */
  idProduct?: string;
  /** Hexadecimal number representing ID of the USB device vendor. */
  idVendor?: string;
  /** Serial number of device. */
  serial?: string;
  timestamps?: Timestamps;
};
export type HostResourceRead = {
  /** BIOS Release Date. */
  biosReleaseDate?: string;
  /** BIOS Vendor. */
  biosVendor?: string;
  /** BIOS Version. */
  biosVersion?: string;
  /** BMC IP address, such as "192.0.0.1". */
  bmcIp?: string;
  bmcKind?: BaremetalControllerKind;
  /** Architecture of the CPU model, e.g. x86_64. */
  cpuArchitecture?: string;
  /** String list of all CPU capabilities (possibly JSON). */
  cpuCapabilities?: string;
  /** Number of CPU cores. */
  cpuCores?: number;
  /** CPU model of the Host. */
  cpuModel?: string;
  /** Number of physical CPU sockets. */
  cpuSockets?: number;
  /** Total Number of threads supported by the CPU. */
  cpuThreads?: number;
  /** JSON field storing the CPU topology, refer to HDA/HRM docs for the JSON schema. */
  cpuTopology?: string;
  currentPowerState?: PowerState;
  currentState?: HostState;
  desiredPowerState?: PowerState;
  desiredState?: HostState;
  /** Back-reference to attached host GPU resources. */
  hostGpus?: HostgpuResourceRead[];
  /** Back-reference to attached host NIC resources. */
  hostNics?: HostnicResourceRead[];
  /** textual message that describes the runtime status of Host. Set by RMs only. */
  hostStatus?: string;
  hostStatusIndicator?: StatusIndication;
  /** UTC timestamp when host_status was last changed. Set by RMs only. */
  hostStatusTimestamp?: number;
  /** Back-reference to attached host storage resources. */
  hostStorages?: HoststorageResourceRead[];
  /** Back-reference to attached host USB resources. */
  hostUsbs?: HostusbResourceRead[];
  /** Hostname. */
  hostname?: string;
  /** The metadata inherited by the host, represented by a list of key:value pairs, rendered by location and logical structures. */
  inheritedMetadata?: MetadataItem[];
  instance?: InstanceResourceRead;
  /** Quantity of memory (RAM) in the system in bytes. */
  memoryBytes?: string;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The host name. */
  name: string;
  /** The note associated with the host. */
  note?: string;
  /** textual message that describes the onboarding status of Host. Set by RMs only. */
  onboardingStatus?: string;
  onboardingStatusIndicator?: StatusIndication;
  /** UTC timestamp when onboarding_status was last changed. Set by RMs only. */
  onboardingStatusTimestamp?: number;
  /** System Product Name. */
  productName?: string;
  provider?: ProviderResourceRead;
  /** textual message that describes the onboarding status of Host. Set by RMs only. */
  registrationStatus?: string;
  registrationStatusIndicator?: StatusIndication;
  /** UTC timestamp when registration_status was last changed. Set by RMs only. */
  registrationStatusTimestamp?: number;
  /** Resource ID, generated on Create. */
  resourceId?: string;
  /** SMBIOS device serial number. */
  serialNumber?: string;
  site?: SiteResourceRead;
  timestamps?: Timestamps;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
};
export type HostResourceWrite = {
  bmcKind?: BaremetalControllerKind;
  currentPowerState?: PowerState;
  currentState?: HostState;
  desiredPowerState?: PowerState;
  desiredState?: HostState;
  hostStatusIndicator?: StatusIndication;
  instance?: InstanceResourceWrite;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The host name. */
  name: string;
  onboardingStatusIndicator?: StatusIndication;
  provider?: ProviderResource;
  registrationStatusIndicator?: StatusIndication;
  site?: SiteResourceWrite;
  /** The site where the host is located. */
  siteId?: string;
  timestamps?: Timestamps;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
};
export type ListHostsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of hosts. */
  hosts: HostResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListHostsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of hosts. */
  hosts: HostResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListHostsResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of hosts. */
  hosts: HostResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type GoogleProtobufAny = {
  debug?: {
    [key: string]: any;
  };
  type?: string;
  value?: Blob;
  [key: string]: any;
};
export type ConnectError = {
  /** The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code]. */
  code?:
    | "canceled"
    | "unknown"
    | "invalid_argument"
    | "deadline_exceeded"
    | "not_found"
    | "already_exists"
    | "permission_denied"
    | "resource_exhausted"
    | "failed_precondition"
    | "aborted"
    | "out_of_range"
    | "unimplemented"
    | "internal"
    | "unavailable"
    | "data_loss"
    | "unauthenticated";
  detail?: GoogleProtobufAny;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client. */
  message?: string;
  [key: string]: any;
};
export type DeleteHostResponse = object;
export type InvalidateHostResponse = object;
export type OnboardHostResponse = object;
export type HostRegister = {
  /** Flag ot signal to automatically onboard the host. */
  autoOnboard?: boolean;
  /** The host name. */
  name?: string;
  /** The host serial number. */
  serialNumber?: string;
  /** The host UUID. */
  uuid?: string;
};
export type GetHostSummaryResponse = {};
export type GetHostSummaryResponseRead = {
  /** The total number of hosts presenting an Error. */
  error?: number;
  /** The total number of hosts in Running state. */
  running?: number;
  /** The total number of hosts. */
  total?: number;
  /** The total number of hosts without a site. */
  unallocated?: number;
};
export type ListInstancesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of instances. */
  instances: InstanceResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListInstancesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of instances. */
  instances: InstanceResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListInstancesResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of instances. */
  instances: InstanceResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteInstanceResponse = object;
export type InvalidateInstanceResponse = object;
export type ListOperatingSystemsResponse = {
  /** Sorted and filtered list of oss. */
  OperatingSystemResources: OperatingSystemResource[];
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListOperatingSystemsResponseRead = {
  /** Sorted and filtered list of oss. */
  OperatingSystemResources: OperatingSystemResourceRead[];
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteOperatingSystemResponse = object;
export type ScheduleStatus =
  | "SCHEDULE_STATUS_UNSPECIFIED"
  | "SCHEDULE_STATUS_MAINTENANCE"
  | "SCHEDULE_STATUS_OS_UPDATE";
export type RepeatedScheduleResource = {
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostResource;
  targetRegion?: RegionResource;
  targetSite?: SiteResource;
  timestamps?: Timestamps;
};
export type RepeatedScheduleResourceRead = {
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  /** Deprecated, The repeated schedule's unique identifier. Alias of resourceId. */
  repeatedScheduleID?: string;
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostResourceRead;
  targetRegion?: RegionResourceRead;
  targetSite?: SiteResourceRead;
  timestamps?: Timestamps;
};
export type RepeatedScheduleResourceWrite = {
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  targetHost?: HostResourceWrite;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionResourceWrite;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteResourceWrite;
  /** The target site ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetSiteId?: string;
  timestamps?: Timestamps;
};
export type SingleScheduleResource = {
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: HostResource;
  targetRegion?: RegionResource;
  targetSite?: SiteResource;
  timestamps?: Timestamps;
};
export type SingleScheduleResourceRead = {
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  scheduleStatus: ScheduleStatus;
  /** Deprecated, The single schedule resource's unique identifier. Alias of resourceId. */
  singleScheduleID?: string;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: HostResourceRead;
  targetRegion?: RegionResourceRead;
  targetSite?: SiteResourceRead;
  timestamps?: Timestamps;
};
export type SingleScheduleResourceWrite = {
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The schedule's name. */
  name?: string;
  scheduleStatus: ScheduleStatus;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  targetHost?: HostResourceWrite;
  /** The target host ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetHostId?: string;
  targetRegion?: RegionResourceWrite;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetRegionId?: string;
  targetSite?: SiteResourceWrite;
  /** The target site ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetSiteId?: string;
  timestamps?: Timestamps;
};
export type ListSchedulesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResource[];
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSchedulesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceRead[];
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSchedulesResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceWrite[];
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListWorkloadsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workloads. */
  workloads: WorkloadResource[];
};
export type ListWorkloadsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workloads. */
  workloads: WorkloadResourceRead[];
};
export type ListWorkloadsResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workloads. */
  workloads: WorkloadResourceWrite[];
};
export type DeleteWorkloadResponse = object;
export type ListWorkloadMembersResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMember[];
};
export type ListWorkloadMembersResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMemberRead[];
};
export type ListWorkloadMembersResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMemberWrite[];
};
export type DeleteWorkloadMemberResponse = object;
export type ListLocalAccountsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of localaccounts. */
  localAccounts: LocalAccountResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListLocalAccountsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of localaccounts. */
  localAccounts: LocalAccountResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteLocalAccountResponse = object;
export type ResourceKind =
  | "RESOURCE_KIND_UNSPECIFIED"
  | "RESOURCE_KIND_REGION"
  | "RESOURCE_KIND_SITE";
export type LocationNode = {
  /** The node human readable name. */
  name: string;
  /** The associated resource ID, of the parent resource of this Location node.
     In the case of a region, it could be empty or a regionId.
     In the case of a site, it could be empty or a regionId. */
  parentId: string;
  /** The associated node resource ID, generated by inventory on Create. */
  resourceId: string;
  type: ResourceKind;
};
export type ListLocationsResponse = {
  /** Sorted and filtered list of regions. */
  nodes: LocationNode[];
  /** (OPTIONAL) Amount of items in the returned list. */
  outputElements?: number;
  /** (OPTIONAL) Count of items in the entire list, regardless of pagination. */
  totalElements?: number;
};
export type ListProvidersResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of providers. */
  providers: ProviderResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListProvidersResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of providers. */
  providers: ProviderResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteProviderResponse = object;
export type ListRegionsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of regions. */
  regions: RegionResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRegionsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of regions. */
  regions: RegionResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRegionsResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of regions. */
  regions: RegionResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteSiteResponse = object;
export type DeleteRegionResponse = object;
export type ListSitesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of sites. */
  sites: SiteResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSitesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of sites. */
  sites: SiteResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSitesResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of sites. */
  sites: SiteResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRepeatedSchedulesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRepeatedSchedulesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRepeatedSchedulesResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteRepeatedScheduleResponse = object;
export type ListSingleSchedulesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSingleSchedulesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListSingleSchedulesResponseWrite = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteSingleScheduleResponse = object;
export type TelemetryCollectorKind =
  | "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED"
  | "TELEMETRY_COLLECTOR_KIND_HOST"
  | "TELEMETRY_COLLECTOR_KIND_CLUSTER";
export type TelemetryLogsGroupResource = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group. */
  name: string;
  timestamps?: Timestamps;
};
export type TelemetryLogsGroupResourceRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group. */
  name: string;
  /** Unique ID of the telemetry group. */
  resourceId?: string;
  /** Deprecated, Unique ID of the telemetry group. Alias of resource_id. */
  telemetryLogsGroupId?: string;
  timestamps?: Timestamps;
};
export type ListTelemetryLogsGroupsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_logs_groups. */
  telemetryLogsGroups: TelemetryLogsGroupResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListTelemetryLogsGroupsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_logs_groups. */
  telemetryLogsGroups: TelemetryLogsGroupResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteTelemetryLogsProfileResponse = object;
export type SeverityLevel =
  | "SEVERITY_LEVEL_UNSPECIFIED"
  | "SEVERITY_LEVEL_CRITICAL"
  | "SEVERITY_LEVEL_ERROR"
  | "SEVERITY_LEVEL_WARN"
  | "SEVERITY_LEVEL_INFO"
  | "SEVERITY_LEVEL_DEBUG";
export type TelemetryLogsProfileResource = {
  logLevel: SeverityLevel;
  logsGroup?: TelemetryLogsGroupResource;
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type TelemetryLogsProfileResourceRead = {
  logLevel: SeverityLevel;
  logsGroup?: TelemetryLogsGroupResourceRead;
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** Deprecated, The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the telemetry profile. */
  resourceId?: string;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type DeleteTelemetryLogsGroupResponse = object;
export type ListTelemetryLogsProfilesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_logs_profiles. */
  telemetryLogsProfiles: TelemetryLogsProfileResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListTelemetryLogsProfilesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_logs_profiles. */
  telemetryLogsProfiles: TelemetryLogsProfileResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type TelemetryMetricsGroupResource = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group. */
  name: string;
  timestamps?: Timestamps;
};
export type TelemetryMetricsGroupResourceRead = {
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Human-readable name for the log group. */
  name: string;
  /** Unique ID of the telemetry group. */
  resourceId?: string;
  /** Deprecated, Unique ID of the telemetry group. Alias of resource_id. */
  telemetryMetricsGroupId?: string;
  timestamps?: Timestamps;
};
export type ListTelemetryMetricsGroupsResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_metrics_groups. */
  telemetryMetricsGroups: TelemetryMetricsGroupResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListTelemetryMetricsGroupsResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_metrics_groups. */
  telemetryMetricsGroups: TelemetryMetricsGroupResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type DeleteTelemetryMetricsProfileResponse = object;
export type TelemetryMetricsProfileResource = {
  metricsGroup?: TelemetryMetricsGroupResource;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** Metric interval (in seconds) for the telemetry profile.
     This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type TelemetryMetricsProfileResourceRead = {
  metricsGroup?: TelemetryMetricsGroupResourceRead;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** Metric interval (in seconds) for the telemetry profile.
     This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** Deprecated, The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the telemetry profile. */
  resourceId?: string;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  timestamps?: Timestamps;
};
export type DeleteTelemetryMetricsGroupResponse = object;
export type ListTelemetryMetricsProfilesResponse = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_metrics_profiles. */
  telemetryMetricsProfiles: TelemetryMetricsProfileResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListTelemetryMetricsProfilesResponseRead = {
  /** Inform if there are more elements */
  hasNext: boolean;
  /** Sorted and filtered list of telemetry_metrics_profiles. */
  telemetryMetricsProfiles: TelemetryMetricsProfileResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export const {
  useHostServiceListHostsQuery,
  useHostServiceCreateHostMutation,
  useHostServiceDeleteHostMutation,
  useHostServiceGetHostQuery,
  useHostServicePatchHostMutation,
  useHostServiceUpdateHostMutation,
  useHostServiceInvalidateHostMutation,
  useHostServiceOnboardHostMutation,
  useHostServiceRegisterUpdateHostMutation,
  useHostServiceRegisterHostMutation,
  useHostServiceGetHostsSummaryQuery,
  useInstanceServiceListInstancesQuery,
  useInstanceServiceCreateInstanceMutation,
  useInstanceServiceDeleteInstanceMutation,
  useInstanceServiceGetInstanceQuery,
  useInstanceServicePatchInstanceMutation,
  useInstanceServiceUpdateInstanceMutation,
  useInstanceServiceInvalidateInstanceMutation,
  useOperatingSystemServiceListOperatingSystemsQuery,
  useOperatingSystemServiceCreateOperatingSystemMutation,
  useOperatingSystemServiceDeleteOperatingSystemMutation,
  useOperatingSystemServiceGetOperatingSystemQuery,
  useOperatingSystemServicePatchOperatingSystemMutation,
  useOperatingSystemServiceUpdateOperatingSystemMutation,
  useScheduleServiceListSchedulesQuery,
  useWorkloadServiceListWorkloadsQuery,
  useWorkloadServiceCreateWorkloadMutation,
  useWorkloadServiceDeleteWorkloadMutation,
  useWorkloadServiceGetWorkloadQuery,
  useWorkloadServicePatchWorkloadMutation,
  useWorkloadServiceUpdateWorkloadMutation,
  useWorkloadMemberServiceListWorkloadMembersQuery,
  useWorkloadMemberServiceCreateWorkloadMemberMutation,
  useWorkloadMemberServiceDeleteWorkloadMemberMutation,
  useWorkloadMemberServiceGetWorkloadMemberQuery,
  useLocalAccountServiceListLocalAccountsQuery,
  useLocalAccountServiceCreateLocalAccountMutation,
  useLocalAccountServiceDeleteLocalAccountMutation,
  useLocalAccountServiceGetLocalAccountQuery,
  useLocationServiceListLocationsQuery,
  useProviderServiceListProvidersQuery,
  useProviderServiceCreateProviderMutation,
  useProviderServiceDeleteProviderMutation,
  useProviderServiceGetProviderQuery,
  useRegionServiceListRegionsQuery,
  useRegionServiceCreateRegionMutation,
  useSiteServiceDeleteSiteMutation,
  useSiteServiceGetSiteQuery,
  useSiteServicePatchSiteMutation,
  useSiteServiceUpdateSiteMutation,
  useRegionServiceDeleteRegionMutation,
  useRegionServiceGetRegionQuery,
  useRegionServicePatchRegionMutation,
  useRegionServiceUpdateRegionMutation,
  useSiteServiceListSitesQuery,
  useSiteServiceCreateSiteMutation,
  useScheduleServiceListRepeatedSchedulesQuery,
  useScheduleServiceCreateRepeatedScheduleMutation,
  useScheduleServiceDeleteRepeatedScheduleMutation,
  useScheduleServiceGetRepeatedScheduleQuery,
  useScheduleServicePatchRepeatedScheduleMutation,
  useScheduleServiceUpdateRepeatedScheduleMutation,
  useScheduleServiceListSingleSchedulesQuery,
  useScheduleServiceCreateSingleScheduleMutation,
  useScheduleServiceDeleteSingleScheduleMutation,
  useScheduleServiceGetSingleScheduleQuery,
  useScheduleServicePatchSingleScheduleMutation,
  useScheduleServiceUpdateSingleScheduleMutation,
  useTelemetryLogsGroupServiceListTelemetryLogsGroupsQuery,
  useTelemetryLogsGroupServiceCreateTelemetryLogsGroupMutation,
  useTelemetryLogsProfileServiceDeleteTelemetryLogsProfileMutation,
  useTelemetryLogsProfileServiceGetTelemetryLogsProfileQuery,
  useTelemetryLogsProfileServicePatchTelemetryLogsProfileMutation,
  useTelemetryLogsProfileServiceUpdateTelemetryLogsProfileMutation,
  useTelemetryLogsGroupServiceDeleteTelemetryLogsGroupMutation,
  useTelemetryLogsGroupServiceGetTelemetryLogsGroupQuery,
  useTelemetryLogsProfileServiceListTelemetryLogsProfilesQuery,
  useTelemetryLogsProfileServiceCreateTelemetryLogsProfileMutation,
  useTelemetryMetricsGroupServiceListTelemetryMetricsGroupsQuery,
  useTelemetryMetricsGroupServiceCreateTelemetryMetricsGroupMutation,
  useTelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileMutation,
  useTelemetryMetricsProfileServiceGetTelemetryMetricsProfileQuery,
  useTelemetryMetricsProfileServicePatchTelemetryMetricsProfileMutation,
  useTelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileMutation,
  useTelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupMutation,
  useTelemetryMetricsGroupServiceGetTelemetryMetricsGroupQuery,
  useTelemetryMetricsProfileServiceListTelemetryMetricsProfilesQuery,
  useTelemetryMetricsProfileServiceCreateTelemetryMetricsProfileMutation,
} = injectedRtkApi;
