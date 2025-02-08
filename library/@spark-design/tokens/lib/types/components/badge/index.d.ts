import { badge } from './component';
import { BadgeShape, BadgeSize, BadgeVariant } from './types';
export { badge, BadgeShape, BadgeSize, BadgeVariant };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        base: {
            display: string;
            textAlign: string;
        };
        xs: {
            height: string;
            width: string;
            fontSize: string;
            paddingInline: string;
            lineHeight: {
                text: string;
            };
            letterSpacing: string;
        };
        s: {
            height: string;
            width: string;
            fontSize: string;
            paddingInline: string;
            lineHeight: {
                text: string;
            };
            letterSpacing: string;
        };
        m: {
            height: string;
            width: string;
            fontSize: string;
            paddingInline: string;
            lineHeight: {
                text: string;
            };
            letterSpacing: string;
        };
        l: {
            height: string;
            width: string;
            fontSize: string;
            paddingInline: string;
            lineHeight: {
                text: string;
            };
            letterSpacing: string;
        };
        xl: {
            height: string;
            width: string;
            fontSize: string;
            paddingInline: string;
            lineHeight: {
                text: string;
            };
            letterSpacing: string;
        };
        circle: {
            borderRadius: string;
        };
        pill: {
            borderRadius: string;
        };
        square: {
            borderRadius: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        alignItems: string;
        color: string;
        justifyContent: string;
        text: {};
        noText: {};
    } & {
        text: {
            size: {};
        };
        noText: {
            size: {};
        };
        shape: {};
        variant: {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                '--spark-badge-color': string;
                '--spark-badge-success-background-color': string;
                '--spark-badge-info-background-color': string;
                '--spark-badge-warning-background-color': string;
                '--spark-badge-alert-background-color': string;
                '--spark-badge-unknown-background-color': string;
                forcedColorAdjust?: undefined;
            } | {
                forcedColorAdjust: "none";
                '--spark-badge-color'?: undefined;
                '--spark-badge-success-background-color'?: undefined;
                '--spark-badge-info-background-color'?: undefined;
                '--spark-badge-warning-background-color'?: undefined;
                '--spark-badge-alert-background-color'?: undefined;
                '--spark-badge-unknown-background-color'?: undefined;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: string;
            success: {
                backgroundColor: string;
            };
            info: {
                backgroundColor: string;
            };
            warning: {
                backgroundColor: string;
            };
            alert: {
                backgroundColor: string;
            };
            unknown: {
                backgroundColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: string;
            success: {
                backgroundColor: string;
            };
            info: {
                backgroundColor: string;
            };
            warning: {
                backgroundColor: string;
            };
            alert: {
                backgroundColor: string;
            };
            unknown: {
                backgroundColor: string;
            };
        } & {
            color: string;
            success: {
                backgroundColor: string;
            };
            info: {
                backgroundColor: string;
            };
            warning: {
                backgroundColor: string;
            };
            alert: {
                backgroundColor: string;
            };
            unknown: {
                backgroundColor: string;
            };
        }>;
    };
};
