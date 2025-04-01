import { tabs } from './component';
export * from './types';
export { tabs };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        fontWeight: number;
        activeBorderThin: string;
        activeMarginEnd: string;
        tabMaxWith: string;
        iconGap: string;
        badgeGap: string;
        badgeStart: string;
        zeroGap: string;
        boxShadowX: string;
        boxShadowBlurRadius: string;
        boxShadowSpreadRadius: string;
        boxShadowY: string;
        blockBoxShadowY: string;
        insetBlockEnd: string;
        boxShadowZero: string;
        scrollbarPadding: string;
        size: {
            l: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
            };
        };
        block: {
            paddingGap: string;
            l: {
                iconOnlyGap: string;
                iconPaddingEnd: string;
                paddingInline: string;
                gap: string;
                gapThin: string;
                inverseGap: string;
            };
            m: {
                iconOnlyGap: string;
                iconPaddingEnd: string;
                paddingInline: string;
                gap: string;
                gapThin: string;
                inverseGap: string;
            };
            s: {
                iconOnlyGap: string;
                iconPaddingEnd: string;
                paddingInline: string;
                gap: string;
                gapThin: string;
                inverseGap: string;
            };
        };
        ghost: {
            gap: string;
            l: {
                paddingInline: string;
            };
            m: {
                paddingInline: string;
            };
            s: {
                paddingInline: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        minInlineSize: string;
        tab: {
            display: "flex";
            background: string;
            border: string;
            textDecoration: string;
            alignItems: "center";
            position: "relative";
            justifyContent: "center";
            cursor: "pointer";
            fontWeight: number;
            maxInlineSize: string;
        };
        tabContent: {
            overflow: "hidden";
            whiteSpace: "nowrap";
            textOverflow: "ellipsis";
        };
        active: {};
        iconOnly: {};
        disabled: {
            cursor: "initial";
            color: string;
        };
        icon: {
            marginInlineEnd: string;
        };
        close: {
            marginInlineStart: string;
        };
        block: {};
        ghost: {};
        scrollbar: {
            padding: string;
        };
    } & {
        [x: string]: {};
        size: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: string;
            colorActive: string;
            colorActiveBorder: string;
            colorActiveBackground: string;
            colorDisabled: string;
            colorDisabledBorder: string;
            colorDisabledBackground: string;
            colorBackground: string;
            colorGhostBorder: string;
            colorHoverBackground: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: string;
            colorActive: string;
            colorActiveBorder: string;
            colorActiveBackground: string;
            colorDisabled: string;
            colorDisabledBorder: string;
            colorDisabledBackground: string;
            colorBackground: string;
            colorGhostBorder: string;
            colorHoverBackground: string;
        } & {
            color: string;
            colorActive: string;
            colorActiveBorder: string;
            colorActiveBackground: string;
            colorDisabled: string;
            colorDisabledBorder: string;
            colorDisabledBackground: string;
            colorBackground: string;
            colorGhostBorder: string;
            colorHoverBackground: string;
        }>;
    };
};
