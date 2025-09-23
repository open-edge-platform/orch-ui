/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import { GenericStatus } from "@orch-ui/components";
import { http , HttpResponse} from "msw"
import { SharedStorage } from "../..";
import { SearchResult } from "../../../../apps/infra/src/store/locations";
import { osUbuntuId } from "./data";
import {
  HostMock,
  HostStore,
  InstanceStore,
  OsResourceStore,
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

const delay = 1 * 1000;

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
  http.get(`${baseURL}/locations-api`, async async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<any, { nodes: SearchResult[]; totalElements: number }>({
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
      }),
    );
  }),
  http.get(
    `${baseURL}/locations?name=te&showRegions=true&showSites=true`,
    async async (req, res, ctx) => {
      return res(
        ctx.status(200),
        // this needs to be generated based on existing regions and sites
        ctx.json({
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
        }),
      );
    },
  ),
  // region
  http.get(`${baseURL}/regions`, async async (req, res, ctx) => {
    const filter = new URL(req.url).searchParams.get("filter");
    const isTotalSitesShown = new URL(req.url).searchParams.get("showTotalSites");
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

    return res(
      ctx.status(200),
      ctx.json<any, infra.RegionServiceListRegionsApiResponse>({
        hasNext: false,
        regions: list,
        totalElements: list.length,
      }),
    );
  }),
  http.post(`${baseURL}/regions`, async async (req, res, ctx) => {
    const body = await req.json<any, infra.RegionResourceWrite>();

    if (body.parentId) {
      body.parentRegion = regionStore.get(body.parentId);
    }

    const r = regionStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<infra.RegionServiceUpdateRegionApiResponse>(r),
    );
  }),
  http.get(`${baseURL}/regions/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.RegionServiceGetRegionApiArg;
    const region = regionStore.get(resourceId);

    if (region) {
      return res(
        ctx.status(200),
        ctx.json<any, infra.RegionServiceGetRegionApiResponse>(region),
      );
    }
    return res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: region not found",
        status: 404,
      }),
    );
  }),

  http.delete(`${baseURL}/regions/:regionId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.RegionServiceDeleteRegionApiArg;

    const sites = siteStore.list({ regionId: resourceId });
    if (sites.length > 0) {
      return res(
        ctx.status(412),
        ctx.json({
          message: "the region has relations with site and cannot be deleted",
        }),
      );
    }

    const region = regionStore.get(resourceId);
    if (region?.parentRegion) {
      return res(
        ctx.status(412),
        ctx.json({
          message: "the region has relations with region and cannot be deleted",
        }),
      );
    }

    const deleteResult = regionStore.delete(resourceId);
    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),
  http.put(`${baseURL}/regions/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.RegionServiceDeleteRegionApiArg;
    const body = await req.json<any, infra.RegionResourceWrite>();
    const r = regionStore.put(resourceId, body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<infra.RegionServiceUpdateRegionApiResponse>(r),
    );
  }),
  http.patch(`${baseURL}/regions/:regionId`, async () => {
    return HttpResponse.text(
{status: 502,
});
  }),

  // site
  http.get(`${baseURL}/regions/:resourceId/sites`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.SiteServiceListSitesApiArg;

    if (resourceId) {
      const sites = siteStore.list({ regionId: resourceId });
      return res(
        ctx.status(200),
        ctx.json<any, infra.SiteServiceListSitesApiResponse>({
          hasNext: false,
          sites: sites,
          totalElements: Math.min(sites.length, 10),
        }),
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          detail: "rpc error: code = NotFound desc = ent: regionId not found",
          status: 404,
        }),
      );
    }
  }),
  http.get(`${baseURL}/regions/*/sites/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.SiteServiceGetSiteApiArg;
    const notFoundResponse = {
      detail: "rpc error: code = NotFound desc = ent: resourceId not found",
      status: 404,
    };
    if (resourceId) {
      const site = siteStore.getSiteById({ resourceId });
      if (site) {
        return res(
          ctx.status(200),
          ctx.json<any, infra.SiteServiceGetSiteApiResponse>(site),
        );
      } else {
        return res(ctx.status(404), ctx.json(notFoundResponse));
      }
    } else {
      return res(ctx.status(404), ctx.json(notFoundResponse));
    }
  }),
  http.post(`${baseURL}/sites`, async async (req, res, ctx) => {
    const body = await req.json<any, infra.SiteResourceWrite>();
    if (body.regionId) {
      body.region = regionStore.get(body.regionId);
    }
    const r = siteStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<infra.SiteServiceUpdateSiteApiResponse>(r),
    );
  }),
  http.get(`${baseURL}/sites/:siteId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.SiteServiceGetSiteApiArg;
    const site = siteStore.get(resourceId);
    if (site) {
      return res(
        ctx.status(200),
        ctx.json<any, infra.SiteServiceGetSiteApiResponse>(site),
      );
    }
    return res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: site not found",
        status: 404,
      }),
    );
  }),
  http.put(`${baseURL}/sites/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.SiteServiceUpdateSiteApiArg;
    const body = await req.json<any, infra.SiteResourceWrite>();
    const s = siteStore.put(resourceId, body);
    if (!s) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<infra.SiteServiceUpdateSiteApiResponse>(s),
    );
  }),
  http.delete(`${baseURL}/sites/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.SiteServiceDeleteSiteApiArg;
    const deleteResult = siteStore.delete(resourceId);
    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),

  // host
  http.get(`${baseURL}/compute/hosts/summary`, async async (req, res, ctx) => {
    const filter = new URL(req.url).searchParams.get("filter");

    return res(
      ctx.status(200),
      ctx.json<any, infra.HostServiceGetHostsSummaryApiResponse>(
        hostStore.getSummary(filter),
      ),
    );
  }),

  http.get(`${baseURL}/localAccounts`, async async (req, res, ctx) => {
    const localAccounts = instanceStore.getLocalAccounts();
    return res(
      ctx.status(200),
      ctx.json<any, infra.LocalAccountServiceListLocalAccountsApiResponse>({
        hasNext: false,
        localAccounts,
        totalElements: localAccounts.length,
      }),
      ctx.delay(delay),
    );
  }),

  http.get(`${baseURL}/compute/hosts`, async async (req, res, ctx) => {
    const siteID = new URL(req.url).searchParams.get("siteID");
    const deviceUuid = new URL(req.url).searchParams.get("uuid");
    const metadataString = new URL(req.url).searchParams.get("metadata");
    const filter = new URL(req.url).searchParams.get("filter");
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
      return res(
        ctx.status(400),
        ctx.json({ message: "parameter UUID has wrong format" }),
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
    return res(
      ctx.status(200),
      ctx.json<any, infra.HostServiceListHostsApiResponse>({
        hasNext: false,
        hosts,
        totalElements: hosts.length,
      }),
      ctx.delay(delay),
    );
  }),
  http.put(`${baseURL}/compute/hosts/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.HostServiceUpdateHostApiArg;
    const body = await req.json<any, infra.HostResourceWrite>();
    if (!resourceId || !body) {
      return res(
        ctx.status(400),
        ctx.json({
          detail:
            "rpc error: code = badRequest desc = ent: hostId or hostRequest not supplied",
          status: 400,
        }),
      );
    }

    const processError = async () => {
      return res(
        ctx.status(500),
        ctx.json({
          detail:
            "rpc error: code = ProcessErr desc = ent: host not found or updated",
          status: 500,
        }),
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

    return res(
      ctx.status(200),
      ctx.json<infra.HostServiceUpdateHostApiResponse>(host),
    );
  }),
  http.post(`${baseURL}/compute/hosts`, async async (req, res, ctx) => {
    const { hostResource } =
      await req.json<any, infra.HostServiceCreateHostApiArg>();
    const host = hostStore.post(hostResource as HostMock);
    if (!host) throw new Error("infra.Host POST was unsuccessful");
    return res(
      ctx.status(200),
      ctx.json<infra.HostServiceCreateHostApiResponse>(host),
    );
  }),
  http.patch(`${baseURL}/compute/hosts/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.HostServiceUpdateHostApiArg;
    const hostPatchUpdate = await req.json<any, infra.HostResourceWrite>();

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
            host: { ...host, site: hostPatchUpdate.site, instance: undefined },
          });
        }
      }

      return res(
        ctx.status(200),
        ctx.json<infra.HostServiceUpdateHostApiResponse>(host),
      );
    }

    return res(
      ctx.status(500),
      ctx.json({
        detail: `response has an error: cannot update host to ${resourceId}`,
        status: 500,
      }),
    );
  }),
  http.get(`${baseURL}/compute/hosts/:resourceId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.HostServiceGetHostApiArg;
    const host = hostStore.get(resourceId);
    if (host) {
      return res(
        ctx.status(200),
        ctx.json<any, infra.HostServiceGetHostApiResponse>(host),
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      }),
    );
  }),
  http.put(
    `${baseURL}/compute/hosts/:hostId/invalidate`,
    async async (req, res, ctx) => {
      const { hostId } = params as { hostId: string };
      const body = await req.json();
      const note = body.note;
      const deauthResult = hostStore.deauthorizeHost(hostId, true, note);

      if (!deauthResult) {
        return res(ctx.status(404));
      }

      const instances = instanceStore.list({ hostId });
      const host = hostStore.get(hostId);
      if (instances && instances.length > 0 && host) {
        instanceStore.put(instances[0].instanceID!, {
          ...instances[0],
          host: { ...host },
        });
      }

      return res(ctx.status(200), ctx.json(undefined));
    },
  ),
  http.delete(`${baseURL}/compute/hosts/:hostId`, async async (req, res, ctx) => {
    const { resourceId } =
      params as unknown as infra.HostServiceDeleteHostApiArg;
    const host = hostStore.delete(resourceId);
    if (host) {
      return res(ctx.status(200));
    }

    return res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      }),
    );
  }),

  //Register related
  http.post(`${baseURL}/compute/hosts/register`, async async (req, res, ctx) => {
    const hostRegisterInfo =
      (await req.json<any, infra.HostServiceRegisterHostApiArg>()) as infra.HostRegister;
    hostStore.registerHost({
      ...hostRegisterInfo,
      name: hostRegisterInfo.name ?? "default",
      timestamps: { createdAt: new Date().toISOString() },
    });

    return res(
      ctx.status(hostRegisterInfo.name === "fail" ? 500 : 200),
      ctx.json<
        infra.HostServiceRegisterHostApiResponse & {
          message?: string;
        }
      >({
        name: hostRegisterInfo.name ?? "default",
        resourceId: hostRegisterInfo.name ?? "default",
        message: hostRegisterInfo.name === "fail" ? "failed" : undefined,
      }),
    );
  }),

  http.patch(
    `${baseURL}/compute/hosts/:hostId/register`,
    async async (req, res, ctx) => {
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

      return res(ctx.status(200));
    },
  ),

  // instance
  http.get(`${baseURL}/compute/instances`, async async (req, res, ctx) => {
    const hostId = new URL(req.url).searchParams.get("hostID");
    const filter = new URL(req.url).searchParams.get("filter");

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

    return res(
      ctx.status(200),
      ctx.json<any, infra.InstanceServiceListInstancesApiResponse>({
        hasNext: false,
        instances,
        totalElements: instances.length,
      }),
      ctx.delay(delay),
    );
  }),
  http.post(`${baseURL}/compute/instances`, async async (req, res, ctx) => {
    const body = await request.clone().json();

    const { name, kind, hostID, osID, securityFeature } = body;

    if (hostID && osID) {
      const host = hostStore.get(hostID);
      const os = osResourceStore.get(osID);

      if (host && os) {
        const newInstance: infra.InstanceResourceRead = {
          instanceID: (Math.random() + 1).toString(36).substring(7),
          kind,
          name,
          securityFeature,
          instanceStatusIndicator: "STATUS_INDICATION_IDLE",
          instanceStatus: "Running",
          instanceStatusTimestamp: 1717761389,
          currentState: "INSTANCE_STATE_RUNNING",
          host,
        };

        instanceStore.post(newInstance);

        return res(
          ctx.status(200),
          ctx.json<any, infra.InstanceServiceCreateInstanceApiResponse>(newInstance),
        );
      }
    }

    return res(
      ctx.status(404),
      ctx.json({ data: "infra.Host/OS not found!", status: "404" }),
    );
  }),
  http.delete(
    `${baseURL}/compute/instances/:instanceId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.InstanceServiceDeleteInstanceApiArg;
      const deleteResult = instanceStore.delete(resourceId);

      return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
    },
  ),

  // workload
  http.get(`${baseURL}/workloads/:workloadId`, async async (req, res, ctx) => {
    const { resourceId } = params as infra.WorkloadServiceGetWorkloadApiArg;
    const workload = workloadStore.get(resourceId);

    if (!workload) {
      return res(
        ctx.status(400),
        ctx.json({
          detail:
            "rpc error: code = badRequest desc = ent: workloadId not supplied",
          status: 400,
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json<any, infra.WorkloadServiceGetWorkloadApiResponse>(workload),
    );
  }),

  // schedules
  http.get(`${baseURL}/schedules`, async async (req, res, ctx) => {
    const hostId = new URL(req.url).searchParams.get("hostID");
    const siteId = new URL(req.url).searchParams.get("siteID");
    const regionId = new URL(req.url).searchParams.get("regionID");
    const unixEpoch = new URL(req.url).searchParams.get("unix_epoch"); // current time
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

    return res(
      ctx.status(200),
      ctx.json<any, infra.ScheduleServiceListSchedulesApiResponse>({
        hasNext: false,
        singleSchedules: schedulesList,
        repeatedSchedules: repeatedScheduleList,
        totalElements: schedulesList.length + repeatedScheduleList.length,
      }),
    );
  }),
  http.post(`${baseURL}/schedules/single`, async async (req, res, ctx) => {
    const singleSchedule = await request.clone().json();
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
      return res(
        ctx.status(200),
        ctx.json<any, infra.ScheduleServiceCreateSingleScheduleApiResponse>(result),
      );
    }
    return res(ctx.status(404));
  }),

  http.post(`${baseURL}/schedules/repeated`, async async (req, res, ctx) => {
    const repeatedSchedule = await request.clone().json();
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
      return res(
        ctx.status(200),
        ctx.json<any, infra.ScheduleServiceCreateRepeatedScheduleApiResponse>(
          result,
        ),
      );
    }
    return res(ctx.status(404));
  }),

  http.put(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as unknown as infra.ScheduleServicePatchSingleScheduleApiArg;
      const singleSchedule = await request.clone().json();
      const result = singleScheduleStore.put(resourceId, {
        ...singleSchedule,
        targetHost: singleSchedule.targetHostId
          ? hostStore.get(singleSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return res(
          ctx.status(200),
          ctx.json<any, infra.ScheduleServiceCreateSingleScheduleApiResponse>(
            result,
          ),
        );
      }
      return res(ctx.status(404));
    },
  ),
  http.put(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as unknown as infra.ScheduleServiceDeleteRepeatedScheduleApiArg;
      const repeatedSchedule = await request.clone().json();
      const result = repeatedScheduleStore.put(resourceId, {
        ...repeatedSchedule,
        targetHost: repeatedSchedule.targetHostId
          ? hostStore.get(repeatedSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return res(
          ctx.status(200),
          ctx.json<any, infra.ScheduleServiceCreateRepeatedScheduleApiResponse>(
            result,
          ),
        );
      }
      return res(ctx.status(404));
    },
  ),

  http.delete(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.ScheduleServiceDeleteSingleScheduleApiArg;
      const result = singleScheduleStore.delete(resourceId);
      return res(ctx.status(result ? 200 : 404), ctx.json(undefined));
    },
  ),
  http.delete(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.ScheduleServiceDeleteRepeatedScheduleApiArg;
      const result = repeatedScheduleStore.delete(resourceId);
      return res(ctx.status(result ? 200 : 404), ctx.json(undefined));
    },
  ),

  // os resource
  http.get(`${baseURL}/compute/os`, async async (req, res, ctx) => {
    const list = osResourceStore.list();
    return res(
      ctx.status(200),
      ctx.json<any, infra.OperatingSystemServiceListOperatingSystemsApiResponse>({
        hasNext: false,
        OperatingSystemResources: list,
        totalElements: list.length,
      }),
    );
  }),

  // telemetry
  http.get(`${baseURL}/telemetry/groups/metrics`, async async (req, res, ctx) => {
    const metricsgroups = telemetryMetricsStore.list();
    return res(
      ctx.status(200),
      ctx.json<any, infra.TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiResponse>(
        {
          telemetryMetricsGroups: metricsgroups,
          hasNext: false,
          totalElements: metricsgroups.length,
        },
      ),
    );
  }),
  http.get(`${baseURL}/telemetry/groups/logs`, async async (req, res, ctx) => {
    const loggroups = telemetryLogsStore.list();
    return res(
      ctx.status(200),
      ctx.json<any, infra.TelemetryLogsGroupServiceListTelemetryLogsGroupsApiResponse>(
        {
          telemetryLogsGroups: loggroups,
          hasNext: false,
          totalElements: loggroups.length,
        },
      ),
    );
  }),

  http.get(
    `${baseURL}/telemetry/groups/logs/:telemetryLogsGroupId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.TelemetryLogsGroupServiceGetTelemetryLogsGroupApiArg;
      const loggroups = telemetryLogsStore.get(resourceId);
      if (loggroups) {
        return res(
          ctx.status(200),
          ctx.json<any, infra.TelemetryLogsGroupServiceGetTelemetryLogsGroupApiResponse>(
            loggroups,
          ),
        );
      }
    },
  ),
  http.get(`${baseURL}/telemetry/profiles/metrics`, async async (req, res, ctx) => {
    const url = new URL(new URL(req.url));
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

    return res(
      ctx.status(200),
      ctx.json<any, infra.TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse>(
        {
          telemetryMetricsProfiles: metricProfiles,
          hasNext: false,
          totalElements: metricProfiles.length,
        },
      ),
    );
  }),

  http.get(`${baseURL}/telemetry/profiles/logs`, async async (req, res, ctx) => {
    const url = new URL(new URL(req.url));
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
    return res(
      ctx.status(200),
      ctx.json<any, infra.TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse>(
        {
          telemetryLogsProfiles: logProfiles,
          hasNext: false,
          totalElements: logProfiles.length,
        },
      ),
    );
  }),

  http.post(`${baseURL}/telemetry/profiles/metrics`, async async (req, res, ctx) => {
    const body = await req.json<any, infra.TelemetryMetricsProfileResource>();
    const profileRead = telemetryMetricsProfilesStore.create(body);
    if (!profileRead) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<infra.TelemetryMetricsProfileServiceCreateTelemetryMetricsProfileApiResponse>(
        profileRead,
      ),
    );
  }),
  http.post(`${baseURL}/telemetry/profiles/logs`, async async (req, res, ctx) => {
    const body = await req.json<any, infra.TelemetryLogsProfileResource>();
    //const p = telemetrylogsProfilesStore.post(body);
    const profileRead = telemetrylogsProfilesStore.create(body);
    if (!profileRead) return await res(ctx.status(500));
    return res(
      ctx.status(201),
      ctx.json<infra.TelemetryLogsProfileServiceCreateTelemetryLogsProfileApiResponse>(
        profileRead,
      ),
    );
  }),

  http.put(
    `${baseURL}/telemetry/profiles/metrics/:telemetryMetricsProfileId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.TelemetryMetricsProfileServiceGetTelemetryMetricsProfileApiArg;
      const body = await req.json<any, infra.TelemetryMetricsProfileResource>();
      const p = telemetryMetricsProfilesStore.put(resourceId, body);
      if (!p) return await res(ctx.status(500));
      return res(
        ctx.status(200),
        ctx.json<infra.TelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileApiResponse>(
          p,
        ),
      );
    },
  ),

  http.put(
    `${baseURL}/telemetry/profiles/logs/:resourceId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.TelemetryLogsProfileServiceGetTelemetryLogsProfileApiArg;
      const body = await req.json<any, infra.TelemetryLogsProfileResource>();
      const p = telemetrylogsProfilesStore.put(resourceId, body);
      if (!p) return res(ctx.status(500));
      return res(
        ctx.status(200),
        ctx.json<infra.TelemetryLogsProfileServiceUpdateTelemetryLogsProfileApiResponse>(
          p,
        ),
      );
    },
  ),

  http.delete(
    `${baseURL}/telemetry/profiles/metrics/:resourceId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.TelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileApiArg;
      const deleteResult = telemetryMetricsProfilesStore.delete(resourceId);
      return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
    },
  ),

  http.delete(
    `${baseURL}/telemetry/profiles/logs/:resourceId`,
    async async (req, res, ctx) => {
      const { resourceId } =
        params as infra.TelemetryLogsProfileServiceDeleteTelemetryLogsProfileApiArg;
      const deleteResult = telemetrylogsProfilesStore.delete(resourceId);
      return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
    },
  ),

  http.get(`${baseURL}/providers`, async async (req, res, ctx) => {
    const filter = new URL(req.url).searchParams.get("filter");

    if (filter?.match(/name="infra_onboarding"/)) {
      return res(
        ctx.status(200),
        ctx.json<any, infra.ProviderServiceListProvidersApiResponse>({
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
        }),
      );
    }

    return res(ctx.status(502));
  }),

  // VPro details endpoints
  http.get(`${baseURL}/dm/devices/:guid`, async async (req, res, ctx) => {
    const { guid } = params as { guid: string };
    const vproDetails = vproDetailsStore.getDeviceByGuid(guid);
    console.log("vproDetails:", vproDetails);
    if (vproDetails) {
      return res(ctx.status(200), ctx.json(vproDetails), ctx.delay(delay));
    }

    return res(
      ctx.status(404),
      ctx.json({
        detail:
          "rpc error: code = NotFound desc = ent: vPro details not found for host",
        status: 404,
      }),
    );
  }),

  http.get(`${baseURL}/dm/amt/generalSettings/:guid`, async async (req, res, ctx) => {
    const vproDetails = vproGeneralSettingsStore.getGeneralSettingsByGuid();
    if (vproDetails) {
      return res(ctx.status(200), ctx.json(vproDetails), ctx.delay(delay));
    }

    return res(
      ctx.status(404),
      ctx.json({
        detail:
          "rpc error: code = NotFound desc = ent: vPro details not found for host",
        status: 404,
      }),
    );
  }),
];
