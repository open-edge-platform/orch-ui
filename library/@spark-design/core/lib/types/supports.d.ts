import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkSupportsInput = Styles;
export interface SupportsConfig extends BaseSparkConfig {
    className?: string;
}
export interface SupportsCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type SupportsOutput<T> = AppendSelector<T> & {
    css: (config?: SupportsConfig) => string;
    fork: <E extends SparkSupportsInput>(data: E, c?: SupportsConfig) => SupportsOutput<T>;
};
export type Creator = <T extends SparkSupportsInput>(data: T, c?: SupportsConfig) => SupportsOutput<T>;
export declare const supportsCreator: ({ proxy, config: globalConfig }: SupportsCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
