/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mbApi } from "@orch-ui/apis";
import { http , delay} from "msw"
import MetadataStore from "./metadata";

const baseURL = "/resource.orchui-u.apis";
const metadataStore = new MetadataStore();
export const handlers = [
  http.post(`${baseURL}/v1/projects/**/metadata`, async (req, res, ctx) {
  await delay(500); 
    const apiResult = await req.json<any, mbApi.MetadataList>();
    metadataStore.post(apiResult);

    return HttpResponse.text(
{status: 200,
});
  }),
  http.get(`${baseURL}/v1/projects/**/metadata`, async (_, res, ctx) {
  await delay(500); 
    return HttpResponse.text(
{status: 200,
});
  }),
];
