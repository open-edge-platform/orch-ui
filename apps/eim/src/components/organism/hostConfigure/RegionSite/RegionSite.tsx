/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  selectFirstHost,
  setRegion,
  setSite,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RegionSiteSelectTree } from "../RegionSiteSelectTree/RegionSiteSelectTree";

export const dataCy = "hostSiteSelect";

export const RegionSite = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { site: selectedSite } = useAppSelector(selectFirstHost);

  const handleOnSiteSelected = (site: eim.SiteRead) => {
    // Dispatches to configureHost reducer
    dispatch(setRegion({ region: site.region as eim.RegionRead }));
    dispatch(setSite({ site: site }));
  };

  return (
    <div {...cy}>
      <RegionSiteSelectTree
        // The selected site is stored as SiteWrite within redux of HostConfigure having HostWrite.
        // The eim.ts enforces HostWrite to have RegionWrite or SiteWrite.
        // removing below line would cause error in eslint.
        selectedSite={selectedSite as eim.SiteRead}
        handleOnSiteSelected={handleOnSiteSelected}
      />
    </div>
  );
};
