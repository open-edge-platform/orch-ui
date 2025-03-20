/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { TreeBranchProps, TreeNode } from "@orch-ui/components";
import {
  Region,
  RegionDynamicProps,
} from "../../../../components/atom/locations/Region/Region";
import {
  Site,
  SiteDynamicProps,
} from "../../../../components/atom/locations/Site/Site";
import { TreeBranchState } from "../../../../store/locations.treeBranch";

export interface RegionSiteTreeCallbacks {
  onExpand: ({ id }: TreeNode) => void;
  onCollapse: ({ id }: TreeNode) => void;
}

interface ComponentsProps {
  regionProps: RegionDynamicProps;
  siteDynamicProps: SiteDynamicProps;
}

export const createRegion = (
  region: eim.RegionRead,
  isRoot: boolean = false,
  isLoading: boolean = false,
  isExpanded: boolean = false,
  { onExpand, onCollapse }: RegionSiteTreeCallbacks,
  componentProps: ComponentsProps,
): TreeBranchProps<TreeNode> => {
  if (!region.resourceId)
    throw new Error("Region id (resourceId) is missing from retrieved results");
  const regionProps = componentProps.regionProps ?? {};
  const result: TreeBranchProps<TreeNode> = {
    content: (
      <Region
        {...regionProps}
        region={region}
        sitesCount={isRoot ? (region.totalSites ?? 0) : undefined} // TODO: sites count in a region
        showSitesCount={isRoot} // defaults to false, SItes count needs to be shown only at the root as per UX
      />
    ),
    data: { id: region.resourceId },
    isRoot,
    isLoading,
    isExpanded,
    onExpand,
    onCollapse,
  };

  return result;
};

export const createSite = (
  site: eim.SiteRead,
  callbacks: RegionSiteTreeCallbacks,
  componentProps: ComponentsProps,
): TreeBranchProps<TreeNode> => {
  if (!site.resourceId)
    throw new Error(
      "Site id (resourceId) is missing from retrieved sites result",
    );
  const siteDynamicProps = componentProps.siteDynamicProps ?? {};
  return {
    content: <Site {...siteDynamicProps} site={site} />,
    data: { id: site.resourceId },
    isLeaf: true,
  };
};

export const generateTreeBranchJSX = (
  branch: TreeBranchState,
  callbacks: RegionSiteTreeCallbacks,
  componentProps: ComponentsProps,
): TreeBranchProps<TreeNode> => {
  switch (branch.type) {
    case "region":
      return createRegion(
        branch.data as eim.RegionRead,
        branch.isRoot,
        branch.isLoading,
        branch.isExpanded,
        callbacks,
        componentProps,
      );
    case "site":
      return createSite(branch.data as eim.SiteRead, callbacks, componentProps);
  }
};

export const generateTreeJsx = (
  branches: TreeBranchState[],
  callbacks: RegionSiteTreeCallbacks,
  componentProps: ComponentsProps,
): TreeBranchProps<TreeNode>[] => {
  const result: TreeBranchProps<TreeNode>[] = [];
  branches.forEach((branch: TreeBranchState) => {
    if (branch.children) {
      const subTree = generateTreeJsx(
        branch.children,
        callbacks,
        componentProps,
      );
      const node = generateTreeBranchJSX(branch, callbacks, componentProps);
      node.children = subTree;
      result.push(node);
    } else {
      result.push(generateTreeBranchJSX(branch, callbacks, componentProps));
    }
  });
  return result;
};
