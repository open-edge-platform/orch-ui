/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Icon } from "@spark-design/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TreeBranchProps,
  TreeNode,
} from "../../molecules/TreeBranch/TreeBranch";
import { Tree } from "./Tree";
import "./Tree.mocks.scss";
import { TreeUtils } from "./Tree.utils";

export interface Site extends TreeNode {
  name: string;
}
export interface Region extends TreeNode {
  name: string;
}
export type SiteRegion = Site | Region;

export const randomNumber = (limit: number) =>
  Math.floor(Math.random() * limit) + 1;

export const createSite = (site: Site, isLast: boolean = false) => {
  const height = Math.floor(Math.random() * 3) + 2;
  return (
    <div
      className={`site ${isLast ? "last" : ""}`.trim()}
      style={{ height: `${height}rem`, border: "1px solid purple" }}
    >
      <Icon icon="pin" />
      <Link className="site__link" to="google">
        Site-{site.name}
      </Link>
    </div>
  );
};

export const createRegion = (region: Region) => {
  const height = Math.floor(Math.random() * 3) + 2;
  return (
    <div
      className="region"
      style={{ height: `${height}rem`, border: "1px solid green" }}
    >
      <p className="name">Region-{region.name}</p>
      <p className="price">Region</p>
      <Icon className="region__icon" icon="ellipsis-v" />
    </div>
  );
};

export const createSiteRegionNodes = (
  onExpand: (data: SiteRegion) => void,
  onCollapse: (data: SiteRegion) => void,
): TreeBranchProps<SiteRegion>[] => {
  const sites: Site[] = Array.from({ length: randomNumber(4) }).map(() => ({
    id: randomNumber(10000).toString(),
    name: randomNumber(10000).toString(),
  }));
  const regions: Region[] = Array.from({ length: randomNumber(3) }).map(() => ({
    id: randomNumber(10000).toString(),
    name: randomNumber(10000).toString(),
  }));

  const nodes: TreeBranchProps<SiteRegion>[] = [];
  sites.forEach((site: Site, index: number) => {
    const nextSite: TreeBranchProps<SiteRegion> = {
      content: createSite(site, index == sites.length - 1),
      data: site,
      isLeaf: true,
    };
    nodes.push(nextSite);
  });

  regions.forEach((region: Region) => {
    const nextRegion: TreeBranchProps<SiteRegion> = {
      children: [],
      content: createRegion(region),
      data: region,
      onExpand,
      onCollapse,
    };
    nodes.push(nextRegion);
  });

  console.log("Next nodes:", nodes);
  return nodes;
};

export const CyExampleTree = () => {
  const onExpand = (data: TreeNode) => {
    //Find the branch you expanded on the UI in the supporting data structure.
    const result = TreeUtils.find(treeBranchProps, data.id);

    if (result !== undefined) {
      result.isLoading = true;

      setTreeBranchProps([...treeBranchProps]);
      setTimeout(() => {
        const item: TreeNode = {
          id: Math.floor(Math.random() * 10000).toString(),
        };
        result.isLoading = false;
        result.isExpanded = true;
        result.children = [
          {
            content: <div>{item.id}</div>,
            data: item,
            onExpand: onExpand,
            onCollapse: onCollapse,
          },
        ];
        setTreeBranchProps([...treeBranchProps]);
      }, 3000);
    }
  };

  const onCollapse = (data: TreeNode) => {
    //Find the branch you expanded on the UI in the supporting data structure.
    const result = TreeUtils.find(treeBranchProps, data.id);
    if (result !== undefined) {
      result.isExpanded = false;
      setTreeBranchProps([...treeBranchProps]);
    }
  };

  const [treeBranchProps, setTreeBranchProps] = useState<
    TreeBranchProps<TreeNode>[]
  >([{ content: <div>Hi</div>, data: { id: "1" }, isRoot: true }]);

  return (
    <Tree
      branches={treeBranchProps}
      onExpand={onExpand}
      onCollapse={onCollapse}
    />
  );
};

export const CySiteRegionTree = () => {
  const onExpand = (data: SiteRegion) => {
    //Find the branch you expanded on the UI in the supporting data structure.
    const result = TreeUtils.find(treeBranchProps, data.id);

    if (result !== undefined) {
      result.isLoading = true;
      result.isExpanded = true;

      setTreeBranchProps([...treeBranchProps]);
      setTimeout(() => {
        const item: TreeNode = {
          id: Math.floor(Math.random() * 10000).toString(),
        };
        result.isLoading = false;
        result.isExpanded = true;
        result.children = [...createSiteRegionNodes(onExpand, onCollapse)];
        setTreeBranchProps([...treeBranchProps]);
      }, 3000);
    }
  };

  const onCollapse = (data: TreeNode) => {
    //Find the branch you expanded on the UI in the supporting data structure.
    const result = TreeUtils.find(treeBranchProps, data.id);
    if (result !== undefined) {
      result.isExpanded = false;
      setTreeBranchProps([...treeBranchProps]);
    }
  };

  const [treeBranchProps, setTreeBranchProps] = useState<
    TreeBranchProps<SiteRegion>[]
  >([
    {
      content: (
        <div style={{ height: "4rem", border: "1px solid purple" }}>
          Region Root 1
        </div>
      ),
      data: { id: "1", name: "Region Root 1" },
      isRoot: true,
    },
    {
      content: (
        <div style={{ height: "3rem", border: "1px solid green" }}>
          Region Root 2
        </div>
      ),
      data: { id: "2", name: "Region Root 2" },
      isRoot: true,
    },
  ]);

  return (
    <Tree
      branches={treeBranchProps}
      onExpand={onExpand}
      onCollapse={onCollapse}
    />
  );
};
