/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import { GenericStatus } from "@orch-ui/components";
import { delay, http, HttpResponse } from "msw";
import { SharedStorage } from "../..";
import { osUbuntuId } from "./data";
import {
  HostMock,
  HostStore,
  InstanceStore,
  OsResourceStore,
  OsUpdatePolicyStore,
  OsUpdateRunStore,
  RegionStore,
  RepeatedScheduleStore,
  SingleSchedule2Store,
  SiteStore,
  TelemetryLogsGroupListStore,
  TelemetryLogsProfilesStore,
  TelemetryMetricsGroupListStore,
  TelemetryMetricsProfilesStore,
  VproDetailsStore,
  VproGeneralSettingsStore,
} from "./store";
import { WorkloadStore } from "./store/workload";

const baseURL = `/v1/projects/${SharedStorage.project?.name ?? ""}`;

const mockDelay = 1 * 1000;

export const regionStore = new RegionStore();
const siteStore = new SiteStore();
export const hostStore = new HostStore();
export const metricProfileStore = new TelemetryMetricsProfilesStore();
export const logProfileStore = new TelemetryLogsProfilesStore();
export const telemetryMetricsStore = new TelemetryMetricsGroupListStore();
export const telemetryLogsStore = new TelemetryLogsGroupListStore();
export const singleScheduleStore = new SingleSchedule2Store();
export const repeatedScheduleStore = new RepeatedScheduleStore();
export const telemetryMetricsProfilesStore =
  new TelemetryMetricsProfilesStore();
export const telemetrylogsProfilesStore = new TelemetryLogsProfilesStore();
export const osResourceStore = new OsResourceStore();
export const osUpdatePolicyStore = new OsUpdatePolicyStore();
export const osUpdateRunStore = new OsUpdateRunStore();
export const instanceStore = new InstanceStore();
export const workloadStore = new WorkloadStore();
export const vproDetailsStore = new VproDetailsStore();
export const vproGeneralSettingsStore = new VproGeneralSettingsStore();

// Mock: Dynamic Table Rendering (Ex: HeartBeat, Polling change)
const IS_MOCK_RANDOMIZE_ENABLED = true;

const hostStatuses: GenericStatus[] = [
  {
    indicator: "STATUS_INDICATION_IDLE",
    message: "Running",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_ERROR",
    message: "Error",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_IN_PROGRESS",
    message: "Currently in progress",
    timestamp: 1717761389,
  },
  {
    indicator: "STATUS_INDICATION_UNSPECIFIED",
    message: "Unknown",
    timestamp: 1717761389,
  },
];

const randomizeHostStatus = () => {
  return hostStatuses[Math.floor(Math.random() * hostStatuses.length)];
};

const randomizeHostList = (hosts: infra.HostResourceRead[]): HostMock[] => {
  if (IS_MOCK_RANDOMIZE_ENABLED) {
    const mockHosts: infra.HostResourceRead[] = hosts.map((host, i) => {
      if (i === 0) {
        return host;
      }
      const status = randomizeHostStatus();
      return {
        ...host,
        ...{
          hostStatus: status.message,
          hostStatusIndication: status.indicator,
          hostStatusTimestamp: status.timestamp,
        },
      };
    });
    return mockHosts as HostMock[];
  }
  return hosts as HostMock[];
};
const randomizeInstanceHostList = (
  instanceList: enhancedInfraSlice.InstanceReadModified[],
) => {
  if (IS_MOCK_RANDOMIZE_ENABLED) {
    return instanceList.map((instance, i) => {
      if (i == 0 && instance.host?.resourceId) {
        hostStore.get(instance.host.resourceId);
        const randomHostStatus = randomizeHostStatus();
        instance.host.hostStatus = randomHostStatus.message;
        instance.host.hostStatusIndicator = randomHostStatus.indicator;
        instance.host.hostStatusTimestamp = randomHostStatus.timestamp;
      }
      return instance;
    });
  }
  return instanceList;
};

