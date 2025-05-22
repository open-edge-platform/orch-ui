/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SharedStorage } from "@orch-ui/utils";
import { rest } from "msw";
import AlertStore from "../store/alerts";

const baseURL = "/v1";

const as = new AlertStore();

const projectName = SharedStorage.project?.name;

// alerts
export const handlers = [
  rest.get(`${baseURL}/projects/${projectName}/alerts`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ alerts: as.list() }));
  }),
];
