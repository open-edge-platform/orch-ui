import { isObject } from './object';
export const traverseTree = (tree, replaceFn = ({ node }) => node) => {
    if (typeof tree !== 'object' || !replaceFn)
        return tree;
    let innerTree = tree;
    const stack = [{ key: '', depth: 0, path: [], node: innerTree, parent: null }];
    while (stack.length) {
        for (let i = stack.length - 1; i >= 0; i--) {
            const el = stack[i];
            stack.pop();
            const node = replaceFn(el);
            if (el.parent) {
                el.parent[el.key] = node;
            }
            else {
                el.node = node;
                innerTree = node;
            }
            if (isObject(node)) {
                for (const key in node) {
                    stack.push({
                        key,
                        depth: el.depth + 1,
                        path: el.path.concat([key]),
                        node: node[key],
                        parent: node
                    });
                }
                break;
            }
        }
    }
    return innerTree;
};