export const handlers = [
  //locations
  http.get(`${baseURL}/locations-api`, async () => {
    return HttpResponse.json(
      {
        nodes: [
          { resourceId: "region-1", name: "root-region-1" },
          { resourceId: "region-2", name: "root-region-2" },
          { resourceId: "region-3", name: "root-region-3" },
          {
            resourceId: "region-11",
            name: "child-region-1",
            parentId: "region-1",
          },
          {
            resourceId: "region-21",
            name: "child-region-2",
            parentId: "region-2",
          },
          {
            resourceId: "region-31",
            name: "child-region-3",
            parentId: "region-3",
          },
          {
            resourceId: "region-312",
            name: "child-region-3.2",
            parentId: "region-3",
          },
          { resourceId: "site-1", name: "site-region-1", parentId: "region-1" },
          {
            resourceId: "site-21",
            name: "site-region-21",
            parentId: "region-21",
          },
          {
            resourceId: "site-31",
            name: "site-region-31",
            parentId: "region-31",
          },
          {
            resourceId: "site-312",
            name: "site-region-31.2",
            parentId: "region-31",
          },
        ],
        totalElements: 733,
      },
      { status: 200 },
    );
  }),
  http.get(
    `${baseURL}/locations?name=te&showRegions=true&showSites=true`,
    async () => {
      return HttpResponse.json(
        {
          nodes: [
            {
              name: "london",
              parentId: "region-21edbec1",
              resourceId: "site-9961663d",
              type: "RESOURCE_KIND_SITE",
            },
            {
              name: "new york",
              parentId: "region-bd98695b",
              resourceId: "site-0571b414",
              type: "RESOURCE_KIND_SITE",
            },
            {
              name: "subregion-one",
              parentId: "region-43779f56",
              resourceId: "region-21edbec1",
              type: "RESOURCE_KIND_REGION",
            },
            {
              name: "region-one",
              parentId: "",
              resourceId: "region-43779f56",
              type: "RESOURCE_KIND_REGION",
            },
            {
              name: "us-east",
              parentId: "",
              resourceId: "region-bd98695b",
              type: "RESOURCE_KIND_REGION",
            },
          ],
        },
        { status: 200 },
      );
    },
  ),
  // region
  http.get(`${baseURL}/regions`, async ({ request }) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");
    const isTotalSitesShown = url.searchParams.get("showTotalSites");
    let parent, regionId;
    if (filter) {
      if (filter.match(/NOT has\(parentRegion\)/)) {
        parent = "null";
      } else if (filter.match(/parentRegion\.resourceId=/)) {
        const matches = filter.match(/parentRegion\.resourceId="(.*)"/);
        if (matches && matches.length > 0) parent = matches[1];
      } else if (filter.match(/^resourceId=/)) {
        const matches = filter.match(/^resourceId="(.*)"/);
        if (matches && matches.length > 0) regionId = matches[1];
      }
    }

    let list: infra.RegionResourceRead[] = [];
    if (regionId) {
      const region = regionStore.get(regionId);
      if (region) list = [region];
    } else if (parent) {
      list = regionStore.list(parent);
    } else {
      list = regionStore.list();
    }

    if (isTotalSitesShown) {
      list = list.map((subregion) => ({
        ...subregion,
        totalSites: regionStore.getTotalSiteInRegion(subregion, siteStore),
      }));
    }

    return HttpResponse.json(
      {
        hasNext: false,
        regions: list,
        totalElements: list.length,
      },
      { status: 200 },
    );
  }),
  http.post(`${baseURL}/regions`, async ({ request }) => {
    const body = (await request.json()) as infra.RegionResourceWrite;

    if (body.parentId) {
      body.parentRegion = regionStore.get(body.parentId);
    }

    const r = regionStore.post(body);
    if (!r) return HttpResponse.json(null, { status: 500 });
    return HttpResponse.json(r, { status: 200 });
  }),
  http.get(`${baseURL}/regions/:resourceId`, async ({ params }) => {
    const { resourceId } = params as infra.RegionServiceGetRegionApiArg;
    const region = regionStore.get(resourceId);

    if (region) {
      return HttpResponse.json(region, { status: 200 });
    }
    return HttpResponse.json(
      {
        detail: "rpc error: code = NotFound desc = ent: region not found",
        status: 404,
      },
      { status: 404 },
    );
  }),

  http.delete(`${baseURL}/regions/:regionId`, async ({ params }) => {
    const { resourceId } = params as infra.RegionServiceDeleteRegionApiArg;

    const sites = siteStore.list({ regionId: resourceId });
    if (sites.length > 0) {
      return HttpResponse.json(
        {
          message: "the region has relations with site and cannot be deleted",
        },
        { status: 412 },
      );
    }

    const region = regionStore.get(resourceId);
    if (region?.parentRegion) {
      return HttpResponse.json(
        {
          message: "the region has relations with region and cannot be deleted",
        },
        { status: 412 },
      );
    }

    const deleteResult = regionStore.delete(resourceId);
    return HttpResponse.json(undefined, { status: deleteResult ? 200 : 404 });
  }),
  http.put(`${baseURL}/regions/:resourceId`, async ({ request, params }) => {
    const { resourceId } = params as infra.RegionServiceDeleteRegionApiArg;
    const body = (await request.json()) as infra.RegionResourceWrite;
    const r = regionStore.put(resourceId, body);
    if (!r) return HttpResponse.json(null, { status: 500 });
    return HttpResponse.json(r, { status: 200 });
  }),
  http.patch(`${baseURL}/regions/:regionId`, async () => {
    return HttpResponse.json(null, { status: 502 });
  }),

  // site
  http.get(`${baseURL}/regions/:resourceId/sites`, async ({ params }) => {
    const { resourceId } =
      params as unknown as infra.SiteServiceListSitesApiArg;

    if (resourceId) {
      const sites = siteStore.list({ regionId: resourceId });
      return HttpResponse.json(
        {
          hasNext: false,
          sites: sites,
          totalElements: Math.min(sites.length, 10),
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          detail: "rpc error: code = NotFound desc = ent: regionId not found",
          status: 404,
        },
        { status: 404 },
      );
    }
  }),
  http.get(`${baseURL}/regions/*/sites/:resourceId`, async ({ params }) => {
    const { resourceId } = params as unknown as infra.SiteServiceGetSiteApiArg;
    const notFoundResponse = {
      detail: "rpc error: code = NotFound desc = ent: resourceId not found",
      status: 404,
    };
    if (resourceId) {
      const site = siteStore.getSiteById({ resourceId });
      if (site) {
        return HttpResponse.json(site, { status: 200 });
      } else {
        return HttpResponse.json(notFoundResponse, { status: 404 });
      }
    } else {
      return HttpResponse.json(notFoundResponse, { status: 404 });
    }
  }),
  http.post(`${baseURL}/sites`, async ({ request }) => {
    const body = (await request.json()) as infra.SiteResourceWrite;
    if (body.regionId) {
      body.region = regionStore.get(body.regionId);
    }
    const r = siteStore.post(body);
    if (!r) return HttpResponse.json(null, { status: 500 });
    return HttpResponse.json(r, { status: 200 });
  }),
  http.get(`${baseURL}/sites/:siteId`, async ({ params }) => {
    const { resourceId } = params as infra.SiteServiceGetSiteApiArg;
    const site = siteStore.get(resourceId);
    if (site) {
      return HttpResponse.json(site, { status: 200 });
    }
    return HttpResponse.json(
      {
        detail: "rpc error: code = NotFound desc = ent: site not found",
        status: 404,
      },
      { status: 404 },
    );
  }),
  http.put(`${baseURL}/sites/:resourceId`, async ({ request, params }) => {
    const { resourceId } =
      params as unknown as infra.SiteServiceUpdateSiteApiArg;
    const body = (await request.json()) as infra.SiteResourceWrite;
    const s = siteStore.put(resourceId, body);
    if (!s) return HttpResponse.json(null, { status: 500 });
    return HttpResponse.json(s, { status: 200 });
  }),
  http.delete(`${baseURL}/sites/:resourceId`, async ({ params }) => {
    const { resourceId } = params as infra.SiteServiceDeleteSiteApiArg;
    const deleteResult = siteStore.delete(resourceId);
    return HttpResponse.json(undefined, { status: deleteResult ? 200 : 404 });
  }),

  // host
  http.get(`${baseURL}/compute/hosts/summary`, async ({ request }) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");

    return HttpResponse.json(hostStore.getSummary(filter), { status: 200 });
  }),

  http.get(`${baseURL}/localAccounts`, async () => {
    const localAccounts = instanceStore.getLocalAccounts();
    await delay(mockDelay);
    return HttpResponse.json(
      {
        hasNext: false,
        localAccounts,
        totalElements: localAccounts.length,
      },
      { status: 200 },
    );
  }),

  http.get(`${baseURL}/compute/hosts`, async ({ request }) => {
    const url = new URL(request.url);
    const siteID = url.searchParams.get("siteID");
    const deviceUuid = url.searchParams.get("uuid");
    const metadataString = url.searchParams.get("metadata");
    const filter = url.searchParams.get("filter");
    let hosts = hostStore.list({
      siteID,
      deviceUuid,
      ...(filter ? { filter } : {}),
    });

    if (
      deviceUuid &&
      !deviceUuid.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
      )
    ) {
      return HttpResponse.json(
        { message: "parameter UUID has wrong format" },
        { status: 400 },
      );
    }

    if (metadataString) {
      hosts = hosts.filter((host) => {
        let matchSimilarity = 0;
        const metadataParam = metadataString.split(",");
        // For each metadata
        metadataParam.forEach((keyValuePairs) => {
          // End if atleast one metadata matched from the ous
          const [key, value] = keyValuePairs.split("=");
          const metadataSet = host.inheritedMetadata?.concat(
            host.metadata ?? [],
          );
          if (metadataSet) {
            for (let i = 0; i < metadataSet.length; i++) {
              if (
                metadataSet[i].key === key &&
                metadataSet[i].value === value
              ) {
                matchSimilarity++;
                break;
              }
            }
          }
        });

        // If the all metadata within `ous` matches
        return matchSimilarity === metadataParam.length;
      });
    }

    if (hosts.length > 0) {
      hosts = randomizeHostList(hosts);
    }
    await delay(mockDelay);
    return HttpResponse.json(
      {
        hasNext: false,
        hosts,
        totalElements: hosts.length,
      },
      { status: 200 },
    );
  }),
  http.put(
    `${baseURL}/compute/hosts/:resourceId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as unknown as infra.HostServiceUpdateHostApiArg;
      const body = (await request.json()) as infra.HostResourceWrite;
      if (!resourceId || !body) {
        return HttpResponse.json(
          {
            detail:
              "rpc error: code = badRequest desc = ent: hostId or hostRequest not supplied",
            status: 400,
          },
          { status: 400 },
        );
      }

      const processError = async () => {
        return HttpResponse.json(
          {
            detail:
              "rpc error: code = ProcessErr desc = ent: host not found or updated",
            status: 500,
          },
          { status: 500 },
        );
      };

      let host: infra.HostResourceRead | void = hostStore.get(resourceId);
      if (host) {
        try {
          host = hostStore.put(resourceId, { ...host, ...body } as HostMock);
          const instanceMatchList = instanceStore.list({ hostId: resourceId });
          const instance =
            instanceMatchList.length > 0 ? instanceMatchList[0] : undefined;
          if (instance && host) {
            instanceStore.put(instance.instanceID!, {
              ...instance,
              host: host as infra.HostResourceRead,
            });
          }
        } catch {
          return await processError();
        }
      }

      if (!host) {
        return await processError();
      }

      return HttpResponse.json(host, { status: 200 });
    },
  ),
  http.post(`${baseURL}/compute/hosts`, async ({ request }) => {
    const { hostResource } =
      (await request.json()) as infra.HostServiceCreateHostApiArg;
    const host = hostStore.post(hostResource as HostMock);
    if (!host) throw new Error("infra.Host POST was unsuccessful");
    return HttpResponse.json(host, { status: 200 });
  }),
  http.patch(
    `${baseURL}/compute/hosts/:resourceId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as unknown as infra.HostServiceUpdateHostApiArg;
      const hostPatchUpdate = (await request.json()) as infra.HostResourceWrite;

      const host = hostStore.get(resourceId);
      if (host) {
        const patchedHost = { ...host, ...hostPatchUpdate } as HostMock;
        hostStore.put(resourceId, patchedHost);
        if (host.instance?.instanceID) {
          const instance = instanceStore.get(host.instance.instanceID);

          if (instance && instance.instanceID) {
            instanceStore.put(instance.instanceID, {
              ...instance,
              // instance is only defined up to first-level
              host: {
                ...host,
                site: hostPatchUpdate.site,
                instance: undefined,
              },
            });
          }
        }

        return HttpResponse.json(host, { status: 200 });
      }

      return HttpResponse.json(
        {
          detail: `response has an error: cannot update host to ${resourceId}`,
          status: 500,
        },
        { status: 500 },
      );
    },
  ),
  http.get(`${baseURL}/compute/hosts/:resourceId`, async ({ params }) => {
    const { resourceId } = params as infra.HostServiceGetHostApiArg;
    const host = hostStore.get(resourceId);
    if (host) {
      return HttpResponse.json(host, { status: 200 });
    }

    return HttpResponse.json(
      {
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      },
      { status: 404 },
    );
  }),
  http.put(
    `${baseURL}/compute/hosts/:hostId/invalidate`,
    async ({ request, params }) => {
      const { hostId } = params as { hostId: string };
      const body = (await request.json()) as { note?: string };
      const note = body?.note;
      const deauthResult = hostStore.deauthorizeHost(hostId, true, note || "");

      if (!deauthResult) {
        return HttpResponse.json(null, { status: 404 });
      }

      const instances = instanceStore.list({ hostId });
      const host = hostStore.get(hostId);
      if (instances && instances.length > 0 && host) {
        instanceStore.put(instances[0].instanceID!, {
          ...instances[0],
          host,
        });
      }

      return HttpResponse.json(null, { status: 200 });
    },
  ),
  http.delete(`${baseURL}/compute/hosts/:hostId`, async ({ params }) => {
    const { resourceId } =
      params as unknown as infra.HostServiceDeleteHostApiArg;
    const host = hostStore.delete(resourceId);
    if (host) {
      return HttpResponse.json(null, { status: 200 });
    }

    return HttpResponse.json(
      {
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      },
      { status: 404 },
    );
  }),

  //Register related
  http.post(`${baseURL}/compute/hosts/register`, async ({ request }) => {
    const hostRegisterInfo = (await request.json()) as infra.HostRegister;
    hostStore.registerHost({
      ...hostRegisterInfo,
      name: hostRegisterInfo.name ?? "default",
      timestamps: { createdAt: new Date().toISOString() },
    });

    return HttpResponse.json(
      {
        name: hostRegisterInfo.name ?? "default",
        resourceId: hostRegisterInfo.name ?? "default",
        message: hostRegisterInfo.name === "fail" ? "failed" : undefined,
      },
      { status: hostRegisterInfo.name === "fail" ? 500 : 200 },
    );
  }),

  http.patch(
    `${baseURL}/compute/hosts/:hostId/register`,
    async ({ params }) => {
      const { resourceId } =
        params as unknown as infra.HostServicePatchRegisterHostApiArg;

      const result = hostStore.get(resourceId);
      const updatedResult: HostMock = {
        ...result,
        name: result?.name ?? "default",
        instance: {
          ...(result?.instance ?? {}),
          desiredState: "INSTANCE_STATE_RUNNING",
        },
      };

      hostStore.put(resourceId, updatedResult);

      return HttpResponse.json(null, { status: 200 });
    },
  ),

  // instance
  http.get(`${baseURL}/compute/instances`, async ({ request }) => {
    const url = new URL(request.url);
    const hostId = url.searchParams.get("hostID");
    const filter = url.searchParams.get("filter");

    let instances = instanceStore.list({
      hostId,
      ...(filter ? { filter } : {}),
    });

    // Mock: Dynamic Table Rendering (Ex: HeartBeat, Polling change)
    if (instances && instances.length > 0) {
      instances = randomizeInstanceHostList(
        instances,
      ) as enhancedInfraSlice.InstanceReadModified[];
    }

    await delay(mockDelay);
    return HttpResponse.json(
      {
        hasNext: false,
        instances,
        totalElements: instances.length,
      },
      { status: 200 },
    );
  }),
  http.post(`${baseURL}/compute/instances`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      kind: string;
      hostID: string;
      osID: string;
      securityFeature?: string;
    };

    const { name, kind, hostID, osID, securityFeature } = body;

    if (hostID && osID) {
      const host = hostStore.get(hostID);
      const os = osResourceStore.get(osID);

      if (host && os) {
        const newInstance: infra.InstanceResourceRead = {
          instanceID: (Math.random() + 1).toString(36).substring(7),
          kind: kind as any,
          name,
          securityFeature: securityFeature as any,
          instanceStatusIndicator: "STATUS_INDICATION_IDLE",
          instanceStatus: "Running",
          instanceStatusTimestamp: 1717761389,
          currentState: "INSTANCE_STATE_RUNNING",
          host,
        };

        instanceStore.post(newInstance);

        return HttpResponse.json(newInstance, { status: 200 });
      }
    }

    return HttpResponse.json(
      { data: "infra.Host/OS not found!", status: "404" },
      { status: 404 },
    );
  }),
  http.delete(
    `${baseURL}/compute/instances/:instanceId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.InstanceServiceDeleteInstanceApiArg;
      const deleteResult = instanceStore.delete(resourceId);

      return HttpResponse.json(undefined, { status: deleteResult ? 200 : 404 });
    },
  ),

  // workload
  http.get(`${baseURL}/workloads/:workloadId`, async ({ params }) => {
    const { resourceId } = params as infra.WorkloadServiceGetWorkloadApiArg;
    const workload = workloadStore.get(resourceId);

    if (!workload) {
      return HttpResponse.json(
        {
          detail:
            "rpc error: code = badRequest desc = ent: workloadId not supplied",
          status: 400,
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(workload, { status: 200 });
  }),

  // schedules
  http.get(`${baseURL}/schedules`, async ({ request }) => {
    const url = new URL(request.url);
    const hostId = url.searchParams.get("hostID");
    const siteId = url.searchParams.get("siteID");
    const regionId = url.searchParams.get("regionID");
    const unixEpoch = url.searchParams.get("unix_epoch"); // current time
    let schedulesList = singleScheduleStore.list();
    let repeatedScheduleList = repeatedScheduleStore.list();

    // Short list with hostId
    schedulesList = (schedulesList ?? []).filter(
      (schedule) =>
        (hostId && schedule.targetHost?.resourceId === hostId) ||
        (siteId && schedule.targetSite?.siteID === siteId) ||
        (regionId && schedule.targetRegion?.regionID === regionId),
    );
    repeatedScheduleList = (repeatedScheduleList ?? []).filter(
      (schedule) =>
        (hostId && schedule.targetHost?.resourceId === hostId) ||
        (siteId && schedule.targetSite?.siteID === siteId) ||
        (regionId && schedule.targetRegion?.regionID === regionId),
    );

    if (unixEpoch) {
      // Short list `unixEpoch` hosts (if end_time is presents)
      schedulesList = (schedulesList ?? []).filter(
        (schedule) =>
          schedule.startSeconds < parseInt(unixEpoch) &&
          // If end seconds is not mentioned
          (schedule.endSeconds === 0 ||
            // Or If end seconds if present
            // then check shortlist schedule that are not expired from unixEpoch (unix_time in seconds)
            (schedule.endSeconds &&
              schedule.endSeconds !== 0 &&
              parseInt(unixEpoch) < schedule.endSeconds)),
      );
    }

    return HttpResponse.json(
      {
        hasNext: false,
        singleSchedules: schedulesList,
        repeatedSchedules: repeatedScheduleList,
        totalElements: schedulesList.length + repeatedScheduleList.length,
      },
      { status: 200 },
    );
  }),
  http.post(`${baseURL}/schedules/single`, async ({ request }) => {
    const singleSchedule = (await request.json()) as any;
    const result = singleScheduleStore.post({
      ...singleSchedule,
      targetHost: singleSchedule.targetHostId
        ? hostStore.get(singleSchedule.targetHostId)
        : undefined,
      targetSite: singleSchedule.targetSiteId
        ? siteStore.get(singleSchedule.targetSiteId)
        : undefined,
      targetRegion: singleSchedule.targetRegionId
        ? regionStore.get(singleSchedule.targetRegionId)
        : undefined,
    });
    if (result) {
      return HttpResponse.json(result, { status: 200 });
    }
    return HttpResponse.json(null, { status: 404 });
  }),

  http.post(`${baseURL}/schedules/repeated`, async ({ request }) => {
    const repeatedSchedule = (await request.json()) as any;
    const result = repeatedScheduleStore.post({
      ...repeatedSchedule,
      targetHost: repeatedSchedule.targetHostId
        ? hostStore.get(repeatedSchedule.targetHostId)
        : undefined,
      targetSite: repeatedSchedule.targetSiteId
        ? siteStore.get(repeatedSchedule.targetSiteId)
        : undefined,
      targetRegion: repeatedSchedule.targetRegionId
        ? regionStore.get(repeatedSchedule.targetRegionId)
        : undefined,
    });
    if (result) {
      return HttpResponse.json(result, { status: 200 });
    }
    return HttpResponse.json(null, { status: 404 });
  }),

  http.put(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as unknown as infra.ScheduleServicePatchSingleScheduleApiArg;
      const singleSchedule = (await request.json()) as any;
      const result = singleScheduleStore.put(resourceId, {
        ...singleSchedule,
        targetHost: singleSchedule.targetHostId
          ? hostStore.get(singleSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return HttpResponse.json(result, { status: 200 });
      }
      return HttpResponse.json(null, { status: 404 });
    },
  ),
  http.put(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as unknown as infra.ScheduleServiceDeleteRepeatedScheduleApiArg;
      const repeatedSchedule = (await request.json()) as any;
      const result = repeatedScheduleStore.put(resourceId, {
        ...repeatedSchedule,
        targetHost: repeatedSchedule.targetHostId
          ? hostStore.get(repeatedSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return HttpResponse.json(result, { status: 200 });
      }
      return HttpResponse.json(null, { status: 404 });
    },
  ),

  http.delete(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.ScheduleServiceDeleteSingleScheduleApiArg;
      const result = singleScheduleStore.delete(resourceId);
      return HttpResponse.json(null, { status: result ? 200 : 404 });
    },
  ),
  http.delete(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.ScheduleServiceDeleteRepeatedScheduleApiArg;
      const result = repeatedScheduleStore.delete(resourceId);
      return HttpResponse.json(null, { status: result ? 200 : 404 });
    },
  ),

  // os resource
  http.get(`${baseURL}/compute/os`, async () => {
    const list = osResourceStore.list();
    return HttpResponse.json(
      {
        hasNext: false,
        OperatingSystemResources: list,
        totalElements: list.length,
      },
      { status: 200 },
    );
  }),

  http.get(`${baseURL}/os-update-policies`, async () => {
    const list = osUpdatePolicyStore.list();
    return HttpResponse.json(
      {
        hasNext: false,
        osUpdatePolicies: list,
        totalElements: list.length,
      },
      { status: 200 },
    );
  }),

  // os update runs
  http.get(`${baseURL}/os-update-runs`, async ({ request }) => {
    const url = new URL(request.url);
    const filter = url.searchParams.get("filter");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    let runs = osUpdateRunStore.list();
    // Apply filter if provided
    if (filter) {
      // Parse filter for hostId
      const hostIdMatch = filter.match(/hostId="([^"]+)"/);
      if (hostIdMatch) {
        const hostId = hostIdMatch[1];
        runs = osUpdateRunStore.listByInstanceId(hostId);
      }
      // Parse filter for instance.resourceId (AIP-160 compliant)
      const instanceResourceIdMatch = filter.match(
        /instance\.resourceId="([^"]+)"/,
      );
      if (instanceResourceIdMatch) {
        const instanceResourceId = instanceResourceIdMatch[1];
        runs = runs.filter(
          (run) => run.instance?.resourceId === instanceResourceId,
        );
      }
      // Parse filter for resourceId
      const resourceIdMatch = filter.match(/resourceId="([^"]+)"/);
      if (resourceIdMatch) {
        const resourceId = resourceIdMatch[1];
        runs = runs.filter((run) => run.instance?.resourceId === resourceId);
      }
    }

    // Apply pagination
    const paginatedRuns = runs.slice(offset, offset + pageSize);
    const hasNext = offset + pageSize < runs.length;
    await delay(mockDelay);
    return HttpResponse.json(
      {
        hasNext,
        osUpdateRuns: paginatedRuns,
        totalElements: runs.length,
      } as infra.OsUpdateRunListOsUpdateRunApiResponse,
      { status: 200 },
    );
  }),

  http.get(`${baseURL}/os-update-runs/:resourceId`, async ({ params }) => {
    const { resourceId } = params as infra.OsUpdateRunGetOsUpdateRunApiArg;
    const run = osUpdateRunStore.get(resourceId);

    if (run) {
      await delay(mockDelay);
      return HttpResponse.json(run, { status: 200 });
    }

    return HttpResponse.json(
      {
        detail:
          "rpc error: code = NotFound desc = ent: OS update run not found",
        status: 404,
      },
      { status: 404 },
    );
  }),

  http.delete(`${baseURL}/os-update-runs/:resourceId`, async ({ params }) => {
    const { resourceId } = params as infra.OsUpdateRunDeleteOsUpdateRunApiArg;
    const deleteResult = osUpdateRunStore.delete(resourceId);

    return HttpResponse.json(undefined, { status: deleteResult ? 200 : 404 });
  }),

  // telemetry
  http.get(`${baseURL}/telemetry/groups/metrics`, async () => {
    const metricsgroups = telemetryMetricsStore.list();
    return HttpResponse.json(
      {
        telemetryMetricsGroups: metricsgroups,
        hasNext: false,
        totalElements: metricsgroups.length,
      },
      { status: 200 },
    );
  }),
  http.get(`${baseURL}/telemetry/groups/logs`, async () => {
    const loggroups = telemetryLogsStore.list();
    return HttpResponse.json(
      {
        telemetryLogsGroups: loggroups,
        hasNext: false,
        totalElements: loggroups.length,
      },
      { status: 200 },
    );
  }),

  http.get(
    `${baseURL}/telemetry/groups/logs/:telemetryLogsGroupId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg;
      const loggroups = telemetryLogsStore.get(resourceId);
      if (loggroups) {
        return HttpResponse.json(
          loggroups as infra.TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse,
          { status: 200 },
        );
      }
      return HttpResponse.json({}, { status: 404 });
    },
  ),
  http.get(`${baseURL}/telemetry/profiles/metrics`, async ({ request }) => {
    const url = new URL(request.url);
    let metricProfiles: infra.TelemetryMetricsProfileResourceRead[] = [];

    if (url.searchParams.has("regionId")) {
      const regionId = url.searchParams.get("regionId");
      metricProfiles = telemetryMetricsProfilesStore
        .list()
        .filter((profiles) => profiles.targetRegion === regionId);
    } else if (url.searchParams.has("siteId")) {
      const siteId = url.searchParams.get("siteId");
      metricProfiles = telemetryMetricsProfilesStore
        .list()
        .filter((profiles) => profiles.targetSite === siteId);
    }

    return HttpResponse.json(
      {
        telemetryMetricsProfiles: metricProfiles,
        hasNext: false,
        totalElements: metricProfiles.length,
      },
      { status: 200 },
    );
  }),

  http.get(`${baseURL}/telemetry/profiles/logs`, async ({ request }) => {
    const url = new URL(request.url);
    let logProfiles: infra.TelemetryLogsProfileResourceRead[] = [];

    if (url.searchParams.has("regionId")) {
      const regionId = url.searchParams.get("regionId");
      logProfiles = telemetrylogsProfilesStore
        .list()
        .filter((profiles) => profiles.targetRegion === regionId);
    } else if (url.searchParams.has("siteId")) {
      const siteId = url.searchParams.get("siteId");
      logProfiles = telemetrylogsProfilesStore
        .list()
        .filter((profiles) => profiles.targetSite === siteId);
    }
    return HttpResponse.json(
      {
        telemetryLogsProfiles: logProfiles,
        hasNext: false,
        totalElements: logProfiles.length,
      } as infra.TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse,
      { status: 200 },
    );
  }),

  http.post(`${baseURL}/telemetry/profiles/metrics`, async ({ request }) => {
    const body =
      (await request.json()) as infra.TelemetryMetricsProfileResource;
    const profileRead = telemetryMetricsProfilesStore.create(body);
    if (!profileRead) return HttpResponse.json({}, { status: 500 });
    return HttpResponse.json(
      profileRead as infra.TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiResponse,
      { status: 200 },
    );
  }),
  http.post(`${baseURL}/telemetry/profiles/logs`, async ({ request }) => {
    const body = (await request.json()) as infra.TelemetryLogsProfileResource;
    //const p = telemetrylogsProfilesStore.post(body);
    const profileRead = telemetrylogsProfilesStore.create(body);
    if (!profileRead) return HttpResponse.json({}, { status: 500 });
    return HttpResponse.json(
      profileRead as infra.TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiResponse,
      { status: 201 },
    );
  }),

  http.put(
    `${baseURL}/telemetry/profiles/metrics/:telemetryMetricsProfileId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as infra.TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg;
      const body =
        (await request.json()) as infra.TelemetryMetricsProfileResource;
      const p = telemetryMetricsProfilesStore.put(resourceId, body);
      if (!p) return HttpResponse.json({}, { status: 500 });
      return HttpResponse.json(
        p as infra.TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse,
        { status: 200 },
      );
    },
  ),

  http.put(
    `${baseURL}/telemetry/profiles/logs/:resourceId`,
    async ({ request, params }) => {
      const { resourceId } =
        params as infra.TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg;
      const body = (await request.json()) as infra.TelemetryLogsProfileResource;
      const p = telemetrylogsProfilesStore.put(resourceId, body);
      if (!p) return HttpResponse.json({}, { status: 500 });
      return HttpResponse.json(
        p as infra.TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse,
        { status: 200 },
      );
    },
  ),

  http.delete(
    `${baseURL}/telemetry/profiles/metrics/:resourceId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg;
      const deleteResult = telemetryMetricsProfilesStore.delete(resourceId);
      return HttpResponse.json(undefined as any, {
        status: deleteResult ? 200 : 404,
      });
    },
  ),

  http.delete(
    `${baseURL}/telemetry/profiles/logs/:resourceId`,
    async ({ params }) => {
      const { resourceId } =
        params as infra.TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg;
      const deleteResult = telemetrylogsProfilesStore.delete(resourceId);
      return HttpResponse.json(undefined as any, {
        status: deleteResult ? 200 : 404,
      });
    },
  ),

  http.get(`${baseURL}/providers`, async ({ request }) => {
    const filter = new URL(request.url).searchParams.get("filter");

    if (filter?.match(/name="infra_onboarding"/)) {
      return HttpResponse.json(
        {
          hasNext: false,
          providers: [
            {
              apiCredentials: [
                ".qtBRC2kpHr?(BYYah -uw/B)eKc<8**os1*b8h@/MeO00EY.*",
              ],
              apiEndpoint: "H?xXQ.adSCiF@b:sdJ*<ZABsWOUhOSKwOf;)HAFEbL)GrtVnO#",
              name: "infra_onboarding",
              providerID: "provider-3148c6c1",
              providerKind: "PROVIDER_KIND_BAREMETAL",
              providerVendor: "PROVIDER_VENDOR_LENOVO_LOCA",
              config: `{"defaultOs":"${osUbuntuId}"}`,
            },
          ],
          totalElements: 0,
        } as infra.ProviderServiceListProvidersApiResponse,
        { status: 200 },
      );
    }

    return HttpResponse.json({}, { status: 502 });
  }),
];
