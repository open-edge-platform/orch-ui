export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        none: {
            gap: string;
        };
        s: {
            gap: string;
        };
        m: {
            gap: string;
        };
        l: {
            gap: string;
        };
        xl: {
            gap: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        alignItems: string;
        display: string;
        position: string;
        inlineSize: string;
        orientation: {
            vertical: {};
            horizontal: {};
        };
        align: {
            start: {};
            end: {};
            center: {};
        };
        isDisabled: {};
    } & {
        [x: string]: {};
        spacing: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            disabledColor: string;
            disabledBgColor: string;
            disabledBorderColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            disabledColor: string;
            disabledBgColor: string;
            disabledBorderColor: string;
        } & {
            disabledColor: string;
            disabledBgColor: string;
            disabledBorderColor: string;
        }>;
    };
};
