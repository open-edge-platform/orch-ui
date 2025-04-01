/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// If we are running Unit tests, then we want to ignore the Runtime Config
const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.mbApiUrl;

export const metadataBrokerApi = createApi({
  reducerPath: "metadataBrokerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      // NOTE that if the token is not present then the UI is not rendered at all
      // this handling happens in the AuthContext component
      if (getUserToken() && endpoint !== "refresh") {
        headers.set("Authorization", `Bearer ${getUserToken()}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
