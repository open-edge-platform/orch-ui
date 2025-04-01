import { tooltipBase } from './component';
import { TooltipPlacement, TooltipSize } from './types';
export { tooltipBase, TooltipPlacement, TooltipSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        insetInlineStart: string;
        insetBlockStart: string;
        zIndex: string;
        top: string;
        left: string;
        tipBlockSize: string;
        tipInlineSize: string;
        tipBorderWidth: string;
        marginInlineEnd: string;
        gapSize: string;
        insetBlockEnd: string;
        tipMarginInlineStart: string;
        tipInsetBlockStart: string;
        tipInsetBlockEnd: string;
        maxInlineSize: string;
        midTooltipSize: string;
        m: {
            fontSize: string;
            labelFontWeight: string;
            labelLineHeight: string;
            iconLineHeight: string;
            paddingTopBottom: string;
            paddingRightLeft: string;
            gapSize: string;
            tooltipGap: string;
            diffSizeGap: string;
        };
        s: {
            fontSize: string;
            labelFontWeight: string;
            labelLineHeight: string;
            iconLineHeight: string;
            paddingTopBottom: string;
            paddingRightLeft: string;
            gapSize: string;
            tooltipGap: string;
            diffSizeGap: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        insetInlineStart: string;
        insetBlockStart: string;
        display: string;
        flexDirection: string;
        zIndex: string;
        position: string;
        top: string;
        left: string;
        boxSizing: string;
        verticalAlign: string;
        inlineSize: string;
        maxInlineSize: string;
        wordBreak: string;
        alignItems: string;
        backgroundColor: string;
        color: string;
        visibility: string;
        pointerEvents: string;
        label: {};
        tip: {
            position: "absolute";
            blockSize: string;
            inlineSize: string;
            borderWidth: string;
            borderStyle: "solid";
            borderInlineStartColor: "transparent";
            borderInlineEndColor: "transparent";
            borderBlockEndColor: "transparent";
            color: string;
        };
        toggle: {
            display: "flex";
            position: "relative";
            width: string;
        };
        rightSide: {};
        right: {};
        bottom: {};
        leftSide: {};
        start: {};
        end: {};
    } & {
        [x: string]: {};
        size: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            color: string;
            tipColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            color: string;
            tipColor: string;
        } & {
            backgroundColor: string;
            color: string;
            tipColor: string;
        }>;
    };
};
