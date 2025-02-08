import { dropdown } from './component';
import { DropdownSize, DropdownVariant } from './types';
export { dropdown, DropdownSize, DropdownVariant };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        textPlaceholderStyle: string;
        supplementaryIconPaddingInlineEnd: string;
        listBox: {
            padding: number;
            margin: number;
            outline: string;
            scroll: {
                height: string;
                padding: string;
            };
        };
        button: {
            padding: number;
            borderWidth: string;
            borderRadius: number;
            errorBorderWidth: string;
            openedFocusOutlineWidth: string;
            iconFontSize: string;
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
            supplementaryIconPrimaryPaddingInlineStart: string;
            supplementaryIconGhostPaddingInlineStart: string;
        };
        m: {
            labelPaddingLeft: string;
            labelPaddingBlock: string;
            iconPaddingStart: string;
            iconPaddingEnd: string;
            fontSize: string;
            lineHeight: string;
            listBoxItemPaddingInlineStart: string;
            supplementaryIconPrimaryPaddingInlineStart: string;
            supplementaryIconGhostPaddingInlineStart: string;
        };
        s: {
            labelPaddingLeft: string;
            labelPaddingBlock: string;
            iconPaddingStart: string;
            iconPaddingEnd: string;
            fontSize: string;
            lineHeight: string;
            listBoxItemPaddingInlineStart: string;
            supplementaryIconPrimaryPaddingInlineStart: string;
            supplementaryIconGhostPaddingInlineStart: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<{
        position: string;
        display: string;
        fontFamily: string;
        inlineSize: string;
        isDisabled: {};
        button: {};
        buttonLabel: {};
        buttonIsDisabled: {};
        buttonError: {};
        buttonIsFocused: {};
        buttonLabelIsSelected: {};
        listBox: {};
        listBoxScroll: {};
        arrowIcon: {};
        supplementaryIcon: {};
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
                    [x: string]: `${string} !important` | {
                        [x: string]: string | {
                            backgroundColor: string;
                            border: string;
                            color?: undefined;
                        } | {
                            color: string;
                            backgroundColor?: undefined;
                            border?: undefined;
                        };
                        color: string;
                        cursor: string;
                    };
                    color: `${string} !important`;
                    cursor: "default !important";
                };
                color: string;
            };
            ghost: {
                [x: string]: string | {
                    [x: string]: string | {
                        backgroundColor: string;
                        border: string;
                        color?: undefined;
                    } | {
                        color: string;
                        backgroundColor?: undefined;
                        border?: undefined;
                    };
                    color: string;
                    cursor: string;
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
                [x: string]: `${string} !important` | {
                    [x: string]: string | {
                        backgroundColor: string;
                        border: string;
                        color?: undefined;
                    } | {
                        color: string;
                        backgroundColor?: undefined;
                        border?: undefined;
                    };
                    color: string;
                    cursor: string;
                };
                color: `${string} !important`;
                cursor: "default !important";
            };
            color: string;
        };
        ghost: {
            [x: string]: string | {
                [x: string]: string | {
                    backgroundColor: string;
                    border: string;
                    color?: undefined;
                } | {
                    color: string;
                    backgroundColor?: undefined;
                    border?: undefined;
                };
                color: string;
                cursor: string;
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
