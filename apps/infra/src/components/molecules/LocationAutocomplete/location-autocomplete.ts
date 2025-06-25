/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AutocompleteNode {
  name: string;
  parentId: string;
  resourceId: string;
  type: string;
  children?: AutocompleteNode[];
  path?: string[];
}

const calculatePaths = (
  nodes: AutocompleteNode[],
  parentPath: string[] = [],
): void => {
  nodes.forEach((node) => {
    node.path = [...parentPath, node.name];
    if (node.children?.length) {
      calculatePaths(node.children, node.path);
    }
  });
};

export const buildNodeTree = (
  nodes: AutocompleteNode[],
): Map<string, AutocompleteNode> => {
  const nodeMap = new Map<string, AutocompleteNode>();
  const rootNodes: AutocompleteNode[] = [];

  nodes.forEach((node) => {
    nodeMap.set(node.resourceId, { ...node, children: [] });
  });

  nodes.forEach((node) => {
    if (node.parentId && nodeMap.has(node.parentId)) {
      const parent = nodeMap.get(node.parentId) as AutocompleteNode;
      parent.children?.push(nodeMap.get(node.resourceId) as AutocompleteNode);
    } else if (!node.parentId) {
      rootNodes.push(nodeMap.get(node.resourceId) as AutocompleteNode);
    }
  });

  calculatePaths(rootNodes);

  return nodeMap;
};
