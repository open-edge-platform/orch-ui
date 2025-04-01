import { Styles } from 'jss';
import { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export declare const SELECTOR_KEY = "$";
type AppendSelector<T> = {
    [SELECTOR_KEY]: string;
} & {
    [P in keyof T]: AppendSelector<T[P]>;
};
export type SparkContainerInput = Styles;
export interface ContainerConfig extends BaseSparkConfig {
    className?: string;
}
export interface ContainerCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export type ContainerOutput<T> = AppendSelector<T> & {
    css: (config?: ContainerConfig) => string;
    fork: <E extends SparkContainerInput>(data: E, c?: ContainerConfig) => ContainerOutput<T>;
};
export type Creator = <T extends SparkContainerInput>(data: T, c?: ContainerConfig) => ContainerOutput<T>;
export declare const containerCreator: ({ proxy, config: globalConfig }: ContainerCreatorInput) => Creator;
export declare const appendSelector: <V, T = {
    [key: string]: V;
}>(obj: T, selector: string) => T;
export {};
