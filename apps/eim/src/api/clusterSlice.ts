/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

// TODO remove as part of LPUUH-1739

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const mcUrlPrefix = "cluster.orchestrator.apis";

// If we are running Unit tests, then we want to ignore the Runtime Config
const baseUrl: string =
  window.Cypress?.testingType === "component"
    ? window.location.origin
    : RuntimeConfig.coApiUrl;

export const addTagTypes = ["ECM Cluster"] as const;

export type PostV1ClustersApiResponse = /** status 201 OK */ string;
export type NodeSpec = {
  nodeGuid: string;
  nodeRole: "all" | "controlplane" | "worker";
};
export type Location = {
  locationType?:
    | "LOCATION_TYPE_SITE_ID"
    | "LOCATION_TYPE_SITE_NAME"
    | "LOCATION_TYPE_REGION_ID"
    | "LOCATION_TYPE_REGION_NAME";
  locationInfo?: string;
};
export type ClusterSpec = {
  clusterName?: string;
  clusterLabels: {
    [key: string]: string;
  };
  clusterTemplateName?: string;
  nodeList: NodeSpec[];
  locationList: Location[];
};
export type PostV1ClustersApiArg = {
  clusterSpec: ClusterSpec;
};

export const mcApi = createApi({
  reducerPath: "mcApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/${mcUrlPrefix}`,
    prepareHeaders: (headers, { endpoint }) => {
      // NOTE that if the token is not present then the UI is not rendered at all
      // this handling happens in the AuthContext component
      if (getUserToken() && endpoint !== "refresh") {
        headers.set("Authorization", `Bearer ${getUserToken()}`);
      }
      return headers;
    },
  }),
  tagTypes: addTagTypes,
  endpoints: (build) => ({
    postV1Clusters: build.mutation<
      PostV1ClustersApiResponse,
      PostV1ClustersApiArg
    >({
      query: (queryArg) => ({
        url: "/v1/clusters",
        method: "POST",
        body: queryArg.clusterSpec,
      }),
      invalidatesTags: ["ECM Cluster"],
    }),
  }),
});

export const { usePostV1ClustersMutation } = mcApi;
