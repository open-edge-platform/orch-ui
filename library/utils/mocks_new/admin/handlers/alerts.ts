/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { http , HttpResponse} from "msw"
import { baseURL } from "../base-url";
import AlertStore from "../store/alerts";

const alertStore = new AlertStore();

export const handlers = [
  http.get(`${baseURL}/alerts`, () => {
    return HttpResponse.json(
{ alerts: alertStore.list() },
{status: 200,
});
  }),
];
