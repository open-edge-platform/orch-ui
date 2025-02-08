/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { useEffect, useState } from "react";
import {
  TreeBranch,
  TreeBranchProps,
  TreeNode,
} from "../../molecules/TreeBranch/TreeBranch";
import "./Tree.scss";
import { TreeUtils } from "./Tree.utils";
export const dataCy = "tree";

export interface TreeProps<NodeData extends TreeNode>
  extends Pick<TreeBranchProps<NodeData>, "onExpand" | "onCollapse"> {
  branches: TreeBranchProps<NodeData>[];
}

export const duplicateIdsMessage = (ids: Set<string>) =>
  `Id(s) ${Array.from(ids)} found multiple times in the tree data set`;

export const Tree = <NodeData extends TreeNode>({
  branches,
  onExpand,
  onCollapse,
}: TreeProps<NodeData>) => {
  const cy = { "data-cy": dataCy };
  const treeClass = "tree";

  const [hasError, setHasError] = useState<boolean>(false);
  const [duplicateIds, setDuplicateIds] = useState<Set<string>>();

  useEffect(() => {
    const duplicates = TreeUtils.findDuplicateKeys(branches);
    if (duplicates.size > 0) setDuplicateIds(duplicates);
  }, [branches]);

  useEffect(() => {
    if (!duplicateIds) return;
    setHasError(true);
  }, [duplicateIds]);

  return (
    <div {...cy} className={treeClass}>
      {hasError && duplicateIds ? (
        <div className={`${treeClass}__error`} data-cy="error">
          Error: {duplicateIdsMessage(duplicateIds)}
        </div>
      ) : (
        branches.map((branch: TreeBranchProps<NodeData>, index: number) => {
          return (
            <TreeBranch
              key={index}
              {...branch}
              onExpand={(data: NodeData) => {
                if (onExpand) onExpand(data);
              }}
              onCollapse={(data: NodeData) => {
                if (onCollapse) onCollapse(data);
              }}
            />
          );
        })
      )}
    </div>
  );
};
