import { codeSnippet } from './component';
export { codeSnippet };
export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        fontFamily: string;
        justifyContent: string;
        preMargin: string;
        zeroPadding: string;
        zeroMargin: string;
        closedOpacity: string;
        openedOpacity: string;
        inline: {
            l: {
                blockSize: string;
                fontSize: string;
                paddingInline: string;
                width: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
                paddingInline: string;
                width: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
                paddingInline: string;
                width: string;
            };
        };
        single: {
            padding: string;
            insetBlockStartCopyIcon: string;
            insetInlineEndCopyIcon: string;
            l: {
                blockSize: string;
                fontSize: string;
                paddingInlineStart: string;
                lineHeight: string;
                inlineTooltipSize: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
                paddingInlineStart: string;
                lineHeight: string;
                inlineTooltipSize: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
                paddingInlineStart: string;
                lineHeight: string;
                inlineTooltipSize: string;
            };
        };
        multiline: {
            insetBlockStartCopyIcon: string;
            insetInlineEndCopyIcon: string;
            l: {
                fontSize: string;
                blockSize: string;
                paddingInlineStart: string;
                paddingBlockStart: string;
                gap: string;
                tooltipTop: string;
                tooltipRight: string;
            };
            m: {
                fontSize: string;
                blockSize: string;
                paddingInlineStart: string;
                paddingBlockStart: string;
                gap: string;
            };
            s: {
                fontSize: string;
                blockSize: string;
                paddingInlineStart: string;
                paddingBlockStart: string;
                gap: string;
            };
        };
        copyIcon: {
            fontSize: string;
            flexShrink: number;
            marginInlineEnd: number;
            paddingInlineEnd: string;
        };
        lineNumbering: {
            paddingInlineStart: string;
            paddingInlineEnd: string;
            paddingInlineTop: string;
            borderInlineEnd: string;
            marginRight: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        backgroundColor: string;
        position: string;
        color: string;
        lineNumbering: {
            paddingInlineStart: string;
        };
        inherit: {
            fontSize: string;
        };
        pre: {
            counterReset: "count 0";
            display: "grid";
            gridTemplateColumns: string;
            gridAutoRows: string;
            margin: string;
            padding: string;
        };
        hideNumbering: {};
        size: {};
        inline: {};
        checkIcon: {
            color: "white";
        };
        copyIcon: {
            display: "none !important";
        };
        isVisible: {
            display: "block !important";
        };
        single: {
            copyIcon: {
                [x: string]: string | {
                    color: string;
                };
                position: "absolute !important";
                appearance: "none !important";
                insetBlockStart: string;
                insetInlineEnd: string;
                padding: string;
                zIndex: "999";
                backgroundColor: string;
            };
            scrollbarY: {
                isHidden: {
                    overflowY: "hidden";
                };
            };
        };
        multiline: {
            copyIcon: {
                [x: string]: string | {
                    color: string;
                };
                fontSize: string;
                position: "absolute";
                insetBlockStart: string;
                insetInlineEnd: string;
                zIndex: "999";
                backgroundColor: string;
            };
        };
        scrollbar: {
            isHidden: {
                overflowY: "hidden !important";
                overflowX: "hidden !important";
            };
        };
        animate: {};
        tooltip: {
            multiline: {
                visibility: "hidden";
                PointerEvents: string;
                opacity: string;
            };
            l: {
                blockSize: string;
                alignItems: "center !important";
                padding: string;
                gap: string;
            };
            m: {
                blockSize: string;
                alignItems: "center !important";
            };
            s: {
                blockSize: string;
                alignItems: "center !important";
            };
        };
        lineCount: {
            fontFamily: string;
            textAlign: "end";
            display: "grid";
        };
    } & {
        [x: string]: {};
        size: {};
    }>;
    keyframe: import("@spark-design/core/lib/types/keyframe").KeyframeOutput<{
        [x: string]: {
            '0%': {
                marginInlineStart: string;
            };
            '37%, 62%': {
                inlineSize: string;
                marginInlineStart: string;
                position: "absolute";
            };
            '100%': {
                marginInlineStart: string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: string;
            backgroundColor: string;
            borderColor: string;
            numberingColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: string;
            backgroundColor: string;
            borderColor: string;
            numberingColor: string;
        } & {
            color: string;
            backgroundColor: string;
            borderColor: string;
            numberingColor: string;
        }>;
    };
};
