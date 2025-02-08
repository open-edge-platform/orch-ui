import { componentCreator } from './component';
import { containerCreator } from './container';
import { globalCreator } from './global';
import { keyframeCreator } from './keyframe';
import { mediaCreator } from './media';
import { proxyTree } from './proxy-tree';
import { createConfig } from './spark-config';
import { supportsCreator } from './supports';
import { tokenCreator } from './token';
const defaultSparkConfig = { customProperties: true };
export const createSpark = (options = defaultSparkConfig) => {
    const config = createConfig(options);
    const proxy = proxyTree();
    const token = tokenCreator({ proxy, config });
    const component = componentCreator({ proxy, config });
    const keyframe = keyframeCreator({ proxy, config });
    const media = mediaCreator({ proxy, config });
    const container = containerCreator({ proxy, config });
    const supports = supportsCreator({ proxy, config });
    const global = globalCreator({ proxy, config });
    return {
        token,
        component,
        keyframe,
        media,
        container,
        supports,
        global,
        setConfig: config.setConfig
    };
};
