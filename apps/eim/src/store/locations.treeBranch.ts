/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { TreeNode } from "@orch-ui/components";
import { RootSiteCounts, SearchResult, SearchTypes } from "./locations";

export type TreeBranchType = "region" | "site";
export interface TreeBranchState<T = eim.RegionRead | eim.SiteRead>
  extends TreeNode {
  data: T;
  name: string;
  type: TreeBranchType;
  children?: TreeBranchState<T>[];
  isExpanded?: boolean;
  isLoading?: boolean;
  isRoot?: boolean;
}

export class TreeBranchStateUtils {
  static find(
    searchForId: string,
    branches?: TreeBranchState[],
    findParent?: boolean,
    parent?: TreeBranchState<eim.RegionRead | eim.SiteRead>,
  ): TreeBranchState | undefined {
    if (!branches) return;

    let result: TreeBranchState | undefined = undefined;
    for (let index: number = 0; index < branches.length; index++) {
      const node = branches[index];
      const { data } = node;
      if (data.resourceId === searchForId) return findParent ? parent : node;

      result = TreeBranchStateUtils.find(
        searchForId,
        node.children,
        findParent,
        node,
      );
      if (result !== undefined) break;
    }
    return result;
  }

  static findValid(
    searchForId: string,
    branches?: TreeBranchState[],
  ): TreeBranchState | undefined {
    if (searchForId) {
      const result = this.find(searchForId, branches);
      if (!result)
        throw new Error(
          `Unexpected Error. Region ${searchForId} was not found in tree`,
        );

      return result;
    }
  }

  static findRoot(branch: TreeBranchState, branches: TreeBranchState[]) {
    //Could be a site, so need to get the relevant starting region first
    let nextRegion = this.getParentRegion(branch);
    if (nextRegion === null) return branch;
    let nextParent: TreeBranchState | undefined = undefined;

    while (nextRegion !== null) {
      nextParent = TreeBranchStateUtils.findValid(
        nextRegion.resourceId!,
        branches,
      );
      nextRegion = nextParent ? this.getParentRegion(nextParent) : null;
    }
    return nextParent;
  }

  static getParentRegion(branch: TreeBranchState): eim.RegionRead | null {
    const { data } = branch;
    const parent = TreeBranchStateUtils.isRegionRead(data)
      ? (data as eim.RegionRead).parentRegion
      : TreeBranchStateUtils.isSiteRead(data)
        ? (data as eim.SiteRead).region
        : null;

    if (parent === undefined)
      throw new Error("Unknown node type, was not Region nor Site");
    return parent;
  }

  static isRegionRead = (data: any): data is eim.RegionRead => {
    return "parentRegion" in data;
  };

  static isSiteRead = (data: any): data is eim.SiteRead => {
    return "region" in data;
  };

  static createRegion(region: eim.RegionRead): TreeBranchState<eim.RegionRead> {
    return this.createBranch(region, "region");
  }

  static createSite(site: eim.SiteRead): TreeBranchState<eim.SiteRead> {
    return this.createBranch(site, "site");
  }

  static createRegions(
    regions: eim.RegionRead[],
  ): TreeBranchState<eim.RegionRead>[] {
    return regions.map((region: eim.RegionRead) => this.createRegion(region));
  }

  static createSites(sites: eim.SiteRead[]): TreeBranchState<eim.SiteRead>[] {
    return sites.map((site: eim.SiteRead) => this.createSite(site));
  }

  static createBranch<BranchDataType extends eim.RegionRead | eim.SiteRead>(
    data: BranchDataType,
    type: TreeBranchType,
  ): TreeBranchState<BranchDataType> {
    return {
      data,
      id: data.resourceId ?? "Missing ID",
      name: data.name ?? "N/A",
      type,
    };
  }

  static createFromSearchResults(
    results: SearchResult[],
    searchType: SearchTypes,
    rootSiteCounts?: RootSiteCounts[],
  ): TreeBranchState<eim.RegionRead | eim.SiteRead>[] {
    const updatedBranches: TreeBranchState<eim.RegionRead | eim.SiteRead>[] =
      [];
    results
      .slice()
      .reverse()
      .forEach((result) => {
        if (!result.parentId) {
          const totalSites =
            rootSiteCounts?.find(
              (root) => root.resourceId === result.resourceId,
            )?.totalSites ?? 0;
          updatedBranches.push({
            type: "region",
            isRoot: true,
            name: result.name,
            data: {
              resourceId: result.resourceId,
              name: result.name,
              totalSites,
            },
            id: result.resourceId,
            isExpanded: true,
          });
        } else {
          //Find the parent node to add to
          const node = TreeBranchStateUtils.findValid(
            result.parentId,
            updatedBranches,
          );
          if (!node) return;
          const { resourceId } = result;
          const type: TreeBranchType | undefined = resourceId.includes("region")
            ? "region"
            : resourceId.includes("site")
              ? "site"
              : undefined;
          if (!type)
            throw new Error(
              `Results returned an unkown type. Id was ${resourceId}`,
            );

          if (searchType === SearchTypes.Regions && type === "site") return;
          if (!node.children) node.children = [];
          const newChild: TreeBranchState<eim.RegionRead | eim.SiteRead> = {
            id: resourceId,
            data: {
              resourceId,
              name: result.name,
            },
            name: result.name,
            type,
          };
          if (type === "region")
            (newChild.data as eim.RegionRead).parentRegion = {
              resourceId: result.parentId,
            };
          if (type === "site")
            (newChild.data as eim.SiteRead).region = {
              resourceId: result.parentId,
              name: node.data.name,
            };

          node.children.push(newChild);
          node.isExpanded = true;
        }
      });

    return updatedBranches;
  }
}
