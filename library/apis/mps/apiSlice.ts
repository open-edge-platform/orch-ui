/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.mpsApiUrl;

// initialize an empty api service that we'll inject endpoints into later as needed
export const mpsApi = createApi({
  reducerPath: "mpsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("Accept", "application/json");
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
