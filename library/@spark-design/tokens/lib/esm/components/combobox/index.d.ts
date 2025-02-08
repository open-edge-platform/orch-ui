import { combobox } from './component';
import { ComboboxSize, ComboboxVariant } from './types';
export { combobox, ComboboxSize, ComboboxVariant };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        textPlaceholderStyle: string;
        arrowButtonPadding: string;
        listBox: {
            padding: number;
            margin: number;
            outline: string;
            scroll: {
                height: string;
                padding: string;
            };
            item: {
                paddingInlineStart: string;
            };
        };
        button: {
            padding: number;
            borderWidth: string;
            borderRadius: number;
            errorBorderWidth: string;
            openedFocusOutlineWidth: string;
        };
        ghost: {
            variantBorder: number;
            variantBorderBottom: string;
            paddingInlineStart: string;
            arrowMarginInlineEnd: string;
        };
        l: {
            labelPaddingLeft: string;
            labelPaddingBlock: string;
            iconPaddingStart: string;
            iconPaddingEnd: string;
            fontSize: string;
            lineHeight: string;
            listBoxItemPaddingInlineStart: string;
        };
        m: {
            labelPaddingLeft: string;
            labelPaddingBlock: string;
            iconPaddingStart: string;
            iconPaddingEnd: string;
            fontSize: string;
            lineHeight: string;
            listBoxItemPaddingInlineStart: string;
        };
        s: {
            labelPaddingLeft: string;
            labelPaddingBlock: string;
            iconPaddingStart: string;
            iconPaddingEnd: string;
            fontSize: string;
            lineHeight: string;
            listBoxItemPaddingInlineStart: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<{
        position: string;
        display: string;
        fontFamily: string;
        inlineSize: string;
        isDisabled: {};
        arrowButton: {};
        arrowIcon: {};
        button: {};
        buttonError: {};
        buttonIsDisabled: {};
        buttonIsFocused: {};
        buttonLabel: {};
        buttonLabelIsSelected: {};
        listBox: {};
        listBoxScroll: {};
        ghost: {};
        primary: {};
        s: {};
        m: {};
        l: {};
    } & {
        [x: string]: {};
        listBoxScroll: {
            maxBlockSize: string;
            whiteSpace: "normal";
            padding: string;
        };
        listBox: {};
        variants: {
            primary: {
                [x: string]: string | {
                    [x: string]: string | {
                        [x: string]: string | {
                            [x: string]: string | {
                                color: string;
                            };
                            backgroundColor: string;
                            border: string;
                            "&::-webkit-input-placeholder"?: undefined;
                            "&::-moz-placeholder"?: undefined;
                            "&:-moz-placeholder"?: undefined;
                            "&:-ms-input-placeholder"?: undefined;
                        } | {
                            "&::-webkit-input-placeholder": {
                                color: string;
                            };
                            "&::-moz-placeholder": {
                                color: string;
                            };
                            "&:-moz-placeholder": {
                                color: string;
                            };
                            "&:-ms-input-placeholder": {
                                color: string;
                            };
                            backgroundColor?: undefined;
                            border?: undefined;
                        };
                        color: string;
                        cursor: string;
                        "& input:disabled": {
                            "&::-webkit-input-placeholder": {
                                color: string;
                            };
                            "&::-moz-placeholder": {
                                color: string;
                            };
                            "&:-moz-placeholder": {
                                color: string;
                            };
                            "&:-ms-input-placeholder": {
                                color: string;
                            };
                        };
                    };
                    color: string;
                    cursor: "default";
                };
                color: string;
            };
            ghost: {
                [x: string]: string | {
                    [x: string]: string | {
                        [x: string]: string | {
                            color: string;
                        };
                        backgroundColor: string;
                        border: string;
                        "&::-webkit-input-placeholder"?: undefined;
                        "&::-moz-placeholder"?: undefined;
                        "&:-moz-placeholder"?: undefined;
                        "&:-ms-input-placeholder"?: undefined;
                    } | {
                        "&::-webkit-input-placeholder": {
                            color: string;
                        };
                        "&::-moz-placeholder": {
                            color: string;
                        };
                        "&:-moz-placeholder": {
                            color: string;
                        };
                        "&:-ms-input-placeholder": {
                            color: string;
                        };
                        backgroundColor?: undefined;
                        border?: undefined;
                    };
                    color: string;
                    cursor: string;
                    "& input:disabled": {
                        "&::-webkit-input-placeholder": {
                            color: string;
                        };
                        "&::-moz-placeholder": {
                            color: string;
                        };
                        "&:-moz-placeholder": {
                            color: string;
                        };
                        "&:-ms-input-placeholder": {
                            color: string;
                        };
                    };
                } | {
                    border: string;
                    borderBottom: string;
                    paddingInlineStart?: undefined;
                    marginInlineEnd?: undefined;
                    backgroundColor?: undefined;
                } | {
                    paddingInlineStart: string;
                    border?: undefined;
                    borderBottom?: undefined;
                    marginInlineEnd?: undefined;
                    backgroundColor?: undefined;
                } | {
                    marginInlineEnd: string;
                    border?: undefined;
                    borderBottom?: undefined;
                    paddingInlineStart?: undefined;
                    backgroundColor?: undefined;
                } | {
                    borderBottom: string;
                    border?: undefined;
                    paddingInlineStart?: undefined;
                    marginInlineEnd?: undefined;
                    backgroundColor?: undefined;
                } | {
                    backgroundColor: `${string} !important`;
                    border: string;
                    borderBottom: string;
                    paddingInlineStart?: undefined;
                    marginInlineEnd?: undefined;
                };
                color: string;
            };
        };
        size: {};
    }, "variants"> & {
        primary: {
            [x: string]: string | {
                [x: string]: string | {
                    [x: string]: string | {
                        [x: string]: string | {
                            color: string;
                        };
                        backgroundColor: string;
                        border: string;
                        "&::-webkit-input-placeholder"?: undefined;
                        "&::-moz-placeholder"?: undefined;
                        "&:-moz-placeholder"?: undefined;
                        "&:-ms-input-placeholder"?: undefined;
                    } | {
                        "&::-webkit-input-placeholder": {
                            color: string;
                        };
                        "&::-moz-placeholder": {
                            color: string;
                        };
                        "&:-moz-placeholder": {
                            color: string;
                        };
                        "&:-ms-input-placeholder": {
                            color: string;
                        };
                        backgroundColor?: undefined;
                        border?: undefined;
                    };
                    color: string;
                    cursor: string;
                    "& input:disabled": {
                        "&::-webkit-input-placeholder": {
                            color: string;
                        };
                        "&::-moz-placeholder": {
                            color: string;
                        };
                        "&:-moz-placeholder": {
                            color: string;
                        };
                        "&:-ms-input-placeholder": {
                            color: string;
                        };
                    };
                };
                color: string;
                cursor: "default";
            };
            color: string;
        };
        ghost: {
            [x: string]: string | {
                [x: string]: string | {
                    [x: string]: string | {
                        color: string;
                    };
                    backgroundColor: string;
                    border: string;
                    "&::-webkit-input-placeholder"?: undefined;
                    "&::-moz-placeholder"?: undefined;
                    "&:-moz-placeholder"?: undefined;
                    "&:-ms-input-placeholder"?: undefined;
                } | {
                    "&::-webkit-input-placeholder": {
                        color: string;
                    };
                    "&::-moz-placeholder": {
                        color: string;
                    };
                    "&:-moz-placeholder": {
                        color: string;
                    };
                    "&:-ms-input-placeholder": {
                        color: string;
                    };
                    backgroundColor?: undefined;
                    border?: undefined;
                };
                color: string;
                cursor: string;
                "& input:disabled": {
                    "&::-webkit-input-placeholder": {
                        color: string;
                    };
                    "&::-moz-placeholder": {
                        color: string;
                    };
                    "&:-moz-placeholder": {
                        color: string;
                    };
                    "&:-ms-input-placeholder": {
                        color: string;
                    };
                };
            } | {
                border: string;
                borderBottom: string;
                paddingInlineStart?: undefined;
                marginInlineEnd?: undefined;
                backgroundColor?: undefined;
            } | {
                paddingInlineStart: string;
                border?: undefined;
                borderBottom?: undefined;
                marginInlineEnd?: undefined;
                backgroundColor?: undefined;
            } | {
                marginInlineEnd: string;
                border?: undefined;
                borderBottom?: undefined;
                paddingInlineStart?: undefined;
                backgroundColor?: undefined;
            } | {
                borderBottom: string;
                border?: undefined;
                paddingInlineStart?: undefined;
                marginInlineEnd?: undefined;
                backgroundColor?: undefined;
            } | {
                backgroundColor: `${string} !important`;
                border: string;
                borderBottom: string;
                paddingInlineStart?: undefined;
                marginInlineEnd?: undefined;
            };
            color: string;
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            background: string;
            backgroundActive: string;
            backgroundDisabled: string;
            text: {
                color: string;
                disabledColor: string;
                invalidColor: string;
                placeholderColor: string;
                selectedColor: string;
            };
            button: {
                disabledBackground: string;
                focusOutlineColor: string;
                disabledColor: string;
                disabledTextColor: string;
            };
            border: {
                color: string;
                invalidColor: string;
                hoverColor: string;
                invalidHover: string;
                openedColor: string;
            };
            ghost: {
                borderBottomColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            background: string;
            backgroundActive: string;
            backgroundDisabled: string;
            text: {
                color: string;
                disabledColor: string;
                invalidColor: string;
                placeholderColor: string;
                selectedColor: string;
            };
            button: {
                disabledBackground: string;
                focusOutlineColor: string;
                disabledColor: string;
                disabledTextColor: string;
            };
            border: {
                color: string;
                invalidColor: string;
                hoverColor: string;
                invalidHover: string;
                openedColor: string;
            };
            ghost: {
                borderBottomColor: string;
            };
        } & {
            background: string;
            backgroundActive: string;
            backgroundDisabled: string;
            text: {
                color: string;
                disabledColor: string;
                invalidColor: string;
                placeholderColor: string;
                selectedColor: string;
            };
            button: {
                disabledBackground: string;
                focusOutlineColor: string;
                disabledColor: string;
                disabledTextColor: string;
            };
            border: {
                color: string;
                invalidColor: string;
                hoverColor: string;
                invalidHover: string;
                openedColor: string;
            };
            ghost: {
                borderBottomColor: string;
            };
        }>;
    };
};
