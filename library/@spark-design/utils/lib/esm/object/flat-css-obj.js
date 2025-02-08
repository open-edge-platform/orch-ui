import { toDashCase } from '../string';
export const flatCssObj = (obj, prefix = '') => {
    let localObj = { ...obj };
    const res = Object.keys(localObj).reduce((acc, key) => {
        const val = localObj[key];
        if (key.startsWith('&') || typeof val !== 'object' || Array.isArray(val)) {
            return acc;
        }
        const pref = `${prefix}-${toDashCase(key)}`;
        const { [key]: _, ...newLocalObj } = localObj;
        localObj = newLocalObj;
        return { ...acc, ...flatCssObj(val, pref) };
    }, {});
    if (Object.keys(localObj).length) {
        return { ...res, [prefix]: localObj };
    }
    return res;
};
