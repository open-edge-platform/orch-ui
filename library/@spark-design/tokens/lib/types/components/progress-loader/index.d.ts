export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        display: string;
        maxInlineSize: string;
        minInlineSize: string;
        indeterminateInlineSize: string;
        blockSize: string;
        blockSizeThick: string;
        blockSizeFilled: string;
        borderStyle: string;
        borderSize: string;
        zeroBorder: string;
        variants: {
            linear: {
                InlineSize: string;
                MinInlineSize: string;
                IndeterminateInlineSize: string;
                BlockSize: string;
                BlockSizeThick: string;
                BlockSizeFilled: string;
                animation: string;
            };
            circular: {
                Length: string;
                IndeterminatePercentage: string;
                MaskThreshold: string;
                borderRadius: string;
                boxSizing: string;
                animation: string;
                mask: {
                    display: string;
                    width: string;
                    height: string;
                    background: string;
                    position: string;
                    outlineSize: string;
                    outlineColor: string;
                    marginLeft: string;
                    marginTop: string;
                    borderRadius: string;
                };
            };
        };
        weight: {
            normal: {};
            heavy: {
                blockSize: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<{
        display: string;
        border: {};
        maxInlineSize: string;
        linear: {
            normal: {};
            heavy: {};
        };
        circular: {};
        whiteMask: {};
        circularContainer: {};
    } & import("jss").Styles<string, unknown, undefined> & {
        variants?: import("jss").Styles<string, unknown, undefined> | undefined;
    }, "variants"> & import("jss").Styles<string, unknown, undefined>>;
    keyframe: import("@spark-design/core/lib/types/keyframe").KeyframeOutput<{
        '@keyframes linearIndeterminate': {
            from: {
                marginInlineStart: string;
            };
            to: {
                marginInlineStart: string;
            };
        };
        '@keyframes circularIndeterminate': {
            from: {
                transform: "rotate(0deg)";
            };
            to: {
                transform: "rotate(360deg)";
            };
        };
    }>;
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
                    [x: string]: {
                        forcedColorAdjust: "none";
                    };
                };
                '--spark-progress-loader-value-color': string;
                '--spark-progress-loader-border-color': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            transparent: string;
            valueColor: string;
            barColor: string;
            borderColor: string;
            maskColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            transparent: string;
            valueColor: string;
            barColor: string;
            borderColor: string;
            maskColor: string;
        } & {
            transparent: string;
            valueColor: string;
            barColor: string;
            borderColor: string;
            maskColor: string;
        }>;
    };
};
