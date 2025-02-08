import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkGlobalInput = Styles;
export interface GlobalConfig extends BaseSparkConfig {
    className?: string;
}
export interface GlobalCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type GlobalOutput<T> = AppendSelector<T> & {
    css: (config?: GlobalConfig) => string;
    fork: <E extends SparkGlobalInput>(data: E, c?: GlobalConfig) => GlobalOutput<T>;
};
export type Creator = <T extends SparkGlobalInput>(data: T, c?: GlobalConfig) => GlobalOutput<T>;
export declare const globalCreator: ({ proxy, config: globalConfiguration }: GlobalCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
