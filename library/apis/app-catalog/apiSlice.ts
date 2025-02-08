/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserToken } from "../../utils/authConfig/authConfig";
import { RuntimeConfig } from "../../utils/runtime-config/runtime-config";
import { UploadCatalogEntitiesResponse } from "./catalogServiceApis";

// If we are running Unit tests, then we want to ignore the Runtime Config
const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.catalogApiUrl;

export interface UploadDeploymentPackageResponse {
  responses: UploadCatalogEntitiesResponse[];
}

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
export const appCatalogApis = createApi({
  reducerPath: "catalogServiceApis",
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
  endpoints: (builder) => ({
    uploadDeploymentPackage: builder.mutation<
      UploadDeploymentPackageResponse,
      UploadDeploymentPackageArgs
    >({
      query: (queryArg) => ({
        url: `/v3/projects/${queryArg.projectName}/catalog/upload`,
        method: "POST",
        body: queryArg.data,
        formData: true,
      }),
    }),
    // Adding new endpoint to list Charts
    CatalogServiceListCharts: builder.query<
      string[],
      CatalogServiceListChartsApiArg
    >({
      query(queryArg) {
        return {
          url: `/v3/projects/${queryArg.projectName}/catalog/charts`,
          params: {
            registry: queryArg.registry,
            chart: queryArg.chart,
          },
        };
      },
    }),
  }),
});

export const {
  useUploadDeploymentPackageMutation,
  useCatalogServiceListChartsQuery,
} = appCatalogApis;
