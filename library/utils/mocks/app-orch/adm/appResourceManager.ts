/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import { rest } from "msw";
import { appEndpoints, vms, vmWithVnc, vncAddress } from "./data/vms";

const baseURLPrefix = "/v1/projects/:projectName/resource";

export const handlers = [
  rest.get(
    `${baseURLPrefix}/endpoints/applications/:appId/clusters/:clusterId`,
    (req, res, ctx) => {
      const { appId } =
        req.params as arm.EndpointsServiceListAppEndpointsApiArg;
      return res(
        ctx.status(200),
        ctx.json<arm.EndpointsServiceListAppEndpointsApiResponse>(
          appEndpoints[appId],
        ),
      );
    },
  ),
  rest.get(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId`,
    (req, res, ctx) => {
      const { appId } =
        req.params as arm.AppWorkloadServiceListAppWorkloadsApiArg;
      if (Object.keys(vms).indexOf(appId) === -1) {
        return res(ctx.status(400));
      }
      return res(
        ctx.status(200),
        ctx.json<arm.AppWorkloadServiceListAppWorkloadsApiResponse>(vms[appId]),
      );
    },
  ),
  rest.get(
    `${baseURLPrefix}/workloads/virtual-machines/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ virtualMachine: vmWithVnc }),
        ctx.delay(3000),
      );
    },
  ),
  rest.get(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/vnc`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ address: vncAddress }),
        ctx.delay(3000),
      );
    },
  ),
  rest.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/restart`,
    (_, res, ctx) => {
      const success = Math.random() < 0.8;
      return success
        ? res(ctx.status(204))
        : res(
            ctx.status(422),
            ctx.json({
              code: 422,
              message: "couldn't perform required operation",
            }),
          );
    },
  ),
  rest.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/start`,
    (_, res, ctx) => {
      const success = Math.random() < 0.8;
      return success
        ? res(ctx.status(204))
        : res(
            ctx.status(422),
            ctx.json({
              code: 422,
              message: "couldn't perform required operation",
            }),
          );
    },
  ),
  rest.put(
    `${baseURLPrefix}/workloads/applications/:appId/clusters/:clusterId/virtual-machines/:virtualMachineId/stop`,
    (_, res, ctx) => {
      const success = Math.random() < 0.8;
      return success
        ? res(ctx.status(204))
        : res(
            ctx.status(422),
            ctx.json({
              code: 422,
              message: "couldn't perform required operation",
            }),
          );
    },
  ),
  rest.put(
    `${baseURLPrefix}/workloads/pods/clusters/:clusterId/namespaces/:namespace/pods/:podName/delete`,
    (_, res, ctx) => {
      const success = Math.random() < 0.8;
      return success
        ? res(ctx.status(204))
        : res(
            ctx.status(422),
            ctx.json({
              code: 422,
              message: "couldn't perform required operation",
            }),
          );
    },
  ),
];
