/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { mbApi } from "@orch-ui/apis";
import { rest } from "msw";
import MetadataStore from "./metadata";

const baseURL = "/resource.orchui-u.apis";
const metadataStore = new MetadataStore();
export const handlers = [
  rest.post(`${baseURL}/v1/projects/**/metadata`, async (req, res, ctx) => {
    const apiResult = await req.json<mbApi.MetadataList>();
    metadataStore.post(apiResult);

    return res(
      ctx.status(200),
      ctx.json<mbApi.MetadataServiceCreateOrUpdateMetadataApiResponse>({
        metadata: metadataStore.list(),
      }),
      ctx.delay(500),
    );
  }),
  rest.get(`${baseURL}/v1/projects/**/metadata`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<mbApi.MetadataServiceGetMetadataApiResponse>({
        metadata: metadataStore.list(),
      }),
      ctx.delay(500),
    );
  }),
];
