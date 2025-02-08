import { isObject, mergeDeep, traverseTree } from '@spark-design/utils';
import { isCustomProperty } from './custom-property';
const intenalPropertyList = ['css', 'fork', 'toJS'];
const iternalListKeyed = intenalPropertyList.reduce((acc, key) => ({ ...acc, [key]: true }), {});
export const tokenCreator = ({ proxy, config }) => (data, conf = {}) => {
    const tokenConfig = config.fork(conf);
    const proxyHandler = {
        deleteProperty(target, prop) {
            if (iternalListKeyed[prop]) {
                throw new Error('Property is protected!');
            }
            else {
                delete target[prop];
                return true;
            }
        },
        ownKeys(target) {
            return Object.keys(target).filter((key) => !iternalListKeyed[key]);
        }
    };
    function css(options = {}) {
        const toCssConfig = tokenConfig.fork(options);
        const { selector, isInline, indent = 4, ...restOpts } = toCssConfig.data;
        const reduceTree = (tree) => {
            if (!tree || !isObject(tree))
                return [];
            const treeKeys = Object.keys(tree);
            return treeKeys.reduce((acc, el) => {
                const isProperty = isCustomProperty(tree[el]);
                return acc.concat(isProperty ? tree[el].toCSS(restOpts) : reduceTree(tree[el]));
            }, []);
        };
        const cssList = reduceTree(this);
        const splitChar = isInline ? '' : '\n';
        const cssString = cssList.join(splitChar);
        if (!selector)
            return cssString;
        const space = new Array(indent).join(' ');
        const result = `${selector} {${splitChar}${isInline ? cssString : cssList.map((el) => `${space}${el}`).join(splitChar)}${splitChar}}`;
        return isInline ? result.replace(/ /gi, '') : result;
    }
    function toJS(options) {
        const opts = tokenConfig.fork(options);
        return traverseTree(this, ({ node }) => {
            if (isObject(node)) {
                return { ...node };
            }
            else if (isCustomProperty(node)) {
                return node.toString(opts.data);
            }
        });
    }
    function fork(forkData, options) {
        const mergedData = mergeDeep(this, forkData);
        const traversed = traverseTree(mergedData, ({ node, key }) => {
            if (isCustomProperty(node) && !forkData[key]) {
                return node.getConfig().data.value;
            }
            return node;
        });
        return proxy.wrap({
            ...traversed,
            css,
            fork,
            toJS
        }, proxyHandler, tokenConfig.fork(options));
    }
    return proxy.wrap({
        ...data,
        css,
        fork,
        toJS
    }, proxyHandler, tokenConfig);
};
