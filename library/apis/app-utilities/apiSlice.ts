/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// If we are running Unit tests, then we want to ignore the Runtime Config
const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.catalogApiUrl;

export interface UploadDeploymentPackageArgs {
  projectName: string;
  data: FormData;
}

export type CatalogServiceListChartsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The name of registry. */
  registry: string;
  /** The name of chart. */
  chart?: string;
};
export type KINDS = "KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON";

// initialize an empty api service that we'll inject endpoints into later as needed
export const appUtilitiesApis = createApi({
  reducerPath: "appUtilitiesServiceApis",
  refetchOnMountOrArgChange: "Cypress" in window,
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
