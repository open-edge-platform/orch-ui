import type { proxyTree } from './proxy-tree';
import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export interface TokenConfig extends BaseSparkConfig {
    selector?: string;
    indent?: number;
    isInline?: boolean;
}
export type TokenData<T> = T & {
    css: (config?: TokenConfig) => string;
    fork: <U>(data: DeepPartial<T> & U, options?: TokenConfig) => TokenData<T & U>;
    toJS: (options?: Omit<TokenConfig, 'selector' | 'indent' | 'isInline'>) => T;
};
export interface TokenCreatorInput {
    proxy: ReturnType<typeof proxyTree>;
    config: SparkConfigInstance<BaseSparkConfig>;
}
export declare const tokenCreator: ({ proxy, config }: TokenCreatorInput) => <T>(data: T, conf?: TokenConfig) => TokenData<T>;
export {};
