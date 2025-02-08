import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type Variants = {
    variants?: Styles;
};
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkComponentInput = Styles & Variants;
export interface ComponentConfig extends BaseSparkConfig {
    className?: string;
}
export interface ComponentCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type ComponentOutput<T> = AppendSelector<T> & {
    css: (config?: ComponentConfig) => string;
    fork: <E extends SparkComponentInput>(data: E, c?: ComponentConfig) => ComponentOutput<T & E extends Variants ? Omit<T & E, 'variants'> & (T & E)[keyof (T & E) & 'variants'] : T & E>;
};
export type Creator = <T extends SparkComponentInput>(data: T, c?: ComponentConfig) => ComponentOutput<T extends Variants ? Omit<T, 'variants'> & T[keyof T & 'variants'] : T>;
export declare const componentCreator: ({ proxy, config: globalConfig }: ComponentCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
