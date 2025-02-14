/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { rest } from "msw";
import { SharedStorage } from "../../../../utils";
import { SiteStore } from "../../eim/store"; //import { SiteStore } from "../store";
import HostStore from "../store/hosts";
import InstanceStore from "../store/instances";
import OsResourceStore from "../store/osresources";
import RegionStore from "../store/regions";
import SingleScheduleStore from "../store/schedule";
import StoreUtils from "../store/utils";
const baseURL = `/v1/projects/${SharedStorage.project?.name}`;
const delay = 1 * 1000;

export const regionStore = new RegionStore();
export const siteStore = new SiteStore();
export const hostStore = new HostStore();
export const singleScheduleStore = new SingleScheduleStore();
export const osResourceStore = new OsResourceStore();
export const instanceStore = new InstanceStore();

export const handlers = [
  // region
  rest.get(`${baseURL}/regions`, (req, res, ctx) => {
    const parent = req.url.searchParams.get("parent");
    const list = regionStore.list(parent);
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
    const body = await req.json<eim.Region>();
    const r = regionStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(201),
      ctx.json<eim.PutV1ProjectsByProjectNameRegionsAndRegionIdApiResponse>(r),
    );
  }),
  rest.get(`${baseURL}/regions/:regionId`, (req, res, ctx) => {
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
  rest.delete(`${baseURL}/regions/:regionId`, (req, res, ctx) => {
    const { regionId } =
      req.params as eim.DeleteV1ProjectsByProjectNameRegionsAndRegionIdApiArg;
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
  rest.patch(`${baseURL}/regions/:regionId`, (_, res, ctx) => {
    return res(ctx.status(502));
  }),
  rest.delete(`${baseURL}/regions/:regionId`, (_, res, ctx) => {
    return res(ctx.status(502));
  }),
  // site
  rest.get(`${baseURL}/sites`, (req, res, ctx) => {
    const region = req.url.searchParams.get("region");
    const sites = siteStore.list({ regionId: region });
    return res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse>(
        {
          hasNext: false,
          sites: sites,
          totalElements: sites.length,
        },
      ),
    );
  }),
  rest.post(`${baseURL}/sites`, async (req, res, ctx) => {
    const body = await req.json<eim.Site>();
    const r = siteStore.post(body);
    if (!r) return res(ctx.status(500));
    return res(
      ctx.status(201),
      ctx.json<eim.PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse>(
        r,
      ),
    );
  }),
  rest.get(`${baseURL}/sites/:siteId`, (req, res, ctx) => {
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
  rest.delete(`${baseURL}/sites/:siteId`, (req, res, ctx) => {
    const { siteId } =
      req.params as eim.DeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg;
    const deleteResult = siteStore.delete(siteId);
    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),
  // host
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

    // if (hosts.length > 0) {
    //   hosts = randomizeHostList(hosts) as HostMock[];
    // }

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
    const body = await req.json<eim.HostRead>();
    if (!hostId || !body) {
      return res(
        ctx.status(400),
        ctx.json({
          detail:
            "rpc error: code = badRequest desc = ent: hostId or hostRequest not supplied",
          status: 400,
        }),
      );
    }

    if (!StoreUtils.isHostReadOnly(body)) {
      return res(
        ctx.status(400),
        ctx.json({
          detail:
            'request body has an error: doesn\'t match the schema: Error at "/instance/hostID": string doesn\'t match the regular expression "^host-[0-9a-f]{8}$"',
          status: 400,
        }),
      );
    }

    const processError = () => {
      return res(
        ctx.status(500),
        ctx.json({
          detail:
            "rpc error: code = ProcessErr desc = ent: host not found or updated",
          status: 500,
        }),
      );
    };

    let host;
    try {
      console.log(body, hostId, "m");
      host = hostStore.put(hostId, body);
      const instanceMatchList = instanceStore.list({
        workloadMemberID: null,
        hostId: hostId,
      });
      const instance =
        instanceMatchList.length > 0 ? instanceMatchList[0] : undefined;
      if (instance && host) {
        instanceStore.put(instance.instanceID!, {
          ...instance,
          host: host as eim.HostRead,
        });
      }
    } catch {
      return processError();
    }
    if (!host) {
      return processError();
    }

    return res(
      ctx.status(201),
      ctx.json<eim.PutV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse>(
        host,
      ),
    );
  }),
  rest.post(`${baseURL}/compute/hosts`, async (req, res, ctx) => {
    const { body } =
      await req.json<eim.PostV1ProjectsByProjectNameComputeHostsApiArg>();
    const host = hostStore.post(body as eim.HostRead);
    if (!host) throw new Error("Host POST was unsuccessful");
    return res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameComputeHostsApiResponse>(host),
    );
  }),
  rest.patch(`${baseURL}/compute/hosts/:hostId`, async (req, res, ctx) => {
    const { hostId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const hostPatchUpdate = await req.json<eim.HostRead>();

    if (!StoreUtils.isHostReadOnly(hostPatchUpdate)) {
      return res(
        ctx.status(400),
        ctx.json({
          detail:
            'request body has an error: doesn\'t match the schema: Error at "/instance/hostID": string doesn\'t match the regular expression "^host-[0-9a-f]{8}$"',
          status: 400,
        }),
      );
    }

    const host = hostStore.put(hostId, hostPatchUpdate);
    if (host) {
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
  rest.get(`${baseURL}/compute/hosts/summary?`, async (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");

    return res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeHostsSummaryApiResponse>(
        hostStore.getSummary(filter),
      ),
    );
  }),
  rest.get(`${baseURL}/compute/hosts/:hostId`, (req, res, ctx) => {
    const { hostId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;

    const host = hostStore.get(hostId);

    if (host) {
      return res(
        ctx.status(200),
        ctx.json<eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse>(
          host,
        ),
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

  rest.delete(`${baseURL}/compute/hosts/:hostId`, (req, res, ctx) => {
    const { hostId } =
      req.params as unknown as eim.DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiArg;
    const host = hostStore.delete(hostId);
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

  // instance
  rest.get(`${baseURL}/instances`, async (req, res, ctx) => {
    const hostId = req.url.searchParams.get("hostID");
    const filter = req.url.searchParams.get("filter");

    console.log("actually grabbing hosts", hostId, filter);

    const instances = instanceStore.list({
      hostId,
      ...(filter ? { filter } : {}),
    });

    // Mock: Dynamic Table Rendering (Ex: HeartBeat, Polling change)
    // if (instances && instances.length > 0) {
    //   instances = randomizeInstanceHostList(
    //     instances
    //   ) as InstanceReadModified[];
    // }

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

  rest.post(`${baseURL}/instances`, async (req, res, ctx) => {
    const body = req.body as eim.InstanceWrite;

    const { name, kind, hostID, osID } = body;

    if (!osID || !hostID) {
      throw new Error("Mock data missing osID || hostID");
    }

    const os = osResourceStore.get(osID);
    const host = hostStore.get(hostID);

    const newInstance: enhancedEimSlice.InstanceReadModified = {
      instanceID: (Math.random() + 1).toString(36).substring(7),
      os,
      kind,
      name,
      currentState: "INSTANCE_STATE_RUNNING",
      host,
    };

    instanceStore.post(newInstance);

    return res(
      ctx.status(201),
      ctx.json<eim.PostV1ProjectsByProjectNameComputeInstancesApiResponse>(
        newInstance,
      ),
    );
  }),

  rest.delete(`${baseURL}/instances/:instanceId`, async (req, res, ctx) => {
    const { instanceId } =
      req.params as eim.DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiArg;
    const deleteResult = instanceStore.delete(instanceId);

    return res(ctx.status(deleteResult ? 200 : 404), ctx.json(undefined));
  }),

  rest.get(`${baseURL}/workloads/:workloadId`, async (req, res, ctx) => {
    const { workloadId } =
      req.params as eim.GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiArg;
    const instance = instanceStore.list({ workloadMemberID: workloadId });

    if (!workloadId || !instance || instance.length === 0) {
      // TODO: create a `WorkloadStore`
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
      ctx.json<eim.GetV1ProjectsByProjectNameComputeWorkloadsAndWorkloadIdApiResponse>(
        {
          kind: "WORKLOAD_KIND_CLUSTER",
          members: [],
          // we have kept workloadId as clusterName for mock purpose only
          externalId: workloadId,
          workloadId: workloadId,
          name: workloadId,
          status: workloadId,
        },
      ),
    );
  }),

  rest.get(`${baseURL}/schedules`, (req, res, ctx) => {
    const hostId = req.url.searchParams.get("hostID");
    const unixEpoch = parseInt(req.url.searchParams.get("unixEpoch") ?? "0"); // current time
    let schedulesList = singleScheduleStore.list();

    // filter based on hostId if given
    if (hostId) {
      // Short list `unixEpoch` hosts (if end_time is presents)
      schedulesList = (schedulesList ?? []).filter(
        (schedule) =>
          schedule.targetHost?.resourceId === hostId &&
          // If end seconds is not mentioned
          (schedule.endSeconds === 0 ||
            // Or If end seconds if present
            // then check shortlist schedule that are not expired from unixEpoch (unix_time in seconds)
            (schedule.endSeconds &&
              schedule.endSeconds !== 0 &&
              unixEpoch &&
              unixEpoch < schedule.endSeconds)),
      );
    }

    return res(
      ctx.status(200),
      ctx.json<eim.GetV1ProjectsByProjectNameComputeSchedulesApiResponse>({
        hasNext: false,
        SingleSchedules: schedulesList,
        RepeatedSchedules: [],
        totalElements: schedulesList.length,
      }),
    );
  }),

  rest.post(`${baseURL}/schedules/single`, (req, res, ctx) => {
    const singleSchedule = req.body as eim.SingleScheduleRead2;

    singleScheduleStore.post({
      startSeconds: singleSchedule.startSeconds,
      name: singleSchedule.name,
      scheduleStatus: singleSchedule.scheduleStatus,
      targetHost: singleSchedule.targetHost,
    });

    return res(
      ctx.status(200),
      ctx.json<eim.PostV1ProjectsByProjectNameSchedulesSingleApiResponse>({
        startSeconds: singleSchedule.startSeconds,
        name: singleSchedule.name,
        scheduleStatus: singleSchedule.scheduleStatus,
        targetHost: singleSchedule.targetHost,
        singleScheduleID: "schedule1",
      }),
    );
  }),

  rest.delete(
    `${baseURL}/schedules/single/:singleScheduleId`,
    (req, res, ctx) => {
      const { singleScheduleId } =
        req.params as eim.DeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdApiArg;

      singleScheduleStore.delete(singleScheduleId);

      return res(ctx.status(200), ctx.json(undefined));
    },
  ),

  // os resource
  rest.get(`${baseURL}/OSResources`, (req, res, ctx) => {
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
  rest.put(
    `${baseURL}/compute/hosts/:hostId/invalidate`,
    async (req, res, ctx) => {
      const { hostId } = req.params as { hostId: string };
      const body = await req.json<eim.HostOperationWithNote>();

      const note = body.note;

      const deauthResult = hostStore.deauthorizeHost(hostId, true, note);

      if (!deauthResult) {
        return res(ctx.status(404));
      }

      // TODO: this needs to go into hostStore.convert() after mockStore is setup
      const instances = instanceStore.list({
        workloadMemberID: null,
        hostId,
      });
      const host = hostStore.get(hostId);
      if (instances && instances.length > 0 && host) {
        instanceStore.put(instances[0].instanceID!, {
          ...instances[0],
          host: {
            ...host,
          },
        });
      }

      return res(ctx.status(200), ctx.json(undefined));
    },
  ),
];
