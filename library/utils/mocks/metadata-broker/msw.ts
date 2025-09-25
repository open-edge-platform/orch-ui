/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mbApi } from "@orch-ui/apis";
import { delay, http, HttpResponse } from "msw";
import MetadataStore from "./metadata";

const baseURL = "/resource.orchui-u.apis";
const metadataStore = new MetadataStore();
export const handlers = [
  http.post(`${baseURL}/v1/projects/**/metadata`, async ({ request }) => {
    await delay(500);
    const apiResult = (await request.json()) as mbApi.MetadataList;
    metadataStore.post(apiResult);

    return HttpResponse.json<mbApi.MetadataServiceCreateOrUpdateMetadataApiResponse>(
      {
        metadata: metadataStore.list(),
      },
      { status: 200 },
    );
  }),
  http.get(`${baseURL}/v1/projects/**/metadata`, async () => {
    await delay(500);
    return HttpResponse.json<mbApi.MetadataServiceGetMetadataApiResponse>(
      {
        metadata: metadataStore.list(),
      },
      { status: 200 },
    );
  }),
];
