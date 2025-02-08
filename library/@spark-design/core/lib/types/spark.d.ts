import { componentCreator } from './component';
import { containerCreator } from './container';
import { globalCreator } from './global';
import { keyframeCreator } from './keyframe';
import { mediaCreator } from './media';
import { BaseSparkConfig, SetConfigFn } from './spark-config';
import { supportsCreator } from './supports';
import { tokenCreator } from './token';
export declare const createSpark: <T = Partial<BaseSparkConfig>>(options?: T) => {
    token: ReturnType<typeof tokenCreator>;
    component: ReturnType<typeof componentCreator>;
    keyframe: ReturnType<typeof keyframeCreator>;
    media: ReturnType<typeof mediaCreator>;
    container: ReturnType<typeof containerCreator>;
    supports: ReturnType<typeof supportsCreator>;
    global: ReturnType<typeof globalCreator>;
    setConfig: SetConfigFn<T>;
};
