import { flex } from './component';
import { FlexAlignContent, FlexAlignItems, FlexDirection, FlexGap, FlexJustifyContent, FlexWrap } from './types';
export { flex, FlexAlignContent, FlexAlignItems, FlexDirection, FlexGap, FlexJustifyContent, FlexWrap };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        gap: {
            nogap: {
                size: string;
            };
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
        direction: {
            row: {
                direction: string;
            };
            column: {
                direction: string;
            };
            "row-reverse": {
                direction: string;
            };
            "column-reverse": {
                direction: string;
            };
        };
        wrap: {
            wrap: {
                wrap: string;
            };
            nowrap: {
                wrap: string;
            };
            "wrap-reverse": {
                wrap: string;
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
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
    } & {
        gap: {};
        direction: {};
        wrap: {};
        justifyContent: {};
        alignContent: {};
        alignItems: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundPrimary: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundPrimary: string;
        } & {
            backgroundPrimary: string;
        }>;
    };
};
