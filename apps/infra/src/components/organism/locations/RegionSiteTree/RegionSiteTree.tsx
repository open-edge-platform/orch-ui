/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, SquareSpinner, Tree, TreeNode } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegionDynamicProps } from "../../../../components/atom/locations/Region/Region";
import { SiteDynamicProps } from "../../../../components/atom/locations/Site/Site";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  resetTree,
  ROOT_REGIONS,
  selectRegionSiteTreeState,
  selectSearchTerm,
  setLoadingBranch,
  setLoadingRegion,
  setMaintenanceEntity,
  setNodesBranch,
  setNodesRoot,
  setPage,
  setRegionSiteCount,
  setSearchTerm,
  setTreeBranchNodeCollapse,
} from "../../../../store/locations";
import {
  TreeBranchState,
  TreeBranchStateUtils,
} from "../../../../store/locations.treeBranch";
import {
  handleAddSiteAction,
  handleSiteViewAction,
  handleSubRegionAction,
  handleViewRegionAction,
} from "./RegionSiteTree.handlers";
import { generateTreeJsx } from "./RegionSiteTree.helpers";
import "./RegionSiteTree.scss";
const dataCy = "regionSiteTree";
export const ORDER_BY: string = "name asc";
const clearTree: string = "clearTree";

export interface RegionSiteTreeProps {
  regionProps?: RegionDynamicProps;
  siteDynamicProps?: SiteDynamicProps;
  showSingleSelection?: boolean;
}

