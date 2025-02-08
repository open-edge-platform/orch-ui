import { messageBanner } from './component';
import { AlertVariant, ButtonPlacementVariants, ExposeColorVariant, MessageBannerAlertState, MessageBannerButtonPosition, MessageBannerDialogState, MessageBannerProps, MessageBannerSize } from './properties';
export { AlertVariant, ButtonPlacementVariants, ExposeColorVariant, messageBanner, MessageBannerAlertState, MessageBannerButtonPosition, MessageBannerDialogState, MessageBannerProps, MessageBannerSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        horizontalBorderGap: string;
        verticalBorderGap: string;
        horizontalContentGap: string;
        verticalContentGap: string;
        messageContent: {
            icon: {
                sidesGap: string;
            };
            messageTitle: {
                marginTop: string;
                marginBottom: string;
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                fontFamily: string[];
                letterSpacing: string;
            };
            messageDescription: {
                fontSize: string;
                fontWeight: number;
                lineHeight: string;
                fontFamily: string[];
                letterSpacing: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        state: {
            default: {};
            black: {};
            white: {};
            grey: {};
            error: {};
            info: {};
            success: {};
            warning: {};
        };
        grid: {
            row: {};
            column: {
                "icon-column": {
                    default: {};
                    error: {};
                    info: {};
                    success: {};
                    warning: {};
                };
                "message-column": {
                    content: {
                        messageTitle: {};
                        messageDescription: {};
                    };
                    buttonPlacement: {
                        left: {};
                        center: {};
                        right: {};
                        spread: {};
                        "left-reverse": {};
                        "center-reverse": {};
                        "right-reverse": {};
                        "spread-reverse": {};
                    };
                };
                "close-column": {};
            };
        };
        outlined: {};
        hide: {};
    } & {
        [x: string]: string | {
            fontSize: string;
            fontWeight: number;
            lineHeight: string;
            fontFamily: string[];
            letterSpacing: string;
        } | {
            display: "none !important";
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            display: "flex";
            flexDirection: "row";
            marginBottom: string;
            "&:last-child": {
                marginBottom: number;
                marginRight?: undefined;
            };
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            [x: string]: string | {
                marginRight: number;
                justifyContent?: undefined;
                padding?: undefined;
                marginLeft?: undefined;
            } | {
                justifyContent: "left";
                padding: string;
                marginRight?: undefined;
                marginLeft?: undefined;
            } | {
                justifyContent: "center";
                marginRight?: undefined;
                padding?: undefined;
                marginLeft?: undefined;
            } | {
                marginLeft: string;
                marginRight?: undefined;
                justifyContent?: undefined;
                padding?: undefined;
            };
            display: "flex";
            flexDirection: "column";
            marginRight: string;
            "&:last-child": {
                marginRight: number;
                marginBottom?: undefined;
            };
            marginBottom?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            marginRight: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            marginLeft: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            margin: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            justifyContent: "space-between";
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            flexDirection: "row-reverse";
            display?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            color: string;
            border: string;
            backgroundColor: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            color: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            backgroundColor: string;
            color: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            backgroundColor: string;
            borderColor: string;
            color: string;
            "&:hover, & .spark-button-hovered": {
                backgroundColor: string;
                borderColor?: undefined;
                color?: undefined;
            };
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            backgroundColor: string;
            color: string;
            "& .spark-button-hovered, &:hover": {
                backgroundColor: string;
            };
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            backgroundColor: string;
            borderColor: string;
            color: string;
            "&:hover, & .spark-button-hovered": {
                backgroundColor: string;
                borderColor: string;
                color: string;
            };
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            borderColor: string;
            color: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            backgroundColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            color: string;
            border: string;
            backgroundColor: string;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered": {
                border: string;
                color: string;
            };
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            backgroundColor: string;
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            color?: undefined;
            border?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
            "& .spark-button-primary"?: undefined;
            "& .spark-button-secondary"?: undefined;
        } | {
            [x: string]: string | {
                backgroundColor: string;
                color?: undefined;
                borderColor?: undefined;
                border?: undefined;
                '&:hover'?: undefined;
            } | {
                color: string;
                backgroundColor?: undefined;
                borderColor?: undefined;
                border?: undefined;
                '&:hover'?: undefined;
            } | {
                borderColor: string;
                color: string;
                backgroundColor?: undefined;
                border?: undefined;
                '&:hover'?: undefined;
            } | {
                backgroundColor: string;
                border: string;
                color: string;
                borderColor?: undefined;
                '&:hover'?: undefined;
            } | {
                backgroundColor: string;
                border: string;
                color: string;
                "&:hover": {
                    backgroundColor: string;
                    color?: undefined;
                };
                borderColor?: undefined;
            } | {
                border: string;
                color: `${string} !important`;
                "&:hover": {
                    color: `${string} !important`;
                    backgroundColor?: undefined;
                };
                backgroundColor?: undefined;
                borderColor?: undefined;
            };
            color: string;
            backgroundColor: string;
            "& .spark-button-primary": {
                backgroundColor: string;
            };
            "& .spark-button-secondary": {
                border: string;
                color: `${string} !important`;
                "&:hover": {
                    color: `${string} !important`;
                };
            };
            display?: undefined;
            flexDirection?: undefined;
            marginBottom?: undefined;
            "&:last-child"?: undefined;
            marginRight?: undefined;
            marginLeft?: undefined;
            margin?: undefined;
            justifyContent?: undefined;
            border?: undefined;
            borderColor?: undefined;
            "&:hover, & .spark-button-hovered"?: undefined;
            "& .spark-button-hovered, &:hover"?: undefined;
            "& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered"?: undefined;
        };
        display: string;
        padding: string;
        position: string;
        boxShadow: string;
        flexDirection: string;
        hide: {
            display: "none !important";
        };
        "& .spark-button-primary": {
            backgroundColor: string;
            borderColor: string;
            color: string;
            "&:hover, & .spark-button-hovered": {
                backgroundColor: string;
            };
        };
        "& .spark-button-secondary": {
            backgroundColor: string;
            borderColor: string;
            color: string;
            "&:hover, & .spark-button-hovered": {
                backgroundColor: string;
                borderColor: string;
                color: string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            regular: {
                default: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                success: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                warning: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                white: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                grey: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                info: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                error: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                black: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
            };
            outlined: {
                textColor: string;
                backgroundColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            regular: {
                default: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                success: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                warning: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                white: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                grey: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                info: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                error: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                    iconColor: string;
                };
                black: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
            };
            outlined: {
                textColor: string;
                backgroundColor: string;
            };
        } & {
            regular: {
                default: {
                    textColor: string;
                    borderColor: string;
                    backgroundColor: string;
                };
            };
        }>;
    };
};
