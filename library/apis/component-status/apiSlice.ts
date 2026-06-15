/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getUserToken, RuntimeConfig } from "@orch-ui/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// All API servers share the same api.<domain> host; derive the origin
// from infraApiUrl (any public getter works).  In Cypress component tests
// RuntimeConfig falls back to window.location.origin automatically.
const baseUrl: string = (() => {
  try {
    const u = new URL(
      window.Cypress?.testingType === "component"
        ? window.location.origin
        : RuntimeConfig.infraApiUrl,
    );
    return `${u.protocol}//${u.host}`;
  } catch {
    return window.location.origin;
  }
})();

export const componentStatusApi = createApi({
  reducerPath: "componentStatusApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const token = getUserToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
