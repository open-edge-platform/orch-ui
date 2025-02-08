import { mergeDeep } from '@spark-design/utils';
export const createConfig = (conf = {}, ...opts) => {
    const config = { ...conf };
    const setConfig = (params = {}) => {
        Object.keys(params).forEach((k) => {
            config[k] = params[k];
        });
    };
    const fork = (forkParam) => createConfig(forkParam, config, ...opts);
    return {
        setConfig,
        fork,
        data: new Proxy(config, {
            get: (_, name) => {
                const merged = mergeDeep(...opts.reverse(), config);
                return merged[name];
            }
        })
    };
};
