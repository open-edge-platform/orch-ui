import { grid } from './component';
import { GridAlignContent, GridAlignItems, GridAutoFlow, GridGap, GridJustifyContent, GridJustifyItems } from './types';
export { grid, GridAlignContent, GridAlignItems, GridAutoFlow, GridGap, GridJustifyContent, GridJustifyItems };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        gap: {
            s: {
                size: string;
            };
            m: {
                size: string;
            };
            l: {
                size: string;
            };
        };
        justifyContent: {
            start: {
                justifyContent: string;
            };
            end: {
                justifyContent: string;
            };
            center: {
                justifyContent: string;
            };
            left: {
                justifyContent: string;
            };
            right: {
                justifyContent: string;
            };
            "space-between": {
                justifyContent: string;
            };
            "space-around": {
                justifyContent: string;
            };
            "space-evenly": {
                justifyContent: string;
            };
            stretch: {
                justifyContent: string;
            };
            baseline: {
                justifyContent: string;
            };
            "first baseline": {
                justifyContent: string;
            };
            "last baseline": {
                justifyContent: string;
            };
            "safe center": {
                justifyContent: string;
            };
            "unsafe center": {
                justifyContent: string;
            };
        };
        justifyItems: {
            auto: {
                justifyItems: string;
            };
            normal: {
                justifyItems: string;
            };
            start: {
                justifyItems: string;
            };
            end: {
                justifyItems: string;
            };
            center: {
                justifyItems: string;
            };
            left: {
                justifyItems: string;
            };
            right: {
                justifyItems: string;
            };
            stretch: {
                justifyItems: string;
            };
            "self-start": {
                justifyItems: string;
            };
            "self-end": {
                justifyItems: string;
            };
            baseline: {
                justifyItems: string;
            };
            "first baseline": {
                justifyItems: string;
            };
            "last baseline": {
                justifyItems: string;
            };
            "safe center": {
                justifyItems: string;
            };
            "unsafe center": {
                justifyItems: string;
            };
            "legacy right": {
                justifyItems: string;
            };
            "legacy left": {
                justifyItems: string;
            };
            "legacy center": {
                justifyItems: string;
            };
        };
        alignContent: {
            start: {
                alignContent: string;
            };
            end: {
                alignContent: string;
            };
            center: {
                alignContent: string;
            };
            "space-between": {
                alignContent: string;
            };
            "space-around": {
                alignContent: string;
            };
            "space-evenly": {
                alignContent: string;
            };
            stretch: {
                alignContent: string;
            };
            baseline: {
                alignContent: string;
            };
            "first baseline": {
                alignContent: string;
            };
            "last baseline": {
                alignContent: string;
            };
            "safe center": {
                alignContent: string;
            };
            "unsafe center": {
                alignContent: string;
            };
        };
        alignItems: {
            start: {
                alignItems: string;
            };
            end: {
                alignItems: string;
            };
            center: {
                alignItems: string;
            };
            stretch: {
                alignItems: string;
            };
            "self-start": {
                alignItems: string;
            };
            "self-end": {
                alignItems: string;
            };
            baseline: {
                alignItems: string;
            };
            "first baseline": {
                alignItems: string;
            };
            "last baseline": {
                alignItems: string;
            };
            "safe center": {
                alignItems: string;
            };
            "unsafe center": {
                alignItems: string;
            };
        };
        autoFlow: {
            row: {
                gridAutoFlow: string;
            };
            column: {
                gridAutoFlow: string;
            };
            "row dense": {
                gridAutoFlow: string;
            };
            "column dense": {
                gridAutoFlow: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
    } & {
        gap: {};
        rowGap: {};
        columnGap: {};
        justifyContent: {};
        justifyItems: {};
        autoFlow: {};
        alignContent: {};
        alignItems: {};
    }>;
    modes: {
        light: {
            css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
            fork: <U>(data: {} & U, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U>;
            toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
        };
        dark: {
            css: (config?: import("@spark-design/core").TokenConfig | undefined) => string;
            fork: <U>(data: {} & U, options?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<{} & U>;
            toJS: (options?: Omit<import("@spark-design/core").TokenConfig, "selector" | "indent" | "isInline"> | undefined) => {};
        };
    };
};
