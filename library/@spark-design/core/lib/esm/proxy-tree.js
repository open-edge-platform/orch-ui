import { isObject, toDashCase } from '@spark-design/utils';
import { createCustomProperty } from './custom-property';
import { createConfig } from './spark-config';
const createProxy = (obj, handler) => new Proxy(obj, handler);
const defaultProxyTreeInput = {
    proxyHandler: {}
};
export const proxyTree = ({ proxyHandler } = defaultProxyTreeInput) => {
    const proxyTreeHandler = createConfig({
        set,
        ...proxyHandler
    });
    function set(target, prop, val) {
        target[prop] = isObject(val) ? createProxy(val, proxyTreeHandler.data) : val;
        return true;
    }
    const wrap = (source, handler = {}, params) => {
        const wrapHandler = proxyTreeHandler.fork(handler);
        if (!isObject(source))
            return source;
        const tree = createProxy({ ...source }, wrapHandler.data);
        const stack = [{ depth: 0, path: [], val: tree, parent: null, key: '' }];
        while (stack.length) {
            for (let i = stack.length - 1; i >= 0; i--) {
                const el = stack[i];
                stack.pop();
                const isObj = isObject(el.val);
                if (isObj) {
                    let proxyNode;
                    if (el.parent) {
                        proxyNode = createProxy({ ...el.val }, wrapHandler.data);
                        el.parent[el.key] = proxyNode;
                    }
                    for (const key in el.val) {
                        stack.push({
                            key,
                            depth: el.depth + 1,
                            path: el.path.concat([key]),
                            val: el.val[key],
                            parent: proxyNode || el.val
                        });
                    }
                    break;
                }
                else if (params.data.customProperties && el.parent) {
                    const name = el.path
                        .map((el) => el.replace(/(\.| |&|variants)/gim, ''))
                        .filter((el) => el)
                        .join('-');
                    const key = toDashCase(name);
                    el.parent[el.key] = createCustomProperty(params.fork({
                        key,
                        value: el.val
                    }));
                }
            }
        }
        return tree;
    };
    return { wrap, setConfig: proxyTreeHandler.setConfig };
};
