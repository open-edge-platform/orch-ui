import { toDashCase } from '@spark-design/utils';
// Instead of extending Function, create a class with a callable wrapper
export class CSSCustomProperty {
    config;
    constructor(config) {
        this.config = config;
        // Create a callable wrapper function that will be returned instead of this class instance
        const callableWrapper = (...args) => {
            return new CSSCustomProperty(this.config.fork(args[0]));
        };
        // Copy all methods from the prototype to the wrapper function
        Object.getOwnPropertyNames(CSSCustomProperty.prototype).forEach(key => {
            if (key !== 'constructor') {
                callableWrapper[key] = this[key].bind(this);
            }
        });
        // Add the config property to the wrapper
        Object.defineProperty(callableWrapper, 'config', {
            get: () => this.config,
            enumerable: true
        });
        return callableWrapper;
    }
    getKey = (config = {}) => {
        const conf = this.getConfig(config);
        return `${normalizePrefix(conf.data.prefix) || '-'}-${conf.data.key || ''}`;
    };
    getConfig = (opts) => {
        return this.config.fork(opts || {});
    };
    toVariable = (config) => {
        const conf = this.getConfig(config);
        const arr = [this.getKey(config)];
        if (conf.data.isFallback)
            arr.push(this.toValue({ ...conf.data, customProperties: false }));
        return `var(${arr.join(', ')})`;
    };
    toValue = (config) => {
        const conf = this.getConfig(config);
        let val = conf.data.value;
        while (!conf.data.customProperties && isCustomProperty(val)) {
            val = val.toValue(conf.data);
        }
        return isCustomProperty(val)
            ? val.toVariable(conf.data)
            : toExactValue(val, conf.data);
    };
    toCSS = (config) => {
        const conf = this.getConfig(config);
        const { prefix: _, ...rest } = conf.data || {};
        return `${this.getKey(conf.data)}: ${this.toValue(rest)};`;
    };
    toString = (config) => {
        const conf = this.getConfig(config);
        return conf.data.customProperties
            ? this.toVariable(conf.data)
            : this.toValue(conf.data);
    };
}
export const toExactValue = (val, config) => {
    if (!config)
        return val;
    const { aspectRatioUnit, aspectRatioBase } = config;
    if (typeof val === 'string') {
        if (/(^#.*|^rgba?\(.*|.*%$)/gim.test(val))
            return val;
        const match = val.match(/[rem|px]{1,}/gim);
        let matchUnit = '';
        if (match)
            matchUnit = match[match?.length - 1];
        if (match?.length === 1 && aspectRatioUnit && aspectRatioUnit == matchUnit)
            return val;
        if ((match || '')?.length >= 1) {
            const numericValue = parseFloat(val.replace(/[rem|px].*/gim, ''));
            let aspect = 0;
            try {
                if ((aspectRatioUnit == 'px' && match?.length === 1 && matchUnit == 'rem') ||
                    (aspectRatioUnit == 'rem' && match?.length === 1 && matchUnit == 'px')) {
                    if (aspectRatioUnit == 'px' && numericValue && aspectRatioBase) {
                        aspect = numericValue * aspectRatioBase;
                    }
                    else if (aspectRatioUnit == 'rem' && numericValue && aspectRatioBase) {
                        aspect = numericValue / aspectRatioBase;
                    }
                    return aspectRatioUnit ? `${aspect}${aspectRatioUnit}` : aspect;
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    return val;
};
export const normalizePrefix = (str) => {
    if (!str)
        return '';
    return `--${toDashCase(str)}`;
};
export const createCustomProperty = (options) => new CSSCustomProperty(options);
export const isCustomProperty = (entity) => {
    // Check if entity is a function and has our specific properties
    return typeof entity === 'function' &&
        typeof entity.getKey === 'function' &&
        typeof entity.toVariable === 'function' &&
        typeof entity.config !== 'undefined';
};
