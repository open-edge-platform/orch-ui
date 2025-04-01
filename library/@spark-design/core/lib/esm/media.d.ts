import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkMediaInput = Styles;
export interface MediaConfig extends BaseSparkConfig {
    className?: string;
}
export interface MediaCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type MediaOutput<T> = AppendSelector<T> & {
    css: (config?: MediaConfig) => string;
    fork: <E extends SparkMediaInput>(data: E, c?: MediaConfig) => MediaOutput<T>;
};
export type Creator = <T extends SparkMediaInput>(data: T, c?: MediaConfig) => MediaOutput<T>;
export declare const mediaCreator: ({ proxy, config: globalConfig }: MediaCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
