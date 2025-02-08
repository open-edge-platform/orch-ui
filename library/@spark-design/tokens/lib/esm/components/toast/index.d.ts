import { toast } from './component';
export * from './types';
export { toast };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        paddingBlockSize: string;
        paddingInline: string;
        margin: string;
        animationSpeed: string;
        middle: string;
        translateY: string;
        maxWidth: string;
        defaultPlacement: number;
        defaultMessageMargin: number;
        border: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        content: {
            message: {};
            action: {};
            visibility: {
                hide: {};
                show: {};
            };
            state: {
                danger: {};
                default: {};
                info: {};
                success: {};
                warning: {};
            };
        };
        placement: {
            topLeft: {};
            topCenter: {};
            topRight: {};
            bottomRight: {};
            bottomCenter: {};
            bottomLeft: {};
        };
    } & {
        [x: string]: string | {
            top: number;
            left: number;
            transform?: undefined;
            right?: undefined;
            bottom?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            top: number;
            left: string;
            transform: `translateX(calc( -1 * ${string}))`;
            right?: undefined;
            bottom?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            top: number;
            right: number;
            left?: undefined;
            transform?: undefined;
            bottom?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            bottom: number;
            right: number;
            top?: undefined;
            left?: undefined;
            transform?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            bottom: number;
            left: string;
            transform: `translateX(calc( -1 * ${string}))`;
            top?: undefined;
            right?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            bottom: number;
            left: number;
            top?: undefined;
            transform?: undefined;
            right?: undefined;
            display?: undefined;
            alignItems?: undefined;
            justifyContent?: undefined;
            padding?: undefined;
            transition?: undefined;
        } | {
            [x: string]: string | {
                border: string;
                backgroundColor?: undefined;
                transform?: undefined;
                margin?: undefined;
                maxWidth?: undefined;
                textOverflow?: undefined;
                overflow?: undefined;
                whiteSpace?: undefined;
                transition?: undefined;
                "& .spark-icon"?: undefined;
                '&:hover'?: undefined;
            } | {
                backgroundColor: string;
                border?: undefined;
                transform?: undefined;
                margin?: undefined;
                maxWidth?: undefined;
                textOverflow?: undefined;
                overflow?: undefined;
                whiteSpace?: undefined;
                transition?: undefined;
                "& .spark-icon"?: undefined;
                '&:hover'?: undefined;
            } | {
                transform: `translateY(${string})`;
                border?: undefined;
                backgroundColor?: undefined;
                margin?: undefined;
                maxWidth?: undefined;
                textOverflow?: undefined;
                overflow?: undefined;
                whiteSpace?: undefined;
                transition?: undefined;
                "& .spark-icon"?: undefined;
                '&:hover'?: undefined;
            } | {
                margin: number;
                maxWidth: string;
                textOverflow: "ellipsis";
                overflow: "hidden";
                whiteSpace: "nowrap";
                border?: undefined;
                backgroundColor?: undefined;
                transform?: undefined;
                transition?: undefined;
                "& .spark-icon"?: undefined;
                '&:hover'?: undefined;
            } | {
                transition: `transform ${string} ease-in-out`;
                backgroundColor: "transparent";
                '& .spark-icon': {
                    color: string[];
                };
                "&:hover": {
                    transform: "scale(1.2)";
                };
                border?: undefined;
                transform?: undefined;
                margin?: undefined;
                maxWidth?: undefined;
                textOverflow?: undefined;
                overflow?: undefined;
                whiteSpace?: undefined;
            };
            display: "flex";
            alignItems: "center";
            justifyContent: "space-between";
            padding: string;
            transition: `transform ${string} ease-in-out`;
            top?: undefined;
            left?: undefined;
            transform?: undefined;
            right?: undefined;
            bottom?: undefined;
        };
        position: string;
        margin: string;
        overflow: string;
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            iconColor: string[];
            state: {
                default: string;
                danger: string;
                success: string;
                info: string;
                warning: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            iconColor: string[];
            state: {
                default: string;
                danger: string;
                success: string;
                info: string;
                warning: string;
            };
        } & {
            iconColor: string[];
            state: {
                default: string;
                danger: string;
                success: string;
                info: string;
                warning: string;
            };
        }>;
    };
};
