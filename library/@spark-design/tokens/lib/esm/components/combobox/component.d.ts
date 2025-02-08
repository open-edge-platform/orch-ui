export declare const comboboxBase: import("@spark-design/core").ComponentOutput<{
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
}>;
export declare const combobox: import("@spark-design/core").ComponentOutput<Omit<{
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
