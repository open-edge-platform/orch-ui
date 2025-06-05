import { toDashCase } from '@spark-design/utils';
export class CSSCustomProperty {
    config;
    constructor(config) {
        this.config = config;
    }

    // Factory method to replace the Function constructor pattern
    static create(config) {
        const instance = new CSSCustomProperty(config);
        return new Proxy(instance, {
            apply: (target, _, args) => {
                return CSSCustomProperty.create(target.config.fork(args[0]));
            },
            get: (target, prop, receiver) => {
                // Forward property access to the target instance
                return Reflect.get(target, prop, receiver);
            }
        });
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
export const createCustomProperty = (options) => CSSCustomProperty.create(options);
export const isCustomProperty = (entity) => entity instanceof CSSCustomProperty;
