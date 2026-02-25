import { infraApi as api } from "./apiSlice";
export const addTagTypes = [
  "CustomConfigService",
  "HostService",
  "InstanceService",
  "LocalAccountService",
  "LocationService",
  "OperatingSystemService",
  "OSUpdatePolicy",
  "OSUpdateRun",
  "ProviderService",
  "RegionService",
  "ScheduleService",
  "SiteService",
  "TelemetryLogsGroupService",
  "TelemetryMetricsGroupService",
  "TelemetryLogsProfileService",
  "TelemetryMetricsProfileService",
  "WorkloadMemberService",
  "WorkloadService",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      customConfigServiceListCustomConfigs2: build.query<
        CustomConfigServiceListCustomConfigs2ApiResponse,
        CustomConfigServiceListCustomConfigs2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/customConfigs`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["CustomConfigService"],
      }),
      customConfigServiceCreateCustomConfig2: build.mutation<
        CustomConfigServiceCreateCustomConfig2ApiResponse,
        CustomConfigServiceCreateCustomConfig2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/customConfigs`,
          method: "POST",
          body: queryArg.customConfigResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["CustomConfigService"],
      }),
      customConfigServiceGetCustomConfig2: build.query<
        CustomConfigServiceGetCustomConfig2ApiResponse,
        CustomConfigServiceGetCustomConfig2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/customConfigs/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["CustomConfigService"],
      }),
      customConfigServiceDeleteCustomConfig2: build.mutation<
        CustomConfigServiceDeleteCustomConfig2ApiResponse,
        CustomConfigServiceDeleteCustomConfig2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/customConfigs/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["CustomConfigService"],
      }),
      hostServiceListHosts2: build.query<
        HostServiceListHosts2ApiResponse,
        HostServiceListHosts2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["HostService"],
      }),
      hostServiceCreateHost2: build.mutation<
        HostServiceCreateHost2ApiResponse,
        HostServiceCreateHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts`,
          method: "POST",
          body: queryArg.hostResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceRegisterHost2: build.mutation<
        HostServiceRegisterHost2ApiResponse,
        HostServiceRegisterHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/register`,
          method: "POST",
          body: queryArg.hostRegister,
          params: {
            resourceId: queryArg.resourceId,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceGetHost2: build.query<
        HostServiceGetHost2ApiResponse,
        HostServiceGetHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["HostService"],
      }),
      hostServiceUpdateHost2: build.mutation<
        HostServiceUpdateHost2ApiResponse,
        HostServiceUpdateHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.hostResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceDeleteHost2: build.mutation<
        HostServiceDeleteHost2ApiResponse,
        HostServiceDeleteHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServicePatchHost2: build.mutation<
        HostServicePatchHost2ApiResponse,
        HostServicePatchHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.hostResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceInvalidateHost2: build.mutation<
        HostServiceInvalidateHost2ApiResponse,
        HostServiceInvalidateHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}/invalidate`,
          method: "PUT",
          params: { note: queryArg.note, projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceOnboardHost2: build.mutation<
        HostServiceOnboardHost2ApiResponse,
        HostServiceOnboardHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}/onboard`,
          method: "PATCH",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServicePatchRegisterHost2: build.mutation<
        HostServicePatchRegisterHost2ApiResponse,
        HostServicePatchRegisterHost2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts/${queryArg.resourceId}/register`,
          method: "PATCH",
          body: queryArg.hostRegister,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceGetHostsSummary2: build.query<
        HostServiceGetHostsSummary2ApiResponse,
        HostServiceGetHostsSummary2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/hosts_summary`,
          params: {
            filter: queryArg.filter,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["HostService"],
      }),
      instanceServiceListInstances2: build.query<
        InstanceServiceListInstances2ApiResponse,
        InstanceServiceListInstances2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["InstanceService"],
      }),
      instanceServiceCreateInstance2: build.mutation<
        InstanceServiceCreateInstance2ApiResponse,
        InstanceServiceCreateInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances`,
          method: "POST",
          body: queryArg.instanceResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceGetInstance2: build.query<
        InstanceServiceGetInstance2ApiResponse,
        InstanceServiceGetInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["InstanceService"],
      }),
      instanceServiceUpdateInstance2: build.mutation<
        InstanceServiceUpdateInstance2ApiResponse,
        InstanceServiceUpdateInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.instanceResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceDeleteInstance2: build.mutation<
        InstanceServiceDeleteInstance2ApiResponse,
        InstanceServiceDeleteInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServicePatchInstance2: build.mutation<
        InstanceServicePatchInstance2ApiResponse,
        InstanceServicePatchInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.instanceResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["InstanceService"],
      }),
      instanceServiceInvalidateInstance2: build.mutation<
        InstanceServiceInvalidateInstance2ApiResponse,
        InstanceServiceInvalidateInstance2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/instances/${queryArg.resourceId}/invalidate`,
          method: "PUT",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["InstanceService"],
      }),
      localAccountServiceListLocalAccounts2: build.query<
        LocalAccountServiceListLocalAccounts2ApiResponse,
        LocalAccountServiceListLocalAccounts2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/localAccounts`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["LocalAccountService"],
      }),
      localAccountServiceCreateLocalAccount2: build.mutation<
        LocalAccountServiceCreateLocalAccount2ApiResponse,
        LocalAccountServiceCreateLocalAccount2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/localAccounts`,
          method: "POST",
          body: queryArg.localAccountResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["LocalAccountService"],
      }),
      localAccountServiceGetLocalAccount2: build.query<
        LocalAccountServiceGetLocalAccount2ApiResponse,
        LocalAccountServiceGetLocalAccount2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/localAccounts/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["LocalAccountService"],
      }),
      localAccountServiceDeleteLocalAccount2: build.mutation<
        LocalAccountServiceDeleteLocalAccount2ApiResponse,
        LocalAccountServiceDeleteLocalAccount2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/localAccounts/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["LocalAccountService"],
      }),
      locationServiceListLocations2: build.query<
        LocationServiceListLocations2ApiResponse,
        LocationServiceListLocations2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/locations`,
          params: {
            name: queryArg.name,
            showSites: queryArg.showSites,
            showRegions: queryArg.showRegions,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["LocationService"],
      }),
      operatingSystemServiceListOperatingSystems2: build.query<
        OperatingSystemServiceListOperatingSystems2ApiResponse,
        OperatingSystemServiceListOperatingSystems2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceCreateOperatingSystem2: build.mutation<
        OperatingSystemServiceCreateOperatingSystem2ApiResponse,
        OperatingSystemServiceCreateOperatingSystem2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems`,
          method: "POST",
          body: queryArg.operatingSystemResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceGetOperatingSystem2: build.query<
        OperatingSystemServiceGetOperatingSystem2ApiResponse,
        OperatingSystemServiceGetOperatingSystem2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceUpdateOperatingSystem2: build.mutation<
        OperatingSystemServiceUpdateOperatingSystem2ApiResponse,
        OperatingSystemServiceUpdateOperatingSystem2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.operatingSystemResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceDeleteOperatingSystem2: build.mutation<
        OperatingSystemServiceDeleteOperatingSystem2ApiResponse,
        OperatingSystemServiceDeleteOperatingSystem2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServicePatchOperatingSystem2: build.mutation<
        OperatingSystemServicePatchOperatingSystem2ApiResponse,
        OperatingSystemServicePatchOperatingSystem2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/operating_systems/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.operatingSystemResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      osUpdatePolicyListOsUpdatePolicy2: build.query<
        OsUpdatePolicyListOsUpdatePolicy2ApiResponse,
        OsUpdatePolicyListOsUpdatePolicy2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_policy`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyCreateOsUpdatePolicy2: build.mutation<
        OsUpdatePolicyCreateOsUpdatePolicy2ApiResponse,
        OsUpdatePolicyCreateOsUpdatePolicy2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_policy`,
          method: "POST",
          body: queryArg.osUpdatePolicy,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyGetOsUpdatePolicy2: build.query<
        OsUpdatePolicyGetOsUpdatePolicy2ApiResponse,
        OsUpdatePolicyGetOsUpdatePolicy2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_policy/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyDeleteOsUpdatePolicy2: build.mutation<
        OsUpdatePolicyDeleteOsUpdatePolicy2ApiResponse,
        OsUpdatePolicyDeleteOsUpdatePolicy2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_policy/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdateRunListOsUpdateRun2: build.query<
        OsUpdateRunListOsUpdateRun2ApiResponse,
        OsUpdateRunListOsUpdateRun2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_run`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunGetOsUpdateRun2: build.query<
        OsUpdateRunGetOsUpdateRun2ApiResponse,
        OsUpdateRunGetOsUpdateRun2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_run/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunDeleteOsUpdateRun2: build.mutation<
        OsUpdateRunDeleteOsUpdateRun2ApiResponse,
        OsUpdateRunDeleteOsUpdateRun2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/os_update_run/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["OSUpdateRun"],
      }),
      providerServiceListProviders2: build.query<
        ProviderServiceListProviders2ApiResponse,
        ProviderServiceListProviders2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/providers`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["ProviderService"],
      }),
      providerServiceCreateProvider2: build.mutation<
        ProviderServiceCreateProvider2ApiResponse,
        ProviderServiceCreateProvider2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/providers`,
          method: "POST",
          body: queryArg.providerResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ProviderService"],
      }),
      providerServiceGetProvider2: build.query<
        ProviderServiceGetProvider2ApiResponse,
        ProviderServiceGetProvider2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/providers/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["ProviderService"],
      }),
      providerServiceDeleteProvider2: build.mutation<
        ProviderServiceDeleteProvider2ApiResponse,
        ProviderServiceDeleteProvider2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/providers/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ProviderService"],
      }),
      regionServiceListRegions2: build.query<
        RegionServiceListRegions2ApiResponse,
        RegionServiceListRegions2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            showTotalSites: queryArg.showTotalSites,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["RegionService"],
      }),
      regionServiceCreateRegion2: build.mutation<
        RegionServiceCreateRegion2ApiResponse,
        RegionServiceCreateRegion2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions`,
          method: "POST",
          body: queryArg.regionResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["RegionService"],
      }),
      regionServiceGetRegion2: build.query<
        RegionServiceGetRegion2ApiResponse,
        RegionServiceGetRegion2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["RegionService"],
      }),
      regionServiceUpdateRegion2: build.mutation<
        RegionServiceUpdateRegion2ApiResponse,
        RegionServiceUpdateRegion2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.regionResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["RegionService"],
      }),
      regionServiceDeleteRegion2: build.mutation<
        RegionServiceDeleteRegion2ApiResponse,
        RegionServiceDeleteRegion2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["RegionService"],
      }),
      regionServicePatchRegion2: build.mutation<
        RegionServicePatchRegion2ApiResponse,
        RegionServicePatchRegion2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/regions/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.regionResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["RegionService"],
      }),
      scheduleServiceListSchedules2: build.query<
        ScheduleServiceListSchedules2ApiResponse,
        ScheduleServiceListSchedules2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceListRepeatedSchedules2: build.query<
        ScheduleServiceListRepeatedSchedules2ApiResponse,
        ScheduleServiceListRepeatedSchedules2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceCreateRepeatedSchedule2: build.mutation<
        ScheduleServiceCreateRepeatedSchedule2ApiResponse,
        ScheduleServiceCreateRepeatedSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated`,
          method: "POST",
          body: queryArg.repeatedScheduleResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetRepeatedSchedule2: build.query<
        ScheduleServiceGetRepeatedSchedule2ApiResponse,
        ScheduleServiceGetRepeatedSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateRepeatedSchedule2: build.mutation<
        ScheduleServiceUpdateRepeatedSchedule2ApiResponse,
        ScheduleServiceUpdateRepeatedSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.repeatedScheduleResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteRepeatedSchedule2: build.mutation<
        ScheduleServiceDeleteRepeatedSchedule2ApiResponse,
        ScheduleServiceDeleteRepeatedSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServicePatchRepeatedSchedule2: build.mutation<
        ScheduleServicePatchRepeatedSchedule2ApiResponse,
        ScheduleServicePatchRepeatedSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/repeated/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.repeatedScheduleResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceListSingleSchedules2: build.query<
        ScheduleServiceListSingleSchedules2ApiResponse,
        ScheduleServiceListSingleSchedules2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            hostId: queryArg.hostId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            unixEpoch: queryArg.unixEpoch,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceCreateSingleSchedule2: build.mutation<
        ScheduleServiceCreateSingleSchedule2ApiResponse,
        ScheduleServiceCreateSingleSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single`,
          method: "POST",
          body: queryArg.singleScheduleResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetSingleSchedule2: build.query<
        ScheduleServiceGetSingleSchedule2ApiResponse,
        ScheduleServiceGetSingleSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateSingleSchedule2: build.mutation<
        ScheduleServiceUpdateSingleSchedule2ApiResponse,
        ScheduleServiceUpdateSingleSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.singleScheduleResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteSingleSchedule2: build.mutation<
        ScheduleServiceDeleteSingleSchedule2ApiResponse,
        ScheduleServiceDeleteSingleSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServicePatchSingleSchedule2: build.mutation<
        ScheduleServicePatchSingleSchedule2ApiResponse,
        ScheduleServicePatchSingleSchedule2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/schedules/single/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.singleScheduleResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      siteServiceListSites2: build.query<
        SiteServiceListSites2ApiResponse,
        SiteServiceListSites2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
            regionId: queryArg.regionId,
          },
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceCreateSite2: build.mutation<
        SiteServiceCreateSite2ApiResponse,
        SiteServiceCreateSite2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites`,
          method: "POST",
          body: queryArg.siteResource,
          params: {
            projectName: queryArg.projectName,
            regionId: queryArg.regionId,
          },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceGetSite2: build.query<
        SiteServiceGetSite2ApiResponse,
        SiteServiceGetSite2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites/${queryArg.resourceId}`,
          params: {
            projectName: queryArg.projectName,
            regionId: queryArg.regionId,
          },
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceUpdateSite2: build.mutation<
        SiteServiceUpdateSite2ApiResponse,
        SiteServiceUpdateSite2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.siteResource,
          params: {
            projectName: queryArg.projectName,
            regionId: queryArg.regionId,
          },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceDeleteSite2: build.mutation<
        SiteServiceDeleteSite2ApiResponse,
        SiteServiceDeleteSite2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites/${queryArg.resourceId}`,
          method: "DELETE",
          params: {
            projectName: queryArg.projectName,
            regionId: queryArg.regionId,
          },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServicePatchSite2: build.mutation<
        SiteServicePatchSite2ApiResponse,
        SiteServicePatchSite2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/sites/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.siteResource,
          params: {
            fieldMask: queryArg.fieldMask,
            regionId: queryArg.regionId,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["SiteService"],
      }),
      telemetryLogsGroupServiceListTelemetryLogsGroups2: build.query<
        TelemetryLogsGroupServiceListTelemetryLogsGroups2ApiResponse,
        TelemetryLogsGroupServiceListTelemetryLogsGroups2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/logs`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceCreateTelemetryLogsGroup2: build.mutation<
        TelemetryLogsGroupServiceCreateTelemetryLogsGroup2ApiResponse,
        TelemetryLogsGroupServiceCreateTelemetryLogsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/logs`,
          method: "POST",
          body: queryArg.telemetryLogsGroupResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceGetTelemetryLogsGroup2: build.query<
        TelemetryLogsGroupServiceGetTelemetryLogsGroup2ApiResponse,
        TelemetryLogsGroupServiceGetTelemetryLogsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/logs/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceDeleteTelemetryLogsGroup2: build.mutation<
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroup2ApiResponse,
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/logs/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryMetricsGroupServiceListTelemetryMetricsGroups2: build.query<
        TelemetryMetricsGroupServiceListTelemetryMetricsGroups2ApiResponse,
        TelemetryMetricsGroupServiceListTelemetryMetricsGroups2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/metrics`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceCreateTelemetryMetricsGroup2: build.mutation<
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup2ApiResponse,
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/metrics`,
          method: "POST",
          body: queryArg.telemetryMetricsGroupResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceGetTelemetryMetricsGroup2: build.query<
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroup2ApiResponse,
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/metrics/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2: build.mutation<
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2ApiResponse,
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/groups/metrics/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryLogsProfileServiceListTelemetryLogsProfiles2: build.query<
        TelemetryLogsProfileServiceListTelemetryLogsProfiles2ApiResponse,
        TelemetryLogsProfileServiceListTelemetryLogsProfiles2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            instanceId: queryArg.instanceId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            showInherited: queryArg.showInherited,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceCreateTelemetryLogsProfile2: build.mutation<
        TelemetryLogsProfileServiceCreateTelemetryLogsProfile2ApiResponse,
        TelemetryLogsProfileServiceCreateTelemetryLogsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs`,
          method: "POST",
          body: queryArg.telemetryLogsProfileResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceGetTelemetryLogsProfile2: build.query<
        TelemetryLogsProfileServiceGetTelemetryLogsProfile2ApiResponse,
        TelemetryLogsProfileServiceGetTelemetryLogsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceUpdateTelemetryLogsProfile2: build.mutation<
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfile2ApiResponse,
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.telemetryLogsProfileResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceDeleteTelemetryLogsProfile2: build.mutation<
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfile2ApiResponse,
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServicePatchTelemetryLogsProfile2: build.mutation<
        TelemetryLogsProfileServicePatchTelemetryLogsProfile2ApiResponse,
        TelemetryLogsProfileServicePatchTelemetryLogsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.telemetryLogsProfileResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryMetricsProfileServiceListTelemetryMetricsProfiles2: build.query<
        TelemetryMetricsProfileServiceListTelemetryMetricsProfiles2ApiResponse,
        TelemetryMetricsProfileServiceListTelemetryMetricsProfiles2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            instanceId: queryArg.instanceId,
            siteId: queryArg.siteId,
            regionId: queryArg.regionId,
            showInherited: queryArg.showInherited,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["TelemetryMetricsProfileService"],
      }),
      telemetryMetricsProfileServiceCreateTelemetryMetricsProfile2:
        build.mutation<
          TelemetryMetricsProfileServiceCreateTelemetryMetricsProfile2ApiResponse,
          TelemetryMetricsProfileServiceCreateTelemetryMetricsProfile2ApiArg
        >({
          query: (queryArg) => ({
            url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics`,
            method: "POST",
            body: queryArg.telemetryMetricsProfileResource,
            params: { projectName: queryArg.projectName },
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceGetTelemetryMetricsProfile2: build.query<
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfile2ApiResponse,
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfile2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["TelemetryMetricsProfileService"],
      }),
      telemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2:
        build.mutation<
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2ApiResponse,
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2ApiArg
        >({
          query: (queryArg) => ({
            url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "PUT",
            body: queryArg.telemetryMetricsProfileResource,
            params: { projectName: queryArg.projectName },
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2:
        build.mutation<
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2ApiResponse,
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2ApiArg
        >({
          query: (queryArg) => ({
            url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "DELETE",
            params: { projectName: queryArg.projectName },
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServicePatchTelemetryMetricsProfile2:
        build.mutation<
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfile2ApiResponse,
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfile2ApiArg
        >({
          query: (queryArg) => ({
            url: `/edge-infra.orchestrator.apis/v2/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "PATCH",
            body: queryArg.telemetryMetricsProfileResource,
            params: {
              fieldMask: queryArg.fieldMask,
              projectName: queryArg.projectName,
            },
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      workloadMemberServiceListWorkloadMembers2: build.query<
        WorkloadMemberServiceListWorkloadMembers2ApiResponse,
        WorkloadMemberServiceListWorkloadMembers2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workload_members`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceCreateWorkloadMember2: build.mutation<
        WorkloadMemberServiceCreateWorkloadMember2ApiResponse,
        WorkloadMemberServiceCreateWorkloadMember2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workload_members`,
          method: "POST",
          body: queryArg.workloadMember,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceGetWorkloadMember2: build.query<
        WorkloadMemberServiceGetWorkloadMember2ApiResponse,
        WorkloadMemberServiceGetWorkloadMember2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workload_members/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceDeleteWorkloadMember2: build.mutation<
        WorkloadMemberServiceDeleteWorkloadMember2ApiResponse,
        WorkloadMemberServiceDeleteWorkloadMember2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workload_members/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadServiceListWorkloads2: build.query<
        WorkloadServiceListWorkloads2ApiResponse,
        WorkloadServiceListWorkloads2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            projectName: queryArg.projectName,
          },
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServiceCreateWorkload2: build.mutation<
        WorkloadServiceCreateWorkload2ApiResponse,
        WorkloadServiceCreateWorkload2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads`,
          method: "POST",
          body: queryArg.workloadResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceGetWorkload2: build.query<
        WorkloadServiceGetWorkload2ApiResponse,
        WorkloadServiceGetWorkload2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads/${queryArg.resourceId}`,
          params: { projectName: queryArg.projectName },
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServiceUpdateWorkload2: build.mutation<
        WorkloadServiceUpdateWorkload2ApiResponse,
        WorkloadServiceUpdateWorkload2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.workloadResource,
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceDeleteWorkload2: build.mutation<
        WorkloadServiceDeleteWorkload2ApiResponse,
        WorkloadServiceDeleteWorkload2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads/${queryArg.resourceId}`,
          method: "DELETE",
          params: { projectName: queryArg.projectName },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServicePatchWorkload2: build.mutation<
        WorkloadServicePatchWorkload2ApiResponse,
        WorkloadServicePatchWorkload2ApiArg
      >({
        query: (queryArg) => ({
          url: `/edge-infra.orchestrator.apis/v2/workloads/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.workloadResource,
          params: {
            fieldMask: queryArg.fieldMask,
            projectName: queryArg.projectName,
          },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
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
      hostServiceRegisterHost: build.mutation<
        HostServiceRegisterHostApiResponse,
        HostServiceRegisterHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/register`,
          method: "POST",
          body: queryArg.hostRegister,
          params: { resourceId: queryArg.resourceId },
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
      hostServiceGetHost: build.query<
        HostServiceGetHostApiResponse,
        HostServiceGetHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
        }),
        providesTags: ["HostService"],
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
      hostServicePatchHost: build.mutation<
        HostServicePatchHostApiResponse,
        HostServicePatchHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.hostResource,
          params: { fieldMask: queryArg.fieldMask },
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
      hostServicePatchRegisterHost: build.mutation<
        HostServicePatchRegisterHostApiResponse,
        HostServicePatchRegisterHostApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts/${queryArg.resourceId}/register`,
          method: "PATCH",
          body: queryArg.hostRegister,
        }),
        invalidatesTags: ["HostService"],
      }),
      hostServiceGetHostsSummary3: build.query<
        HostServiceGetHostsSummary3ApiResponse,
        HostServiceGetHostsSummary3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/hosts_summary`,
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
      instanceServiceGetInstance: build.query<
        InstanceServiceGetInstanceApiResponse,
        InstanceServiceGetInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
        }),
        providesTags: ["InstanceService"],
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
      instanceServicePatchInstance: build.mutation<
        InstanceServicePatchInstanceApiResponse,
        InstanceServicePatchInstanceApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/instances/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.instanceResource,
          params: { fieldMask: queryArg.fieldMask },
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
      operatingSystemServiceListOperatingSystems3: build.query<
        OperatingSystemServiceListOperatingSystems3ApiResponse,
        OperatingSystemServiceListOperatingSystems3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceCreateOperatingSystem3: build.mutation<
        OperatingSystemServiceCreateOperatingSystem3ApiResponse,
        OperatingSystemServiceCreateOperatingSystem3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems`,
          method: "POST",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceGetOperatingSystem3: build.query<
        OperatingSystemServiceGetOperatingSystem3ApiResponse,
        OperatingSystemServiceGetOperatingSystem3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems/${queryArg.resourceId}`,
        }),
        providesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceUpdateOperatingSystem3: build.mutation<
        OperatingSystemServiceUpdateOperatingSystem3ApiResponse,
        OperatingSystemServiceUpdateOperatingSystem3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.operatingSystemResource,
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServiceDeleteOperatingSystem3: build.mutation<
        OperatingSystemServiceDeleteOperatingSystem3ApiResponse,
        OperatingSystemServiceDeleteOperatingSystem3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OperatingSystemService"],
      }),
      operatingSystemServicePatchOperatingSystem3: build.mutation<
        OperatingSystemServicePatchOperatingSystem3ApiResponse,
        OperatingSystemServicePatchOperatingSystem3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/operating_systems/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.operatingSystemResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["OperatingSystemService"],
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
      operatingSystemServiceGetOperatingSystem: build.query<
        OperatingSystemServiceGetOperatingSystemApiResponse,
        OperatingSystemServiceGetOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
        }),
        providesTags: ["OperatingSystemService"],
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
      operatingSystemServicePatchOperatingSystem: build.mutation<
        OperatingSystemServicePatchOperatingSystemApiResponse,
        OperatingSystemServicePatchOperatingSystemApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/os/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.operatingSystemResource,
          params: { fieldMask: queryArg.fieldMask },
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
      scheduleServiceListRepeatedSchedules3: build.query<
        ScheduleServiceListRepeatedSchedules3ApiResponse,
        ScheduleServiceListRepeatedSchedules3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated`,
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
      scheduleServiceCreateRepeatedSchedule3: build.mutation<
        ScheduleServiceCreateRepeatedSchedule3ApiResponse,
        ScheduleServiceCreateRepeatedSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated`,
          method: "POST",
          body: queryArg.repeatedScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetRepeatedSchedule3: build.query<
        ScheduleServiceGetRepeatedSchedule3ApiResponse,
        ScheduleServiceGetRepeatedSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateRepeatedSchedule3: build.mutation<
        ScheduleServiceUpdateRepeatedSchedule3ApiResponse,
        ScheduleServiceUpdateRepeatedSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.repeatedScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteRepeatedSchedule3: build.mutation<
        ScheduleServiceDeleteRepeatedSchedule3ApiResponse,
        ScheduleServiceDeleteRepeatedSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServicePatchRepeatedSchedule3: build.mutation<
        ScheduleServicePatchRepeatedSchedule3ApiResponse,
        ScheduleServicePatchRepeatedSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/repeated/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.repeatedScheduleResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceListSingleSchedules3: build.query<
        ScheduleServiceListSingleSchedules3ApiResponse,
        ScheduleServiceListSingleSchedules3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single`,
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
      scheduleServiceCreateSingleSchedule3: build.mutation<
        ScheduleServiceCreateSingleSchedule3ApiResponse,
        ScheduleServiceCreateSingleSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single`,
          method: "POST",
          body: queryArg.singleScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceGetSingleSchedule3: build.query<
        ScheduleServiceGetSingleSchedule3ApiResponse,
        ScheduleServiceGetSingleSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
      }),
      scheduleServiceUpdateSingleSchedule3: build.mutation<
        ScheduleServiceUpdateSingleSchedule3ApiResponse,
        ScheduleServiceUpdateSingleSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.singleScheduleResource,
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServiceDeleteSingleSchedule3: build.mutation<
        ScheduleServiceDeleteSingleSchedule3ApiResponse,
        ScheduleServiceDeleteSingleSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      scheduleServicePatchSingleSchedule3: build.mutation<
        ScheduleServicePatchSingleSchedule3ApiResponse,
        ScheduleServicePatchSingleSchedule3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/schedules/single/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.singleScheduleResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["ScheduleService"],
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
      workloadServiceGetWorkload: build.query<
        WorkloadServiceGetWorkloadApiResponse,
        WorkloadServiceGetWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
        }),
        providesTags: ["WorkloadService"],
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
      workloadServicePatchWorkload: build.mutation<
        WorkloadServicePatchWorkloadApiResponse,
        WorkloadServicePatchWorkloadApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/compute/workloads/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.workloadResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      customConfigServiceListCustomConfigs: build.query<
        CustomConfigServiceListCustomConfigsApiResponse,
        CustomConfigServiceListCustomConfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/customConfigs`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["CustomConfigService"],
      }),
      customConfigServiceCreateCustomConfig: build.mutation<
        CustomConfigServiceCreateCustomConfigApiResponse,
        CustomConfigServiceCreateCustomConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/customConfigs`,
          method: "POST",
          body: queryArg.customConfigResource,
        }),
        invalidatesTags: ["CustomConfigService"],
      }),
      customConfigServiceGetCustomConfig: build.query<
        CustomConfigServiceGetCustomConfigApiResponse,
        CustomConfigServiceGetCustomConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/customConfigs/${queryArg.resourceId}`,
        }),
        providesTags: ["CustomConfigService"],
      }),
      customConfigServiceDeleteCustomConfig: build.mutation<
        CustomConfigServiceDeleteCustomConfigApiResponse,
        CustomConfigServiceDeleteCustomConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/customConfigs/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CustomConfigService"],
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
      localAccountServiceGetLocalAccount: build.query<
        LocalAccountServiceGetLocalAccountApiResponse,
        LocalAccountServiceGetLocalAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/localAccounts/${queryArg.resourceId}`,
        }),
        providesTags: ["LocalAccountService"],
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
      osUpdatePolicyListOsUpdatePolicy: build.query<
        OsUpdatePolicyListOsUpdatePolicyApiResponse,
        OsUpdatePolicyListOsUpdatePolicyApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-policies`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyCreateOsUpdatePolicy: build.mutation<
        OsUpdatePolicyCreateOsUpdatePolicyApiResponse,
        OsUpdatePolicyCreateOsUpdatePolicyApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-policies`,
          method: "POST",
          body: queryArg.osUpdatePolicy,
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyGetOsUpdatePolicy: build.query<
        OsUpdatePolicyGetOsUpdatePolicyApiResponse,
        OsUpdatePolicyGetOsUpdatePolicyApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-policies/${queryArg.resourceId}`,
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyDeleteOsUpdatePolicy: build.mutation<
        OsUpdatePolicyDeleteOsUpdatePolicyApiResponse,
        OsUpdatePolicyDeleteOsUpdatePolicyApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-policies/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdateRunListOsUpdateRun: build.query<
        OsUpdateRunListOsUpdateRunApiResponse,
        OsUpdateRunListOsUpdateRunApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-runs`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunGetOsUpdateRun: build.query<
        OsUpdateRunGetOsUpdateRunApiResponse,
        OsUpdateRunGetOsUpdateRunApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-runs/${queryArg.resourceId}`,
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunDeleteOsUpdateRun: build.mutation<
        OsUpdateRunDeleteOsUpdateRunApiResponse,
        OsUpdateRunDeleteOsUpdateRunApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os-update-runs/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OSUpdateRun"],
      }),
      osUpdatePolicyListOsUpdatePolicy3: build.query<
        OsUpdatePolicyListOsUpdatePolicy3ApiResponse,
        OsUpdatePolicyListOsUpdatePolicy3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_policy`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyCreateOsUpdatePolicy3: build.mutation<
        OsUpdatePolicyCreateOsUpdatePolicy3ApiResponse,
        OsUpdatePolicyCreateOsUpdatePolicy3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_policy`,
          method: "POST",
          body: queryArg.osUpdatePolicy,
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyGetOsUpdatePolicy3: build.query<
        OsUpdatePolicyGetOsUpdatePolicy3ApiResponse,
        OsUpdatePolicyGetOsUpdatePolicy3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_policy/${queryArg.resourceId}`,
        }),
        providesTags: ["OSUpdatePolicy"],
      }),
      osUpdatePolicyDeleteOsUpdatePolicy3: build.mutation<
        OsUpdatePolicyDeleteOsUpdatePolicy3ApiResponse,
        OsUpdatePolicyDeleteOsUpdatePolicy3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_policy/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OSUpdatePolicy"],
      }),
      osUpdateRunListOsUpdateRun3: build.query<
        OsUpdateRunListOsUpdateRun3ApiResponse,
        OsUpdateRunListOsUpdateRun3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_run`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunGetOsUpdateRun3: build.query<
        OsUpdateRunGetOsUpdateRun3ApiResponse,
        OsUpdateRunGetOsUpdateRun3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_run/${queryArg.resourceId}`,
        }),
        providesTags: ["OSUpdateRun"],
      }),
      osUpdateRunDeleteOsUpdateRun3: build.mutation<
        OsUpdateRunDeleteOsUpdateRun3ApiResponse,
        OsUpdateRunDeleteOsUpdateRun3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/os_update_run/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["OSUpdateRun"],
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
      providerServiceGetProvider: build.query<
        ProviderServiceGetProviderApiResponse,
        ProviderServiceGetProviderApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/providers/${queryArg.resourceId}`,
        }),
        providesTags: ["ProviderService"],
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
      siteServiceListSites: build.query<
        SiteServiceListSitesApiResponse,
        SiteServiceListSitesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites`,
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
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites`,
          method: "POST",
          body: queryArg.siteResource,
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceGetSite: build.query<
        SiteServiceGetSiteApiResponse,
        SiteServiceGetSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.resourceId}`,
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceUpdateSite: build.mutation<
        SiteServiceUpdateSiteApiResponse,
        SiteServiceUpdateSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.siteResource,
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceDeleteSite: build.mutation<
        SiteServiceDeleteSiteApiResponse,
        SiteServiceDeleteSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServicePatchSite: build.mutation<
        SiteServicePatchSiteApiResponse,
        SiteServicePatchSiteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.regionId}/sites/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.siteResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["SiteService"],
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
      regionServicePatchRegion: build.mutation<
        RegionServicePatchRegionApiResponse,
        RegionServicePatchRegionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/regions/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.regionResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["RegionService"],
      }),
      scheduleServiceListSchedules3: build.query<
        ScheduleServiceListSchedules3ApiResponse,
        ScheduleServiceListSchedules3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules`,
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
      scheduleServiceGetRepeatedSchedule: build.query<
        ScheduleServiceGetRepeatedScheduleApiResponse,
        ScheduleServiceGetRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
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
      scheduleServicePatchRepeatedSchedule: build.mutation<
        ScheduleServicePatchRepeatedScheduleApiResponse,
        ScheduleServicePatchRepeatedScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/repeated/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.repeatedScheduleResource,
          params: { fieldMask: queryArg.fieldMask },
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
      scheduleServiceGetSingleSchedule: build.query<
        ScheduleServiceGetSingleScheduleApiResponse,
        ScheduleServiceGetSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
        }),
        providesTags: ["ScheduleService"],
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
      scheduleServicePatchSingleSchedule: build.mutation<
        ScheduleServicePatchSingleScheduleApiResponse,
        ScheduleServicePatchSingleScheduleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/schedules/single/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.singleScheduleResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["ScheduleService"],
      }),
      siteServiceListSites3: build.query<
        SiteServiceListSites3ApiResponse,
        SiteServiceListSites3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            regionId: queryArg.regionId,
          },
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceCreateSite3: build.mutation<
        SiteServiceCreateSite3ApiResponse,
        SiteServiceCreateSite3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites`,
          method: "POST",
          body: queryArg.siteResource,
          params: { regionId: queryArg.regionId },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceGetSite3: build.query<
        SiteServiceGetSite3ApiResponse,
        SiteServiceGetSite3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites/${queryArg.resourceId}`,
          params: { regionId: queryArg.regionId },
        }),
        providesTags: ["SiteService"],
      }),
      siteServiceUpdateSite3: build.mutation<
        SiteServiceUpdateSite3ApiResponse,
        SiteServiceUpdateSite3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.siteResource,
          params: { regionId: queryArg.regionId },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServiceDeleteSite3: build.mutation<
        SiteServiceDeleteSite3ApiResponse,
        SiteServiceDeleteSite3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites/${queryArg.resourceId}`,
          method: "DELETE",
          params: { regionId: queryArg.regionId },
        }),
        invalidatesTags: ["SiteService"],
      }),
      siteServicePatchSite3: build.mutation<
        SiteServicePatchSite3ApiResponse,
        SiteServicePatchSite3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/sites/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.siteResource,
          params: {
            fieldMask: queryArg.fieldMask,
            regionId: queryArg.regionId,
          },
        }),
        invalidatesTags: ["SiteService"],
      }),
      telemetryLogsGroupServiceListTelemetryLogsGroups3: build.query<
        TelemetryLogsGroupServiceListTelemetryLogsGroups3ApiResponse,
        TelemetryLogsGroupServiceListTelemetryLogsGroups3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/logs`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceCreateTelemetryLogsGroup3: build.mutation<
        TelemetryLogsGroupServiceCreateTelemetryLogsGroup3ApiResponse,
        TelemetryLogsGroupServiceCreateTelemetryLogsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/logs`,
          method: "POST",
          body: queryArg.telemetryLogsGroupResource,
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceGetTelemetryLogsGroup3: build.query<
        TelemetryLogsGroupServiceGetTelemetryLogsGroup3ApiResponse,
        TelemetryLogsGroupServiceGetTelemetryLogsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/logs/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryLogsGroupServiceDeleteTelemetryLogsGroup3: build.mutation<
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroup3ApiResponse,
        TelemetryLogsGroupServiceDeleteTelemetryLogsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/logs/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryLogsGroupService"],
      }),
      telemetryMetricsGroupServiceListTelemetryMetricsGroups3: build.query<
        TelemetryMetricsGroupServiceListTelemetryMetricsGroups3ApiResponse,
        TelemetryMetricsGroupServiceListTelemetryMetricsGroups3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/metrics`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
          },
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceCreateTelemetryMetricsGroup3: build.mutation<
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup3ApiResponse,
        TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/metrics`,
          method: "POST",
          body: queryArg.telemetryMetricsGroupResource,
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceGetTelemetryMetricsGroup3: build.query<
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroup3ApiResponse,
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/metrics/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryMetricsGroupService"],
      }),
      telemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3: build.mutation<
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3ApiResponse,
        TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/groups/metrics/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryMetricsGroupService"],
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
      telemetryLogsGroupServiceGetTelemetryLogsGroup: build.query<
        TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse,
        TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/loggroups/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryLogsGroupService"],
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
      telemetryMetricsGroupServiceGetTelemetryMetricsGroup: build.query<
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiResponse,
        TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/metricgroups/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryMetricsGroupService"],
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
      telemetryLogsProfileServiceListTelemetryLogsProfiles: build.query<
        TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse,
        TelemetryLogsProfileServiceListTelemetryLogsProfilesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs`,
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
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs`,
          method: "POST",
          body: queryArg.telemetryLogsProfileResource,
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceGetTelemetryLogsProfile: build.query<
        TelemetryLogsProfileServiceGetTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceUpdateTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.telemetryLogsProfileResource,
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServiceDeleteTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryLogsProfileServicePatchTelemetryLogsProfile: build.mutation<
        TelemetryLogsProfileServicePatchTelemetryLogsProfileApiResponse,
        TelemetryLogsProfileServicePatchTelemetryLogsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/logs/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.telemetryLogsProfileResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["TelemetryLogsProfileService"],
      }),
      telemetryMetricsProfileServiceListTelemetryMetricsProfiles: build.query<
        TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse,
        TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics`,
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
            url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics`,
            method: "POST",
            body: queryArg.telemetryMetricsProfileResource,
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceGetTelemetryMetricsProfile: build.query<
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiResponse,
        TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics/${queryArg.resourceId}`,
        }),
        providesTags: ["TelemetryMetricsProfileService"],
      }),
      telemetryMetricsProfileServiceUpdateTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "PUT",
            body: queryArg.telemetryMetricsProfileResource,
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServiceDeleteTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      telemetryMetricsProfileServicePatchTelemetryMetricsProfile:
        build.mutation<
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiResponse,
          TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/telemetry/profiles/metrics/${queryArg.resourceId}`,
            method: "PATCH",
            body: queryArg.telemetryMetricsProfileResource,
            params: { fieldMask: queryArg.fieldMask },
          }),
          invalidatesTags: ["TelemetryMetricsProfileService"],
        }),
      workloadMemberServiceListWorkloadMembers: build.query<
        WorkloadMemberServiceListWorkloadMembersApiResponse,
        WorkloadMemberServiceListWorkloadMembersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workload_members`,
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
          url: `/v1/projects/${queryArg.projectName}/workload_members`,
          method: "POST",
          body: queryArg.workloadMember,
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceGetWorkloadMember: build.query<
        WorkloadMemberServiceGetWorkloadMemberApiResponse,
        WorkloadMemberServiceGetWorkloadMemberApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workload_members/${queryArg.resourceId}`,
        }),
        providesTags: ["WorkloadMemberService"],
      }),
      workloadMemberServiceDeleteWorkloadMember: build.mutation<
        WorkloadMemberServiceDeleteWorkloadMemberApiResponse,
        WorkloadMemberServiceDeleteWorkloadMemberApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workload_members/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["WorkloadMemberService"],
      }),
      workloadServiceListWorkloads3: build.query<
        WorkloadServiceListWorkloads3ApiResponse,
        WorkloadServiceListWorkloads3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServiceCreateWorkload3: build.mutation<
        WorkloadServiceCreateWorkload3ApiResponse,
        WorkloadServiceCreateWorkload3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads`,
          method: "POST",
          body: queryArg.workloadResource,
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceGetWorkload3: build.query<
        WorkloadServiceGetWorkload3ApiResponse,
        WorkloadServiceGetWorkload3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads/${queryArg.resourceId}`,
        }),
        providesTags: ["WorkloadService"],
      }),
      workloadServiceUpdateWorkload3: build.mutation<
        WorkloadServiceUpdateWorkload3ApiResponse,
        WorkloadServiceUpdateWorkload3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads/${queryArg.resourceId}`,
          method: "PUT",
          body: queryArg.workloadResource,
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServiceDeleteWorkload3: build.mutation<
        WorkloadServiceDeleteWorkload3ApiResponse,
        WorkloadServiceDeleteWorkload3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads/${queryArg.resourceId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["WorkloadService"],
      }),
      workloadServicePatchWorkload3: build.mutation<
        WorkloadServicePatchWorkload3ApiResponse,
        WorkloadServicePatchWorkload3ApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/workloads/${queryArg.resourceId}`,
          method: "PATCH",
          body: queryArg.workloadResource,
          params: { fieldMask: queryArg.fieldMask },
        }),
        invalidatesTags: ["WorkloadService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as infra };
export type CustomConfigServiceListCustomConfigs2ApiResponse =
  /** status 200 Success */ ListCustomConfigsResponseRead;
export type CustomConfigServiceListCustomConfigs2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type CustomConfigServiceCreateCustomConfig2ApiResponse =
  /** status 200 Success */ CustomConfigResourceRead;
export type CustomConfigServiceCreateCustomConfig2ApiArg = {
  /** Project name */
  projectName: string;
  /** The custom configuration to create. */
  customConfigResource: CustomConfigResource;
};
export type CustomConfigServiceGetCustomConfig2ApiResponse =
  /** status 200 Success */ CustomConfigResourceRead;
export type CustomConfigServiceGetCustomConfig2ApiArg = {
  /** Name of the requested custom configuration. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type CustomConfigServiceDeleteCustomConfig2ApiResponse =
  /** status 200 Success */ DeleteCustomConfigResponse;
export type CustomConfigServiceDeleteCustomConfig2ApiArg = {
  /** Name of the customconfig to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type HostServiceListHosts2ApiResponse =
  /** status 200 Success */ ListHostsResponseRead;
export type HostServiceListHosts2ApiArg = {
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
  /** The project name from the URL path. */
  projectName: string;
};
export type HostServiceCreateHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceCreateHost2ApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** The host to create. */
  hostResource: HostResourceWrite;
};
export type HostServiceRegisterHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceRegisterHost2ApiArg = {
  resourceId?: string;
  /** The project name from the URL path. */
  projectName: string;
  hostRegister: HostRegister;
};
export type HostServiceGetHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceGetHost2ApiArg = {
  /** Name of the requested host. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type HostServiceUpdateHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceUpdateHost2ApiArg = {
  /** Name of the host host to be updated. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceDeleteHost2ApiResponse =
  /** status 200 Success */ DeleteHostResponse;
export type HostServiceDeleteHost2ApiArg = {
  /** Name of the host host to be deleted. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type HostServicePatchHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServicePatchHost2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of host. */
  fieldMask?: string;
  /** The project name from the URL path. */
  projectName: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceInvalidateHost2ApiResponse =
  /** status 200 Success */ InvalidateHostResponse;
export type HostServiceInvalidateHost2ApiArg = {
  /** Host resource ID */
  resourceId: string;
  /** user-provided reason for change or a freeform field */
  note?: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type HostServiceOnboardHost2ApiResponse =
  /** status 200 Success */ OnboardHostResponse;
export type HostServiceOnboardHost2ApiArg = {
  /** Host resource ID */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type HostServicePatchRegisterHost2ApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServicePatchRegisterHost2ApiArg = {
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
  hostRegister: HostRegister;
};
export type HostServiceGetHostsSummary2ApiResponse =
  /** status 200 Success */ GetHostSummaryResponseRead;
export type HostServiceGetHostsSummary2ApiArg = {
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type InstanceServiceListInstances2ApiResponse =
  /** status 200 Success */ ListInstancesResponseRead;
export type InstanceServiceListInstances2ApiArg = {
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
  /** The project name from the URL path. */
  projectName: string;
};
export type InstanceServiceCreateInstance2ApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceCreateInstance2ApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** The instance to create. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceGetInstance2ApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceGetInstance2ApiArg = {
  /** Name of the requested instance. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type InstanceServiceUpdateInstance2ApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceUpdateInstance2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceDeleteInstance2ApiResponse =
  /** status 200 Success */ DeleteInstanceResponse;
export type InstanceServiceDeleteInstance2ApiArg = {
  /** Name of the instance instance to be deleted. */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type InstanceServicePatchInstance2ApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServicePatchInstance2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of instance. */
  fieldMask?: string;
  /** The project name from the URL path. */
  projectName: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceInvalidateInstance2ApiResponse =
  /** status 200 Success */ InvalidateInstanceResponse;
export type InstanceServiceInvalidateInstance2ApiArg = {
  /** Instance resource ID */
  resourceId: string;
  /** The project name from the URL path. */
  projectName: string;
};
export type LocalAccountServiceListLocalAccounts2ApiResponse =
  /** status 200 Success */ ListLocalAccountsResponseRead;
export type LocalAccountServiceListLocalAccounts2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type LocalAccountServiceCreateLocalAccount2ApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceCreateLocalAccount2ApiArg = {
  /** Project name */
  projectName: string;
  /** The localaccount to create. */
  localAccountResource: LocalAccountResource;
};
export type LocalAccountServiceGetLocalAccount2ApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceGetLocalAccount2ApiArg = {
  /** Name of the requested localaccount. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type LocalAccountServiceDeleteLocalAccount2ApiResponse =
  /** status 200 Success */ DeleteLocalAccountResponse;
export type LocalAccountServiceDeleteLocalAccount2ApiArg = {
  /** Name of the localaccount to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type LocationServiceListLocations2ApiResponse =
  /** status 200 Success */ ListLocationsResponse;
export type LocationServiceListLocations2ApiArg = {
  /** Filter locations by name */
  name?: string;
  /** Return site locations */
  showSites?: boolean;
  /** Return region locations */
  showRegions?: boolean;
  /** Project name */
  projectName: string;
};
export type OperatingSystemServiceListOperatingSystems2ApiResponse =
  /** status 200 Success */ ListOperatingSystemsResponseRead;
export type OperatingSystemServiceListOperatingSystems2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type OperatingSystemServiceCreateOperatingSystem2ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceCreateOperatingSystem2ApiArg = {
  /** Project name */
  projectName: string;
  /** The os to create. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceGetOperatingSystem2ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceGetOperatingSystem2ApiArg = {
  /** Name of the requested os. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type OperatingSystemServiceUpdateOperatingSystem2ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceUpdateOperatingSystem2ApiArg = {
  /** Name of the os os to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceDeleteOperatingSystem2ApiResponse =
  /** status 200 Success */ DeleteOperatingSystemResponse;
export type OperatingSystemServiceDeleteOperatingSystem2ApiArg = {
  /** Name of the os os to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type OperatingSystemServicePatchOperatingSystem2ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServicePatchOperatingSystem2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of os. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OsUpdatePolicyListOsUpdatePolicy2ApiResponse =
  /** status 200 Success */ ListOsUpdatePolicyResponseRead;
export type OsUpdatePolicyListOsUpdatePolicy2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type OsUpdatePolicyCreateOsUpdatePolicy2ApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyCreateOsUpdatePolicy2ApiArg = {
  /** Project name */
  projectName: string;
  /** The OS Update policy to create. */
  osUpdatePolicy: OsUpdatePolicyWrite;
};
export type OsUpdatePolicyGetOsUpdatePolicy2ApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyGetOsUpdatePolicy2ApiArg = {
  /** Name of the requested os. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type OsUpdatePolicyDeleteOsUpdatePolicy2ApiResponse =
  /** status 200 Success */ DeleteOsUpdatePolicyResponse;
export type OsUpdatePolicyDeleteOsUpdatePolicy2ApiArg = {
  /** Name of the OS Update Policy to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type OsUpdateRunListOsUpdateRun2ApiResponse =
  /** status 200 Success */ ListOsUpdateRunResponseRead;
export type OsUpdateRunListOsUpdateRun2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type OsUpdateRunGetOsUpdateRun2ApiResponse =
  /** status 200 Success */ OsUpdateRunRead;
export type OsUpdateRunGetOsUpdateRun2ApiArg = {
  /** Name of the requested os. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type OsUpdateRunDeleteOsUpdateRun2ApiResponse =
  /** status 200 Success */ DeleteOsUpdateRunResponse;
export type OsUpdateRunDeleteOsUpdateRun2ApiArg = {
  /** Name of the os update run to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ProviderServiceListProviders2ApiResponse =
  /** status 200 Success */ ListProvidersResponseRead;
export type ProviderServiceListProviders2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type ProviderServiceCreateProvider2ApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceCreateProvider2ApiArg = {
  /** Project name */
  projectName: string;
  /** The provider to create. */
  providerResource: ProviderResource;
};
export type ProviderServiceGetProvider2ApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceGetProvider2ApiArg = {
  /** Name of the requested provider. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ProviderServiceDeleteProvider2ApiResponse =
  /** status 200 Success */ DeleteProviderResponse;
export type ProviderServiceDeleteProvider2ApiArg = {
  /** Name of the provider provider to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type RegionServiceListRegions2ApiResponse =
  /** status 200 Success */ ListRegionsResponseRead;
export type RegionServiceListRegions2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type RegionServiceCreateRegion2ApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceCreateRegion2ApiArg = {
  /** Project name */
  projectName: string;
  /** The region to create. */
  regionResource: RegionResourceWrite;
};
export type RegionServiceGetRegion2ApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceGetRegion2ApiArg = {
  /** Name of the requested region. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type RegionServiceUpdateRegion2ApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceUpdateRegion2ApiArg = {
  /** Name of the region region to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type RegionServiceDeleteRegion2ApiResponse =
  /** status 200 Success */ DeleteRegionResponse;
export type RegionServiceDeleteRegion2ApiArg = {
  /** Name of the region region to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type RegionServicePatchRegion2ApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServicePatchRegion2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of region. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type ScheduleServiceListSchedules2ApiResponse =
  /** status 200 Success */ ListSchedulesResponseRead;
export type ScheduleServiceListSchedules2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type ScheduleServiceListRepeatedSchedules2ApiResponse =
  /** status 200 Success */ ListRepeatedSchedulesResponseRead;
export type ScheduleServiceListRepeatedSchedules2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type ScheduleServiceCreateRepeatedSchedule2ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceCreateRepeatedSchedule2ApiArg = {
  /** Project name */
  projectName: string;
  /** The repeated_schedule to create. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceGetRepeatedSchedule2ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceGetRepeatedSchedule2ApiArg = {
  /** Name of the requested repeated_schedule. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ScheduleServiceUpdateRepeatedSchedule2ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceUpdateRepeatedSchedule2ApiArg = {
  /** Name of the repeated_schedule repeated_schedule to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceDeleteRepeatedSchedule2ApiResponse =
  /** status 200 Success */ DeleteRepeatedScheduleResponse;
export type ScheduleServiceDeleteRepeatedSchedule2ApiArg = {
  /** Name of the repeated_schedule repeated_schedule to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ScheduleServicePatchRepeatedSchedule2ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServicePatchRepeatedSchedule2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of repeated_schedule. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceListSingleSchedules2ApiResponse =
  /** status 200 Success */ ListSingleSchedulesResponseRead;
export type ScheduleServiceListSingleSchedules2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type ScheduleServiceCreateSingleSchedule2ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceCreateSingleSchedule2ApiArg = {
  /** Project name */
  projectName: string;
  /** The single_schedule to create. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceGetSingleSchedule2ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceGetSingleSchedule2ApiArg = {
  /** Name of the requested single_schedule. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ScheduleServiceUpdateSingleSchedule2ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceUpdateSingleSchedule2ApiArg = {
  /** Name of the single_schedule single_schedule to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceDeleteSingleSchedule2ApiResponse =
  /** status 200 Success */ DeleteSingleScheduleResponse;
export type ScheduleServiceDeleteSingleSchedule2ApiArg = {
  /** Name of the single_schedule single_schedule to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type ScheduleServicePatchSingleSchedule2ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServicePatchSingleSchedule2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of single_schedule. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type SiteServiceListSites2ApiResponse =
  /** status 200 Success */ ListSitesResponseRead;
export type SiteServiceListSites2ApiArg = {
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
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServiceCreateSite2ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceCreateSite2ApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** The site to create. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceGetSite2ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceGetSite2ApiArg = {
  /** Name of the requested site. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServiceUpdateSite2ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceUpdateSite2ApiArg = {
  /** Name of the site site to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceDeleteSite2ApiResponse =
  /** status 200 Success */ DeleteSiteResponse;
export type SiteServiceDeleteSite2ApiArg = {
  /** Name of the site site to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServicePatchSite2ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServicePatchSite2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of site. */
  fieldMask?: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type TelemetryLogsGroupServiceListTelemetryLogsGroups2ApiResponse =
  /** status 200 Success */ ListTelemetryLogsGroupsResponseRead;
export type TelemetryLogsGroupServiceListTelemetryLogsGroups2ApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Project name */
  projectName: string;
};
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroup2ApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroup2ApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_logs_group to create. */
  telemetryLogsGroupResource: TelemetryLogsGroupResource;
};
export type TelemetryLogsGroupServiceGetTelemetryLogsGroup2ApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceGetTelemetryLogsGroup2ApiArg = {
  /** Name of the requested telemetry_logs_group. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroup2ApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsGroupResponse;
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroup2ApiArg = {
  /** Name of the telemetry_logs_group telemetry_logs_group to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroups2ApiResponse =
  /** status 200 Success */ ListTelemetryMetricsGroupsResponseRead;
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroups2ApiArg = {
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
  /** Project name */
  projectName: string;
};
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup2ApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup2ApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_metrics_group to create. */
  telemetryMetricsGroupResource: TelemetryMetricsGroupResource;
};
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroup2ApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroup2ApiArg = {
  /** Name of the requested telemetry_metrics_group. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2ApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsGroupResponse;
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2ApiArg = {
  /** Name of the telemetry_metrics_group telemetry_metrics_group to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryLogsProfileServiceListTelemetryLogsProfiles2ApiResponse =
  /** status 200 Success */ ListTelemetryLogsProfilesResponseRead;
export type TelemetryLogsProfileServiceListTelemetryLogsProfiles2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfile2ApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfile2ApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_logs_profile to create. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsProfileServiceGetTelemetryLogsProfile2ApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceGetTelemetryLogsProfile2ApiArg = {
  /** Name of the requested telemetry_logs_profile. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfile2ApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfile2ApiArg = {
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfile2ApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsProfileResponse;
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfile2ApiArg = {
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryLogsProfileServicePatchTelemetryLogsProfile2ApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServicePatchTelemetryLogsProfile2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of telemetry_logs_profile. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfiles2ApiResponse =
  /** status 200 Success */ ListTelemetryMetricsProfilesResponseRead;
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfiles2ApiArg =
  {
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
    /** Project name */
    projectName: string;
  };
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfile2ApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfile2ApiArg =
  {
    /** Project name */
    projectName: string;
    /** The telemetry_metrics_profile to create. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfile2ApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfile2ApiArg = {
  /** Name of the requested telemetry_metrics_profile. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2ApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2ApiArg =
  {
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be updated. */
    resourceId: string;
    /** Project name */
    projectName: string;
    /** Updated values for the telemetry_metrics_profile. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2ApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsProfileResponse;
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2ApiArg =
  {
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be deleted. */
    resourceId: string;
    /** Project name */
    projectName: string;
  };
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfile2ApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfile2ApiArg =
  {
    /** ID of the resource to be updated. */
    resourceId: string;
    /** Field mask to be applied on the patch of telemetry_metrics_profile. */
    fieldMask?: string;
    /** Project name */
    projectName: string;
    /** Updated values for the telemetry_metrics_profile. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type WorkloadMemberServiceListWorkloadMembers2ApiResponse =
  /** status 200 Success */ ListWorkloadMembersResponseRead;
export type WorkloadMemberServiceListWorkloadMembers2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type WorkloadMemberServiceCreateWorkloadMember2ApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceCreateWorkloadMember2ApiArg = {
  /** Project name */
  projectName: string;
  /** The workload_member to create. */
  workloadMember: WorkloadMemberWrite;
};
export type WorkloadMemberServiceGetWorkloadMember2ApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceGetWorkloadMember2ApiArg = {
  /** Name of the requested workload_member. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type WorkloadMemberServiceDeleteWorkloadMember2ApiResponse =
  /** status 200 Success */ DeleteWorkloadMemberResponse;
export type WorkloadMemberServiceDeleteWorkloadMember2ApiArg = {
  /** Name of the workload_member workload_member to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type WorkloadServiceListWorkloads2ApiResponse =
  /** status 200 Success */ ListWorkloadsResponseRead;
export type WorkloadServiceListWorkloads2ApiArg = {
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
  /** Project name */
  projectName: string;
};
export type WorkloadServiceCreateWorkload2ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceCreateWorkload2ApiArg = {
  /** Project name */
  projectName: string;
  /** The workload to create. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceGetWorkload2ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceGetWorkload2ApiArg = {
  /** Name of the requested workload. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type WorkloadServiceUpdateWorkload2ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceUpdateWorkload2ApiArg = {
  /** Name of the workload workload to be updated. */
  resourceId: string;
  /** Project name */
  projectName: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceDeleteWorkload2ApiResponse =
  /** status 200 Success */ DeleteWorkloadResponse;
export type WorkloadServiceDeleteWorkload2ApiArg = {
  /** Name of the workload workload to be deleted. */
  resourceId: string;
  /** Project name */
  projectName: string;
};
export type WorkloadServicePatchWorkload2ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServicePatchWorkload2ApiArg = {
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of workload. */
  fieldMask?: string;
  /** Project name */
  projectName: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type HostServiceListHostsApiResponse =
  /** status 200 Success */ ListHostsResponseRead;
export type HostServiceListHostsApiArg = {
  /** The project name from the URL path. */
  projectName: string;
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
};
export type HostServiceCreateHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceCreateHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** The host to create. */
  hostResource: HostResourceWrite;
};
export type HostServiceRegisterHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceRegisterHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  resourceId?: string;
  hostRegister: HostRegister;
};
export type HostServiceGetHostsSummaryApiResponse =
  /** status 200 Success */ GetHostSummaryResponseRead;
export type HostServiceGetHostsSummaryApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
};
export type HostServiceGetHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceGetHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Name of the requested host. */
  resourceId: string;
};
export type HostServiceUpdateHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServiceUpdateHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Name of the host host to be updated. */
  resourceId: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceDeleteHostApiResponse =
  /** status 200 Success */ DeleteHostResponse;
export type HostServiceDeleteHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Name of the host host to be deleted. */
  resourceId: string;
};
export type HostServicePatchHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServicePatchHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of host. */
  fieldMask?: string;
  /** Updated values for the host. */
  hostResource: HostResourceWrite;
};
export type HostServiceInvalidateHostApiResponse =
  /** status 200 Success */ InvalidateHostResponse;
export type HostServiceInvalidateHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Host resource ID */
  resourceId: string;
  /** user-provided reason for change or a freeform field */
  note?: string;
};
export type HostServiceOnboardHostApiResponse =
  /** status 200 Success */ OnboardHostResponse;
export type HostServiceOnboardHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Host resource ID */
  resourceId: string;
};
export type HostServicePatchRegisterHostApiResponse =
  /** status 200 Success */ HostResourceRead;
export type HostServicePatchRegisterHostApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  resourceId: string;
  hostRegister: HostRegister;
};
export type HostServiceGetHostsSummary3ApiResponse =
  /** status 200 Success */ GetHostSummaryResponseRead;
export type HostServiceGetHostsSummary3ApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Optional filter to return only item of interest.
     See https://google.aip.dev/160 for details. */
  filter?: string;
};
export type InstanceServiceListInstancesApiResponse =
  /** status 200 Success */ ListInstancesResponseRead;
export type InstanceServiceListInstancesApiArg = {
  /** The project name from the URL path. */
  projectName: string;
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
};
export type InstanceServiceCreateInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceCreateInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** The instance to create. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceGetInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceGetInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Name of the requested instance. */
  resourceId: string;
};
export type InstanceServiceUpdateInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServiceUpdateInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceDeleteInstanceApiResponse =
  /** status 200 Success */ DeleteInstanceResponse;
export type InstanceServiceDeleteInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Name of the instance instance to be deleted. */
  resourceId: string;
};
export type InstanceServicePatchInstanceApiResponse =
  /** status 200 Success */ InstanceResourceRead;
export type InstanceServicePatchInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of instance. */
  fieldMask?: string;
  /** Updated values for the instance. */
  instanceResource: InstanceResourceWrite;
};
export type InstanceServiceInvalidateInstanceApiResponse =
  /** status 200 Success */ InvalidateInstanceResponse;
export type InstanceServiceInvalidateInstanceApiArg = {
  /** The project name from the URL path. */
  projectName: string;
  /** Instance resource ID */
  resourceId: string;
};
export type OperatingSystemServiceListOperatingSystems3ApiResponse =
  /** status 200 Success */ ListOperatingSystemsResponseRead;
export type OperatingSystemServiceListOperatingSystems3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OperatingSystemServiceCreateOperatingSystem3ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceCreateOperatingSystem3ApiArg = {
  /** Project name */
  projectName: string;
  /** The os to create. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceGetOperatingSystem3ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceGetOperatingSystem3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OperatingSystemServiceUpdateOperatingSystem3ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceUpdateOperatingSystem3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os os to be updated. */
  resourceId: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceDeleteOperatingSystem3ApiResponse =
  /** status 200 Success */ DeleteOperatingSystemResponse;
export type OperatingSystemServiceDeleteOperatingSystem3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os os to be deleted. */
  resourceId: string;
};
export type OperatingSystemServicePatchOperatingSystem3ApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServicePatchOperatingSystem3ApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of os. */
  fieldMask?: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceListOperatingSystemsApiResponse =
  /** status 200 Success */ ListOperatingSystemsResponseRead;
export type OperatingSystemServiceListOperatingSystemsApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OperatingSystemServiceCreateOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceCreateOperatingSystemApiArg = {
  /** Project name */
  projectName: string;
  /** The os to create. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceGetOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceGetOperatingSystemApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OperatingSystemServiceUpdateOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServiceUpdateOperatingSystemApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os os to be updated. */
  resourceId: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type OperatingSystemServiceDeleteOperatingSystemApiResponse =
  /** status 200 Success */ DeleteOperatingSystemResponse;
export type OperatingSystemServiceDeleteOperatingSystemApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os os to be deleted. */
  resourceId: string;
};
export type OperatingSystemServicePatchOperatingSystemApiResponse =
  /** status 200 Success */ OperatingSystemResourceRead;
export type OperatingSystemServicePatchOperatingSystemApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of os. */
  fieldMask?: string;
  /** Updated values for the os. */
  operatingSystemResource: OperatingSystemResource;
};
export type ScheduleServiceListSchedulesApiResponse =
  /** status 200 Success */ ListSchedulesResponseRead;
export type ScheduleServiceListSchedulesApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceListRepeatedSchedules3ApiResponse =
  /** status 200 Success */ ListRepeatedSchedulesResponseRead;
export type ScheduleServiceListRepeatedSchedules3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceCreateRepeatedSchedule3ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceCreateRepeatedSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** The repeated_schedule to create. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceGetRepeatedSchedule3ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceGetRepeatedSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested repeated_schedule. */
  resourceId: string;
};
export type ScheduleServiceUpdateRepeatedSchedule3ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceUpdateRepeatedSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the repeated_schedule repeated_schedule to be updated. */
  resourceId: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceDeleteRepeatedSchedule3ApiResponse =
  /** status 200 Success */ DeleteRepeatedScheduleResponse;
export type ScheduleServiceDeleteRepeatedSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the repeated_schedule repeated_schedule to be deleted. */
  resourceId: string;
};
export type ScheduleServicePatchRepeatedSchedule3ApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServicePatchRepeatedSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of repeated_schedule. */
  fieldMask?: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceListSingleSchedules3ApiResponse =
  /** status 200 Success */ ListSingleSchedulesResponseRead;
export type ScheduleServiceListSingleSchedules3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceCreateSingleSchedule3ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceCreateSingleSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** The single_schedule to create. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceGetSingleSchedule3ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceGetSingleSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested single_schedule. */
  resourceId: string;
};
export type ScheduleServiceUpdateSingleSchedule3ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceUpdateSingleSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the single_schedule single_schedule to be updated. */
  resourceId: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceDeleteSingleSchedule3ApiResponse =
  /** status 200 Success */ DeleteSingleScheduleResponse;
export type ScheduleServiceDeleteSingleSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the single_schedule single_schedule to be deleted. */
  resourceId: string;
};
export type ScheduleServicePatchSingleSchedule3ApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServicePatchSingleSchedule3ApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of single_schedule. */
  fieldMask?: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type WorkloadServiceListWorkloadsApiResponse =
  /** status 200 Success */ ListWorkloadsResponseRead;
export type WorkloadServiceListWorkloadsApiArg = {
  /** Project name */
  projectName: string;
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
};
export type WorkloadServiceCreateWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceCreateWorkloadApiArg = {
  /** Project name */
  projectName: string;
  /** The workload to create. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceGetWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceGetWorkloadApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested workload. */
  resourceId: string;
};
export type WorkloadServiceUpdateWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceUpdateWorkloadApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the workload workload to be updated. */
  resourceId: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceDeleteWorkloadApiResponse =
  /** status 200 Success */ DeleteWorkloadResponse;
export type WorkloadServiceDeleteWorkloadApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the workload workload to be deleted. */
  resourceId: string;
};
export type WorkloadServicePatchWorkloadApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServicePatchWorkloadApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of workload. */
  fieldMask?: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type CustomConfigServiceListCustomConfigsApiResponse =
  /** status 200 Success */ ListCustomConfigsResponseRead;
export type CustomConfigServiceListCustomConfigsApiArg = {
  /** Project name */
  projectName: string;
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
};
export type CustomConfigServiceCreateCustomConfigApiResponse =
  /** status 200 Success */ CustomConfigResourceRead;
export type CustomConfigServiceCreateCustomConfigApiArg = {
  /** Project name */
  projectName: string;
  /** The custom configuration to create. */
  customConfigResource: CustomConfigResource;
};
export type CustomConfigServiceGetCustomConfigApiResponse =
  /** status 200 Success */ CustomConfigResourceRead;
export type CustomConfigServiceGetCustomConfigApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested custom configuration. */
  resourceId: string;
};
export type CustomConfigServiceDeleteCustomConfigApiResponse =
  /** status 200 Success */ DeleteCustomConfigResponse;
export type CustomConfigServiceDeleteCustomConfigApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the customconfig to be deleted. */
  resourceId: string;
};
export type LocalAccountServiceListLocalAccountsApiResponse =
  /** status 200 Success */ ListLocalAccountsResponseRead;
export type LocalAccountServiceListLocalAccountsApiArg = {
  /** Project name */
  projectName: string;
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
};
export type LocalAccountServiceCreateLocalAccountApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceCreateLocalAccountApiArg = {
  /** Project name */
  projectName: string;
  /** The localaccount to create. */
  localAccountResource: LocalAccountResource;
};
export type LocalAccountServiceGetLocalAccountApiResponse =
  /** status 200 Success */ LocalAccountResourceRead;
export type LocalAccountServiceGetLocalAccountApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested localaccount. */
  resourceId: string;
};
export type LocalAccountServiceDeleteLocalAccountApiResponse =
  /** status 200 Success */ DeleteLocalAccountResponse;
export type LocalAccountServiceDeleteLocalAccountApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the localaccount to be deleted. */
  resourceId: string;
};
export type LocationServiceListLocationsApiResponse =
  /** status 200 Success */ ListLocationsResponse;
export type LocationServiceListLocationsApiArg = {
  /** Project name */
  projectName: string;
  /** Filter locations by name */
  name?: string;
  /** Return site locations */
  showSites?: boolean;
  /** Return region locations */
  showRegions?: boolean;
};
export type OsUpdatePolicyListOsUpdatePolicyApiResponse =
  /** status 200 Success */ ListOsUpdatePolicyResponseRead;
export type OsUpdatePolicyListOsUpdatePolicyApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OsUpdatePolicyCreateOsUpdatePolicyApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyCreateOsUpdatePolicyApiArg = {
  /** Project name */
  projectName: string;
  /** The OS Update policy to create. */
  osUpdatePolicy: OsUpdatePolicyWrite;
};
export type OsUpdatePolicyGetOsUpdatePolicyApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyGetOsUpdatePolicyApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OsUpdatePolicyDeleteOsUpdatePolicyApiResponse =
  /** status 200 Success */ DeleteOsUpdatePolicyResponse;
export type OsUpdatePolicyDeleteOsUpdatePolicyApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the OS Update Policy to be deleted. */
  resourceId: string;
};
export type OsUpdateRunListOsUpdateRunApiResponse =
  /** status 200 Success */ ListOsUpdateRunResponseRead;
export type OsUpdateRunListOsUpdateRunApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OsUpdateRunGetOsUpdateRunApiResponse =
  /** status 200 Success */ OsUpdateRunRead;
export type OsUpdateRunGetOsUpdateRunApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OsUpdateRunDeleteOsUpdateRunApiResponse =
  /** status 200 Success */ DeleteOsUpdateRunResponse;
export type OsUpdateRunDeleteOsUpdateRunApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os update run to be deleted. */
  resourceId: string;
};
export type OsUpdatePolicyListOsUpdatePolicy3ApiResponse =
  /** status 200 Success */ ListOsUpdatePolicyResponseRead;
export type OsUpdatePolicyListOsUpdatePolicy3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OsUpdatePolicyCreateOsUpdatePolicy3ApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyCreateOsUpdatePolicy3ApiArg = {
  /** Project name */
  projectName: string;
  /** The OS Update policy to create. */
  osUpdatePolicy: OsUpdatePolicyWrite;
};
export type OsUpdatePolicyGetOsUpdatePolicy3ApiResponse =
  /** status 200 Success */ OsUpdatePolicyRead;
export type OsUpdatePolicyGetOsUpdatePolicy3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OsUpdatePolicyDeleteOsUpdatePolicy3ApiResponse =
  /** status 200 Success */ DeleteOsUpdatePolicyResponse;
export type OsUpdatePolicyDeleteOsUpdatePolicy3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the OS Update Policy to be deleted. */
  resourceId: string;
};
export type OsUpdateRunListOsUpdateRun3ApiResponse =
  /** status 200 Success */ ListOsUpdateRunResponseRead;
export type OsUpdateRunListOsUpdateRun3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type OsUpdateRunGetOsUpdateRun3ApiResponse =
  /** status 200 Success */ OsUpdateRunRead;
export type OsUpdateRunGetOsUpdateRun3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested os. */
  resourceId: string;
};
export type OsUpdateRunDeleteOsUpdateRun3ApiResponse =
  /** status 200 Success */ DeleteOsUpdateRunResponse;
export type OsUpdateRunDeleteOsUpdateRun3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the os update run to be deleted. */
  resourceId: string;
};
export type ProviderServiceListProvidersApiResponse =
  /** status 200 Success */ ListProvidersResponseRead;
export type ProviderServiceListProvidersApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ProviderServiceCreateProviderApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceCreateProviderApiArg = {
  /** Project name */
  projectName: string;
  /** The provider to create. */
  providerResource: ProviderResource;
};
export type ProviderServiceGetProviderApiResponse =
  /** status 200 Success */ ProviderResourceRead;
export type ProviderServiceGetProviderApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested provider. */
  resourceId: string;
};
export type ProviderServiceDeleteProviderApiResponse =
  /** status 200 Success */ DeleteProviderResponse;
export type ProviderServiceDeleteProviderApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the provider provider to be deleted. */
  resourceId: string;
};
export type RegionServiceListRegionsApiResponse =
  /** status 200 Success */ ListRegionsResponseRead;
export type RegionServiceListRegionsApiArg = {
  /** Project name */
  projectName: string;
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
};
export type RegionServiceCreateRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceCreateRegionApiArg = {
  /** Project name */
  projectName: string;
  /** The region to create. */
  regionResource: RegionResourceWrite;
};
export type SiteServiceListSitesApiResponse =
  /** status 200 Success */ ListSitesResponseRead;
export type SiteServiceListSitesApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
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
};
export type SiteServiceCreateSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceCreateSiteApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
  /** The site to create. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceGetSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceGetSiteApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
  /** Name of the requested site. */
  resourceId: string;
};
export type SiteServiceUpdateSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceUpdateSiteApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
  /** Name of the site site to be updated. */
  resourceId: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceDeleteSiteApiResponse =
  /** status 200 Success */ DeleteSiteResponse;
export type SiteServiceDeleteSiteApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
  /** Name of the site site to be deleted. */
  resourceId: string;
};
export type SiteServicePatchSiteApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServicePatchSiteApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of site. */
  fieldMask?: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type RegionServiceGetRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceGetRegionApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested region. */
  resourceId: string;
};
export type RegionServiceUpdateRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServiceUpdateRegionApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the region region to be updated. */
  resourceId: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type RegionServiceDeleteRegionApiResponse =
  /** status 200 Success */ DeleteRegionResponse;
export type RegionServiceDeleteRegionApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the region region to be deleted. */
  resourceId: string;
};
export type RegionServicePatchRegionApiResponse =
  /** status 200 Success */ RegionResourceRead;
export type RegionServicePatchRegionApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of region. */
  fieldMask?: string;
  /** Updated values for the region. */
  regionResource: RegionResourceWrite;
};
export type ScheduleServiceListSchedules3ApiResponse =
  /** status 200 Success */ ListSchedulesResponseRead;
export type ScheduleServiceListSchedules3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceListRepeatedSchedulesApiResponse =
  /** status 200 Success */ ListRepeatedSchedulesResponseRead;
export type ScheduleServiceListRepeatedSchedulesApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceCreateRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceCreateRepeatedScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** The repeated_schedule to create. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceGetRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceGetRepeatedScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested repeated_schedule. */
  resourceId: string;
};
export type ScheduleServiceUpdateRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServiceUpdateRepeatedScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the repeated_schedule repeated_schedule to be updated. */
  resourceId: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceDeleteRepeatedScheduleApiResponse =
  /** status 200 Success */ DeleteRepeatedScheduleResponse;
export type ScheduleServiceDeleteRepeatedScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the repeated_schedule repeated_schedule to be deleted. */
  resourceId: string;
};
export type ScheduleServicePatchRepeatedScheduleApiResponse =
  /** status 200 Success */ RepeatedScheduleResourceRead;
export type ScheduleServicePatchRepeatedScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of repeated_schedule. */
  fieldMask?: string;
  /** Updated values for the repeated_schedule. */
  repeatedScheduleResource: RepeatedScheduleResourceWrite;
};
export type ScheduleServiceListSingleSchedulesApiResponse =
  /** status 200 Success */ ListSingleSchedulesResponseRead;
export type ScheduleServiceListSingleSchedulesApiArg = {
  /** Project name */
  projectName: string;
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
};
export type ScheduleServiceCreateSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceCreateSingleScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** The single_schedule to create. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceGetSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceGetSingleScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested single_schedule. */
  resourceId: string;
};
export type ScheduleServiceUpdateSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServiceUpdateSingleScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the single_schedule single_schedule to be updated. */
  resourceId: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type ScheduleServiceDeleteSingleScheduleApiResponse =
  /** status 200 Success */ DeleteSingleScheduleResponse;
export type ScheduleServiceDeleteSingleScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the single_schedule single_schedule to be deleted. */
  resourceId: string;
};
export type ScheduleServicePatchSingleScheduleApiResponse =
  /** status 200 Success */ SingleScheduleResourceRead;
export type ScheduleServicePatchSingleScheduleApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of single_schedule. */
  fieldMask?: string;
  /** Updated values for the single_schedule. */
  singleScheduleResource: SingleScheduleResourceWrite;
};
export type SiteServiceListSites3ApiResponse =
  /** status 200 Success */ ListSitesResponseRead;
export type SiteServiceListSites3ApiArg = {
  /** Project name */
  projectName: string;
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
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServiceCreateSite3ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceCreateSite3ApiArg = {
  /** Project name */
  projectName: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** The site to create. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceGetSite3ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceGetSite3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested site. */
  resourceId: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServiceUpdateSite3ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServiceUpdateSite3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the site site to be updated. */
  resourceId: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type SiteServiceDeleteSite3ApiResponse =
  /** status 200 Success */ DeleteSiteResponse;
export type SiteServiceDeleteSite3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the site site to be deleted. */
  resourceId: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
};
export type SiteServicePatchSite3ApiResponse =
  /** status 200 Success */ SiteResourceRead;
export type SiteServicePatchSite3ApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of site. */
  fieldMask?: string;
  /** Optional region ID for hierarchical path support */
  regionId?: string;
  /** Updated values for the site. */
  siteResource: SiteResourceWrite;
};
export type TelemetryLogsGroupServiceListTelemetryLogsGroups3ApiResponse =
  /** status 200 Success */ ListTelemetryLogsGroupsResponseRead;
export type TelemetryLogsGroupServiceListTelemetryLogsGroups3ApiArg = {
  /** Project name */
  projectName: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
};
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroup3ApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_logs_group to create. */
  telemetryLogsGroupResource: TelemetryLogsGroupResource;
};
export type TelemetryLogsGroupServiceGetTelemetryLogsGroup3ApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceGetTelemetryLogsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_logs_group. */
  resourceId: string;
};
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroup3ApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsGroupResponse;
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_logs_group telemetry_logs_group to be deleted. */
  resourceId: string;
};
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroups3ApiResponse =
  /** status 200 Success */ ListTelemetryMetricsGroupsResponseRead;
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroups3ApiArg = {
  /** Project name */
  projectName: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
};
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup3ApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_metrics_group to create. */
  telemetryMetricsGroupResource: TelemetryMetricsGroupResource;
};
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroup3ApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_metrics_group. */
  resourceId: string;
};
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3ApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsGroupResponse;
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_metrics_group telemetry_metrics_group to be deleted. */
  resourceId: string;
};
export type TelemetryLogsGroupServiceListTelemetryLogsGroupsApiResponse =
  /** status 200 Success */ ListTelemetryLogsGroupsResponseRead;
export type TelemetryLogsGroupServiceListTelemetryLogsGroupsApiArg = {
  /** Project name */
  projectName: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
};
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceCreateTelemetryLogsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_logs_group to create. */
  telemetryLogsGroupResource: TelemetryLogsGroupResource;
};
export type TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse =
  /** status 200 Success */ TelemetryLogsGroupResourceRead;
export type TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_logs_group. */
  resourceId: string;
};
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsGroupResponse;
export type TelemetryLogsGroupServiceDeleteTelemetryLogsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_logs_group telemetry_logs_group to be deleted. */
  resourceId: string;
};
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiResponse =
  /** status 200 Success */ ListTelemetryMetricsGroupsResponseRead;
export type TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiArg = {
  /** Project name */
  projectName: string;
  /** Defines the amount of items to be contained in a single page.
     Default of 20. */
  pageSize?: number;
  /** Index of the first item to return. This allows skipping items. */
  offset?: number;
  /** Optional comma separated list of fields to specify a sorting order.
     See https://google.aip.dev/132 for details. */
  orderBy?: string;
};
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceCreateTelemetryMetricsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_metrics_group to create. */
  telemetryMetricsGroupResource: TelemetryMetricsGroupResource;
};
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ TelemetryMetricsGroupResourceRead;
export type TelemetryMetricsGroupServiceGetTelemetryMetricsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_metrics_group. */
  resourceId: string;
};
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsGroupResponse;
export type TelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_metrics_group telemetry_metrics_group to be deleted. */
  resourceId: string;
};
export type TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse =
  /** status 200 Success */ ListTelemetryLogsProfilesResponseRead;
export type TelemetryLogsProfileServiceListTelemetryLogsProfilesApiArg = {
  /** Project name */
  projectName: string;
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
};
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** The telemetry_logs_profile to create. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsProfileServiceGetTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_logs_profile. */
  resourceId: string;
};
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be updated. */
  resourceId: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiResponse =
  /** status 200 Success */ DeleteTelemetryLogsProfileResponse;
export type TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the telemetry_logs_profile telemetry_logs_profile to be deleted. */
  resourceId: string;
};
export type TelemetryLogsProfileServicePatchTelemetryLogsProfileApiResponse =
  /** status 200 Success */ TelemetryLogsProfileResourceRead;
export type TelemetryLogsProfileServicePatchTelemetryLogsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of telemetry_logs_profile. */
  fieldMask?: string;
  /** Updated values for the telemetry_logs_profile. */
  telemetryLogsProfileResource: TelemetryLogsProfileResource;
};
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse =
  /** status 200 Success */ ListTelemetryMetricsProfilesResponseRead;
export type TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiArg = {
  /** Project name */
  projectName: string;
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
};
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiArg =
  {
    /** Project name */
    projectName: string;
    /** The telemetry_metrics_profile to create. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested telemetry_metrics_profile. */
  resourceId: string;
};
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiArg =
  {
    /** Project name */
    projectName: string;
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be updated. */
    resourceId: string;
    /** Updated values for the telemetry_metrics_profile. */
    telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
  };
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ DeleteTelemetryMetricsProfileResponse;
export type TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg =
  {
    /** Project name */
    projectName: string;
    /** Name of the telemetry_metrics_profile telemetry_metrics_profile to be deleted. */
    resourceId: string;
  };
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiResponse =
  /** status 200 Success */ TelemetryMetricsProfileResourceRead;
export type TelemetryMetricsProfileServicePatchTelemetryMetricsProfileApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of telemetry_metrics_profile. */
  fieldMask?: string;
  /** Updated values for the telemetry_metrics_profile. */
  telemetryMetricsProfileResource: TelemetryMetricsProfileResource;
};
export type WorkloadMemberServiceListWorkloadMembersApiResponse =
  /** status 200 Success */ ListWorkloadMembersResponseRead;
export type WorkloadMemberServiceListWorkloadMembersApiArg = {
  /** Project name */
  projectName: string;
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
};
export type WorkloadMemberServiceCreateWorkloadMemberApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceCreateWorkloadMemberApiArg = {
  /** Project name */
  projectName: string;
  /** The workload_member to create. */
  workloadMember: WorkloadMemberWrite;
};
export type WorkloadMemberServiceGetWorkloadMemberApiResponse =
  /** status 200 Success */ WorkloadMemberRead;
export type WorkloadMemberServiceGetWorkloadMemberApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested workload_member. */
  resourceId: string;
};
export type WorkloadMemberServiceDeleteWorkloadMemberApiResponse =
  /** status 200 Success */ DeleteWorkloadMemberResponse;
export type WorkloadMemberServiceDeleteWorkloadMemberApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the workload_member workload_member to be deleted. */
  resourceId: string;
};
export type WorkloadServiceListWorkloads3ApiResponse =
  /** status 200 Success */ ListWorkloadsResponseRead;
export type WorkloadServiceListWorkloads3ApiArg = {
  /** Project name */
  projectName: string;
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
};
export type WorkloadServiceCreateWorkload3ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceCreateWorkload3ApiArg = {
  /** Project name */
  projectName: string;
  /** The workload to create. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceGetWorkload3ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceGetWorkload3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the requested workload. */
  resourceId: string;
};
export type WorkloadServiceUpdateWorkload3ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServiceUpdateWorkload3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the workload workload to be updated. */
  resourceId: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type WorkloadServiceDeleteWorkload3ApiResponse =
  /** status 200 Success */ DeleteWorkloadResponse;
export type WorkloadServiceDeleteWorkload3ApiArg = {
  /** Project name */
  projectName: string;
  /** Name of the workload workload to be deleted. */
  resourceId: string;
};
export type WorkloadServicePatchWorkload3ApiResponse =
  /** status 200 Success */ WorkloadResourceRead;
export type WorkloadServicePatchWorkload3ApiArg = {
  /** Project name */
  projectName: string;
  /** ID of the resource to be updated. */
  resourceId: string;
  /** Field mask to be applied on the patch of workload. */
  fieldMask?: string;
  /** Updated values for the workload. */
  workloadResource: WorkloadResourceWrite;
};
export type GoogleProtobufTimestamp = string;
export type Timestamps = {
  /** The time when the resource was created. */
  createdAt?: GoogleProtobufTimestamp;
  /** The time when the resource was last updated. */
  updatedAt?: GoogleProtobufTimestamp;
};
export type CustomConfigResource = {
  /** Config provided by admin */
  name: string;
  /** (OPTIONAL) Config description */
  description?: string;
  /** Config content */
  config: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type CustomConfigResourceRead = {
  /** resource identifier */
  resourceId?: string;
  /** Config provided by admin */
  name: string;
  /** (OPTIONAL) Config description */
  description?: string;
  /** Config content */
  config: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListCustomConfigsResponse = {
  /** Sorted and filtered list of customconfigs. */
  customConfigs: CustomConfigResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListCustomConfigsResponseRead = {
  /** Sorted and filtered list of customconfigs. */
  customConfigs: CustomConfigResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteCustomConfigResponse = object;
export type HostState =
  | "HOST_STATE_UNSPECIFIED"
  | "HOST_STATE_DELETED"
  | "HOST_STATE_ONBOARDED"
  | "HOST_STATE_UNTRUSTED"
  | "HOST_STATE_REGISTERED";
export type MetadataItem = {
  /** The metadata key. */
  key: string;
  /** The metadata value. */
  value: string;
};
export type RegionResource = {
  /** The user-provided, human-readable name of region */
  name?: string;
  /** The parent Region associated to the Region, when existent. */
  parentRegion?: RegionResource;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type RegionResourceRead = {
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The user-provided, human-readable name of region */
  name?: string;
  /** The parent Region associated to the Region, when existent. */
  parentRegion?: RegionResourceRead;
  /** Deprecated, The Region unique identifier. Alias of resourceId. */
  regionID?: string;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The rendered metadata from the Region parent(s)
     that can be inherited by the Region, represented by a list of key:value pairs.
     This field can not be used in filter. */
  inheritedMetadata?: MetadataItem[];
  /** The total number of sites in the region. */
  totalSites?: number;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type RegionResourceWrite = {
  /** The user-provided, human-readable name of region */
  name?: string;
  /** The parent Region associated to the Region, when existent. */
  parentRegion?: RegionResourceWrite;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The parent Region unique identifier
     that the region is associated to, when existent.
     This field can not be used in filter. */
  parentId?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ProviderKind =
  | "PROVIDER_KIND_UNSPECIFIED"
  | "PROVIDER_KIND_BAREMETAL";
export type ProviderVendor =
  | "PROVIDER_VENDOR_UNSPECIFIED"
  | "PROVIDER_VENDOR_LENOVO_LXCA"
  | "PROVIDER_VENDOR_LENOVO_LOCA";
export type ProviderResource = {
  /** The provider kind. */
  providerKind: ProviderKind;
  /** The provider vendor. */
  providerVendor?: ProviderVendor;
  /** The provider resource's name. */
  name: string;
  /** The provider resource's API endpoint. */
  apiEndpoint: string;
  /** The provider resource's list of credentials. */
  apiCredentials?: string[];
  /** Opaque provider configuration. */
  config?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ProviderResourceRead = {
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The provider kind. */
  providerKind: ProviderKind;
  /** The provider vendor. */
  providerVendor?: ProviderVendor;
  /** The provider resource's name. */
  name: string;
  /** The provider resource's API endpoint. */
  apiEndpoint: string;
  /** The provider resource's list of credentials. */
  apiCredentials?: string[];
  /** Opaque provider configuration. */
  config?: string;
  /** Deprecated, The provider resource's unique identifier. Alias of resourceId. */
  providerID?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type SiteResource = {
  /** The site's human-readable name. */
  name?: string;
  /** Region this site is located in */
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
  /** Provider this Site is managed by */
  provider?: ProviderResource;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type SiteResourceRead = {
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The site's human-readable name. */
  name?: string;
  /** Region this site is located in */
  region?: RegionResourceRead;
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
  /** Provider this Site is managed by */
  provider?: ProviderResourceRead;
  /** Deprecated, The site unique identifier. Alias of resourceId. */
  siteID?: string;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The rendered metadata from the Region parent(s)
     that can be inherited by the Region, represented by a list of key:value pairs.
     This field can not be used in filter. */
  inheritedMetadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type SiteResourceWrite = {
  /** The site's human-readable name. */
  name?: string;
  /** Region this site is located in */
  region?: RegionResourceWrite;
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
  /** Provider this Site is managed by */
  provider?: ProviderResource;
  /** (OPTIONAL) The metadata associated to the Region,
     represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The region's unique identifier
     that the site is associated to. This field cannot be used in filter. */
  regionId?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type BaremetalControllerKind =
  | "BAREMETAL_CONTROLLER_KIND_UNSPECIFIED"
  | "BAREMETAL_CONTROLLER_KIND_NONE"
  | "BAREMETAL_CONTROLLER_KIND_IPMI"
  | "BAREMETAL_CONTROLLER_KIND_VPRO"
  | "BAREMETAL_CONTROLLER_KIND_PDU";
export type PowerState =
  | "POWER_STATE_UNSPECIFIED"
  | "POWER_STATE_ON"
  | "POWER_STATE_OFF"
  | "POWER_STATE_SLEEP"
  | "POWER_STATE_HIBERNATE"
  | "POWER_STATE_RESET"
  | "POWER_STATE_POWER_CYCLE"
  | "POWER_STATE_RESET_REPEAT";
export type StatusIndication =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type PowerCommandPolicy =
  | "POWER_COMMAND_POLICY_UNSPECIFIED"
  | "POWER_COMMAND_POLICY_IMMEDIATE"
  | "POWER_COMMAND_POLICY_ORDERED";
export type InstanceKind = "INSTANCE_KIND_UNSPECIFIED" | "INSTANCE_KIND_METAL";
export type InstanceState =
  | "INSTANCE_STATE_UNSPECIFIED"
  | "INSTANCE_STATE_RUNNING"
  | "INSTANCE_STATE_DELETED"
  | "INSTANCE_STATE_UNTRUSTED";
export type SecurityFeature =
  | "SECURITY_FEATURE_UNSPECIFIED"
  | "SECURITY_FEATURE_NONE"
  | "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
export type OsType =
  | "OS_TYPE_UNSPECIFIED"
  | "OS_TYPE_MUTABLE"
  | "OS_TYPE_IMMUTABLE";
export type OsProviderKind =
  | "OS_PROVIDER_KIND_UNSPECIFIED"
  | "OS_PROVIDER_KIND_INFRA"
  | "OS_PROVIDER_KIND_LENOVO";
export type OperatingSystemResource = {
  /** The OS resource's name. */
  name?: string;
  /** The OS resource's CPU architecture. */
  architecture?: string;
  /** The URL repository of the OS image. */
  imageUrl?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  description?: string;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  /** Name of an OS profile that the OS resource belongs to. Uniquely identifies a family of OS resources. */
  profileName?: string;
  /** (IMMUTABLE) The URL of the OS manifest which contains install packages details. This will be used to fill the installed_packages field
     for the advance use case to allow manual creation of OSProfiles when supported from backend. */
  installedPackagesUrl?: string;
  /** Indicating if this OS is capable of supporting features like Secure Boot (SB) and Full Disk Encryption (FDE).
     Immutable after creation. */
  securityFeature?: SecurityFeature;
  /** Indicating the type of OS (for example, mutable or immutable). */
  osType?: OsType;
  /** Indicating the provider of OS (e.g., Infra or Lenovo). */
  osProvider?: OsProviderKind;
  /** Opaque JSON field storing metadata associated to this OS resource. Expected to be a JSON object with string keys and values, or an empty string. */
  metadata?: string;
  /** user-provided, TLS CA Certificate */
  tlsCaCert?: string;
  /** (IMMUTABLE) URL of the file containing information about the existing CVEs on the Operating System. */
  existingCvesUrl?: string;
  /** (IMMUTABLE) URL of the file containing information about the CVEs that have been fixed by this OS Resource version. */
  fixedCvesUrl?: string;
  /** Deprecated. OS image URL. URL of the original installation source. */
  repoUrl?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type OperatingSystemResourceRead = {
  /** Resource ID, generated by inventory on Create. */
  resourceId?: string;
  /** The OS resource's name. */
  name?: string;
  /** The OS resource's CPU architecture. */
  architecture?: string;
  /** The URL repository of the OS image. */
  imageUrl?: string;
  /** A unique identifier of the OS image that can be retrieved from the running OS. */
  imageId?: string;
  description?: string;
  /** SHA256 checksum of the OS resource in hexadecimal representation. */
  sha256: string;
  /** Name of an OS profile that the OS resource belongs to. Uniquely identifies a family of OS resources. */
  profileName?: string;
  /** Version of OS profile that the OS resource belongs to. */
  profileVersion?: string;
  /** List of installed packages, encoded as a JSON list. */
  installedPackages?: string;
  /** (IMMUTABLE) The URL of the OS manifest which contains install packages details. This will be used to fill the installed_packages field
     for the advance use case to allow manual creation of OSProfiles when supported from backend. */
  installedPackagesUrl?: string;
  /** Indicating if this OS is capable of supporting features like Secure Boot (SB) and Full Disk Encryption (FDE).
     Immutable after creation. */
  securityFeature?: SecurityFeature;
  /** Indicating the type of OS (for example, mutable or immutable). */
  osType?: OsType;
  /** Indicating the provider of OS (e.g., Infra or Lenovo). */
  osProvider?: OsProviderKind;
  /** Opaque JSON field storing references to custom installation script(s) that
     supplements the base OS with additional OS-level dependencies/configurations.
     If empty, the default OS installation will be used. */
  platformBundle?: string;
  /** Opaque JSON field storing metadata associated to this OS resource. Expected to be a JSON object with string keys and values, or an empty string. */
  metadata?: string;
  /** user-provided, TLS CA Certificate */
  tlsCaCert?: string;
  /** (IMMUTABLE) URL of the file containing information about the existing CVEs on the Operating System. */
  existingCvesUrl?: string;
  /** The CVEs that are currently present on the Operating System, encoded as a JSON list. */
  existingCves?: string;
  /** (IMMUTABLE) URL of the file containing information about the CVEs that have been fixed by this OS Resource version. */
  fixedCvesUrl?: string;
  /** The CVEs that have been fixed by this OS Resource version, encoded as a JSON list. */
  fixedCves?: string;
  /** Deprecated, The OS resource's unique identifier. Alias of resourceId. */
  osResourceID?: string;
  /** Deprecated. OS image URL. URL of the original installation source. */
  repoUrl?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type LocalAccountResource = {
  /** Username provided by admin */
  username: string;
  /** SSH Public Key of EN */
  sshKey: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type LocalAccountResourceRead = {
  /** resource identifier */
  resourceId?: string;
  /** Username provided by admin */
  username: string;
  /** SSH Public Key of EN */
  sshKey: string;
  /** Deprecated, The local account resource's unique identifier. Alias of resourceId. */
  localAccountID?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type UpdatePolicy =
  | "UPDATE_POLICY_UNSPECIFIED"
  | "UPDATE_POLICY_LATEST"
  | "UPDATE_POLICY_TARGET";
export type OsUpdatePolicy = {
  /** User-provided, human-readable name. */
  name: string;
  /** User-provided, human-readable description. */
  description?: string;
  /** The list of OS resource update sources.
     Should be in 'DEB822 Source Format' for Debian style OSs.
     Applies only to Mutable OSes. */
  updateSources?: string[];
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information.
     Applies only to Mutable OSes. */
  updatePackages?: string;
  /** The OS resource's kernel Command Line Options.
     Applies only to Mutable OSes. */
  updateKernelCommand?: string;
  /** The target OS for the update.
     Applies only to Immutable OSes for A/B upgrades. */
  targetOs?: OperatingSystemResource;
  /** Update Policy for the OS update. This field is used to determine the update policy for the OS update.
     UPDATE_POLICY_LATEST:
     - for mutable: unsupported
     - for immutable: latest version of the OS Resource
     UPDATE_POLICY_TARGET:
     - for mutable: apply the update_packages, update_sources, update_kernel_command
     - for immutable: install the version referenced by target_os */
  updatePolicy?: UpdatePolicy;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type OsUpdatePolicyRead = {
  /** resource ID, generated by the inventory on Create.
    string.max_bytes = 23
     */
  resourceId?: string;
  /** User-provided, human-readable name. */
  name: string;
  /** User-provided, human-readable description. */
  description?: string;
  /** The list of OS resource update sources.
     Should be in 'DEB822 Source Format' for Debian style OSs.
     Applies only to Mutable OSes. */
  updateSources?: string[];
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information.
     Applies only to Mutable OSes. */
  updatePackages?: string;
  /** The OS resource's kernel Command Line Options.
     Applies only to Mutable OSes. */
  updateKernelCommand?: string;
  /** The target OS for the update.
     Applies only to Immutable OSes for A/B upgrades. */
  targetOs?: OperatingSystemResourceRead;
  /** Update Policy for the OS update. This field is used to determine the update policy for the OS update.
     UPDATE_POLICY_LATEST:
     - for mutable: unsupported
     - for immutable: latest version of the OS Resource
     UPDATE_POLICY_TARGET:
     - for mutable: apply the update_packages, update_sources, update_kernel_command
     - for immutable: install the version referenced by target_os */
  updatePolicy?: UpdatePolicy;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type OsUpdatePolicyWrite = {
  /** User-provided, human-readable name. */
  name: string;
  /** User-provided, human-readable description. */
  description?: string;
  /** The list of OS resource update sources.
     Should be in 'DEB822 Source Format' for Debian style OSs.
     Applies only to Mutable OSes. */
  updateSources?: string[];
  /** Freeform text, OS-dependent. A list of package names, one per line (newline separated). Must not contain version information.
     Applies only to Mutable OSes. */
  updatePackages?: string;
  /** The OS resource's kernel Command Line Options.
     Applies only to Mutable OSes. */
  updateKernelCommand?: string;
  /** The target OS for the update.
     Applies only to Immutable OSes for A/B upgrades. */
  targetOs?: OperatingSystemResource;
  /** The unique identifier of target OS will be associated with the OS Update policy. */
  targetOsId?: string;
  /** Update Policy for the OS update. This field is used to determine the update policy for the OS update.
     UPDATE_POLICY_LATEST:
     - for mutable: unsupported
     - for immutable: latest version of the OS Resource
     UPDATE_POLICY_TARGET:
     - for mutable: apply the update_packages, update_sources, update_kernel_command
     - for immutable: install the version referenced by target_os */
  updatePolicy?: UpdatePolicy;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type InstanceResource = {
  /** Kind of resource. Frequently tied to Provider. */
  kind?: InstanceKind;
  /** The instance's human-readable name. */
  name?: string;
  /** The Instance desired state. */
  desiredState?: InstanceState;
  /** The Instance current state. */
  currentState?: InstanceState;
  /** Host this Instance is placed on. Only applicable to baremetal instances. */
  host?: HostResource;
  /** OS resource that should be installed to this Instance. */
  os?: OperatingSystemResource;
  /** Select to enable security features such as Secure Boot (SB) and Full Disk Encryption (FDE). */
  securityFeature?: SecurityFeature;
  /** Indicates interpretation of instance_status. Set by RMs only. */
  instanceStatusIndicator?: StatusIndication;
  /** Indicates interpretation of provisioning_status. Set by RMs only. */
  provisioningStatusIndicator?: StatusIndication;
  /** Indicates interpretation of update_status. Set by RMs only. */
  updateStatusIndicator?: StatusIndication;
  /** Indicates interpretation of trusted_attestation_status. Set by RMs only. */
  trustedAttestationStatusIndicator?: StatusIndication;
  /** Local Account associated with this Instance */
  localaccount?: LocalAccountResource;
  /** Update Policy of this Instance */
  updatePolicy?: OsUpdatePolicy;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadMemberKind =
  | "WORKLOAD_MEMBER_KIND_UNSPECIFIED"
  | "WORKLOAD_MEMBER_KIND_CLUSTER_NODE";
export type WorkloadKind =
  | "WORKLOAD_KIND_UNSPECIFIED"
  | "WORKLOAD_KIND_CLUSTER";
export type WorkloadResource = {
  /** Type of workload. */
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  /** Human-readable status of the workload. */
  status?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadResourceRead = {
  /** resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** Type of workload. */
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  /** Human-readable status of the workload. */
  status?: string;
  /** The members of the workload. */
  members: WorkloadMember[];
  /** Deprecated, The workload unique identifier. Alias of resourceId. */
  workloadId?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadResourceWrite = {
  /** Type of workload. */
  kind: WorkloadKind;
  /** Human-readable name for the workload. */
  name?: string;
  /** The ID of the external resource, used to link to resources outside the realm of Edge Infrastructure Manager. */
  externalId?: string;
  /** Human-readable status of the workload. */
  status?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadMember = {
  /** The kind of the workload member. */
  kind: WorkloadMemberKind;
  /** The workload resource associated with the workload member. */
  workload?: WorkloadResource;
  /** The instance resource associated with the workload member. */
  instance?: InstanceResource;
  /** The reference of the Instance member of the workload. */
  member?: InstanceResource;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadMemberRead = {
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The kind of the workload member. */
  kind: WorkloadMemberKind;
  /** The workload resource associated with the workload member. */
  workload?: WorkloadResourceRead;
  /** The instance resource associated with the workload member. */
  instance?: InstanceResourceRead;
  /** Deprecated, The workload unique identifier. Alias of resourceId. */
  workloadMemberId?: string;
  /** The reference of the Instance member of the workload. */
  member?: InstanceResourceRead;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type WorkloadMemberWrite = {
  /** The kind of the workload member. */
  kind: WorkloadMemberKind;
  /** The workload resource associated with the workload member. */
  workload?: WorkloadResourceWrite;
  /** The instance resource associated with the workload member. */
  instance?: InstanceResource;
  /** The reference of the Instance member of the workload. */
  member?: InstanceResource;
  /** The workload unique identifier. */
  workloadId: string;
  /** The unique identifier of the instance. */
  instanceId: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type InstanceResourceRead = {
  /** Resource ID, generated on Create. */
  resourceId?: string;
  /** Kind of resource. Frequently tied to Provider. */
  kind?: InstanceKind;
  /** The instance's human-readable name. */
  name?: string;
  /** The Instance desired state. */
  desiredState?: InstanceState;
  /** The Instance current state. */
  currentState?: InstanceState;
  /** Host this Instance is placed on. Only applicable to baremetal instances. */
  host?: HostResource;
  /** OS resource that should be installed to this Instance. */
  os?: OperatingSystemResourceRead;
  /** Select to enable security features such as Secure Boot (SB) and Full Disk Encryption (FDE). */
  securityFeature?: SecurityFeature;
  /** textual message that describes the current instance status. Set by RMs only. */
  instanceStatus?: string;
  /** Indicates interpretation of instance_status. Set by RMs only. */
  instanceStatusIndicator?: StatusIndication;
  /** UTC timestamp when instance_status was last changed. Set by RMs only. */
  instanceStatusTimestamp?: number;
  /** textual message that describes the provisioning status of Instance. Set by RMs only. */
  provisioningStatus?: string;
  /** Indicates interpretation of provisioning_status. Set by RMs only. */
  provisioningStatusIndicator?: StatusIndication;
  /** UTC timestamp when provisioning_status was last changed. Set by RMs only. */
  provisioningStatusTimestamp?: number;
  /** textual message that describes the update status of Instance. Set by RMs only. */
  updateStatus?: string;
  /** Indicates interpretation of update_status. Set by RMs only. */
  updateStatusIndicator?: StatusIndication;
  /** UTC timestamp when update_status was last changed. Set by RMs only. */
  updateStatusTimestamp?: number;
  /** textual message that describes the trusted_attestation status of Instance. Set by RMs only. */
  trustedAttestationStatus?: string;
  /** Indicates interpretation of trusted_attestation_status. Set by RMs only. */
  trustedAttestationStatusIndicator?: StatusIndication;
  /** UTC timestamp when trusted_attestation_status was last changed. Set by RMs only. */
  trustedAttestationStatusTimestamp?: number;
  /** The workload members associated with the instance. back-reference to the Workload Members associated to this Instance */
  workloadMembers?: WorkloadMemberRead[];
  /** Local Account associated with this Instance */
  localaccount?: LocalAccountResourceRead;
  /** Update Policy of this Instance */
  updatePolicy?: OsUpdatePolicyRead;
  /** Textual message that gives detailed status of the instance's software components. */
  instanceStatusDetail?: string;
  /** The CVEs that are currently present on the Instance, encoded as a JSON list. */
  existingCves?: string;
  /** The packages available on the Instance at runtime, represented as a JSON list. */
  runtimePackages?: string;
  /** Details about OS Updates available for this Instance. If empty, there are no updates available. */
  osUpdateAvailable?: string;
  /** The list of custom config associated with the instance. */
  customConfig?: CustomConfigResourceRead[];
  /** Deprecated, The instance's unique identifier. Alias of resourceID. */
  instanceID?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type InstanceResourceWrite = {
  /** Kind of resource. Frequently tied to Provider. */
  kind?: InstanceKind;
  /** The instance's human-readable name. */
  name?: string;
  /** The Instance desired state. */
  desiredState?: InstanceState;
  /** The Instance current state. */
  currentState?: InstanceState;
  /** Host this Instance is placed on. Only applicable to baremetal instances. */
  host?: HostResource;
  /** OS resource that should be installed to this Instance. */
  os?: OperatingSystemResource;
  /** Select to enable security features such as Secure Boot (SB) and Full Disk Encryption (FDE). */
  securityFeature?: SecurityFeature;
  /** Indicates interpretation of instance_status. Set by RMs only. */
  instanceStatusIndicator?: StatusIndication;
  /** Indicates interpretation of provisioning_status. Set by RMs only. */
  provisioningStatusIndicator?: StatusIndication;
  /** Indicates interpretation of update_status. Set by RMs only. */
  updateStatusIndicator?: StatusIndication;
  /** Indicates interpretation of trusted_attestation_status. Set by RMs only. */
  trustedAttestationStatusIndicator?: StatusIndication;
  /** Local Account associated with this Instance */
  localaccount?: LocalAccountResource;
  /** Update Policy of this Instance */
  updatePolicy?: OsUpdatePolicyWrite;
  /** The host's unique identifier associated with the instance. */
  hostID?: string;
  /** The unique identifier of OS resource that must be installed on the instance. The field is used to drive the day0 operations, and immutable once set the first time. */
  osID?: string;
  /** The unique identifier of local account will be associated with the instance. */
  localAccountID?: string;
  osUpdatePolicyID?: string;
  /** The list of custom config associated with the instance. */
  customConfigID?: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type AmtSku = "AMT_SKU_UNSPECIFIED" | "AMT_SKU_AMT" | "AMT_SKU_ISM";
export type AmtState =
  | "AMT_STATE_UNSPECIFIED"
  | "AMT_STATE_PROVISIONED"
  | "AMT_STATE_UNPROVISIONED"
  | "AMT_STATE_DISCONNECTED";
export type AmtControlMode =
  | "AMT_CONTROL_MODE_UNSPECIFIED"
  | "AMT_CONTROL_MODE_ACM"
  | "AMT_CONTROL_MODE_CCM";
export type HostResource = {
  /** The host name. */
  name: string;
  /** The desired state of the Host. */
  desiredState?: HostState;
  /** The current state of the Host. */
  currentState?: HostState;
  /** The site resource associated with the host. */
  site?: SiteResource;
  /** The provider associated with the host. */
  provider?: ProviderResource;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
  /** Kind of BMC. */
  bmcKind?: BaremetalControllerKind;
  /** (OPTIONAL) Desired power state of the host */
  desiredPowerState?: PowerState;
  /** Current power state of the host */
  currentPowerState?: PowerState;
  /** Indicates dynamicity of the power_status. Set by DM RM only. */
  powerStatusIndicator?: StatusIndication;
  /** (OPTIONAL) Power command policy of the host. By default, it is set to PowerCommandPolicy.POWER_COMMAND_POLICY_ORDERED. */
  powerCommandPolicy?: PowerCommandPolicy;
  /** Indicates interpretation of host_status. Set by RMs only. */
  hostStatusIndicator?: StatusIndication;
  /** Indicates interpretation of onboarding_status. Set by RMs only. */
  onboardingStatusIndicator?: StatusIndication;
  /** Indicates interpretation of registration_status. Set by RMs only. */
  registrationStatusIndicator?: StatusIndication;
  /** The instance associated with the host. */
  instance?: InstanceResource;
  /** coming from device introspection */
  amtSku?: AmtSku;
  /** (OPTIONAL) Desired AMT/vPRO state of the host */
  desiredAmtState?: AmtState;
  /** Current AMT/vPRO state of the host */
  currentAmtState?: AmtState;
  /** Indicates dynamicity of the amt_status. Set by DM and OM RM only. */
  amtStatusIndicator?: StatusIndication;
  /** (OPTIONAL) coming from user selection */
  amtControlMode?: AmtControlMode;
  /** (OPTIONAL) textual message that describes dns_suffix for ACM mode. */
  amtDnsSuffix?: string;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HoststorageResource = {
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HoststorageResourceRead = {
  /** The storage device unique identifier. */
  wwid?: string;
  /** The storage device unique serial number. */
  serial?: string;
  /** The Storage device vendor. */
  vendor?: string;
  /** The storage device model. */
  model?: string;
  /** The storage device Capacity (size) in bytes. */
  capacityBytes?: string;
  /** The storage device device name (OS provided, like sda, sdb, etc.) */
  deviceName?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type LinkState =
  | "NETWORK_INTERFACE_LINK_STATE_UNSPECIFIED"
  | "NETWORK_INTERFACE_LINK_STATE_UP"
  | "NETWORK_INTERFACE_LINK_STATE_DOWN";
export type NetworkInterfaceLinkState = {
  /** The interface link state. */
  type?: LinkState;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostnicResource = {
  /** Link state of this interface. */
  linkState?: NetworkInterfaceLinkState;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type IpAddressStatus =
  | "IP_ADDRESS_STATUS_UNSPECIFIED"
  | "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR"
  | "IP_ADDRESS_STATUS_ASSIGNED"
  | "IP_ADDRESS_STATUS_CONFIGURATION_ERROR"
  | "IP_ADDRESS_STATUS_CONFIGURED"
  | "IP_ADDRESS_STATUS_RELEASED"
  | "IP_ADDRESS_STATUS_ERROR";
export type IpAddressConfigMethod =
  | "IP_ADDRESS_CONFIG_METHOD_UNSPECIFIED"
  | "IP_ADDRESS_CONFIG_METHOD_STATIC"
  | "IP_ADDRESS_CONFIG_METHOD_DYNAMIC";
export type IpAddressResource = {
  /** The status of the IP address. */
  status?: IpAddressStatus;
  /** Specifies how the IP address is configured. */
  configMethod?: IpAddressConfigMethod;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type IpAddressResourceRead = {
  /** Resource ID, generated by Inventory on Create */
  resourceId?: string;
  /** CIDR representation of the IP address. */
  address?: string;
  /** The status of the IP address. */
  status?: IpAddressStatus;
  /** User-friendly status to provide details about the resource state */
  statusDetail?: string;
  /** Specifies how the IP address is configured. */
  configMethod?: IpAddressConfigMethod;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostnicResourceRead = {
  /** The device name (OS provided, like eth0, enp1s0, etc.). */
  deviceName?: string;
  /** PCI identifier string for this network interface. */
  pciIdentifier?: string;
  /** The interface MAC address. */
  macAddr?: string;
  /** If the interface has SRIOV enabled. */
  sriovEnabled?: boolean;
  /** The number of VFs currently provisioned on the interface, if SR-IOV is supported. */
  sriovVfsNum?: number;
  /** The maximum number of VFs the interface supports, if SR-IOV is supported. */
  sriovVfsTotal?: number;
  /** Maximum transmission unit of the interface. */
  mtu?: number;
  /** Link state of this interface. */
  linkState?: NetworkInterfaceLinkState;
  /** Whether this is a bmc interface or not. */
  bmcInterface?: boolean;
  /** The interface's IP address list. */
  ipaddresses?: IpAddressResourceRead[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostusbResource = {
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostusbResourceRead = {
  /** Hexadecimal number representing ID of the USB device vendor. */
  idVendor?: string;
  /** Hexadecimal number representing ID of the USB device product. */
  idProduct?: string;
  /** Bus number of device connected with. */
  bus?: number;
  /** USB Device number assigned by OS. */
  addr?: number;
  /** class defined by USB-IF. */
  class?: string;
  /** Serial number of device. */
  serial?: string;
  /** the OS-provided device name. */
  deviceName?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostgpuResource = {
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostgpuResourceRead = {
  /** The GPU device PCI identifier. */
  pciId?: string;
  /** The GPU device model. */
  product?: string;
  /** The GPU device vendor. */
  vendor?: string;
  /** The human-readable GPU device description. */
  description?: string;
  /** GPU name as reported by OS. */
  deviceName?: string;
  /** The features of this GPU device, comma separated. */
  capabilities?: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostResourceRead = {
  /** Resource ID, generated on Create. */
  resourceId?: string;
  /** The host name. */
  name: string;
  /** The desired state of the Host. */
  desiredState?: HostState;
  /** The current state of the Host. */
  currentState?: HostState;
  /** The site resource associated with the host. */
  site?: SiteResourceRead;
  /** The provider associated with the host. */
  provider?: ProviderResourceRead;
  /** The note associated with the host. */
  note?: string;
  /** SMBIOS device serial number. */
  serialNumber?: string;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
  /** Quantity of memory (RAM) in the system in bytes. */
  memoryBytes?: string;
  /** CPU model of the Host. */
  cpuModel?: string;
  /** Number of physical CPU sockets. */
  cpuSockets?: number;
  /** Number of CPU cores. */
  cpuCores?: number;
  /** String list of all CPU capabilities (possibly JSON). */
  cpuCapabilities?: string;
  /** Architecture of the CPU model, e.g. x86_64. */
  cpuArchitecture?: string;
  /** Total Number of threads supported by the CPU. */
  cpuThreads?: number;
  /** JSON field storing the CPU topology, refer to HDA/HRM docs for the JSON schema. */
  cpuTopology?: string;
  /** Kind of BMC. */
  bmcKind?: BaremetalControllerKind;
  /** BMC IP address, such as "192.0.0.1". */
  bmcIp?: string;
  /** Hostname. */
  hostname?: string;
  /** System Product Name. */
  productName?: string;
  /** BIOS Version. */
  biosVersion?: string;
  /** BIOS Release Date. */
  biosReleaseDate?: string;
  /** BIOS Vendor. */
  biosVendor?: string;
  /** (OPTIONAL) Desired power state of the host */
  desiredPowerState?: PowerState;
  /** Current power state of the host */
  currentPowerState?: PowerState;
  /** textual message that describes the runtime status of Host power. Set by DM RM only. */
  powerStatus?: string;
  /** Indicates dynamicity of the power_status. Set by DM RM only. */
  powerStatusIndicator?: StatusIndication;
  /** UTC timestamp when power_status was last changed. Set by DM RM only. */
  powerStatusTimestamp?: number;
  /** (OPTIONAL) Power command policy of the host. By default, it is set to PowerCommandPolicy.POWER_COMMAND_POLICY_ORDERED. */
  powerCommandPolicy?: PowerCommandPolicy;
  /** UTC timestamp when the host was powered on. Set by DM RM only. */
  powerOnTime?: number;
  /** textual message that describes the runtime status of Host. Set by RMs only. */
  hostStatus?: string;
  /** Indicates interpretation of host_status. Set by RMs only. */
  hostStatusIndicator?: StatusIndication;
  /** UTC timestamp when host_status was last changed. Set by RMs only. */
  hostStatusTimestamp?: number;
  /** textual message that describes the onboarding status of Host. Set by RMs only. */
  onboardingStatus?: string;
  /** Indicates interpretation of onboarding_status. Set by RMs only. */
  onboardingStatusIndicator?: StatusIndication;
  /** UTC timestamp when onboarding_status was last changed. Set by RMs only. */
  onboardingStatusTimestamp?: number;
  /** textual message that describes the onboarding status of Host. Set by RMs only. */
  registrationStatus?: string;
  /** Indicates interpretation of registration_status. Set by RMs only. */
  registrationStatusIndicator?: StatusIndication;
  /** UTC timestamp when registration_status was last changed. Set by RMs only. */
  registrationStatusTimestamp?: number;
  /** Back-reference to attached host storage resources. */
  hostStorages?: HoststorageResourceRead[];
  /** Back-reference to attached host NIC resources. */
  hostNics?: HostnicResourceRead[];
  /** Back-reference to attached host USB resources. */
  hostUsbs?: HostusbResourceRead[];
  /** Back-reference to attached host GPU resources. */
  hostGpus?: HostgpuResourceRead[];
  /** The instance associated with the host. */
  instance?: InstanceResourceRead;
  /** coming from device introspection */
  amtSku?: AmtSku;
  /** (OPTIONAL) Desired AMT/vPRO state of the host */
  desiredAmtState?: AmtState;
  /** Current AMT/vPRO state of the host */
  currentAmtState?: AmtState;
  /** coming from device introspection. Set only by the DM RM. */
  amtStatus?: string;
  /** Indicates dynamicity of the amt_status. Set by DM and OM RM only. */
  amtStatusIndicator?: StatusIndication;
  /** UTC timestamp when amt_status was last changed. Set by DM and OM RM only. */
  amtStatusTimestamp?: number;
  /** LVM size in GB. */
  userLvmSize?: number;
  /** (OPTIONAL) coming from user selection */
  amtControlMode?: AmtControlMode;
  /** (OPTIONAL) textual message that describes dns_suffix for ACM mode. */
  amtDnsSuffix?: string;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** The metadata inherited by the host, represented by a list of key:value pairs, rendered by location and logical structures. */
  inheritedMetadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type HostResourceWrite = {
  /** The host name. */
  name: string;
  /** The desired state of the Host. */
  desiredState?: HostState;
  /** The current state of the Host. */
  currentState?: HostState;
  /** The site resource associated with the host. */
  site?: SiteResourceWrite;
  /** The provider associated with the host. */
  provider?: ProviderResource;
  /** (OPTIONAL) The host UUID identifier; UUID is unique and immutable. */
  uuid?: string;
  /** Kind of BMC. */
  bmcKind?: BaremetalControllerKind;
  /** (OPTIONAL) Desired power state of the host */
  desiredPowerState?: PowerState;
  /** Current power state of the host */
  currentPowerState?: PowerState;
  /** Indicates dynamicity of the power_status. Set by DM RM only. */
  powerStatusIndicator?: StatusIndication;
  /** (OPTIONAL) Power command policy of the host. By default, it is set to PowerCommandPolicy.POWER_COMMAND_POLICY_ORDERED. */
  powerCommandPolicy?: PowerCommandPolicy;
  /** Indicates interpretation of host_status. Set by RMs only. */
  hostStatusIndicator?: StatusIndication;
  /** Indicates interpretation of onboarding_status. Set by RMs only. */
  onboardingStatusIndicator?: StatusIndication;
  /** Indicates interpretation of registration_status. Set by RMs only. */
  registrationStatusIndicator?: StatusIndication;
  /** The instance associated with the host. */
  instance?: InstanceResourceWrite;
  /** coming from device introspection */
  amtSku?: AmtSku;
  /** (OPTIONAL) Desired AMT/vPRO state of the host */
  desiredAmtState?: AmtState;
  /** Current AMT/vPRO state of the host */
  currentAmtState?: AmtState;
  /** Indicates dynamicity of the amt_status. Set by DM and OM RM only. */
  amtStatusIndicator?: StatusIndication;
  /** (OPTIONAL) coming from user selection */
  amtControlMode?: AmtControlMode;
  /** (OPTIONAL) textual message that describes dns_suffix for ACM mode. */
  amtDnsSuffix?: string;
  /** The site where the host is located. */
  siteId?: string;
  /** (OPTIONAL) The metadata associated with the host, represented by a list of key:value pairs. */
  metadata?: MetadataItem[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListHostsResponse = {
  /** Sorted and filtered list of hosts. */
  hosts: HostResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListHostsResponseRead = {
  /** Sorted and filtered list of hosts. */
  hosts: HostResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListHostsResponseWrite = {
  /** Sorted and filtered list of hosts. */
  hosts: HostResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type HostRegister = {
  /** The host name. */
  name?: string;
  /** The host serial number. */
  serialNumber?: string;
  /** The host UUID. */
  uuid?: string;
  /** Flag to signal to automatically onboard the host. */
  autoOnboard?: boolean;
  /** Flag to signal to enable vPRO on the host. */
  enableVpro?: boolean;
  /** LVM size in GB */
  userLvmSize?: number;
};
export type DeleteHostResponse = object;
export type InvalidateHostResponse = object;
export type OnboardHostResponse = object;
export type GetHostSummaryResponse = {};
export type GetHostSummaryResponseRead = {
  /** The total number of hosts. */
  total?: number;
  /** The total number of hosts presenting an Error. */
  error?: number;
  /** The total number of hosts in Running state. */
  running?: number;
  /** The total number of hosts without a site. */
  unallocated?: number;
};
export type ListInstancesResponse = {
  /** Sorted and filtered list of instances. */
  instances: InstanceResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListInstancesResponseRead = {
  /** Sorted and filtered list of instances. */
  instances: InstanceResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListInstancesResponseWrite = {
  /** Sorted and filtered list of instances. */
  instances: InstanceResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteInstanceResponse = object;
export type InvalidateInstanceResponse = object;
export type ListLocalAccountsResponse = {
  /** Sorted and filtered list of localaccounts. */
  localAccounts: LocalAccountResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListLocalAccountsResponseRead = {
  /** Sorted and filtered list of localaccounts. */
  localAccounts: LocalAccountResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteLocalAccountResponse = object;
export type ResourceKind =
  | "RESOURCE_KIND_UNSPECIFIED"
  | "RESOURCE_KIND_REGION"
  | "RESOURCE_KIND_SITE";
export type LocationNode = {
  /** The associated node resource ID, generated by inventory on Create. */
  resourceId: string;
  /** The associated resource ID, of the parent resource of this Location node.
     In the case of a region, it could be empty or a regionId.
     In the case of a site, it could be empty or a regionId. */
  parentId: string;
  /** The node human readable name. */
  name: string;
  /** The node type */
  type: ResourceKind;
};
export type ListLocationsResponse = {
  /** Sorted and filtered list of regions. */
  nodes: LocationNode[];
  /** (OPTIONAL) Count of items in the entire list, regardless of pagination. */
  totalElements?: number;
  /** (OPTIONAL) Amount of items in the returned list. */
  outputElements?: number;
};
export type ListOperatingSystemsResponse = {
  /** Sorted and filtered list of oss. */
  OperatingSystemResources: OperatingSystemResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListOperatingSystemsResponseRead = {
  /** Sorted and filtered list of oss. */
  OperatingSystemResources: OperatingSystemResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteOperatingSystemResponse = object;
export type ListOsUpdatePolicyResponse = {
  /** Sorted and filtered list of OS Update Policies. */
  osUpdatePolicies: OsUpdatePolicy[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListOsUpdatePolicyResponseRead = {
  /** Sorted and filtered list of OS Update Policies. */
  osUpdatePolicies: OsUpdatePolicyRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListOsUpdatePolicyResponseWrite = {
  /** Sorted and filtered list of OS Update Policies. */
  osUpdatePolicies: OsUpdatePolicyWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteOsUpdatePolicyResponse = object;
export type OsUpdateRun = {
  /** Update Policy of this Instance */
  appliedPolicy?: OsUpdatePolicy;
  /** The instance resource associated with this OS Update. This OS Update Run is executed for this instance. */
  instance?: InstanceResource;
  /** Status Indicator for the OS update run. This field is used to determine the status type for the OS update Run.
     STATUS_INDICATION_ERROR: Update failed in error Indicator
     STATUS_INDICATION_IN_PROGRESS: Update in progress Indicator
     STATUS_INDICATION_IDLE: Update completed successfully Indicator */
  statusIndicator?: StatusIndication;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type OsUpdateRunRead = {
  /** resource ID, generated by the inventory on Create.
    string.max_bytes = 20
     */
  resourceId?: string;
  /** Human-readable name. */
  name?: string;
  /** Human-readable description. */
  description?: string;
  /** Update Policy of this Instance */
  appliedPolicy?: OsUpdatePolicyRead;
  /** The instance resource associated with this OS Update. This OS Update Run is executed for this instance. */
  instance?: InstanceResourceRead;
  /** Status Indicator for the OS update run. This field is used to determine the status type for the OS update Run.
     STATUS_INDICATION_ERROR: Update failed in error Indicator
     STATUS_INDICATION_IN_PROGRESS: Update in progress Indicator
     STATUS_INDICATION_IDLE: Update completed successfully Indicator */
  statusIndicator?: StatusIndication;
  /** Short message that describes what happened during the OS Update. */
  status?: string;
  /** Details about what happened during the OS Update. */
  statusDetails?: string;
  /** UTC timestamp of OS Update status reported. */
  statusTimestamp?: number;
  /** UTC timestamp of OS Update started. */
  startTime?: number;
  /** UTC timestamp of OS Update ended. */
  endTime?: number;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type OsUpdateRunWrite = {
  /** Update Policy of this Instance */
  appliedPolicy?: OsUpdatePolicyWrite;
  /** The instance resource associated with this OS Update. This OS Update Run is executed for this instance. */
  instance?: InstanceResourceWrite;
  /** Status Indicator for the OS update run. This field is used to determine the status type for the OS update Run.
     STATUS_INDICATION_ERROR: Update failed in error Indicator
     STATUS_INDICATION_IN_PROGRESS: Update in progress Indicator
     STATUS_INDICATION_IDLE: Update completed successfully Indicator */
  statusIndicator?: StatusIndication;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListOsUpdateRunResponse = {
  /** Sorted and filtered list of os update runs. */
  osUpdateRuns: OsUpdateRun[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListOsUpdateRunResponseRead = {
  /** Sorted and filtered list of os update runs. */
  osUpdateRuns: OsUpdateRunRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListOsUpdateRunResponseWrite = {
  /** Sorted and filtered list of os update runs. */
  osUpdateRuns: OsUpdateRunWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteOsUpdateRunResponse = object;
export type ListProvidersResponse = {
  /** Sorted and filtered list of providers. */
  providers: ProviderResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListProvidersResponseRead = {
  /** Sorted and filtered list of providers. */
  providers: ProviderResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteProviderResponse = object;
export type ListRegionsResponse = {
  /** Sorted and filtered list of regions. */
  regions: RegionResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListRegionsResponseRead = {
  /** Sorted and filtered list of regions. */
  regions: RegionResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListRegionsResponseWrite = {
  /** Sorted and filtered list of regions. */
  regions: RegionResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteRegionResponse = object;
export type ScheduleStatus =
  | "SCHEDULE_STATUS_UNSPECIFIED"
  | "SCHEDULE_STATUS_MAINTENANCE"
  | "SCHEDULE_STATUS_OS_UPDATE";
export type SingleScheduleResource = {
  /** The schedule status. status of one-time-schedule */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResource;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResource;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResource;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type SingleScheduleResourceRead = {
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The schedule status. status of one-time-schedule */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResourceRead;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResourceRead;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResourceRead;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** Deprecated, The single schedule resource's unique identifier. Alias of resourceId. */
  singleScheduleID?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type SingleScheduleResourceWrite = {
  /** The schedule status. status of one-time-schedule */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResourceWrite;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResourceWrite;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResourceWrite;
  /** The start time in seconds, of the single schedule. */
  startSeconds: number;
  /** The end time in seconds, of the single schedule.
     The value of endSeconds must be equal to or bigger than the value of startSeconds. */
  endSeconds?: number;
  /** The target host ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetHostId?: string;
  /** The target site ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetSiteId?: string;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetRegionId?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type RepeatedScheduleResource = {
  /** The schedule status. */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResource;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResource;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResource;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type RepeatedScheduleResourceRead = {
  /** Resource ID, generated by the inventory on Create. */
  resourceId?: string;
  /** The schedule status. */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResourceRead;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResourceRead;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResourceRead;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** Deprecated, The repeated schedule's unique identifier. Alias of resourceId. */
  repeatedScheduleID?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type RepeatedScheduleResourceWrite = {
  /** The schedule status. */
  scheduleStatus: ScheduleStatus;
  /** The schedule's name. */
  name?: string;
  /** Resource ID of Site this applies to. */
  targetSite?: SiteResourceWrite;
  /** Resource ID of Host this applies to. */
  targetHost?: HostResourceWrite;
  /** Resource ID of Region this applies to. */
  targetRegion?: RegionResourceWrite;
  /** The duration in seconds of the repeated schedule, per schedule. */
  durationSeconds: number;
  /** cron style minutes (0-59), it can be empty only when used in a Filter. */
  cronMinutes: string;
  /** cron style hours (0-23), it can be empty only when used in a Filter */
  cronHours: string;
  /** cron style day of month (1-31), it can be empty only when used in a Filter */
  cronDayMonth: string;
  /** cron style month (1-12), it can be empty only when used in a Filter */
  cronMonth: string;
  /** cron style day of week (0-6), it can be empty only when used in a Filter */
  cronDayWeek: string;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetHostId?: string;
  /** The target site ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetSiteId?: string;
  /** The target region ID of the schedule.
     Only one target can be provided per schedule.
     This field cannot be used as filter. */
  targetRegionId?: string;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListSchedulesResponse = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResource[];
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSchedulesResponseRead = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceRead[];
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSchedulesResponseWrite = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceWrite[];
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListRepeatedSchedulesResponse = {
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListRepeatedSchedulesResponseRead = {
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListRepeatedSchedulesResponseWrite = {
  /** Sorted and filtered list of repeated_schedules. */
  repeatedSchedules: RepeatedScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteRepeatedScheduleResponse = object;
export type ListSingleSchedulesResponse = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSingleSchedulesResponseRead = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSingleSchedulesResponseWrite = {
  /** Sorted and filtered list of single_schedules. */
  singleSchedules: SingleScheduleResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteSingleScheduleResponse = object;
export type ListSitesResponse = {
  /** Sorted and filtered list of sites. */
  sites: SiteResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSitesResponseRead = {
  /** Sorted and filtered list of sites. */
  sites: SiteResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListSitesResponseWrite = {
  /** Sorted and filtered list of sites. */
  sites: SiteResourceWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteSiteResponse = object;
export type TelemetryCollectorKind =
  | "TELEMETRY_COLLECTOR_KIND_UNSPECIFIED"
  | "TELEMETRY_COLLECTOR_KIND_HOST"
  | "TELEMETRY_COLLECTOR_KIND_CLUSTER";
export type TelemetryLogsGroupResource = {
  /** Human-readable name for the log group. */
  name: string;
  /** The collector kind. */
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type TelemetryLogsGroupResourceRead = {
  /** Unique ID of the telemetry group. */
  resourceId?: string;
  /** Deprecated, Unique ID of the telemetry group. Alias of resource_id. */
  telemetryLogsGroupId?: string;
  /** Human-readable name for the log group. */
  name: string;
  /** The collector kind. */
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListTelemetryLogsGroupsResponse = {
  /** Sorted and filtered list of telemetry_logs_groups. */
  telemetryLogsGroups: TelemetryLogsGroupResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListTelemetryLogsGroupsResponseRead = {
  /** Sorted and filtered list of telemetry_logs_groups. */
  telemetryLogsGroups: TelemetryLogsGroupResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteTelemetryLogsGroupResponse = object;
export type TelemetryMetricsGroupResource = {
  /** Human-readable name for the log group. */
  name: string;
  /** The collector kind. */
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type TelemetryMetricsGroupResourceRead = {
  /** Unique ID of the telemetry group. */
  resourceId?: string;
  /** Deprecated, Unique ID of the telemetry group. Alias of resource_id. */
  telemetryMetricsGroupId?: string;
  /** Human-readable name for the log group. */
  name: string;
  /** The collector kind. */
  collectorKind: TelemetryCollectorKind;
  /** A list of log groups to collect. */
  groups: string[];
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListTelemetryMetricsGroupsResponse = {
  /** Sorted and filtered list of telemetry_metrics_groups. */
  telemetryMetricsGroups: TelemetryMetricsGroupResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListTelemetryMetricsGroupsResponseRead = {
  /** Sorted and filtered list of telemetry_metrics_groups. */
  telemetryMetricsGroups: TelemetryMetricsGroupResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteTelemetryMetricsGroupResponse = object;
export type SeverityLevel =
  | "SEVERITY_LEVEL_UNSPECIFIED"
  | "SEVERITY_LEVEL_CRITICAL"
  | "SEVERITY_LEVEL_ERROR"
  | "SEVERITY_LEVEL_WARN"
  | "SEVERITY_LEVEL_INFO"
  | "SEVERITY_LEVEL_DEBUG";
export type TelemetryLogsProfileResource = {
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The log level og the telemetry profile. */
  logLevel: SeverityLevel;
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** The log group associated with the telemetry profile. */
  logsGroup?: TelemetryLogsGroupResource;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type TelemetryLogsProfileResourceRead = {
  /** The ID of the telemetry profile. */
  resourceId?: string;
  /** Deprecated, The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** The log level og the telemetry profile. */
  logLevel: SeverityLevel;
  /** The unique identifier of the telemetry log group. */
  logsGroupId: string;
  /** The log group associated with the telemetry profile. */
  logsGroup?: TelemetryLogsGroupResourceRead;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListTelemetryLogsProfilesResponse = {
  /** Sorted and filtered list of telemetry_logs_profiles. */
  telemetryLogsProfiles: TelemetryLogsProfileResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListTelemetryLogsProfilesResponseRead = {
  /** Sorted and filtered list of telemetry_logs_profiles. */
  telemetryLogsProfiles: TelemetryLogsProfileResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteTelemetryLogsProfileResponse = object;
export type TelemetryMetricsProfileResource = {
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** Metric interval (in seconds) for the telemetry profile.
     This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** The metric group associated with the telemetry profile. */
  metricsGroup?: TelemetryMetricsGroupResource;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type TelemetryMetricsProfileResourceRead = {
  /** The ID of the telemetry profile. */
  resourceId?: string;
  /** Deprecated, The ID of the telemetry profile. */
  profileId?: string;
  /** The ID of the instance that the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetInstance?: string;
  /** The ID of the site where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetSite?: string;
  /** The ID of the region where the telemetry profile is assigned to.
     Can only be one of targetInstance, targetSite, or targetRegion. */
  targetRegion?: string;
  /** Metric interval (in seconds) for the telemetry profile.
     This field must only be defined if the type equals to TELEMETRY_CONFIG_KIND_METRICS. */
  metricsInterval: number;
  /** The unique identifier of the telemetry metric group. */
  metricsGroupId: string;
  /** The metric group associated with the telemetry profile. */
  metricsGroup?: TelemetryMetricsGroupResourceRead;
  /** Timestamps associated to the resource. */
  timestamps?: Timestamps;
};
export type ListTelemetryMetricsProfilesResponse = {
  /** Sorted and filtered list of telemetry_metrics_profiles. */
  telemetryMetricsProfiles: TelemetryMetricsProfileResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListTelemetryMetricsProfilesResponseRead = {
  /** Sorted and filtered list of telemetry_metrics_profiles. */
  telemetryMetricsProfiles: TelemetryMetricsProfileResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteTelemetryMetricsProfileResponse = object;
export type ListWorkloadMembersResponse = {
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMember[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListWorkloadMembersResponseRead = {
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMemberRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListWorkloadMembersResponseWrite = {
  /** Sorted and filtered list of workload_members. */
  workloadMembers: WorkloadMemberWrite[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteWorkloadMemberResponse = object;
export type ListWorkloadsResponse = {
  /** Sorted and filtered list of workloads. */
  workloads: WorkloadResource[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type ListWorkloadsResponseRead = {
  /** Sorted and filtered list of workloads. */
  workloads: WorkloadResourceRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
  /** Inform if there are more elements */
  hasNext: boolean;
};
export type DeleteWorkloadResponse = object;
export const {
  useCustomConfigServiceListCustomConfigs2Query,
  useCustomConfigServiceCreateCustomConfig2Mutation,
  useCustomConfigServiceGetCustomConfig2Query,
  useCustomConfigServiceDeleteCustomConfig2Mutation,
  useHostServiceListHosts2Query,
  useHostServiceCreateHost2Mutation,
  useHostServiceRegisterHost2Mutation,
  useHostServiceGetHost2Query,
  useHostServiceUpdateHost2Mutation,
  useHostServiceDeleteHost2Mutation,
  useHostServicePatchHost2Mutation,
  useHostServiceInvalidateHost2Mutation,
  useHostServiceOnboardHost2Mutation,
  useHostServicePatchRegisterHost2Mutation,
  useHostServiceGetHostsSummary2Query,
  useInstanceServiceListInstances2Query,
  useInstanceServiceCreateInstance2Mutation,
  useInstanceServiceGetInstance2Query,
  useInstanceServiceUpdateInstance2Mutation,
  useInstanceServiceDeleteInstance2Mutation,
  useInstanceServicePatchInstance2Mutation,
  useInstanceServiceInvalidateInstance2Mutation,
  useLocalAccountServiceListLocalAccounts2Query,
  useLocalAccountServiceCreateLocalAccount2Mutation,
  useLocalAccountServiceGetLocalAccount2Query,
  useLocalAccountServiceDeleteLocalAccount2Mutation,
  useLocationServiceListLocations2Query,
  useOperatingSystemServiceListOperatingSystems2Query,
  useOperatingSystemServiceCreateOperatingSystem2Mutation,
  useOperatingSystemServiceGetOperatingSystem2Query,
  useOperatingSystemServiceUpdateOperatingSystem2Mutation,
  useOperatingSystemServiceDeleteOperatingSystem2Mutation,
  useOperatingSystemServicePatchOperatingSystem2Mutation,
  useOsUpdatePolicyListOsUpdatePolicy2Query,
  useOsUpdatePolicyCreateOsUpdatePolicy2Mutation,
  useOsUpdatePolicyGetOsUpdatePolicy2Query,
  useOsUpdatePolicyDeleteOsUpdatePolicy2Mutation,
  useOsUpdateRunListOsUpdateRun2Query,
  useOsUpdateRunGetOsUpdateRun2Query,
  useOsUpdateRunDeleteOsUpdateRun2Mutation,
  useProviderServiceListProviders2Query,
  useProviderServiceCreateProvider2Mutation,
  useProviderServiceGetProvider2Query,
  useProviderServiceDeleteProvider2Mutation,
  useRegionServiceListRegions2Query,
  useRegionServiceCreateRegion2Mutation,
  useRegionServiceGetRegion2Query,
  useRegionServiceUpdateRegion2Mutation,
  useRegionServiceDeleteRegion2Mutation,
  useRegionServicePatchRegion2Mutation,
  useScheduleServiceListSchedules2Query,
  useScheduleServiceListRepeatedSchedules2Query,
  useScheduleServiceCreateRepeatedSchedule2Mutation,
  useScheduleServiceGetRepeatedSchedule2Query,
  useScheduleServiceUpdateRepeatedSchedule2Mutation,
  useScheduleServiceDeleteRepeatedSchedule2Mutation,
  useScheduleServicePatchRepeatedSchedule2Mutation,
  useScheduleServiceListSingleSchedules2Query,
  useScheduleServiceCreateSingleSchedule2Mutation,
  useScheduleServiceGetSingleSchedule2Query,
  useScheduleServiceUpdateSingleSchedule2Mutation,
  useScheduleServiceDeleteSingleSchedule2Mutation,
  useScheduleServicePatchSingleSchedule2Mutation,
  useSiteServiceListSites2Query,
  useSiteServiceCreateSite2Mutation,
  useSiteServiceGetSite2Query,
  useSiteServiceUpdateSite2Mutation,
  useSiteServiceDeleteSite2Mutation,
  useSiteServicePatchSite2Mutation,
  useTelemetryLogsGroupServiceListTelemetryLogsGroups2Query,
  useTelemetryLogsGroupServiceCreateTelemetryLogsGroup2Mutation,
  useTelemetryLogsGroupServiceGetTelemetryLogsGroup2Query,
  useTelemetryLogsGroupServiceDeleteTelemetryLogsGroup2Mutation,
  useTelemetryMetricsGroupServiceListTelemetryMetricsGroups2Query,
  useTelemetryMetricsGroupServiceCreateTelemetryMetricsGroup2Mutation,
  useTelemetryMetricsGroupServiceGetTelemetryMetricsGroup2Query,
  useTelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup2Mutation,
  useTelemetryLogsProfileServiceListTelemetryLogsProfiles2Query,
  useTelemetryLogsProfileServiceCreateTelemetryLogsProfile2Mutation,
  useTelemetryLogsProfileServiceGetTelemetryLogsProfile2Query,
  useTelemetryLogsProfileServiceUpdateTelemetryLogsProfile2Mutation,
  useTelemetryLogsProfileServiceDeleteTelemetryLogsProfile2Mutation,
  useTelemetryLogsProfileServicePatchTelemetryLogsProfile2Mutation,
  useTelemetryMetricsProfileServiceListTelemetryMetricsProfiles2Query,
  useTelemetryMetricsProfileServiceCreateTelemetryMetricsProfile2Mutation,
  useTelemetryMetricsProfileServiceGetTelemetryMetricsProfile2Query,
  useTelemetryMetricsProfileServiceUpdateTelemetryMetricsProfile2Mutation,
  useTelemetryMetricsProfileServiceDeleteTelemetryMetricsProfile2Mutation,
  useTelemetryMetricsProfileServicePatchTelemetryMetricsProfile2Mutation,
  useWorkloadMemberServiceListWorkloadMembers2Query,
  useWorkloadMemberServiceCreateWorkloadMember2Mutation,
  useWorkloadMemberServiceGetWorkloadMember2Query,
  useWorkloadMemberServiceDeleteWorkloadMember2Mutation,
  useWorkloadServiceListWorkloads2Query,
  useWorkloadServiceCreateWorkload2Mutation,
  useWorkloadServiceGetWorkload2Query,
  useWorkloadServiceUpdateWorkload2Mutation,
  useWorkloadServiceDeleteWorkload2Mutation,
  useWorkloadServicePatchWorkload2Mutation,
  useHostServiceListHostsQuery,
  useHostServiceCreateHostMutation,
  useHostServiceRegisterHostMutation,
  useHostServiceGetHostsSummaryQuery,
  useHostServiceGetHostQuery,
  useHostServiceUpdateHostMutation,
  useHostServiceDeleteHostMutation,
  useHostServicePatchHostMutation,
  useHostServiceInvalidateHostMutation,
  useHostServiceOnboardHostMutation,
  useHostServicePatchRegisterHostMutation,
  useHostServiceGetHostsSummary3Query,
  useInstanceServiceListInstancesQuery,
  useInstanceServiceCreateInstanceMutation,
  useInstanceServiceGetInstanceQuery,
  useInstanceServiceUpdateInstanceMutation,
  useInstanceServiceDeleteInstanceMutation,
  useInstanceServicePatchInstanceMutation,
  useInstanceServiceInvalidateInstanceMutation,
  useOperatingSystemServiceListOperatingSystems3Query,
  useOperatingSystemServiceCreateOperatingSystem3Mutation,
  useOperatingSystemServiceGetOperatingSystem3Query,
  useOperatingSystemServiceUpdateOperatingSystem3Mutation,
  useOperatingSystemServiceDeleteOperatingSystem3Mutation,
  useOperatingSystemServicePatchOperatingSystem3Mutation,
  useOperatingSystemServiceListOperatingSystemsQuery,
  useOperatingSystemServiceCreateOperatingSystemMutation,
  useOperatingSystemServiceGetOperatingSystemQuery,
  useOperatingSystemServiceUpdateOperatingSystemMutation,
  useOperatingSystemServiceDeleteOperatingSystemMutation,
  useOperatingSystemServicePatchOperatingSystemMutation,
  useScheduleServiceListSchedulesQuery,
  useScheduleServiceListRepeatedSchedules3Query,
  useScheduleServiceCreateRepeatedSchedule3Mutation,
  useScheduleServiceGetRepeatedSchedule3Query,
  useScheduleServiceUpdateRepeatedSchedule3Mutation,
  useScheduleServiceDeleteRepeatedSchedule3Mutation,
  useScheduleServicePatchRepeatedSchedule3Mutation,
  useScheduleServiceListSingleSchedules3Query,
  useScheduleServiceCreateSingleSchedule3Mutation,
  useScheduleServiceGetSingleSchedule3Query,
  useScheduleServiceUpdateSingleSchedule3Mutation,
  useScheduleServiceDeleteSingleSchedule3Mutation,
  useScheduleServicePatchSingleSchedule3Mutation,
  useWorkloadServiceListWorkloadsQuery,
  useWorkloadServiceCreateWorkloadMutation,
  useWorkloadServiceGetWorkloadQuery,
  useWorkloadServiceUpdateWorkloadMutation,
  useWorkloadServiceDeleteWorkloadMutation,
  useWorkloadServicePatchWorkloadMutation,
  useCustomConfigServiceListCustomConfigsQuery,
  useCustomConfigServiceCreateCustomConfigMutation,
  useCustomConfigServiceGetCustomConfigQuery,
  useCustomConfigServiceDeleteCustomConfigMutation,
  useLocalAccountServiceListLocalAccountsQuery,
  useLocalAccountServiceCreateLocalAccountMutation,
  useLocalAccountServiceGetLocalAccountQuery,
  useLocalAccountServiceDeleteLocalAccountMutation,
  useLocationServiceListLocationsQuery,
  useOsUpdatePolicyListOsUpdatePolicyQuery,
  useOsUpdatePolicyCreateOsUpdatePolicyMutation,
  useOsUpdatePolicyGetOsUpdatePolicyQuery,
  useOsUpdatePolicyDeleteOsUpdatePolicyMutation,
  useOsUpdateRunListOsUpdateRunQuery,
  useOsUpdateRunGetOsUpdateRunQuery,
  useOsUpdateRunDeleteOsUpdateRunMutation,
  useOsUpdatePolicyListOsUpdatePolicy3Query,
  useOsUpdatePolicyCreateOsUpdatePolicy3Mutation,
  useOsUpdatePolicyGetOsUpdatePolicy3Query,
  useOsUpdatePolicyDeleteOsUpdatePolicy3Mutation,
  useOsUpdateRunListOsUpdateRun3Query,
  useOsUpdateRunGetOsUpdateRun3Query,
  useOsUpdateRunDeleteOsUpdateRun3Mutation,
  useProviderServiceListProvidersQuery,
  useProviderServiceCreateProviderMutation,
  useProviderServiceGetProviderQuery,
  useProviderServiceDeleteProviderMutation,
  useRegionServiceListRegionsQuery,
  useRegionServiceCreateRegionMutation,
  useSiteServiceListSitesQuery,
  useSiteServiceCreateSiteMutation,
  useSiteServiceGetSiteQuery,
  useLazySiteServiceGetSiteQuery,
  useSiteServiceUpdateSiteMutation,
  useSiteServiceDeleteSiteMutation,
  useSiteServicePatchSiteMutation,
  useRegionServiceGetRegionQuery,
  useRegionServiceUpdateRegionMutation,
  useRegionServiceDeleteRegionMutation,
  useRegionServicePatchRegionMutation,
  useScheduleServiceListSchedules3Query,
  useScheduleServiceListRepeatedSchedulesQuery,
  useScheduleServiceCreateRepeatedScheduleMutation,
  useScheduleServiceGetRepeatedScheduleQuery,
  useScheduleServiceUpdateRepeatedScheduleMutation,
  useScheduleServiceDeleteRepeatedScheduleMutation,
  useScheduleServicePatchRepeatedScheduleMutation,
  useScheduleServiceListSingleSchedulesQuery,
  useScheduleServiceCreateSingleScheduleMutation,
  useScheduleServiceGetSingleScheduleQuery,
  useScheduleServiceUpdateSingleScheduleMutation,
  useScheduleServiceDeleteSingleScheduleMutation,
  useScheduleServicePatchSingleScheduleMutation,
  useSiteServiceListSites3Query,
  useSiteServiceCreateSite3Mutation,
  useSiteServiceGetSite3Query,
  useSiteServiceUpdateSite3Mutation,
  useSiteServiceDeleteSite3Mutation,
  useSiteServicePatchSite3Mutation,
  useTelemetryLogsGroupServiceListTelemetryLogsGroups3Query,
  useTelemetryLogsGroupServiceCreateTelemetryLogsGroup3Mutation,
  useTelemetryLogsGroupServiceGetTelemetryLogsGroup3Query,
  useTelemetryLogsGroupServiceDeleteTelemetryLogsGroup3Mutation,
  useTelemetryMetricsGroupServiceListTelemetryMetricsGroups3Query,
  useTelemetryMetricsGroupServiceCreateTelemetryMetricsGroup3Mutation,
  useTelemetryMetricsGroupServiceGetTelemetryMetricsGroup3Query,
  useTelemetryMetricsGroupServiceDeleteTelemetryMetricsGroup3Mutation,
  useTelemetryLogsGroupServiceListTelemetryLogsGroupsQuery,
  useTelemetryLogsGroupServiceCreateTelemetryLogsGroupMutation,
  useTelemetryLogsGroupServiceGetTelemetryLogsGroupQuery,
  useTelemetryLogsGroupServiceDeleteTelemetryLogsGroupMutation,
  useTelemetryMetricsGroupServiceListTelemetryMetricsGroupsQuery,
  useTelemetryMetricsGroupServiceCreateTelemetryMetricsGroupMutation,
  useTelemetryMetricsGroupServiceGetTelemetryMetricsGroupQuery,
  useTelemetryMetricsGroupServiceDeleteTelemetryMetricsGroupMutation,
  useTelemetryLogsProfileServiceListTelemetryLogsProfilesQuery,
  useTelemetryLogsProfileServiceCreateTelemetryLogsProfileMutation,
  useTelemetryLogsProfileServiceGetTelemetryLogsProfileQuery,
  useTelemetryLogsProfileServiceUpdateTelemetryLogsProfileMutation,
  useTelemetryLogsProfileServiceDeleteTelemetryLogsProfileMutation,
  useTelemetryLogsProfileServicePatchTelemetryLogsProfileMutation,
  useTelemetryMetricsProfileServiceListTelemetryMetricsProfilesQuery,
  useTelemetryMetricsProfileServiceCreateTelemetryMetricsProfileMutation,
  useTelemetryMetricsProfileServiceGetTelemetryMetricsProfileQuery,
  useTelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileMutation,
  useTelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileMutation,
  useTelemetryMetricsProfileServicePatchTelemetryMetricsProfileMutation,
  useWorkloadMemberServiceListWorkloadMembersQuery,
  useWorkloadMemberServiceCreateWorkloadMemberMutation,
  useWorkloadMemberServiceGetWorkloadMemberQuery,
  useWorkloadMemberServiceDeleteWorkloadMemberMutation,
  useWorkloadServiceListWorkloads3Query,
  useWorkloadServiceCreateWorkload3Mutation,
  useWorkloadServiceGetWorkload3Query,
  useWorkloadServiceUpdateWorkload3Mutation,
  useWorkloadServiceDeleteWorkload3Mutation,
  useWorkloadServicePatchWorkload3Mutation,
} = injectedRtkApi;
