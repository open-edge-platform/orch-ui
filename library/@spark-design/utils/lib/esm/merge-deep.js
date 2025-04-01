import { isObject } from './object/is-object';
export const mergeDeep = (...objects) => objects.reduce((acc, el) => {
    if (!isObject(el))
        return acc;
    Object.keys(el).forEach((key) => {
        if (Array.isArray(acc[key]) && Array.isArray(el[key])) {
            acc[key] = Array.from(new Set(acc[key].concat(el[key])));
        }
        else if (isObject(acc[key]) && isObject(el[key])) {
            acc[key] = mergeDeep(acc[key], el[key]);
        }
        else {
            acc[key] = el[key];
        }
    });
    return acc;
}, {});
