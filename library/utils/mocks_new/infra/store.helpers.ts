/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { RegionStore } from "./store/regions";
import { SiteStore } from "./store/sites";

export const getTotalSiteInRegion = (
  region: infra.RegionRead,
  regionStore: RegionStore,
  siteStore: SiteStore,
) => {
  if (region.resourceId) {
    let siteList = siteStore.list({ regionId: region.resourceId }).length;
    regionStore.list(region.resourceId).forEach((subRegion) => {
      siteList += getTotalSiteInRegion(subRegion, regionStore, siteStore);
    });
    return siteList;
  }
  return 0;
};
