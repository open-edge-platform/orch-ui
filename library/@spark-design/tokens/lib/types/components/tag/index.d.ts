export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        padding: string;
        labelGap: string;
        fontSize: string;
        lineHeight: string;
        blockSize: string;
        buttonWrapperOutline: string;
        buttonWrapperPadding: string;
        buttonWrapperMargin: string;
        border: string;
        boxShadowX: string;
        boxShadowYOne: string;
        boxShadowBlurRadius: string;
        boxShadowSpreadRadiusOne: string;
        boxShadowYTwo: string;
        boxShadowSpreadRadiusTwo: string;
        borderRadius: string;
        variants: {
            action: {
                InlineSize: string;
                MinInlineSize: string;
            };
        };
        size: {
            small: {
                padding: string;
                labelGap: string;
                blockSize: string;
                fontSize: string;
                lineHeight: string;
                icon: {
                    fontSize: string;
                };
            };
            large: {
                padding: string;
                labelGap: string;
                blockSize: string;
                fontSize: string;
                lineHeight: string;
                icon: {
                    fontSize: string;
                };
            };
        };
        rounding: {
            "semi-round": {
                borderRadius: string;
            };
            "fully-round": {
                borderRadius: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        flexDirection: string;
        blockSize: string;
        fontSize: string;
        lineHeight: string;
        paddingInline: string;
        gap: string;
        alignItems: string;
        verticalAlign: string;
        cursor: string;
        "& .spark-icon": {
            color: string;
        };
        buttonWrapper: {
            outline: string;
            background: string;
            border: string;
            textDecoration: string;
            cursor: "pointer";
            display: "flex";
            padding: string;
            margin: string;
        };
        shadow: {};
        theme: {};
    } & {
        [x: string]: {};
        size: {};
        rounding: {};
        "&.is-disabled": {
            pointerEvents: "none";
        };
        "& .spark-icon": {
            cursor: "pointer";
            lineHeight: string;
            color: string;
        };
        action: {
            [x: string]: string | {
                color: string;
                background?: undefined;
            } | {
                background: string;
                color?: undefined;
            };
            background: string;
            color: string;
            "&:hover": {
                background: string;
            };
            "&:active": {
                background: string;
            };
            "&:focus-visible": {
                background: string;
            };
        };
        primary: {
            border: string;
        };
        secondary: {};
        ghost: {};
        none: {};
        theme: {};
        "&.is-disabled, &.is-disabled .spark-icon": {
            background: string;
            color: `${string} !important`;
            boxShadow: "none !important";
            borderColor: string;
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            closeIconColor: string;
            backgroundColor: string;
            textColor: string;
            hover: {
                color: string;
            };
            active: {
                color: string;
            };
            focus: {
                color: string;
                backgroundColor: string;
                borderColor: string;
            };
            disabled: {
                backgroundColor: string;
                textColor: string;
            };
            variant: {
                action: {
                    textColor: string;
                };
                primary: {
                    borderColor: string;
                };
                secondary: {
                    borderColor: string;
                };
            };
            theme: {
                classic: {
                    color: string;
                    hover: string;
                    active: string;
                };
                coral: {
                    color: string;
                    hover: string;
                    active: string;
                };
                geode: {
                    color: string;
                    hover: string;
                    active: string;
                };
                moss: {
                    color: string;
                    hover: string;
                    active: string;
                };
                rust: {
                    color: string;
                    hover: string;
                    active: string;
                };
                cobalt: {
                    color: string;
                    hover: string;
                    active: string;
                };
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            closeIconColor: string;
            backgroundColor: string;
            textColor: string;
            hover: {
                color: string;
            };
            active: {
                color: string;
            };
            focus: {
                color: string;
                backgroundColor: string;
                borderColor: string;
            };
            disabled: {
                backgroundColor: string;
                textColor: string;
            };
            variant: {
                action: {
                    textColor: string;
                };
                primary: {
                    borderColor: string;
                };
                secondary: {
                    borderColor: string;
                };
            };
            theme: {
                classic: {
                    color: string;
                    hover: string;
                    active: string;
                };
                coral: {
                    color: string;
                    hover: string;
                    active: string;
                };
                geode: {
                    color: string;
                    hover: string;
                    active: string;
                };
                moss: {
                    color: string;
                    hover: string;
                    active: string;
                };
                rust: {
                    color: string;
                    hover: string;
                    active: string;
                };
                cobalt: {
                    color: string;
                    hover: string;
                    active: string;
                };
            };
        } & {
            closeIconColor: string;
            backgroundColor: string;
            textColor: string;
            hover: {
                color: string;
            };
            active: {
                color: string;
            };
            focus: {
                color: string;
                backgroundColor: string;
                borderColor: string;
            };
            disabled: {
                backgroundColor: string;
                textColor: string;
            };
            variant: {
                action: {
                    textColor: string;
                    backgroundColor: string;
                    hover: {
                        backgroundColor: string;
                    };
                    active: {
                        backgroundColor: string;
                    };
                    focus: {
                        backgroundColor: string;
                    };
                };
                primary: {
                    borderColor: string;
                };
                secondary: {
                    borderColor: string;
                };
            };
            theme: {
                classic: {
                    color: string;
                    hover: string;
                    active: string;
                };
                coral: {
                    color: string;
                    hover: string;
                    active: string;
                };
                geode: {
                    color: string;
                    hover: string;
                    active: string;
                };
                moss: {
                    color: string;
                    hover: string;
                    active: string;
                };
                rust: {
                    color: string;
                    hover: string;
                    active: string;
                };
                cobalt: {
                    color: string;
                    hover: string;
                    active: string;
                };
            };
        }>;
    };
};
