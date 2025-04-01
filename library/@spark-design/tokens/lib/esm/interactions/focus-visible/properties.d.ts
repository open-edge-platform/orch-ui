export declare const properties: {
    css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
    fork: <U>(data: {} & U, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U>;
    toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
};
