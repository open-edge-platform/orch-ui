import { button } from './component';
import { ButtonSize, ButtonVariant } from './types';
export { button, ButtonSize, ButtonVariant };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        fontWeight: string;
        fontFamily: string;
        maxInlineSize: string;
        borderWidth: string;
        l: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingBlock: string;
            paddingInline: string;
            iconGap: string;
        };
        m: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingBlock: string;
            paddingInline: string;
            iconGap: string;
        };
        s: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
            paddingBlock: string;
            paddingInline: string;
            iconGap: string;
        };
        startSlot: {
            fontSize: string;
            flexShrink: number;
        };
        endSlot: {
            fontSize: string;
            flexShrink: number;
        };
        iconOnly: {
            l: {
                fontSize: string;
                paddingInline: string;
            };
            m: {
                fontSize: string;
                paddingInline: string;
            };
            s: {
                fontSize: string;
                paddingInline: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<{
        maxInlineSize: string;
        cursor: string;
        borderWidth: string;
        borderStyle: string;
        textDecoration: string;
        whiteSpace: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        boxSizing: string;
        inlineSize: string;
        fontWeight: string;
        fontFamily: string;
        startSlot: {
            fontSize: string;
            flexShrink: number;
            display: "flex";
            justifyContent: "center";
        };
        endSlot: {
            fontSize: string;
            flexShrink: number;
            display: "flex";
            justifyContent: "center";
        };
        disabled: {
            pointerEvents: "none";
        };
        iconOnly: {};
        content: {
            textOverflow: "ellipsis";
            display: "flex";
            justifyContent: "center";
            alignItems: "center";
        };
        active: {};
        hovered: {};
        monochrome: {};
        size: {
            l: {};
            m: {};
            s: {};
        };
        action: {};
        primary: {};
        secondary: {};
        ghost: {};
        alert: {};
        "alert-ghost": {};
        unstyled: {};
        "unstyled-alert": {};
    } & {
        "&": {};
        variants: {};
    }, "variants">>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorActive: string[];
                bgColorHover: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorActive: string[];
                bgColorHover: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        } & {
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        }>;
    };
    monochromes: {
        light: import("@spark-design/core").TokenData<{
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorActive: string[];
                bgColorHover: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorActive: string[];
                bgColorHover: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        } & {
            transparent: string[];
            disabled: {
                color: string[];
                bgColor: string[];
                borderColor: string[];
            };
            action: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            primary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            secondary: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            ghost: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            alert: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "alert-ghost": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            unstyled: {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
            "unstyled-alert": {
                color: string[];
                bgColor: string[];
                bgColorHover: string[];
                bgColorActive: string[];
                borderColor: string[];
            };
        }>;
    };
};
