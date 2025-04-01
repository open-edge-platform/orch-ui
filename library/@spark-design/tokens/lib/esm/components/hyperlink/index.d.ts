import { hyperlink } from './component';
export * from './types';
export { hyperlink };
export declare const config: {
    prefix: string;
    component: import("@spark-design/core").ComponentOutput<{
        isDisabled: {};
        isPressed: {};
        primary: {};
        secondary: {};
        standard: {};
        quiet: {};
    } & {
        [x: string]: {};
        "&": {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media (forced-colors: active)': {
            [x: string]: {
                [x: string]: "LinkText" | {
                    color: "VisitedText";
                } | {
                    color: "GrayText !important";
                };
                color: "LinkText";
                '&:visited': {
                    color: "VisitedText";
                };
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: {
                primary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
                secondary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
            };
            disabledColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: {
                primary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
                secondary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
            };
            disabledColor: string;
        } & {
            color: {
                primary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
                secondary: {
                    base: string;
                    hover: string;
                    pressed: string;
                    visited: {
                        base: string;
                        hover: string;
                        pressed: string;
                    };
                };
            };
            disabledColor: string;
        }>;
    };
};
