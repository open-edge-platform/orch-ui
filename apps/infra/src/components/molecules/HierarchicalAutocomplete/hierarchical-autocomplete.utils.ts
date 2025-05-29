export interface AutocompleteNode {
  name: string;
  parentId: string;
  resourceId: string;
  type: string;
  children?: AutocompleteNode[];
  path?: string[];
}

export function buildNodeTree(
  nodes: AutocompleteNode[],
): Map<string, AutocompleteNode> {
  const nodeMap = new Map<string, AutocompleteNode>();
  const rootNodes: AutocompleteNode[] = [];

  nodes.forEach((node) => {
    nodeMap.set(node.resourceId, { ...node, children: [] });
  });

  nodes.forEach((node) => {
    if (node.parentId && nodeMap.has(node.parentId)) {
      const parent = nodeMap.get(node.parentId) as AutocompleteNode;
      if (!parent.children) parent.children = [];
      parent.children.push(nodeMap.get(node.resourceId) as AutocompleteNode);
    } else if (!node.parentId) {
      rootNodes.push(nodeMap.get(node.resourceId) as AutocompleteNode);
    }
  });

  calculatePaths(rootNodes);

  return nodeMap;
}

function calculatePaths(
  nodes: AutocompleteNode[],
  parentPath: string[] = [],
): void {
  nodes.forEach((node) => {
    node.path = [...parentPath, node.name];
    if (node.children?.length) {
      calculatePaths(node.children, node.path);
    }
  });
}

export const NODES_MOCK = [
  {
    name: "london",
    parentId: "region-21edbec1",
    resourceId: "site-9961663d",
    type: "RESOURCE_KIND_SITE",
  },
  {
    name: "new york",
    parentId: "region-bd98695b",
    resourceId: "site-0571b414",
    type: "RESOURCE_KIND_SITE",
  },
  {
    name: "subregion-one",
    parentId: "region-43779f56",
    resourceId: "region-21edbec1",
    type: "RESOURCE_KIND_REGION",
  },
  {
    name: "region-one",
    parentId: "",
    resourceId: "region-43779f56",
    type: "RESOURCE_KIND_REGION",
  },
  {
    name: "us-east",
    parentId: "",
    resourceId: "region-bd98695b",
    type: "RESOURCE_KIND_REGION",
  },
];
