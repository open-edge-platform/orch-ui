import { BaseSparkConfig, createConfig, SparkConfigInstance } from './spark-config';
export type ProxyTree<T> = T;
export interface ProxyTreeInput {
    proxyHandler?: ProxyHandler<any>;
}
export interface ProxyTreeOutput {
    wrap: ProxyTreeWrapper;
    setConfig: ReturnType<typeof createConfig>['setConfig'];
}
export type ProxyTreeWrapper = <T, E>(source: T, proxyHandler: ProxyHandler<any>, config: SparkConfigInstance<BaseSparkConfig>) => ProxyTree<T & E>;
export declare const proxyTree: ({ proxyHandler }?: ProxyTreeInput) => ProxyTreeOutput;
