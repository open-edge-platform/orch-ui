/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { componentStatusApi as api } from "./apiSlice";

export interface OrchestratorStatus {
  /** UTC wall-clock time of the orchestrator at the moment of the response.
   *  Parsed from the `Date` HTTP response header. `null` if the header was
   *  absent or unreadable (e.g. Access-Control-Expose-Headers not yet deployed). */
  serverTime: string | null;
  /** Raw config payload from the response body. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const injectedApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrchestratorStatus: build.query<OrchestratorStatus, void>({
      query: () => ({
        url: "/v1/orchestrator",
        // Use a custom responseHandler to capture both the JSON body and
        // the Date response header in a single round-trip.
        responseHandler: async (response: Response): Promise<OrchestratorStatus> => {
          const serverTime = response.headers.get("Date");
          const body = response.ok ? await response.json() : {};
          return { ...body, serverTime };
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrchestratorStatusQuery } = injectedApi;
export { injectedApi as componentStatusApis };
