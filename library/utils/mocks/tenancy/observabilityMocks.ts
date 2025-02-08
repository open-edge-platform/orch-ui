/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { rest } from "msw";
import { SharedStorage } from "../../shared-storage/shared-storage";
import AlertDefinitionStore from "./data/alertDefinitions";
import AlertDefinitionTemplateStore from "./data/alertDefinitionTemplates";
import AlertStore from "./data/alerts";
import ReceiversStore from "./data/receivers";

const baseURL = "/v1";

const as = new AlertStore();
const ads = new AlertDefinitionStore();
const adts = new AlertDefinitionTemplateStore();
const rs = new ReceiversStore();

const projectName = SharedStorage.project?.name;

// alerts
export const handlers = [
  rest.get(`${baseURL}/projects/${projectName}/alerts`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ alerts: as.list() }));
  }),
  rest.get(
    `${baseURL}/projects/${projectName}/alerts/definitions`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ alertDefinitions: ads.list() }));
    },
  ),
  rest.get(
    `${baseURL}/projects/${projectName}/alerts/receivers`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ receivers: rs.list() }));
    },
  ),
  rest.get(
    `${baseURL}/projects/${projectName}/alerts/definitions/:alertDefinitionId/templates`,
    (req, res, ctx) => {
      const { alertDefinitionId } = req.params;
      return res(
        ctx.status(200),
        ctx.json(adts.get(alertDefinitionId as string)),
      );
    },
  ),
  rest.patch(
    `${baseURL}/projects/${projectName}/alerts/receivers/:receiverId`,
    (_, res, ctx) => {
      return res(ctx.status(204));
    },
  ),
  rest.patch(
    `${baseURL}/projects/${projectName}/alerts/definitions/:alertDefinitionId`,
    (_, res, ctx) => {
      return res(ctx.status(503));
    },
  ),
];
