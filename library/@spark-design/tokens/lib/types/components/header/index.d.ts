import { header } from './component';
import { HeaderSize, HeaderVariant } from './types';
export { header, HeaderSize, HeaderVariant };
export declare const config: {
    modes: {
        light: import("@spark-design/core").TokenData<{
            classicBg: string;
            darkBg: string;
            lightBg: string;
            lightColor: string;
            color: string;
            borderLight: string;
            backgroundHoverButton: string;
            buttonColorAction: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            classicBg: string;
            darkBg: string;
            lightBg: string;
            lightColor: string;
            color: string;
            borderLight: string;
            backgroundHoverButton: string;
            buttonColorAction: string;
        } & {
            classicBg: string;
            darkBg: string;
            lightBg: string;
            color: string;
            borderLight: string;
            lightColor: string;
            backgroundHoverButton: string;
            buttonColorAction: string;
        }>;
    };
    properties: import("@spark-design/core").TokenData<{
        color: string;
        fontWeight: number;
        fontSize: string;
        marginInlineStart: string;
        marginInlineEnd: string;
        shadow: string;
        shadowColor: string;
        padding: string;
        borderBottom: string;
        project: {
            fontWeight: number;
            display: string;
            fontSize: string;
        };
        brand: {
            padding: string;
        };
        item: {
            display: string;
            alignItems: string;
            blockSize: string;
            cursor: string;
            fontWeight: string;
            borderBlockEnd: string;
        };
        s: {
            blockSize: string;
            inlineSize: string;
            lineHeight: string;
        };
        m: {
            blockSize: string;
            inlineSize: string;
            lineHeight: string;
        };
        l: {
            blockSize: string;
            inlineSize: string;
            lineHeight: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        inlineSize: string;
        regionEnd: {
            display: "flex";
            alignItems: "center";
            marginInlineEnd: string;
        };
        regionCenter: {
            marginInline: string;
            whiteSpace: "nowrap";
            overflow: "hidden";
            textOverflow: "ellipsis";
        };
        regionStart: {
            whiteSpace: "nowrap";
            display: "flex";
            inlineSize: string;
            minInlineSize: string;
            marginInlineStart: string;
        };
        projectName: {
            fontWeight: number;
            fontSize: string;
            marginInlineEnd: string;
        };
        item: {
            selected: {};
        };
        brand: {
            logoimg: {};
        };
        s: {};
        m: {};
        l: {};
        classic: {
            backgroundColor: string;
            color: string;
        };
        dark: {
            backgroundColor: string;
            color: string;
        };
        light: {
            backgroundColor: string;
            color: string;
            borderBlockEnd: string;
        };
    } & {
        [x: string]: {};
        size: {};
    }>;
};
