import { flatCssObj, mergeDeep, toDashCase } from '@spark-design/utils';
import jss from 'jss';
import preset from 'jss-preset-default';
import { isCustomProperty, toExactValue } from './custom-property';
jss.setup(preset());
export const SELECTOR_KEY = '$';
const intenalPropertyList = ['css', 'fork', SELECTOR_KEY];
const iternalListKeyed = intenalPropertyList.reduce((acc, key) => ({ ...acc, [key]: true }), {});
export const componentCreator = ({ proxy, config: globalConfig }) => {
    const obj = {
        creator: null
    };
    const extract = (d, extractConfig) => {
        const proxyTree = proxy.wrap(d, {
            get(target, name, receiver) {
                const value = Reflect.get(target, name, receiver);
                return isCustomProperty(value)
                    ? value.toString(extractConfig.data)
                    : toExactValue(value, extractConfig.data);
            },
            deleteProperty() {
                throw new Error('Property is protected!');
            },
            ownKeys(target) {
                return Object.keys(target).filter((key) => !iternalListKeyed[key]);
            }
        }, extractConfig.fork({ customProperties: false }));
        return proxyTree;
    };
    obj.creator = (data, instanceConfig = { className: '' }) => {
        const componentConfig = globalConfig.fork(instanceConfig);
        const { className } = componentConfig.data;
        const { variants, ...styles } = data;
        const returnObj = appendSelector({ ...styles, ...variants }, className);
        return {
            ...returnObj,
            fork: (forkData, config = {}) => obj?.creator?.(mergeDeep(data, forkData), {
                ...componentConfig.data,
                ...config
            }),
            css: (options = {}) => {
                const toCssConfig = componentConfig.fork(options);
                const proxyTree = extract(data, toCssConfig);
                const { variants, ...styles } = proxyTree;
                const componentData = flatCssObj({ ...styles, ...variants }, toCssConfig.data.className);
                const sheet = jss.createStyleSheet(componentData, {
                    generateId: (rule) => rule.key
                });
                return sheet.toString();
            }
        };
    };
    return obj.creator;
};
const hasNestedObjects = (obj) => {
    const objKeys = Object.keys(obj);
    return objKeys.length && objKeys.every((k) => typeof obj[k] === 'object');
};
export const appendSelector = (obj, selector) => {
    const localObj = { ...obj };
    Object.keys(localObj).forEach((key) => {
        const val = localObj[key];
        const nodeKey = `${selector}-${toDashCase(key)}`;
        localObj[key] = hasNestedObjects(val)
            ? appendSelector(val, nodeKey)
            : { ...val, [SELECTOR_KEY]: nodeKey };
    });
    return { ...localObj, [SELECTOR_KEY]: selector };
};
