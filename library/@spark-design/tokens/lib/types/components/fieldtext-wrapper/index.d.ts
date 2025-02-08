import { fieldtextWrapper } from './component';
export * from './types';
export { fieldtextWrapper };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        columnGap: string;
        labelGap: string;
        l: {
            helpLabelFontSize: string;
            disabledLabelFontSize: string;
            invalidLabelFontSize: string;
        };
        m: {
            helpLabelFontSize: string;
            disabledLabelFontSize: string;
            invalidLabelFontSize: string;
        };
        s: {
            helpLabelFontSize: string;
            disabledLabelFontSize: string;
            invalidLabelFontSize: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        isInvalid: {};
        isDisabled: {};
        description: {};
    } & {
        [x: string]: {};
        display: string;
        flexDirection: string;
        gap: string;
        size: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            colorInvalid: string;
            disabledColor: string;
            descriptionColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            colorInvalid: string;
            disabledColor: string;
            descriptionColor: string;
        } & {
            colorInvalid: string;
            disabledColor: string;
            descriptionColor: string;
        }>;
    };
};
