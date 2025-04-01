import { popover } from './component';
export { popover };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        popoverZIndex: number;
        popoverBoxShadowX: string;
        popoverBoxShadowY: string;
        popoverBoxShadowBlurRadius: string;
        popoverHeight: string;
        popoverMinSize: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        fitContent: {};
        underlay: {};
    } & {
        [x: string]: string | {
            maxInlineSize: string;
            maxBlockSize?: undefined;
            minInlineSize?: undefined;
            backgroundColor?: undefined;
            blockSize?: undefined;
            inlineSize?: undefined;
            position?: undefined;
            content?: undefined;
            display?: undefined;
            top?: undefined;
            left?: undefined;
        } | {
            maxBlockSize: string;
            minInlineSize: string;
            backgroundColor: string;
            blockSize: string;
            inlineSize: string;
            position: "absolute";
            content: "\" \"";
            display: "flex";
            top: number;
            left: number;
            maxInlineSize?: undefined;
        };
        maxBlockSize: string;
        minInlineSize: string;
        backgroundColor: string;
        color: string;
        inlineSize: string;
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            textColor: string;
            background: string;
            popoverShadowColor: string;
            underlayColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            textColor: string;
            background: string;
            popoverShadowColor: string;
            underlayColor: string;
        } & {
            textColor: string;
            background: string;
            popoverShadowColor: string;
            underlayColor: string;
        }>;
    };
};
