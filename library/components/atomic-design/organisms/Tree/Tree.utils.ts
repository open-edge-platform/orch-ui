/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  TreeBranchProps,
  TreeNode,
} from "../../molecules/TreeBranch/TreeBranch";

export class TreeUtils {
  static find<NodeData extends TreeNode>(
    branch: TreeBranchProps<NodeData>[] | undefined,
    searchForId: string,
  ): TreeBranchProps<NodeData> | undefined {
    if (!branch) return undefined;

    for (const index in branch) {
      const child = branch[index];
      const { data } = child;
      if (data.id === searchForId) return child;

      const result = TreeUtils.find(child.children, searchForId);
      if (result !== undefined) return result;
    }
    return undefined;
  }

  static findDuplicateKeys<NodeData extends TreeNode>(
    branches: TreeBranchProps<NodeData>[],
    seenKeys = new Map<string, boolean>(),
    duplicates = new Set<string>(),
  ) {
    branches.forEach((branch: TreeBranchProps<NodeData>) => {
      const {
        data: { id },
      } = branch;

      if (seenKeys.has(id)) {
        duplicates.add(id);
      } else {
        seenKeys.set(id, true);
      }

      if (branch.children && branch.children.length > 0) {
        TreeUtils.findDuplicateKeys(branch.children, seenKeys, duplicates);
      }
    });

    return duplicates;
  }
}
