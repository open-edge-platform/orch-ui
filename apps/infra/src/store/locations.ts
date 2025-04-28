/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice, infra } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TreeBranchState, TreeBranchStateUtils } from "./locations.treeBranch";

export const ROOT_REGIONS: string = "null";
export const locationsSliceName = "locations";
export interface _LocationsRootState {
  [locationsSliceName]: LocationsState;
}

interface LocationScheduleMaintenanceTargetEntity {
  targetEntity: enhancedEimSlice.ScheduleMaintenanceTargetEntity;
  targetEntityType: enhancedEimSlice.ScheduleMaintenanceTargetEntityType;
  showBack?: boolean;
}

export interface RootSiteCounts {
  totalSites?: number;
  resourceId?: string;
}

export enum SearchTypes {
  All = "All",
  Regions = "Regions",
  Sites = "Sites",
}

export interface LocationsState {
  regionId?: string;
  rootId?: string;
  region?: infra.RegionRead;
  regionToDelete?: infra.RegionRead;
  siteId?: string;
  site?: infra.SiteRead;
  siteToDelete?: infra.SiteRead;
  maintenanceEntity?: LocationScheduleMaintenanceTargetEntity;
  branches: TreeBranchState[];
  expandedRegionIds: string[];
  rootSiteCounts?: RootSiteCounts[];
  isEmpty?: boolean;
  isLoadingTree?: boolean;
  searchTerm?: string;
  searchIsPristine?: boolean;
  searchType?: SearchTypes;
  page?: string;
}

export interface SearchResult {
  resourceId: string;
  name: string;
  parentId?: string;
}

const initialState: LocationsState = {
  regionId: ROOT_REGIONS,
  branches: [],
  expandedRegionIds: [],
  searchType: SearchTypes.All,
};

