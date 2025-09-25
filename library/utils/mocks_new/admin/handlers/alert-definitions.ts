/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { http, HttpResponse } from "msw";
import { baseURL } from "../base-url";
import AlertDefinitionStore from "../store/alert-definitions";

const alertDefinitionStore = new AlertDefinitionStore();

export const handlers = [
  http.get(`${baseURL}/alerts/definitions/:alertDefinitionID`, ({ params }) => {
    const { alertDefinitionID } = params as { alertDefinitionID: string };
    const alert = alertDefinitionStore.get(alertDefinitionID);
    if (!alert) {
      return HttpResponse.json(
        { error: "Alert definition not found" },
        { status: 404 },
      );
    }
    return HttpResponse.json(alert, { status: 200 });
  }),

  http.put(
    `${baseURL}/alerts/definitions/:alertDefinitionID`,
    async ({ request, params }) => {
      const { alertDefinitionID } = params as { alertDefinitionID: string };
      const { values } = (await request.json()) as {
        values: {
          threshold: string;
          duration: string;
          enabled: string;
        };
      };

      try {
        const updated = alertDefinitionStore.put(alertDefinitionID, { values });

        if (!updated) {
          return HttpResponse.json(
            { error: "Alert definition not found" },
            { status: 404 },
          );
        }

        return HttpResponse.json(updated, { status: 200 });
      } catch (err) {
        return HttpResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    },
  ),
];
