/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rest } from "msw";
import { baseURL } from "../base-url";
import AlertDefinitionStore from "../store/alert-definitions";

const alertDefinitionStore = new AlertDefinitionStore();

export const handlers = [
  rest.get(
    `${baseURL}/alerts/definitions/:alertDefinitionID`,
    (req, res, ctx) => {
      const { alertDefinitionID } = req.params as { alertDefinitionID: string };
      const alert = alertDefinitionStore.get(alertDefinitionID);
      if (!alert) {
        return res(
          ctx.status(404),
          ctx.json({ error: "Alert definition not found" }),
        );
      }
      return res(ctx.status(200), ctx.json(alert));
    },
  ),

  rest.put(
    `${baseURL}/alerts/definitions/:alertDefinitionID`,
    async (req, res, ctx) => {
      const { alertDefinitionID } = req.params as { alertDefinitionID: string };
      const { values } = (await req.json()) as {
        values: {
          threshold: string;
          duration: string;
          enabled: string;
        };
      };

      try {
        const updated = alertDefinitionStore.put(alertDefinitionID, { values });

        if (!updated) {
          return res(
            ctx.status(404),
            ctx.json({ error: "Alert definition not found" }),
          );
        }

        return res(ctx.status(200), ctx.json(updated));
      } catch (err) {
        return res(
          ctx.status(500),
          ctx.json({ error: "Internal server error" }),
        );
      }
    },
  ),
];
