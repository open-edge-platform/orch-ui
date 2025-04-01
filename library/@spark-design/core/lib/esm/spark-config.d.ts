export type BaseSparkConfig = {
    prefix?: string;
    isFallback?: boolean;
    aspectRatioBase?: number;
    aspectRatioUnit?: string;
    customProperties?: boolean;
};
export type ForkFn<U = BaseSparkConfig> = <G extends U>(config?: Partial<G>) => SparkConfigInstance<G>;
export type SetConfigFn<T> = <E = T>(config?: E) => void;
export interface SparkConfigInstance<T = BaseSparkConfig> {
    data: T;
    fork: ForkFn<T>;
    setConfig: SetConfigFn<T>;
}
export declare const createConfig: <U = BaseSparkConfig>(conf?: U, ...opts: U[]) => SparkConfigInstance<U>;
