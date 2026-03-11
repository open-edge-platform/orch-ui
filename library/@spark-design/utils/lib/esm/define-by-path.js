const isSafeKey = (key) => key !== '__proto__' && key !== 'constructor' && key !== 'prototype';

export const defineByPath = (obj, path = [], val) => {
    let target = obj;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!isSafeKey(key)) {
            throw new TypeError(`Unsafe key in path: ${String(key)}`);
        }
        if (!target[key]) {
            target[key] = {};
        }
        target = target[key];
    }
    const lastKey = path[path.length - 1];
    if (!isSafeKey(lastKey)) {
        throw new TypeError(`Unsafe key in path: ${String(lastKey)}`);
    }
    target[lastKey] = val;
    return obj;
};