export const locations = createSlice({
  name: locationsSliceName,
  initialState,
  reducers: {
    setRegion(
      state: LocationsState,
      action: PayloadAction<infra.RegionRead | undefined>,
    ) {
      state.region = action.payload;
    },
    setRegionSiteCount(state: LocationsState, action: PayloadAction<number>) {
      if (!state.rootId)
        throw new Error(
          "Attempted to set site count on non-existent resourceId",
        );

      const root = TreeBranchStateUtils.findValid(state.rootId, state.branches);
      (root?.data as infra.RegionRead).totalSites = action.payload;
      locations.caseReducers.setRootSiteCounts(state);
    },
    setMaintenanceEntity(
      state: LocationsState,
      action: PayloadAction<
        LocationScheduleMaintenanceTargetEntity | undefined
      >,
    ) {
      if (action.payload?.targetEntityType === "site") {
        state.site = undefined;
      } else if (action.payload?.targetEntityType === "region") {
        state.region = undefined;
      }
      state.maintenanceEntity = action.payload;
    },
    setRegionToDelete(
      state: LocationsState,
      action: PayloadAction<infra.RegionRead | undefined>,
    ) {
      state.regionId = undefined;
      state.regionToDelete = action.payload;
    },
    deleteTreeNode(state: LocationsState) {
      if (!state.regionToDelete) return;
      const { regionToDelete } = state;

      //first check if its a root node
      const node = TreeBranchStateUtils.find(
        regionToDelete.resourceId!,
        state.branches,
      );
      if (node?.isRoot) {
        const rootIndex = state.branches.findIndex(
          (root) => root.id === node.id,
        );
        state.branches.splice(rootIndex, 1);
        state.isEmpty = state.branches.length === 0;
        return;
      }

      const parent = TreeBranchStateUtils.find(
        regionToDelete.resourceId!,
        state.branches,
        true,
      );
      if (!parent || !parent.children) return;
      const { children } = parent;
      const index = children.findIndex((child) => {
        return child.id === regionToDelete.resourceId;
      });

      children.splice(index, 1);
      state.region = undefined;
    },

    setSearchTerm(
      state: LocationsState,
      action: PayloadAction<string | undefined>,
    ) {
      const searchTerm = action.payload;
      state.searchTerm = searchTerm;
      state.searchIsPristine = true;
      state.expandedRegionIds = [];
      state.regionId = undefined;
      state.branches = [];
      if (!searchTerm || searchTerm.length < 2) {
        state.regionId = ROOT_REGIONS;
        state.searchType = SearchTypes.All;
        state.searchIsPristine = false;
        state.isLoadingTree = true;
      }
    },
    setSite(
      state: LocationsState,
      action: PayloadAction<infra.SiteRead | undefined>,
    ) {
      state.site = action.payload;
    },
    setSiteToDelete(
      state: LocationsState,
      action: PayloadAction<infra.SiteRead | undefined>,
    ) {
      state.siteId = undefined;
      state.siteToDelete = action.payload;
      if (!state.siteToDelete || !state.siteToDelete.resourceId) return;
      const node = TreeBranchStateUtils.findValid(
        state.siteToDelete.resourceId,
        state.branches,
      );
      if (!node) return;
      const root = TreeBranchStateUtils.findRoot(node, state.branches);
      state.rootId = root?.id;
    },
    setIsLoadingTree(state: LocationsState, action: PayloadAction<boolean>) {
      state.isLoadingTree = action.payload;
      if (state.isLoadingTree) state.branches = [];
    },
    setLoadingBranch(state: LocationsState, action: PayloadAction<string>) {
      const regionId = action.payload;
      state.regionId = regionId; //helps trigger API call in component
      state.searchIsPristine = false;

      if (regionId === ROOT_REGIONS) return;
      const branch = TreeBranchStateUtils.findValid(regionId, state.branches);
      if (!branch) return;
      if (branch.children) branch.isExpanded = true;

      const root = TreeBranchStateUtils.findRoot(branch, state.branches);
      state.rootId = root?.id;
    },
    setLoadingRegion(state: LocationsState, action: PayloadAction<boolean>) {
      if (state.regionId && state.regionId !== ROOT_REGIONS) {
        const branch = TreeBranchStateUtils.findValid(
          state.regionId,
          state.branches,
        );
        if (!branch) return;
        branch.isLoading = action.payload;
      }
    },
    setNodesSearchResults(
      state: LocationsState,
      action: PayloadAction<SearchResult[]>,
    ) {
      const results = action.payload;
      const updatedBranches = TreeBranchStateUtils.createFromSearchResults(
        results,
        state.searchType!,
        state.rootSiteCounts,
      );
      state.branches = updatedBranches;
      state.isLoadingTree = false;
    },
    setNodesRoot(
      state: LocationsState,
      action: PayloadAction<infra.RegionRead[]>,
    ) {
      const regions = action.payload;
      const roots = [...state.branches];
      state.branches = TreeBranchStateUtils.createRegions(regions).map(
        (region) => {
          const root = roots.find((root) => root.id === region.id);
          return {
            ...region,
            isRoot: true,
            isExpanded: root?.isExpanded ?? false,
            children: root?.children ?? [],
          };
        },
      );
      //NEED to maintain expanded state
      state.isLoadingTree = false;
      state.isEmpty = state.branches.length === 0;
      locations.caseReducers.setRootSiteCounts(state);
    },
    setNodesBranch(
      state: LocationsState,
      action: PayloadAction<{
        regions: infra.RegionRead[];
        sites: infra.SiteRead[];
      }>,
    ) {
      const { regionId } = state;

      if (!regionId || regionId === ROOT_REGIONS) return;

      //keep track of expanded nodes
      if (!state.expandedRegionIds.find((id) => id === regionId))
        state.expandedRegionIds.push(regionId);

      const { regions, sites } = action.payload;
      const branch = TreeBranchStateUtils.findValid(regionId, state.branches);
      if (!branch) return;
      const root = TreeBranchStateUtils.findRoot(branch, state.branches);

      const { children } = branch;
      const updatedSites: TreeBranchState<infra.RegionRead | infra.SiteRead>[] =
        TreeBranchStateUtils.createSites(sites);
      let updatedRegions: TreeBranchState<infra.RegionRead | infra.SiteRead>[] =
        [];
      if (children) {
        regions.forEach((region: infra.RegionRead) => {
          const updatedRegion = TreeBranchStateUtils.createRegion(region);
          const existingRegion = children.find(
            (child) => child.id === region.resourceId,
          );
          if (existingRegion) {
            updatedRegion.children =
              (existingRegion.children as TreeBranchState<infra.RegionRead>[]) ??
              [];
            updatedRegion.isExpanded = existingRegion.isExpanded;
          }
          updatedRegions.push(updatedRegion);
        });
      } else updatedRegions = TreeBranchStateUtils.createRegions(regions);

      branch.isExpanded = true;
      branch.isLoading = false;
      branch.children = [...updatedSites, ...updatedRegions];
      state.rootId = root?.id;
      locations.caseReducers.setRootSiteCounts(state);
    },
    setRootSiteCounts(state: LocationsState) {
      if (state.branches.length === 0) return;
      state.rootSiteCounts = state.branches.map((rootNode) => {
        const { totalSites, resourceId } = rootNode.data as infra.RegionRead;
        return { totalSites, resourceId };
      });
    },
    setTreeBranchNodeCollapse(
      state: LocationsState,
      action: PayloadAction<string>,
    ) {
      const regionId = action.payload;
      const branch = TreeBranchStateUtils.findValid(regionId, state.branches);
      if (!branch) return;
      branch.isExpanded = false;
      branch.isLoading = false;

      delete state.regionId;

      const index = state.expandedRegionIds.findIndex((id) => id === regionId);
      if (index > -1) state.expandedRegionIds.splice(index, 1);
    },
    setSearchType(state: LocationsState, action: PayloadAction<SearchTypes>) {
      state.searchType = action.payload;
    },
    setIsEmpty(state: LocationsState, action: PayloadAction<boolean>) {
      state.isEmpty = action.payload;
      if (state.isEmpty === false) {
        state.regionId = ROOT_REGIONS;
      }
    },
    resetTree(state: LocationsState, action: PayloadAction<string>) {
      state.page = action.payload;
      state.regionId = ROOT_REGIONS;
      state.searchType = SearchTypes.All;
      state.searchTerm = undefined;
      state.searchIsPristine = false;
      state.isLoadingTree = true;
      state.branches = [];
    },
    setPage(state: LocationsState, action: PayloadAction<string>) {
      state.page = action.payload;
    },
  },
});