export const RegionSiteTree = ({
  regionProps = {},
  siteDynamicProps = {},
  showSingleSelection,
}: RegionSiteTreeProps) => {
  const cy = { "data-cy": dataCy };
  const className = "region-site-tree";
  const navigate = useNavigate();
  const location = useLocation();

  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedSite = siteDynamicProps.selectedSite;
  const dispatch = useAppDispatch();

  const {
    branches,
    currentRegionId,
    rootId,
    expandedRegionIds,
    searchIsPristine,
    isLoadingTree,
    page,
  } = useAppSelector(selectRegionSiteTreeState);

  const shouldSkipRegionApi =
    !currentRegionId || searchIsPristine || showSingleSelection;
  const shouldSkipSiteApi =
    currentRegionId === ROOT_REGIONS || shouldSkipRegionApi;
  const {
    data: { regions } = {},
    isFetching: isFetchingRegions,
    isError: isErrorRegions,
    refetch,
    isUninitialized, // If query is not fetched before
  } = infra.useGetV1ProjectsByProjectNameRegionsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      // TODO: use `parent` param here rather than `filter`
      filter:
        currentRegionId === ROOT_REGIONS
          ? "NOT has(parentRegion)"
          : `parentRegion.resourceId="${currentRegionId}"`,
      orderBy: ORDER_BY,
      showTotalSites: true,
    },
    {
      skip: shouldSkipRegionApi || !SharedStorage.project?.name,
    },
  );

  // Refetch API if api is previously called and if the project change to update component
  useEffect(() => {
    if (!isUninitialized) refetch();
  }, [SharedStorage.project?.name]);

  const getSiteCount = async (id: string) => {
    const apiCallRegion =
      infra.infra.endpoints.getV1ProjectsByProjectNameRegions.initiate(
        {
          projectName: SharedStorage.project?.name ?? "",
          filter: `resourceId="${id}"`,
          orderBy: ORDER_BY,
          showTotalSites: true,
        },
        { forceRefetch: true },
      );
    const { data } = await dispatch(apiCallRegion);
    if (!data) return;
    const { regions = [] } = data;
    const { totalSites } = regions[0];
    dispatch(setRegionSiteCount(totalSites ?? 0));
  };

  const {
    data: { sites } = {},
    isFetching: isFetchingSites,
    isError: isErrorSites,
  } = infra.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      orderBy: ORDER_BY,
      regionId: currentRegionId ?? "",
      filter: `region.resourceId="${currentRegionId}"`,
    },
    {
      // This will skip above api if region or project is missing
      skip: shouldSkipSiteApi || !SharedStorage.project?.name,
    },
  );

  const hasRegionResults = !isFetchingRegions && regions;
  const hasSiteResults = !isFetchingSites && sites;

  const viewRegionAction = useCallback(
    (region: infra.RegionRead) => handleViewRegionAction(dispatch, region),
    [],
  );
  const viewSiteAction = useCallback(
    (site: infra.SiteRead) => handleSiteViewAction(dispatch, site),
    [],
  );
  const addSiteAction = useCallback(
    (region: infra.RegionRead) => handleAddSiteAction(navigate, region),
    [],
  );
  const subRegionAction = useCallback(
    (region: infra.RegionRead) => handleSubRegionAction(navigate, region),
    [],
  );
  const scheduleMaintenanceAction = useCallback((region: infra.RegionRead) => {
    dispatch(
      setMaintenanceEntity({
        targetEntity: region,
        targetEntityType: "region",
        showBack: false,
      }),
    );
  }, []);

  const onExpand = useCallback(({ id }: TreeNode) => {
    dispatch(setLoadingBranch(id));
  }, []);

  const onCollapse = useCallback(({ id }: TreeNode) => {
    dispatch(setTreeBranchNodeCollapse(id));
  }, []);

  useEffect(() => {
    if (
      (page !== location.pathname + location.search && page !== undefined) ||
      localStorage.getItem(clearTree) === "true"
    ) {
      localStorage.removeItem(clearTree);
      dispatch(infra.infra.util.invalidateTags([{ type: "Region" }]));
      dispatch(resetTree(location.pathname + location.search));
      return;
    }
    if (page === undefined) {
      dispatch(setPage(location.pathname + location.search));
    }
  }, [page]);

  useEffect(() => {
    if (expandedRegionIds.length === 0) return;
  }, [expandedRegionIds]);

  useEffect(() => {
    if (currentRegionId === ROOT_REGIONS && hasRegionResults) {
      dispatch(setNodesRoot(regions));
      return;
    }
    if (currentRegionId !== ROOT_REGIONS && isFetchingRegions)
      dispatch(setLoadingRegion(true));

    if (currentRegionId && hasRegionResults && hasSiteResults) {
      dispatch(setNodesBranch({ regions, sites }));
    }

    if (rootId && branches.length > 0 && (hasRegionResults || hasSiteResults))
      getSiteCount(rootId);
  }, [isFetchingRegions, isFetchingSites, regions]);

  useEffect(() => {
    if (!showSingleSelection || !selectedSite || !selectedSite.name) {
      return;
    }
    dispatch(infra.infra.util.invalidateTags([{ type: "Location" }]));
    dispatch(setSearchTerm(selectedSite.name));
  }, [showSingleSelection, selectedSite]);

  const createSingleSelectionTree = (): TreeBranchState<
    infra.SiteRead | infra.RegionRead
  >[] => {
    if (!selectedSite || !selectedSite.resourceId)
      throw new Error("Selected site is missing resourceId");
    const startingNode = TreeBranchStateUtils.findValid(
      selectedSite.resourceId,
      branches,
    );
    if (!startingNode) return [];
    const startingRoot = TreeBranchStateUtils.findRoot(startingNode, branches);
    if (!startingRoot) throw new Error("Couldn't get root of selected site");
    return [startingRoot];
  };

  const jsx = useMemo(() => {
    if (isLoadingTree !== false) return <SquareSpinner />;

    if (branches.length === 0)
      return (
        <div className={`${className}__no-results`} data-cy="noResults">
          <Icon
            icon="magnifier-cancel"
            className={`${className}__no-results-icon`}
          />
          <p>No results found</p>
        </div>
      );

    const jsxBranches = generateTreeJsx(
      showSingleSelection && selectedSite && searchTerm && branches.length > 0
        ? createSingleSelectionTree()
        : branches,
      {
        onExpand,
        onCollapse,
      },
      {
        regionProps: {
          showActionsMenu: true,
          viewHandler: viewRegionAction,
          addSiteHandler: addSiteAction,
          addSubRegionHandler: subRegionAction,
          scheduleMaintenanceHandler: scheduleMaintenanceAction,
          deleteHandler: () => {},
          ...regionProps,
        },
        siteDynamicProps: {
          ...siteDynamicProps,
          viewHandler: viewSiteAction,
        },
      },
    );
    return (
      <Tree
        branches={jsxBranches}
        onExpand={onExpand}
        onCollapse={onCollapse}
      />
    );
  }, [branches, siteDynamicProps.selectedSite]);

  return (
    <div {...cy} className={className}>
      {!isErrorRegions && !isErrorSites ? (
        jsx
      ) : (
        <ApiError error={"Region/Site data retrieval did not succeed"} />
      )}
    </div>
  );
};
