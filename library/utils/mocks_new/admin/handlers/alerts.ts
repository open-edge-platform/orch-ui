/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rest } from "msw";
import { baseURL } from "../base-url";
import AlertStore from "../store/alerts";

const alertStore = new AlertStore();

export const handlers = [
  rest.get(`${baseURL}/alerts`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ alerts: alertStore.list() }));
  }),
];