export const {
  setRegion,
  setRegionSiteCount,
  setMaintenanceEntity,
  setRegionToDelete,
  setSite,
  setIsEmpty,
  setSiteToDelete,
  setNodesBranch,
  setNodesSearchResults,
  setNodesRoot,
  setIsLoadingTree,
  setLoadingBranch,
  setLoadingRegion,
  setTreeBranchNodeCollapse,
  setSearchType,
  setSearchTerm,
  setPage,
  deleteTreeNode,
  resetTree,
} = locations.actions;
export const selectRegion = (state: _LocationsRootState) =>
  state.locations.region;
export const selectRegionToDelete = (state: _LocationsRootState) =>
  state.locations.regionToDelete;
export const selectSite = (state: _LocationsRootState) => state.locations.site;
export const selectPage = (state: _LocationsRootState) => state.locations.page;
export const selectSiteToDelete = (state: _LocationsRootState) =>
  state.locations.siteToDelete;
export const selectBranches = (state: _LocationsRootState) =>
  state.locations.branches;
export const selectRegionId = (state: _LocationsRootState) =>
  state.locations.regionId;
export const selectIsEmpty = (state: _LocationsRootState) =>
  state.locations.isEmpty;
export const selectMaintenanceEntity = (state: _LocationsRootState) =>
  state.locations.maintenanceEntity;
export const selectSearchType = (state: _LocationsRootState) =>
  state.locations.searchType;
export const selectSearchTerm = (state: _LocationsRootState) =>
  state.locations.searchTerm;
export const selectExpandedRegionIds = (state: _LocationsRootState) =>
  state.locations.expandedRegionIds;
export const selectIsLoadingTree = (state: _LocationsRootState) =>
  state.locations.isLoadingTree;
export const selectSearchIsPristine = (state: _LocationsRootState) =>
  state.locations.searchIsPristine;
export const selectRootSiteCounts = (state: _LocationsRootState) =>
  state.locations.rootSiteCounts;
export const selectRegionSiteTreeState = (state: _LocationsRootState) => ({
  branches: state.locations.branches,
  currentRegionId: state.locations.regionId,
  rootId: state.locations.rootId,
  expandedRegionIds: state.locations.expandedRegionIds,
  searchTerm: state.locations.searchTerm,
  searchIsPristine: state.locations.searchIsPristine,
  isLoadingTree: state.locations.isLoadingTree,
  page: state.locations.page,
});

export default locations.reducer;
