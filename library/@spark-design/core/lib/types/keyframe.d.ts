import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkKeyframeInput = Styles;
export interface KeyframeConfig extends BaseSparkConfig {
    className?: string;
}
export interface KeyframeCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type KeyframeOutput<T> = AppendSelector<T> & {
    css: (config?: KeyframeConfig) => string;
    fork: <E extends SparkKeyframeInput>(data: E, c?: KeyframeConfig) => KeyframeOutput<T>;
};
export type Creator = <T extends SparkKeyframeInput>(data: T, c?: KeyframeConfig) => KeyframeOutput<T>;
export declare const keyframeCreator: ({ proxy, config: globalConfig }: KeyframeCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
