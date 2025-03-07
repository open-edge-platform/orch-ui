/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { SquareSpinner } from "../../atoms/SquareSpinner/SquareSpinner";
import { TreeExpander } from "../TreeExpander/TreeExpander";
import "./TreeBranch.scss";
export const dataCy = "treeBranch";

export interface TreeNode {
  id: string;
}
export interface TreeBranchProps<NodeData extends TreeNode>
  extends Omit<TreeExpander, "onExpand" | "isLeaf" | "onExpand" | "height"> {
  data: NodeData;
  content: React.ReactElement;
  isLoading?: boolean;
  isLeaf?: boolean;
  children?: TreeBranchProps<NodeData>[];
  onExpand?: (data: NodeData) => void;
  onCollapse?: (data: NodeData) => void;
}
export const TreeBranch = <NodeData extends TreeNode>({
  isLoading = false,
  isLeaf = false,
  ...rest
}: TreeBranchProps<NodeData>) => {
  const cy = { "data-cy": dataCy };
  const treeBranchClass = "tree-branch";
  const contentEl = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  const modifierNodeCSS = () => {
    return rest.isRoot ? "--root" : isLeaf ? "--leaf" : "";
  };
  const modifierExpansionCSS = () => {
    return rest.isExpanded ? "--expanded" : "--collapsed";
  };

  useEffect(() => {
    if (!contentEl || !contentEl.current) return;
    const { height } = contentEl.current.getBoundingClientRect();
    setHeight(height);
  }, [contentEl]);

  return (
    <div
      {...cy}
      className={`${treeBranchClass}${modifierNodeCSS()} ${treeBranchClass}${modifierExpansionCSS()}`.trim()}
    >
      <TreeExpander
        height={height ?? 0}
        isRoot={rest.isRoot}
        isExpanded={rest.isExpanded}
        isLeaf={isLeaf}
        onExpand={(isExpanded: boolean) => {
          if (isExpanded && rest.onExpand) rest.onExpand(rest.data);
          if (!isExpanded && rest.onCollapse) rest.onCollapse(rest.data);
        }}
      />
      <div
        ref={contentEl}
        className={`${treeBranchClass}__content`}
        style={{ height }}
        data-cy="content"
      >
        {rest.content}
      </div>
      {rest.isExpanded &&
        rest.children &&
        rest.children.length > 0 &&
        rest.children.map((child: TreeBranchProps<NodeData>, index: number) => {
          return <TreeBranch {...child} key={index} />;
        })}
      {isLoading && (
        <div className={`${treeBranchClass}__loading`}>
          <SquareSpinner />
        </div>
      )}
    </div>
  );
};
