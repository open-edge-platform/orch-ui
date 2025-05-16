/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { rest } from "msw";
import { baseURL } from "../base-url";
import { getTotalSiteInRegion } from "../store.helpers";
import { RegionStore } from "../store/regions";
import { SiteStore } from "../store/sites";

export const regionStore = new RegionStore();
export const siteStore = new SiteStore();

export const handlers = [
  rest.get(`${baseURL}/regions`, async (req, res, ctx) => {
    const filter = req.url.searchParams.get("filter");
    const isTotalSitesShown = req.url.searchParams.get("showTotalSites");
    let parent, regionId;
    if (filter) {
      if (filter.match(/NOT has\(parentRegion\)/)) {
        parent = "null";
      } else if (filter.match(/parentRegion\.resourceId=/)) {
        const matches = filter.match(/parentRegion\.resourceId="(.*)"/);
        if (matches && matches.length > 0) parent = matches[1];
      } else if (filter.match(/^resourceId=/)) {
        const matches = filter.match(/^resourceId="(.*)"/);
        if (matches && matches.length > 0) regionId = matches[1];
      }
    }

    let regions: infra.RegionRead[] = [];
    if (regionId) {
      const region = regionStore.get(regionId);
      if (region) regions = [region];
    } else if (parent) {
      regions = regionStore.list(parent);
    } else {
      regions = regionStore.list();
    }

    if (isTotalSitesShown) {
      regions = regions.map((subregion) => ({
        ...subregion,
        totalSites: getTotalSiteInRegion(subregion, regionStore, siteStore),
      }));
    }

    return res(
      ctx.status(200),
      ctx.json<infra.GetV1ProjectsByProjectNameRegionsApiResponse>({
        hasNext: false,
        regions,
        totalElements: regions.length,
      }),
    );
  }),
];
