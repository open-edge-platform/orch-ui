import { ledgeFlex } from './component';
import { LedgeFlexAlignment, LedgeFlexColumnSize, LedgeFlexDirection, LedgeFlexItemSize } from './types';
export { ledgeFlex, LedgeFlexAlignment, LedgeFlexColumnSize, LedgeFlexDirection, LedgeFlexItemSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        borderColor: string;
        verticalAlignment: {
            top: string;
            middle: string;
            bottom: string;
        };
        col: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        border: {};
        item: {
            border: {};
            spacer: {};
            c1: {};
            c2: {};
            c3: {};
            c4: {};
            c5: {};
            c6: {};
            c7: {};
            c8: {};
            c9: {};
            c10: {};
            c11: {};
            c12: {};
        };
        direction: {
            row: {};
            "row-reverse": {};
            column: {};
            "column-reverse": {};
        };
        alignment: {
            top: {};
            middle: {};
            bottom: {};
        };
    } & {
        [x: string]: string | {
            [x: string]: {
                flexDirection: "row";
            } | {
                flexDirection: "row-reverse";
            } | {
                flexDirection: "column";
            } | {
                flexDirection: "column-reverse";
            };
            border?: undefined;
            flex?: undefined;
        } | {
            [x: string]: {
                alignItems: "flex-start";
            } | {
                alignItems: "center";
            } | {
                alignItems: "flex-end";
            };
            border?: undefined;
            flex?: undefined;
        } | {
            border: string;
            flex?: undefined;
        } | {
            [x: string]: number | {
                [x: string]: string | {
                    border: string;
                };
                border: string;
                flexBasis?: undefined;
            } | {
                flexBasis: string;
                border?: undefined;
            };
            flex: number;
            border?: undefined;
        };
        flexWrap: string;
        containerType: string;
        containerName: string;
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        [x: string]: {
            [x: string]: {
                [x: string]: {
                    display: "none";
                    flexBasis?: undefined;
                } | {
                    flexBasis: string;
                    display?: undefined;
                };
            };
        };
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
