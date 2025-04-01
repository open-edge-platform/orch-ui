/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Drawer } from "@spark-design/react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  SearchTypes,
  selectSite as selectedSiteToView,
  setSite as setSiteLocations,
} from "../../../../store/locations";
import { DrawerHeader } from "../../../molecules/DrawerHeader/DrawerHeader";
import {
  Search,
  SearchTypeItem,
} from "../../../molecules/locations/Search/Search";
import { RegionSiteTree } from "../../locations/RegionSiteTree/RegionSiteTree";
import { SiteView } from "../../locations/SiteView/SiteView";

import "./RegionSiteSelectTree.scss";

const dataCy = "stepTwoRegionAndSite";

interface SiteSelectProps {
  handleOnSiteSelected: (value: eim.SiteRead) => void;
  selectedSite?: eim.SiteRead;
  showSingleSelection?: boolean;
}

export const RegionSiteSelectTree = ({
  selectedSite,
  handleOnSiteSelected,
  showSingleSelection,
}: SiteSelectProps) => {
  const cy = { "data-cy": dataCy };
  const searchTypes: SearchTypeItem[] = Object.keys(SearchTypes).map((key) => ({
    id: key,
    name: `Search ${key}`,
  }));
  const dispatch = useAppDispatch();
  const siteToView = useAppSelector(selectedSiteToView);

  return (
    <div
      {...cy}
      className={`region-site-select-tree ${showSingleSelection ? "disable-controls" : ""}`.trim()}
    >
      <Flex cols={[5, 7]}>
        <Search searchTypes={searchTypes} defaultSearchType={searchTypes[0]} />
      </Flex>
      <RegionSiteTree
        regionProps={{ showActionsMenu: false }}
        siteDynamicProps={{
          selectedSite: selectedSite,
          isSelectable: true,
          handleOnSiteSelected: handleOnSiteSelected,
        }}
        showSingleSelection={showSingleSelection}
      />
      <Drawer
        show={siteToView !== undefined}
        headerProps={{
          headerContent: siteToView && (
            <DrawerHeader
              targetEntity={siteToView}
              targetEntityType="site"
              onClose={() => dispatch(setSiteLocations(undefined))}
            />
          ),
        }}
        bodyContent={<SiteView basePath="../" hideActions />}
        backdropClosable
        onHide={() => dispatch(setSiteLocations(undefined))}
      />
    </div>
  );
};
