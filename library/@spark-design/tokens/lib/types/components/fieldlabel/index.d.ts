import { fieldLabelBase } from './component';
export * from './types';
export { fieldLabelBase };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        marginInline: string;
        marginBlock: string;
        inlineSize: string;
        asteriskSize: string;
        asteriskLineHeight: string;
        asteriskGap: string;
        paddingInline: string;
        l: {
            fontSize: string;
            lineHeight: string;
        };
        m: {
            fontSize: string;
            lineHeight: string;
        };
        s: {
            fontSize: string;
            lineHeight: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        isRequired: {};
        isInvalid: {};
        isDisabled: {};
        requiredIndicator: {
            position: "relative";
            marginInlineStart: string;
            minInlineSize: string;
        };
        requiredAsterisk: {
            position: "absolute";
            insetBlockStart: string;
            insetInlineStart: number;
            fontSize: string;
            lineHeight: string;
        };
    } & {
        [x: string]: {};
        paddingInline: string;
        color: string;
        inlineSize: string;
        size: {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                '--spark-fieldlabel-text-disabled-color': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            textColor: string;
            textDisabledColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            textColor: string;
            textDisabledColor: string;
        } & {
            textColor: string;
            textDisabledColor: string;
        }>;
    };
};
