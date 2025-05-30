import { input } from './component';
export * from './types';
export { input };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        borderWidth: string;
        quietBorderWidth: string;
        l: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingOutlineInline: string;
        };
        m: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingOutlineInline: string;
        };
        s: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingOutlineInline: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<Omit<{
        cursor: string;
        borderStyle: string;
        boxSizing: string;
        color: string;
        borderColor: string;
        fontFamily: string;
        display: string;
        alignItems: string;
        isReadOnly: {};
        isDisabled: {};
        isInvalid: {};
        '&:hover, &:focus': {
            borderColor: string;
            '&::placeholder': {
                color: string;
            };
        };
        '&:focus-visible': {
            outline: string;
        };
        '&::placeholder': {
            color: string;
            fontStyle: "italic";
        };
        variants: {
            quiet: {
                borderWidth: string;
                backgroundColor: string;
                borderBlockEndWidth: string;
            };
            size: {
                l: {
                    blockSize: string;
                    fontSize: string;
                    lineHeight: string;
                };
                m: {
                    blockSize: string;
                    fontSize: string;
                    lineHeight: string;
                };
                s: {
                    blockSize: string;
                    fontSize: string;
                    lineHeight: string;
                };
            };
        };
    }, "variants"> & {
        quiet: {
            borderWidth: string;
            backgroundColor: string;
            borderBlockEndWidth: string;
        };
        size: {
            l: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
        };
    } & {
        [x: string]: {
            borderColor: string;
            cursor?: undefined;
            color?: undefined;
            '&::placeholder'?: undefined;
            outline?: undefined;
        } | {
            cursor: "default";
            color: `${string} !important`;
            borderColor: `${string} !important`;
            '&::placeholder': {
                color: `${string} !important`;
            };
            outline?: undefined;
        } | {
            outline: {
                [x: string]: string | {
                    backgroundColor: string;
                    paddingInline?: undefined;
                } | {
                    paddingInline: string;
                    backgroundColor?: undefined;
                };
                borderWidth: string;
                backgroundColor: string;
            };
            borderColor?: undefined;
            cursor?: undefined;
            color?: undefined;
            '&::placeholder'?: undefined;
        };
        variants: {
            outline: {
                [x: string]: string | {
                    backgroundColor: string;
                    paddingInline?: undefined;
                } | {
                    paddingInline: string;
                    backgroundColor?: undefined;
                };
                borderWidth: string;
                backgroundColor: string;
            };
        };
    }, "variants"> & {
        outline: {
            [x: string]: string | {
                backgroundColor: string;
                paddingInline?: undefined;
            } | {
                paddingInline: string;
                backgroundColor?: undefined;
            };
            borderWidth: string;
            backgroundColor: string;
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: string;
            colorDisabled: string;
            colorPlaceholder: string;
            colorPlaceholderHover: string;
            colorInvalid: string;
            borderColor: string;
            borderColorHover: string;
            borderColorFocus: string;
            borderColorDisabled: string;
            borderColorActive: string;
            bgColorOutline: string;
            bgColorOutlineDisabled: string;
            transparentColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: string;
            colorDisabled: string;
            colorPlaceholder: string;
            colorPlaceholderHover: string;
            colorInvalid: string;
            borderColor: string;
            borderColorHover: string;
            borderColorFocus: string;
            borderColorDisabled: string;
            borderColorActive: string;
            bgColorOutline: string;
            bgColorOutlineDisabled: string;
            transparentColor: string;
        } & {
            color: string;
            colorDisabled: string;
            colorPlaceholder: string;
            colorPlaceholderHover: string;
            colorInvalid: string;
            borderColor: string;
            borderColorHover: string;
            borderColorFocus: string;
            borderColorDisabled: string;
            borderColorActive: string;
            bgColorOutline: string;
            bgColorOutlineDisabled: string;
            transparentColor: string;
        }>;
    };
};
