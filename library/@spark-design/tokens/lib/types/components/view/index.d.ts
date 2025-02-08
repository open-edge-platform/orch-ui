import { view } from './component';
export { view };
export declare const config: {
    properties: {
        css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
        fork: <U>(data: {} & U, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U>;
        toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
    };
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
    }>;
    modes: {
        light: {
            css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
            fork: <U_1>(data: {} & U_1, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U_1>;
            toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
        };
        dark: {
            css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
            fork: <U_1>(data: {} & U_1, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U_1>;
            toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
        };
    };
};
