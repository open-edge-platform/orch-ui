import { drawer } from './component';
import { DrawerPosition, DrawerSize } from './types';
export { drawer, DrawerPosition, DrawerSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        base: {
            display: string;
            flexDirection: string;
            position: string;
            zIndex: string;
            transition: string;
            transitionHide: string;
        };
        show: {
            visibility: string;
            transform: string;
        };
        hide: {
            visibility: string;
            inlineSize: string;
        };
        header: {
            borderBlockEndStyle: string;
            borderBlockEndWidth: string;
            marginBlockStart: string;
            marginInline: string;
            paddingBlockEnd: string;
            display: string;
            justifyContent: string;
            alignItems: string;
            heading: {
                paddingBlockEnd: string;
                marginBlock: string;
            };
            button: {
                border: string;
                backgroundColor: string;
                outline: string;
                size: string;
                paddingBlock: string;
                paddingInline: string;
            };
        };
        body: {
            marginBlock: string;
            marginInline: string;
            flex: string;
            overflow: string;
        };
        footer: {
            borderTopStyle: string;
            borderTopWidth: string;
            insetBlockEnd: string;
            paddingBlockStart: string;
            marginBlockEnd: string;
            marginInline: string;
            display: string;
            justifyContent: string;
            inlineSize: string;
            buttonContainerRight: {
                display: string;
                gap: string;
                justifyContent: string;
            };
        };
        backdrop: {
            opacity: string;
            zIndex: string;
            position: string;
            insetInlineStart: string;
            insetBlockStart: string;
            inlineSize: string;
            blockSize: string;
            transparent: {
                opacity: string;
            };
        };
        shadow: {
            x: string;
            y: string;
            blur: string;
        };
        left: {
            insetBlockStart: string;
            insetInlineStart: string;
            insetBlockEnd: string;
            insetInlineEnd: string;
            transform: string;
            xs: {
                blockSize: string;
                inlineSize: string;
            };
            s: {
                blockSize: string;
                inlineSize: string;
            };
            m: {
                blockSize: string;
                inlineSize: string;
            };
            l: {
                blockSize: string;
                inlineSize: string;
            };
        };
        right: {
            blockSize: string;
            inlineSize: string;
            insetBlockStart: string;
            insetInlineEnd: string;
            insetBlockEnd: string;
            insetInlineStart: string;
            transform: string;
            xs: {
                blockSize: string;
                inlineSize: string;
            };
            s: {
                blockSize: string;
                inlineSize: string;
            };
            m: {
                blockSize: string;
                inlineSize: string;
            };
            l: {
                blockSize: string;
                inlineSize: string;
            };
        };
        top: {
            blockSize: string;
            inlineSize: string;
            insetBlockStart: string;
            insetInlineStart: string;
            insetBlockEnd: string;
            insetInlineEnd: string;
            transform: string;
            xs: {
                blockSize: string;
                inlineSize: string;
            };
            s: {
                blockSize: string;
                inlineSize: string;
            };
            m: {
                blockSize: string;
                inlineSize: string;
            };
            l: {
                blockSize: string;
                inlineSize: string;
            };
        };
        bottom: {
            insetBlockEnd: string;
            insetInlineStart: string;
            insetBlockStart: string;
            insetInlineEnd: string;
            transform: string;
            xs: {
                blockSize: string;
                inlineSize: string;
            };
            s: {
                blockSize: string;
                inlineSize: string;
            };
            m: {
                blockSize: string;
                inlineSize: string;
            };
            l: {
                blockSize: string;
                inlineSize: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        base: {
            zIndex: string;
            backgroundColor: string;
            transition: string;
            display: string;
            position: string;
            flexDirection: string;
        };
        show: {
            visibility: string;
            transform: string;
        };
        hide: {
            visibility: string;
            inlineSize: string;
        };
        header: {
            [x: string]: string | {
                paddingBlockEnd: string;
                marginBlock: string;
                border?: undefined;
                backgroundColor?: undefined;
                outline?: undefined;
                fontSize?: undefined;
                paddingBlock?: undefined;
                paddingInline?: undefined;
            } | {
                border: string;
                backgroundColor: string;
                outline: string;
                fontSize: string;
                paddingBlock: string;
                paddingInline: string;
                paddingBlockEnd?: undefined;
                marginBlock?: undefined;
            };
            borderBlockEndStyle: string;
            borderBlockEndWidth: string;
            borderColor: string;
            paddingBlockEnd: string;
            marginBlockStart: string;
            marginInline: string;
            display: string;
            justifyContent: string;
            alignItems: string;
        };
        body: {
            marginBlock: string;
            marginInline: string;
            flex: string;
            overflow: string;
        };
        footer: {
            backgroundColor: string;
            borderTopStyle: string;
            borderTopWidth: string;
            borderColor: string;
            paddingBlockStart: string;
            marginBlock: string;
            marginInline: string;
            display: string;
            justifyContent: string;
        };
        buttonContainerRight: {
            display: string;
            gap: string;
            justifyContent: string;
        };
        backdrop: {
            backgroundColor: string;
            zIndex: string;
            insetInlineStart: string;
            insetBlockStart: string;
            inlineSize: string;
            blockSize: string;
            position: string;
        };
        backdropTransparent: {
            opacity: string;
        };
        backdropBlack: {
            opacity: string;
        };
        shadow: {
            boxShadow: `${string} ${string} \n            ${string} ${string}`;
        };
    } & {
        base: {
            [x: string]: {
                transition: string;
            };
        };
        size: {};
        position: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            borderColor: string;
            shadowColor: string;
            backdrop: {
                backgroundColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            borderColor: string;
            shadowColor: string;
            backdrop: {
                backgroundColor: string;
            };
        } & {
            backgroundColor: string;
            shadowColor: string;
            borderColor: string;
            backdrop: {
                backgroundColor: string;
            };
        }>;
    };
};
