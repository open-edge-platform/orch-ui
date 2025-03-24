/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { NavigateFunction } from "react-router-dom";
import {
  setLoadingBranch,
  setRegion,
  setSite,
} from "../../../../store/locations";
import { AppDispatch } from "../../../../store/store";

const sitesRoute = "sites";
const regionsRoute = "regions";

export const handleViewRegionAction = (
  dispatch: AppDispatch,
  region: eim.RegionRead,
) => {
  if (!region.resourceId) return;
  dispatch(setRegion(region));
};

export const handleAddSiteAction = (
  navigate: NavigateFunction,
  region: eim.RegionRead,
) => {
  if (!region.resourceId) return;
  navigate(`../regions/${region.resourceId}/${sitesRoute}/new?source=region`, {
    relative: "path",
  });
};

export const handleSubRegionAction = (
  navigate: NavigateFunction,
  region: eim.RegionRead,
) => {
  if (!region || !region.resourceId) return;
  navigate(`../${regionsRoute}/parent/${region.resourceId}/new`, {
    relative: "path",
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
