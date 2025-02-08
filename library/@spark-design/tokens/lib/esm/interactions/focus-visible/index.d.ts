import { focusVisible } from './state';
export { focusVisible };
export declare const config: {
    properties: {
        css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
        fork: <U>(data: {} & U, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U>;
        toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
    };
    component: import("@spark-design/core").ComponentOutput<{
        self: {};
        within: {};
        adjacent: {};
        slider: {};
        snap: {
            outlineWidth: string;
            outlineStyle: string;
            outlineColor: string;
            outlineOffset: string;
            boxShadow: string;
            transition: string;
            WebkitTransform: string;
        };
        background: {};
        suppress: {};
    } & {
        [x: string]: {
            outlineWidth: string;
            outlineStyle: string;
            outlineColor: string;
            outlineOffset: string;
            boxShadow: string;
            position: string;
            zIndex: number;
        } | {
            outlineWidth: string;
            outlineStyle: string;
            outlineColor: string;
            outlineOffset: string;
            boxShadow: string;
            position: string;
            zIndex: string;
        } | {
            outline: string;
            boxShadow: string;
        } | {
            outlineWidth: string;
            outlineStyle: string;
            outlineColor: string;
            outlineOffset: string;
            boxShadow: string;
            transition: string;
            WebkitTransform: string;
        } | {
            transitionDuration: string;
            transitionDelay: string;
        } | {
            backgroundColor: string;
            color: string;
        };
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media (forced-colors: active)': {
            [x: string]: {
                outlineStyle: "revert";
            };
        };
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
