/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { regionSiteRoute, subRegionRoute } from "@orch-ui/utils";
import {
  setLoadingBranch,
  setRegion,
  setSite,
} from "../../../../store/locations";
import { AppDispatch } from "../../../../store/store";

export const handleViewRegionAction = (
  dispatch: AppDispatch,
  region: eim.RegionRead,
) => {
  if (!region.resourceId) return;
  dispatch(setRegion(region));
};

export const handleAddSiteAction = (navigate: any, region: eim.RegionRead) => {
  if (!region.resourceId) return;
  navigate(
    regionSiteRoute,
    {
      regionId: region.resourceId ?? "",
      siteId: "new",
    },
    "?source=region",
  );
};

export const handleSubRegionAction = (
  navigate: any,
  region: eim.RegionRead,
) => {
  if (!region || !region.resourceId) return;
  navigate(subRegionRoute, {
    parentRegionId: region.resourceId ?? "",
    regionId: "new",
  });
};

export const handleSiteViewAction = (
  dispatch: AppDispatch,
  site: eim.SiteRead,
) => {
  if (!site.resourceId || !site.region || !site.region.resourceId) return;
  dispatch(setLoadingBranch(site.region.resourceId));
  dispatch(setSite(site));
};
