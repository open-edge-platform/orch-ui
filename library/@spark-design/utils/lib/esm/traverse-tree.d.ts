export type Tree = {
    [k: string]: any | Tree | any[];
} | any | any[];
export interface StackItem {
    key: string;
    depth: number;
    path: string[];
    node: Tree;
    parent: Tree;
}
export declare const traverseTree: (tree: Tree, replaceFn?: (data: StackItem) => Tree) => any;
