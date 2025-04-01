export const defineByPath = (obj, path = [], val) => {
    let target = obj;
    for (let i = 0; i < path.length - 1; i++) {
        if (!target[path[i]]) {
            target[path[i]] = {};
        }
        target = target[path[i]];
    }
    target[path[path.length - 1]] = val;
    return obj;
};
