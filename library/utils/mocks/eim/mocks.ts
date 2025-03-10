/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { GenericStatus } from "@orch-ui/components";
import { rest } from "msw";
import { SearchResult } from "../../../../apps/eim/src/store/locations";
import { SharedStorage } from "../../../utils";
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

const randomizeHostList = (hosts: eim.HostRead[]) => {
  if (IS_MOCK_RANDOMIZE_ENABLED) {
    return hosts.map((host, i) =>
      i === 0 ? { ...host, hostStatus: randomizeHostStatus() } : host,
    );
  }
  return hosts;
};
const randomizeInstanceHostList = (
  instanceList: enhancedEimSlice.InstanceReadModified[],
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
  rest.get(`${baseURL}/locations-api`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<{ nodes: SearchResult[]; totalElements: number }>({
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
  // region
  rest.get(`${baseURL}/regions`, async (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");
    const isTotalSitesShown = req.url.searchParams.get("showTotalSites");
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

    let list: eim.RegionRead[] = [];
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
      ctx.json<eim.GetV1ProjectsByProjectNameRegionsApiResponse>({
        hasNext: false,
        regions: list,
        totalElements: list.length,
      }),
    );
  }),
  rest.post(`${baseURL}/regions`, async (req, res, ctx) => {
    const body = await req.json<eim.RegionWrite>();

    if (body.parentId) {
      body.parentRegion = regionStore.get(body.parentId);
    }

    const r = regionStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(201),
      ctx.json<eim.PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse>(r),
    );
  }),
  rest.get(`${baseURL}/regions/:regionId`, async (req, res, ctx) => {
    const { regionId } =
      req.params as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdApiArg;
    const region = regionStore.get(regionId);

    if (region) {
      return res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameRegionsAndRegionIdApiResponse>(
          region,
        ),
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

  rest.delete(`${baseURL}/regions/:regionId`, async (req, res, ctx) => {
    const { regionId } =
      req.params as eim.DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiArg;

    const sites = siteStore.list({ regionId: regionId });
    if (sites.length > 0) {
      return res(
        ctx.status(412),
        ctx.json({
          message: "the region has relations with site and cannot be deleted",
        }),
      );
    }

    const region = regionStore.get(regionId);
    if (region?.parentRegion) {
      return res(
        ctx.status(412),
        ctx.json({
          message: "the region has relations with region and cannot be deleted",
        }),
      );
    }

    const deleteResult = regionStore.delete(regionId);
    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),
  rest.put(`${baseURL}/regions/:regionId`, async (req, res, ctx) => {
    const { regionId } =
      req.params as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdApiArg;
    const body = await req.json<eim.Region>();
    const r = regionStore.put(regionId, body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<eim.PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse>(r),
    );
  }),
  rest.patch(`${baseURL}/regions/:regionId`, async (_, res, ctx) => {
    return res(ctx.status(502));
  }),

  // site
  rest.get(`${baseURL}/regions/:regionId/sites`, async (req, res, ctx) => {
    const { regionId } =
      req.params as unknown as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg;

    if (regionId) {
      const sites = siteStore.list({ regionId });
      return res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse>(
          {
            hasNext: false,
            sites: sites,
            totalElements: Math.min(sites.length, 10),
          },
        ),
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
  rest.post(`${baseURL}/sites`, async (req, res, ctx) => {
    const body = await req.json<eim.SiteWrite>();
    if (body.regionId) {
      body.region = regionStore.get(body.regionId);
    }
    const r = siteStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse>(
        r,
      ),
    );
  }),
  rest.get(`${baseURL}/sites/:siteId`, async (req, res, ctx) => {
    const { siteId } =
      req.params as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg;
    const site = siteStore.get(siteId);
    if (site) {
      return res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse>(
          site,
        ),
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
  rest.put(`${baseURL}/sites/:siteId`, async (req, res, ctx) => {
    const { siteId } =
      req.params as eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg;
    const body = await req.json<eim.Site>();
    const s = siteStore.put(siteId, body);
    if (!s) return res(ctx.status(500));
    return res(
      ctx.status(200),
      ctx.json<eim.PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse>(
        s,
      ),
    );
  }),
  rest.delete(`${baseURL}/sites/:siteId`, async (req, res, ctx) => {
    const { siteId } =
      req.params as eim.DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg;
    const deleteResult = siteStore.delete(siteId);
    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),

  // host
  rest.get(`${baseURL}/compute/hosts/summary`, async (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");

    return res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse>(
        hostStore.getSummary(filter),
      ),
    );
  }),
  rest.get(`${baseURL}/compute/hosts`, async (req, res, ctx) => {
    const siteID = req.url.searchParams.get("siteID");
    const deviceUuid = req.url.searchParams.get("uuid");
    const metadataString = req.url.searchParams.get("metadata");
    const filter = req.url.searchParams.get("filter");

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
      return await res(
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
          const metadataSet = host.inheritedMetadata?.location?.concat(
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
      hosts = randomizeHostList(hosts) as HostMock[];
    }

    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeHostsApiResponse>({
        hasNext: false,
        hosts,
        totalElements: hosts.length,
      }),
      ctx.delay(delay),
    );
  }),
  rest.put(`${baseURL}/compute/hosts/:hostId`, async (req, res, ctx) => {
    const { hostId } =
      req.params as unknown as eim.PutV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const body = await req.json<eim.Host>();
    if (!hostId || !body) {
      return await res(
        ctx.status(400),
        ctx.json({
          detail:
            "rpc error: code = badRequest desc = ent: hostId or hostRequest not supplied",
          status: 400,
        }),
      );
    }

    const processError = async () => {
      return await res(
        ctx.status(500),
        ctx.json({
          detail:
            "rpc error: code = ProcessErr desc = ent: host not found or updated",
          status: 500,
        }),
      );
    };

    let host: eim.HostRead | void = hostStore.get(hostId);
    if (host) {
      try {
        host = hostStore.put(hostId, { ...host, ...body } as HostMock);
        const instanceMatchList = instanceStore.list({ hostId });
        const instance =
          instanceMatchList.length > 0 ? instanceMatchList[0] : undefined;
        if (instance && host) {
          instanceStore.put(instance.instanceID!, {
            ...instance,
            host: host as eim.HostRead,
          });
        }
      } catch {
        return await processError();
      }
    }

    if (!host) {
      return await processError();
    }

    return await res(
      ctx.status(201),
      ctx.json<eim.PutV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse>(
        host,
      ),
    );
  }),
  rest.post(`${baseURL}/compute/hosts`, async (req, res, ctx) => {
    const { body } =
      await req.json<eim.PostV1ProjectsByProjectNameComputeHostsApiArg>();
    const host = hostStore.post(body as HostMock);
    if (!host) throw new Error("eim.Host POST was unsuccessful");
    return await res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameComputeHostsApiResponse>(host),
    );
  }),
  rest.patch(`${baseURL}/compute/hosts/:hostId`, async (req, res, ctx) => {
    const { hostId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const hostPatchUpdate = await req.json<eim.Host>();

    const host = hostStore.get(hostId);
    if (host) {
      const patchedHost = { ...host, ...hostPatchUpdate } as HostMock;
      hostStore.put(hostId, patchedHost);
      if (host.instance?.instanceID) {
        const instance = instanceStore.get(host.instance.instanceID);

        if (instance && instance.instanceID) {
          instanceStore.put(instance.instanceID, {
            ...instance,
            // instance is only defined upto first-level
            host: { ...host, site: hostPatchUpdate.site, instance: undefined },
          });
        }
      }

      return res(
        ctx.status(200),
        ctx.json<eim.PatchV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse>(
          host,
        ),
      );
    }

    return res(
      ctx.status(500),
      ctx.json({
        detail: `response has an error: cannot update host to ${hostId}`,
        status: 500,
      }),
    );
  }),
  rest.get(`${baseURL}/compute/hosts/:hostId`, async (req, res, ctx) => {
    const { hostId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const host = hostStore.get(hostId);
    if (host) {
      return await res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse>(
          host,
        ),
      );
    }

    return await res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      }),
    );
  }),
  rest.put(
    `${baseURL}/compute/hosts/:hostId/invalidate`,
    async (req, res, ctx) => {
      const { hostId } = req.params as { hostId: string };
      const body = await req.json<eim.HostOperationWithNote>();
      const note = body.note;
      const deauthResult = hostStore.deauthorizeHost(hostId, true, note);

      if (!deauthResult) {
        return await res(ctx.status(404));
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
  rest.delete(`${baseURL}/compute/hosts/:hostId`, async (req, res, ctx) => {
    const { hostId } =
      req.params as unknown as eim.DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const host = hostStore.delete(hostId);
    if (host) {
      return await res(ctx.status(200));
    }

    return await res(
      ctx.status(404),
      ctx.json({
        detail: "rpc error: code = NotFound desc = ent: hosts not found",
        status: 404,
      }),
    );
  }),

  //Register related
  rest.post(`${baseURL}/compute/hosts/register`, async (req, res, ctx) => {
    const hostRegisterInfo =
      (await req.json<eim.PostV1ProjectsByProjectNameComputeHostsRegisterApiArg>()) as eim.HostRegisterInfo;
    hostStore.registerHost({
      ...hostRegisterInfo,
      name: hostRegisterInfo.name ?? "default",
      timestamps: { createdAt: new Date().toISOString() },
    });

    return await res(
      ctx.status(hostRegisterInfo.name === "fail" ? 500 : 201),
      ctx.json<
        eim.PostV1ProjectsByProjectNameComputeHostsRegisterApiResponse & {
          message?: string;
        }
      >({
        name: hostRegisterInfo.name ?? "default",
        resourceId: hostRegisterInfo.name ?? "default",
        message: hostRegisterInfo.name === "fail" ? "failed" : undefined,
      }),
    );
  }),

  rest.patch(
    `${baseURL}/compute/hosts/:hostId/register`,
    async (req, res, ctx) => {
      const { hostId } =
        req.params as unknown as eim.PatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterApiArg;

      const result = hostStore.get(hostId);
      const updatedResult: HostMock = {
        ...result,
        name: result?.name ?? "default",
        instance: {
          ...(result?.instance ?? {}),
          desiredState: "INSTANCE_STATE_UNSPECIFIED",
        },
      };

      hostStore.put(hostId, updatedResult);

      return await res(ctx.status(200));
    },
  ),

  // instance
  rest.get(`${baseURL}/compute/instances`, async (req, res, ctx) => {
    const hostId = req.url.searchParams.get("hostID");
    const filter = req.url.searchParams.get("filter");

    let instances = instanceStore.list({
      hostId,
      ...(filter ? { filter } : {}),
    });

    // Mock: Dynamic Table Rendering (Ex: HeartBeat, Polling change)
    if (instances && instances.length > 0) {
      instances = randomizeInstanceHostList(
        instances,
      ) as enhancedEimSlice.InstanceReadModified[];
    }

    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeInstancesApiResponse>({
        hasNext: false,
        instances,
        totalElements: instances.length,
      }),
      ctx.delay(delay),
    );
  }),
  rest.post(`${baseURL}/compute/instances`, async (req, res, ctx) => {
    const body = req.body as eim.InstanceWrite;

    const { name, kind, hostID, osID, securityFeature } = body;

    if (hostID && osID) {
      const host = hostStore.get(hostID);
      const os = osResourceStore.get(osID);

      if (host && os) {
        const newInstance: eim.InstanceRead = {
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

        return await res(
          ctx.status(201),
          ctx.json<eim.PostV1ProjectsByProjectNameComputeInstancesApiResponse>(
            newInstance,
          ),
        );
      }
    }

    return await res(
      ctx.status(404),
      ctx.json({ data: "eim.Host/OS not found!", status: "404" }),
    );
  }),
  rest.delete(
    `${baseURL}/compute/instances/:instanceId`,
    async (req, res, ctx) => {
      const { instanceId } =
        req.params as eim.DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg;
      const deleteResult = instanceStore.delete(instanceId);

      return await res(
        ctx.status(deleteResult ? 200 : 404),
        ctx.json(undefined),
      );
    },
  ),

  // workload
  rest.get(`${baseURL}/workloads/:workloadId`, async (req, res, ctx) => {
    const { workloadId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg;
    const workload = workloadStore.get(workloadId);

    if (!workload) {
      // TODO: create a `WorkloadStore`
      return await res(
        ctx.status(400),
        ctx.json({
          detail:
            "rpc error: code = badRequest desc = ent: workloadId not supplied",
          status: 400,
        }),
      );
    }

    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse>(
        workload,
      ),
    );
  }),

  // schedules
  rest.get(`${baseURL}/schedules`, async (req, res, ctx) => {
    const hostId = req.url.searchParams.get("hostID");
    const siteId = req.url.searchParams.get("siteID");
    const regionId = req.url.searchParams.get("regionID");
    const unixEpoch = req.url.searchParams.get("unix_epoch"); // current time
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

    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse>({
        hasNext: false,
        SingleSchedules: schedulesList,
        RepeatedSchedules: repeatedScheduleList,
        totalElements: schedulesList.length + repeatedScheduleList.length,
      }),
    );
  }),
  rest.post(`${baseURL}/schedules/single`, async (req, res, ctx) => {
    const singleSchedule = req.body as eim.SingleScheduleWrite2;
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
      return await res(
        ctx.status(200),
        ctx.json<eim.PostV1ProjectsByProjectNameSchedulesSingleApiResponse>(
          result,
        ),
      );
    }
    return await res(ctx.status(404));
  }),

  rest.post(`${baseURL}/schedules/repeated`, async (req, res, ctx) => {
    const repeatedSchedule = req.body as eim.SingleScheduleWrite;
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
      return await res(
        ctx.status(200),
        ctx.json<eim.PostV1ProjectsByProjectNameSchedulesRepeatedApiResponse>(
          result,
        ),
      );
    }
    return await res(ctx.status(404));
  }),

  rest.put(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async (req, res, ctx) => {
      const { singleScheduleId } =
        req.params as unknown as eim.PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg;
      const singleSchedule = req.body as eim.SingleScheduleWrite2;
      const result = singleScheduleStore.put(singleScheduleId, {
        ...singleSchedule,
        targetHost: singleSchedule.targetHostId
          ? hostStore.get(singleSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return await res(
          ctx.status(200),
          ctx.json<eim.PatchV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiResponse>(
            result,
          ),
        );
      }
      return res(ctx.status(404));
    },
  ),
  rest.put(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async (req, res, ctx) => {
      const { repeatedScheduleId } =
        req.params as unknown as eim.PatchV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg;
      const repeatedSchedule = req.body as eim.SingleScheduleWrite;
      const result = repeatedScheduleStore.put(repeatedScheduleId, {
        ...repeatedSchedule,
        targetHost: repeatedSchedule.targetHostId
          ? hostStore.get(repeatedSchedule.targetHostId)
          : undefined,
      });
      if (result) {
        return await res(
          ctx.status(200),
          ctx.json<eim.PostV1ProjectsByProjectNameSchedulesRepeatedApiResponse>(
            result,
          ),
        );
      }
      return res(ctx.status(404));
    },
  ),

  rest.delete(
    `${baseURL}/schedules/single/:singleScheduleId`,
    async (req, res, ctx) => {
      const { singleScheduleId } =
        req.params as eim.DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg;
      const result = singleScheduleStore.delete(singleScheduleId);
      return res(ctx.status(result ? 200 : 404), ctx.json(undefined));
    },
  ),
  rest.delete(
    `${baseURL}/schedules/repeated/:repeatedScheduleId`,
    async (req, res, ctx) => {
      const { repeatedScheduleId } =
        req.params as eim.DeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdApiArg;
      const result = repeatedScheduleStore.delete(repeatedScheduleId);
      return res(ctx.status(result ? 200 : 404), ctx.json(undefined));
    },
  ),

  // os resource
  rest.get(`${baseURL}/compute/os`, async (req, res, ctx) => {
    const list = osResourceStore.list();
    return res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeOsApiResponse>({
        hasNext: false,
        OperatingSystemResources: list,
        totalElements: list.length,
      }),
    );
  }),

  // telemetry
  rest.get(`${baseURL}/telemetry/groups/metrics`, async (req, res, ctx) => {
    const metricsgroups = telemetryMetricsStore.list();
    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse>({
        TelemetryMetricsGroups: metricsgroups,
        hasNext: false,
        totalElements: metricsgroups.length,
      }),
    );
  }),
  rest.get(`${baseURL}/telemetry/groups/logs`, async (req, res, ctx) => {
    const loggroups = telemetryLogsStore.list();
    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse>({
        TelemetryLogsGroups: loggroups,
        hasNext: false,
        totalElements: loggroups.length,
      }),
    );
  }),

  rest.get(
    `${baseURL}/telemetry/groups/logs/:telemetryLogsGroupId`,
    async (req, res, ctx) => {
      const { telemetryLogsGroupId } =
        req.params as eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiArg;
      const loggroups = telemetryLogsStore.get(telemetryLogsGroupId);
      if (loggroups) {
        return await res(
          ctx.status(200),
          ctx.json<eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdApiResponse>(
            loggroups,
          ),
        );
      }
    },
  ),
  rest.get(`${baseURL}/telemetry/profiles/metrics`, async (req, res, ctx) => {
    const url = new URL(req.url);
    let metricProfiles: eim.TelemetryMetricsProfileRead[] = [];

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

    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse>(
        {
          TelemetryMetricsProfiles: metricProfiles,
          hasNext: false,
          totalElements: metricProfiles.length,
        },
      ),
    );
  }),

  rest.get(`${baseURL}/telemetry/profiles/logs`, async (req, res, ctx) => {
    const url = new URL(req.url);
    let logProfiles: eim.TelemetryLogsProfileRead[] = [];

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
    return await res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse>(
        {
          TelemetryLogsProfiles: logProfiles,
          hasNext: false,
          totalElements: logProfiles.length,
        },
      ),
    );
  }),

  rest.post(`${baseURL}/telemetry/profiles/metrics`, async (req, res, ctx) => {
    const body = await req.json<eim.TelemetryMetricsProfile>();
    const profileRead = telemetryMetricsProfilesStore.create(body);
    if (!profileRead) return await res(ctx.status(500));
    return await res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse>(
        profileRead,
      ),
    );
  }),
  rest.post(`${baseURL}/telemetry/profiles/logs`, async (req, res, ctx) => {
    const body = await req.json<eim.TelemetryLogsProfile>();
    //const p = telemetrylogsProfilesStore.post(body);
    const profileRead = telemetrylogsProfilesStore.create(body);
    if (!profileRead) return await res(ctx.status(500));
    return await res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse>(
        profileRead,
      ),
    );
  }),

  rest.put(
    `${baseURL}/telemetry/profiles/metrics/:telemetryMetricsProfileId`,
    async (req, res, ctx) => {
      const { telemetryMetricsProfileId } =
        req.params as eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg;
      const body = await req.json<eim.TelemetryMetricsProfile>();
      const p = telemetryMetricsProfilesStore.put(
        telemetryMetricsProfileId,
        body,
      );
      if (!p) return await res(ctx.status(500));
      return await res(
        ctx.status(200),
        ctx.json<eim.PutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiResponse>(
          p,
        ),
      );
    },
  ),

  rest.put(
    `${baseURL}/telemetry/profiles/logs/:telemetryLogsProfileId`,
    async (req, res, ctx) => {
      const { telemetryLogsProfileId } =
        req.params as eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg;
      const body = await req.json<eim.TelemetryLogsProfile>();
      const p = telemetrylogsProfilesStore.put(telemetryLogsProfileId, body);
      if (!p) return await res(ctx.status(500));
      return await res(
        ctx.status(200),
        ctx.json<eim.PutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiResponse>(
          p,
        ),
      );
    },
  ),

  rest.delete(
    `${baseURL}/telemetry/profiles/metrics/:telemetryMetricsProfileId`,
    async (req, res, ctx) => {
      const { telemetryMetricsProfileId } =
        req.params as eim.DeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdApiArg;
      const deleteResult = telemetryMetricsProfilesStore.delete(
        telemetryMetricsProfileId,
      );
      return await res(
        ctx.status(deleteResult ? 200 : 404),
        ctx.json(undefined),
      );
    },
  ),

  rest.delete(
    `${baseURL}/telemetry/profiles/logs/:telemetryLogsProfileId`,
    async (req, res, ctx) => {
      const { telemetryLogsProfileId } =
        req.params as eim.DeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdApiArg;
      const deleteResult = telemetrylogsProfilesStore.delete(
        telemetryLogsProfileId,
      );
      return await res(
        ctx.status(deleteResult ? 200 : 404),
        ctx.json(undefined),
      );
    },
  ),

  rest.get(`${baseURL}/providers`, async (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");

    if (filter?.match(/name="fm_onboarding"/)) {
      return await res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameProvidersApiResponse>({
          hasNext: false,
          providers: [
            {
              apiCredentials: [
                ".qtBRC2kpHr?(BYYah -uw/B)eKc<8**os1*b8h@/MeO00EY.*",
              ],
              apiEndpoint: "H?xXQ.adSCiF@b:sdJ*<ZABsWOUhOSKwOf;)HAFEbL)GrtVnO#",
              name: "fm_onboarding",
              providerID: "provider-3148c6c1",
              providerKind: "PROVIDER_KIND_BAREMETAL",
              providerVendor: "PROVIDER_VENDOR_UNSPECIFIED",
              config: `{"defaultOs":"${osUbuntuId}"}`,
            },
          ],
          totalElements: 0,
        }),
      );
    }

    return await res(ctx.status(502));
  }),
];
