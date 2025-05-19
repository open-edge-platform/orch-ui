/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { rest } from "msw";
import { baseURL } from "../base-url";
import { randomizeHostList } from "../data.helpers";
import { RegionStore } from "../store/regions";
import { SiteStore } from "../store/sites";
// import { HostStore } from "library/utils/mocks/infra/store/hosts";
import { HostStore } from "../../../mocks/infra/store/hosts";

export const regionStore = new RegionStore();
export const siteStore = new SiteStore();
export const hostStore = new HostStore();

const delay = 1 * 1000;

export const handlers = [
  rest.get(`${baseURL}/compute/hosts`, async (req, res, ctx) => {
    console.log("GET /compute/hosts");
    const siteID = req.url.searchParams.get("siteID");
    const deviceUuid = req.url.searchParams.get("uuid");
    const metadataString = req.url.searchParams.get("metadata");
    const filter = req.url.searchParams.get("filter");
    let hosts = hostStore.list({
      siteID,
      deviceUuid,
      ...(filter ? { filter } : {}),
    });

    if (
      deviceUuid &&
      !deviceUuid.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
      )
    ) {
      return await res(
        ctx.status(400),
        ctx.json({ message: "parameter UUID has wrong format" }),
      );
    }

    if (metadataString) {
      hosts = hosts.filter((host) => {
        let matchSimilarity = 0;
        const metadataParam = metadataString.split(",");
        // For each metadata
        metadataParam.forEach((keyValuePairs) => {
          // End if atleast one metadata matched from the ous
          const [key, value] = keyValuePairs.split("=");
          const metadataSet = host.inheritedMetadata?.location?.concat(
            host.metadata ?? [],
          );
          if (metadataSet) {
            for (let i = 0; i < metadataSet.length; i++) {
              if (
                metadataSet[i].key === key &&
                metadataSet[i].value === value
              ) {
                matchSimilarity++;
                break;
              }
            }
          }
        });

        // If the all metadata within `ous` matches
        return matchSimilarity === metadataParam.length;
      });
    }

    if (hosts.length > 0) {
      hosts = randomizeHostList(hosts);
    }
    return await res(
      ctx.status(200),
      ctx.json<infra.GetV1ProjectsByProjectNameComputeHostsApiResponse>({
        hasNext: false,
        hosts,
        totalElements: hosts.length,
      }),
      ctx.delay(delay),
    );
  }),
];
