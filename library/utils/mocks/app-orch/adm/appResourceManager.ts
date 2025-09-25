/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import { delay, http, HttpResponse } from "msw";
import { appEndpoints, vms, vmWithVnc, vncAddress } from "./data/vms";

const baseURLPrefix = "/v1/projects/:projectName/resource";

export const handlers = [
  http.get(
    `${baseURLPrefix}/endpoints/applications/:appId/clusters/:clusterId`,
    ({ params }) => {
      const { appId } = params as arm.EndpointsServiceListAppEndpointsApiArg;
      return HttpResponse.json(appEndpoints[appId], { status: 200 });
    },
  ),
  http.get(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId`,
    ({ params }) => {
      const { appId } = params as arm.AppWorkloadServiceListAppWorkloadsApiArg;
      if (Object.keys(vms).indexOf(appId) === -1) {
        return HttpResponse.json(
          { error: "Application not found" },
          { status: 400 },
        );
      }
      return HttpResponse.json(vms[appId], { status: 200 });
    },
  ),
  http.get(
    `${baseURLPrefix}/workloads/virtual-machines/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId`,
    async () => {
      await delay(500);
      return HttpResponse.json({ virtualMachine: vmWithVnc }, { status: 200 });
    },
  ),
  http.get(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/vnc`,
    async () => {
      await delay(500);
      return HttpResponse.json({ address: vncAddress }, { status: 200 });
    },
  ),
  http.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/restart`,
    () => {
      const success = Math.random() < 0.8;
      return success
        ? HttpResponse.json(null, { status: 204 })
        : HttpResponse.json(
            {
              code: 422,
              message: "couldn't perform required operation",
            },
            { status: 422 },
          );
    },
  ),
  http.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/start`,
    () => {
      const success = Math.random() < 0.8;
      return success
        ? HttpResponse.json(null, { status: 204 })
        : HttpResponse.json(
            {
              code: 422,
              message: "couldn't perform required operation",
            },
            { status: 422 },
          );
    },
  ),
  http.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/stop`,
    () => {
      const success = Math.random() < 0.8;
      return success
        ? HttpResponse.json(null, { status: 204 })
        : HttpResponse.json(
            {
              code: 422,
              message: "couldn't perform required operation",
            },
            { status: 422 },
          );
    },
  ),
  http.put(
    `${baseURLPrefix}/workloads/pods/clusters/:clusterId/namespaces/:namespace/pods/:podName/delete`,
    () => {
      const success = Math.random() < 0.8;
      return success
        ? HttpResponse.json(null, { status: 204 })
        : HttpResponse.json(
            {
              code: 422,
              message: "couldn't perform required operation",
            },
            { status: 422 },
          );
    },
  ),
];
