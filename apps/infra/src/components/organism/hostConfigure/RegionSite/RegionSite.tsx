/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  selectFirstHost,
  setRegion,
  setSite,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RegionSiteSelectTree } from "../RegionSiteSelectTree/RegionSiteSelectTree";

const dataCy = "hostSiteSelect";

export const RegionSite = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { site: selectedSite } = useAppSelector(selectFirstHost);

  const handleOnSiteSelected = (site: infra.SiteRead) => {
    // Dispatches to configureHost reducer
    dispatch(setRegion({ region: site.region as infra.RegionRead }));
    dispatch(setSite({ site: site }));
  };

  return (
    <div {...cy}>
      <RegionSiteSelectTree
        // The selected site is stored as SiteWrite within redux of HostConfigure having HostWrite.
        // The infra.ts enforces HostWrite to have RegionWrite or SiteWrite.
        // removing below line would cause error in eslint.
        selectedSite={selectedSite as infra.SiteRead}
        handleOnSiteSelected={handleOnSiteSelected}
      />
    </div>
  );
};
