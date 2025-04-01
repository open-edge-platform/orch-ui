/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TreeBranchProps, TreeNode } from "./TreeBranch";
import "./TreeBranch.mocks.scss";

export interface TreeBranchNode extends TreeNode {
  name: string;
}

export const createTreeBranchContentJSX = (data: TreeNode) => (
  <div className="branch">Branch-{data.id}</div>
);

export const createTreeBranchProps = () => {
  const id = Math.floor(Math.random() * 100000).toString();
  const props: TreeBranchProps<TreeNode> = {
    content: createTreeBranchContentJSX({ id }),
    data: { id },
  };
  return props;
};

export const standardTree: TreeBranchProps<TreeNode>[] = [
  {
    children: [
      {
        content: <div className="tree-item">A.1</div>,
        data: { id: "A.1" },
      },
    ],
    content: <div className="tree-item">A</div>,
    data: { id: "A" },
    isRoot: true,
  },
  {
    children: [
      {
        children: [
          {
            content: (
              <div>
                <div>B.1.1</div>
                <div>Somethign else</div>
                <div>Somethign else</div>
              </div>
            ),
            data: { id: "B.1.1" },
          },
        ],
        content: (
          <div>
            <h2>B.1</h2>
            <input />
          </div>
        ),
        data: { id: "B.1" },
      },
      {
        content: (
          <div className="tree-item">
            <div>B.2</div>
            <div>Somethign else</div>
            <div>Somethign else</div>
          </div>
        ),
        data: { id: "B.2" },
      },
    ],
    content: <div className="tree-item">B</div>,
    data: { id: "B" },
    isRoot: true,
  },
];

export const minimalTree: TreeBranchProps<TreeNode>[] = [
  {
    children: [
      {
        content: <div>Branch 1</div>,
        data: { id: "branch1" },
        isLeaf: true,
      },
    ],
    content: <div style={{ height: "2rem" }}>Root 1</div>,
    data: { id: "root1" },
    isRoot: true,
    isExpanded: true,
  },
  {
    content: <div style={{ height: "2rem" }}>Root 2</div>,
    data: { id: "root2" },
    isRoot: true,
  },
];

export const threeRoots: TreeBranchProps<TreeNode>[] = [
  {
    children: [
      {
        content: <div style={{ height: "2rem" }}>Branch 1</div>,
        data: { id: "branch1" },
      },
    ],
    content: <div style={{ height: "2rem" }}>Root 1</div>,
    data: { id: "root1" },
    isRoot: true,
  },
  {
    content: <div style={{ height: "2rem" }}>Root 2</div>,
    data: { id: "root2" },
    isRoot: true,
  },
  {
    content: <div style={{ height: "2rem" }}>Root 3</div>,
    data: { id: "root3" },
    isRoot: true,
  },
];

export const duplicateIds: TreeBranchProps<TreeNode>[] = [
  {
    children: [
      {
        children: [
          {
            content: <div>2</div>,
            data: { id: "2" },
          },
        ],
        content: <div>3</div>,
        data: { id: "3" },
      },
    ],
    content: <div>1</div>,
    data: { id: "1" },
    isRoot: true,
  },
  {
    content: <div>2</div>,
    data: { id: "2" },
    isRoot: true,
  },
  {
    content: <div>3</div>,
    data: { id: "3" },
    isRoot: true,
  },
];
