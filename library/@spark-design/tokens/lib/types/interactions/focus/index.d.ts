import { focus } from './state';
export { focus };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        outlineWidthFinalExtra: string;
        outlineWidthFinalPrimary: string;
        outlineWidthFinalBackup: string;
        outlineWidthInitPrimary: string;
        outlineWidthInitBackup: string;
        snapTransitionDuration: string;
        snapTransitionTimingFunction: string;
        customFocusSuppressOutline: string;
        boxShadowX: string;
        boxShadowY: string;
        boxShadowBlurRadius: string;
    }>;
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
        light: import("@spark-design/core").TokenData<{
            colorFocusPrimary: string;
            colorFocusBackup: string;
            colorFocusBackground: string;
            colorFocusForeground: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            colorFocusPrimary: string;
            colorFocusBackup: string;
            colorFocusBackground: string;
            colorFocusForeground: string;
        } & {
            colorFocusPrimary: string;
            colorFocusBackup: string;
            colorFocusBackground: string;
            colorFocusForeground: string;
        }>;
    };
};
