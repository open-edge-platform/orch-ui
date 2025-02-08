export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        opacity: number;
        padding: string;
        margin: string;
        inlineSize: string;
        blockSize: string;
        borderWidth: string;
        minInlineSizeLabelStart: string;
        helperTextGap: string;
        size: {
            l: {
                selector: string;
                selectorActive: string;
                blockSize: string;
                inlineSize: string;
                fontSize: string;
                padding: string;
                borderRadius: string;
                gap: string;
            };
            m: {
                selector: string;
                selectorActive: string;
                blockSize: string;
                inlineSize: string;
                fontSize: string;
                padding: string;
                borderRadius: string;
                gap: string;
            };
            s: {
                selector: string;
                selectorActive: string;
                blockSize: string;
                inlineSize: string;
                fontSize: string;
                padding: string;
                borderRadius: string;
                gap: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        selector: {};
        size: {
            l: {};
            m: {};
            s: {};
        };
        isInvalid: {};
        wrapper: {};
        labelAlignment: {
            start: {};
            end: {};
        };
        helperText: {};
        isDisabled: {};
    } & {
        [x: string]: string | {
            [x: string]: string | {
                color: string;
                '& input:disabled': {
                    [x: string]: {
                        cursor: "initial";
                        borderInlineColor: string;
                        borderBlockColor: string;
                        '&:after': {
                            background: string;
                        };
                        background?: undefined;
                    } | {
                        borderInlineColor: string;
                        borderBlockColor: string;
                        background: string;
                        '&:after': {
                            background: string;
                        };
                        cursor?: undefined;
                    };
                };
                flexDirection?: undefined;
            } | {
                [x: string]: "row-reverse" | {
                    minInlineSize: string;
                };
                flexDirection: "row-reverse";
                color?: undefined;
                '& input:disabled'?: undefined;
            };
            boxSizing: "border-box";
            display: "flex !important";
            alignItems: "center";
            inlineSize: string;
            flexDirection?: undefined;
            gap?: undefined;
            opacity?: undefined;
            border?: undefined;
            outline?: undefined;
            padding?: undefined;
            margin?: undefined;
            blockSize?: undefined;
            cursor?: undefined;
            background?: undefined;
            borderBlock?: undefined;
            borderInline?: undefined;
            '&:after'?: undefined;
            borderBlockColor?: undefined;
            borderInlineColor?: undefined;
        } | {
            display: "flex";
            flexDirection: "column";
            gap: string;
            boxSizing: "border-box";
            alignItems?: undefined;
            inlineSize?: undefined;
            opacity?: undefined;
            border?: undefined;
            outline?: undefined;
            padding?: undefined;
            margin?: undefined;
            blockSize?: undefined;
            cursor?: undefined;
            background?: undefined;
            borderBlock?: undefined;
            borderInline?: undefined;
            '&:after'?: undefined;
            borderBlockColor?: undefined;
            borderInlineColor?: undefined;
        } | {
            opacity: number;
            border: string;
            outline: string;
            padding: string;
            margin: string;
            inlineSize: string;
            blockSize: string;
            cursor: "pointer";
            boxSizing?: undefined;
            display?: undefined;
            alignItems?: undefined;
            flexDirection?: undefined;
            gap?: undefined;
            background?: undefined;
            borderBlock?: undefined;
            borderInline?: undefined;
            '&:after'?: undefined;
            borderBlockColor?: undefined;
            borderInlineColor?: undefined;
        } | {
            display: "flex";
            alignItems: "center";
            cursor: "pointer";
            background: string;
            borderBlock: string;
            borderInline: string;
            boxSizing: "border-box";
            '&:after': {
                content: "\"\"";
                display: "block";
                background: string;
                borderRadius: string;
                marginInlineStart?: undefined;
            };
            inlineSize?: undefined;
            flexDirection?: undefined;
            gap?: undefined;
            opacity?: undefined;
            border?: undefined;
            outline?: undefined;
            padding?: undefined;
            margin?: undefined;
            blockSize?: undefined;
            borderBlockColor?: undefined;
            borderInlineColor?: undefined;
        } | {
            background: string;
            borderBlockColor: string;
            borderInlineColor: string;
            '&:after': {
                marginInlineStart: string;
                borderRadius: string;
                background: string;
                content?: undefined;
                display?: undefined;
            };
            boxSizing?: undefined;
            display?: undefined;
            alignItems?: undefined;
            inlineSize?: undefined;
            flexDirection?: undefined;
            gap?: undefined;
            opacity?: undefined;
            border?: undefined;
            outline?: undefined;
            padding?: undefined;
            margin?: undefined;
            blockSize?: undefined;
            cursor?: undefined;
            borderBlock?: undefined;
            borderInline?: undefined;
        } | {
            [x: string]: {
                borderInlineColor: string;
                borderBlockColor: string;
                '&:after': {
                    background: string;
                };
                background?: undefined;
            } | {
                borderInlineColor: string;
                borderBlockColor: string;
                background: string;
                '&:after': {
                    background: string;
                };
            };
            boxSizing?: undefined;
            display?: undefined;
            alignItems?: undefined;
            inlineSize?: undefined;
            flexDirection?: undefined;
            gap?: undefined;
            opacity?: undefined;
            border?: undefined;
            outline?: undefined;
            padding?: undefined;
            margin?: undefined;
            blockSize?: undefined;
            cursor?: undefined;
            background?: undefined;
            borderBlock?: undefined;
            borderInline?: undefined;
            '&:after'?: undefined;
            borderBlockColor?: undefined;
            borderInlineColor?: undefined;
        };
        boxSizing: string;
        '& input': {
            opacity: number;
            border: string;
            outline: string;
            padding: string;
            margin: string;
            inlineSize: string;
            blockSize: string;
            cursor: "pointer";
        };
        "&": {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                [x: string]: string | {
                    [x: string]: {
                        borderInlineColor: "Highlight";
                        borderBlockColor: "Highlight";
                        background: string;
                        '&:after': {
                            background: string;
                        };
                    };
                };
                '--spark-toggle-switch-selector-color-off': string;
                '--spark-toggle-switch-selector-color-disabled': string;
                '--spark-toggle-switch-background-color-off': string;
                '--spark-toggle-switch-background-color-on': string;
                '--spark-toggle-switch-background-color-disabled': string;
                '--spark-toggle-switch-background-color-invalid': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColorOn: string;
            backgroundColorOff: string;
            backgroundColorDisabled: string;
            backgroundColorInvalid: string;
            colorTransparent: string;
            selectorColorOff: string;
            selectorColorOn: string;
            selectorColorDisabled: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColorOn: string;
            backgroundColorOff: string;
            backgroundColorDisabled: string;
            backgroundColorInvalid: string;
            colorTransparent: string;
            selectorColorOff: string;
            selectorColorOn: string;
            selectorColorDisabled: string;
        } & {
            backgroundColorOn: string;
            backgroundColorOff: string;
            backgroundColorDisabled: string;
            backgroundColorInvalid: string;
            colorTransparent: string;
            selectorColorOff: string;
            selectorColorOn: string;
            selectorColorDisabled: string;
        }>;
    };
};
