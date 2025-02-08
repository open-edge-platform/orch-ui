export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        display: string;
        fontSize: string;
        lineHeight: string;
        maxInlineSize: string;
        inlineSize: string;
        minInlineSize: string;
        indeterminateInlineSize: string;
        borderSize: string;
        opacityZero: number;
        label: {
            display: string;
            fontSize: string;
            lineHeight: string;
            overflowInlineSize: string;
            padding: string;
            container: {
                display: string;
                justifyContent: string;
                minInlineSize: string;
            };
            filled: {
                position: string;
                padding: string;
                textAlign: string;
            };
            heavy: {
                fontSize: string;
            };
        };
        linear: {
            inlineSize: string;
            minInlineSize: string;
            blockSize: string;
            indeterminateInlineSize: string;
            bar: {
                inlineSize: string;
                blockSize: string;
                transition: string;
                heavy: {
                    blockSize: string;
                };
                filled: {
                    blockSize: string;
                };
                minimum: {
                    minInlineSize: string;
                    blockSize: string;
                };
            };
        };
        circular: {
            Length: string;
            ContainerLength: string;
            indeterminatePercentage: string;
            maskThreshold: string;
            borderRadius: string;
            boxSizing: string;
            MaskThreshold: string;
            mask: {
                position: string;
                width: string;
                height: string;
                marginTop: string;
                marginLeft: string;
                borderRadius: string;
                outlineSize: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<{
        display: string;
        maxInlineSize: string;
        inlineSize: string;
        position: string;
        bar: {};
        label: {};
        labelContainer: {};
        percentage: {};
        overlay: {};
        clippingMask: {};
        circularContainer: {};
        linearLabel: {};
        filledLabel: {};
        maskCircular: {};
        normal: {};
        heavy: {};
        circular: {};
        minimum: {};
        filled: {};
        linear: {};
    } & import("jss").Styles<string, unknown, undefined> & {
        variants?: import("jss").Styles<string, unknown, undefined> | undefined;
    }, "variants"> & import("jss").Styles<string, unknown, undefined>>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (prefers-reduced-motion: reduce)': {
            [x: string]: {
                animation: "none !important";
                transition: "none !important";
            };
        };
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                [x: string]: string | {
                    forcedColorAdjust: "none";
                    color?: undefined;
                } | {
                    forcedColorAdjust: "none";
                    color: "HighlightText";
                } | {
                    color: "CanvasText";
                    forcedColorAdjust?: undefined;
                };
                '--spark-progress-indicator-value-color': string;
                '--spark-progress-indicator-border-color': string;
                '--spark-progress-indicator-bar-color-success': string;
                '--spark-progress-indicator-bar-color-error': string;
                '--spark-progress-indicator-label-top-overlay-text-color-error': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            ValueColor: string;
            borderColor: string;
            barColor: string;
            barColorSuccess: string;
            barColorError: string;
            textColor: string;
            maskBackground: string;
            label: {
                topOverlay: {
                    textColor: string;
                    textColorSuccess: string;
                    textColorError: string;
                };
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            ValueColor: string;
            borderColor: string;
            barColor: string;
            barColorSuccess: string;
            barColorError: string;
            textColor: string;
            maskBackground: string;
            label: {
                topOverlay: {
                    textColor: string;
                    textColorSuccess: string;
                    textColorError: string;
                };
            };
        } & {
            valueColor: string;
            borderColor: string;
            barColor: string;
            barColorSuccess: string;
            barColorError: string;
            textColor: string;
            label: {
                topOverlay: {
                    textColor: string;
                    textColorSuccess: string;
                    textColorError: string;
                };
            };
        }>;
    };
};
