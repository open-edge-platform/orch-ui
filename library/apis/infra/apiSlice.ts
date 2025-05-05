/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

// If we are running Unit tests, then we want to ignore the Runtime Config
const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.infraApiUrl;

const staggeredBaseQueryWith404NoRetry = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
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
      paramsSerializer: (params: Record<string, unknown>) =>
        queryString.stringify(params, { arrayFormat: "none" }),
    })(args, api, extraOptions);

    // bail out of re-tries immediately if 404,
    // because we know successive re-retries would be redundant
    // TODO: refer to maxRetries
    if (
      result.error?.status === 404 &&
      result.meta?.request.method === "GET" &&
      result.meta?.request.url.includes("/schedules")
    ) {
      retry.fail(result.error);
    }

    return result;
  },
  // TODO: maxRetries: make this work with maxRetries=1
  {
    maxRetries: 0,
  },
);

export const infraApi = createApi({
  reducerPath: "infraApi",
  refetchOnMountOrArgChange: "Cypress" in window,
  baseQuery: staggeredBaseQueryWith404NoRetry,
  endpoints: () => ({}),
});
