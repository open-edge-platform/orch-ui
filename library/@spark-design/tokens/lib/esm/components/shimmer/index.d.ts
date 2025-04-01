import { shimmer } from './component';
export * from './types';
export { shimmer };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        inlineSize: string;
        blockSize: string;
        doubleInlineSize: string;
        gradientStart: string;
        gradientMiddle: string;
        gradientEnd: string;
        listItemBlockSize: string;
        listItemMarginBlockEnd: string;
        listAvatarBorderRadius: string;
        listAvatarInlineSize: string;
        listAvatarBlockSize: string;
        listShortLineBorderRadius: string;
        listShortLineInlineSize: string;
        listShortLineBlockSize: string;
        listShortLineMarginInlineStart: string;
        listLongLineBorderRadius: string;
        listLongLineInlineSize: string;
        listLongLineBlockSize: string;
        listLongLineMarginInlineStart: string;
        listLongLineMarginBlockStart: string;
        listHrInlineSize: string;
        listHrBlockSize: string;
        listHrMarginInlineStart: string;
        listHrMarginBlockStart: string;
        blockGap: string;
        blockPaddingBlockStart: string;
        blockItemInlineSize: string;
        blockItemBlockSize: string;
        galleryGap: string;
        galleryPaddingBlockStart: string;
        galleryItemInlineSize: string;
        galleryItemBlockSize: string;
        tableGap: string;
        tablePaddingBlockStart: string;
        tableItemInlineSize: string;
        tableItemBlockSize: string;
        cardItemBlockSize: string;
        cardItemMarginBlockEnd: string;
        cardCoverInlineSize: string;
        cardCoverBlockSize: string;
        cardAvatarBorderRadius: string;
        cardAvatarInlineSize: string;
        cardAvatarBlockSize: string;
        cardAvatarMarginBlockStart: string;
        cardAvatarMarginInlineStart: string;
        cardAvatarBorderWidth: string;
        cardShortLineBorderRadius: string;
        cardShortLineInlineSize: string;
        cardShortLineBlockSize: string;
        cardShortLineMarginBlockStart: string;
        cardLongLineBorderRadius: string;
        cardLongLineInlineSize: string;
        cardLongLineBlockSize: string;
        cardLongLineMarginBlockStart: string;
        cardHrInlineSize: string;
        cardHrBlockSize: string;
        cardHrMarginBlockStart: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        inlineSize: string;
        blockSize: string;
        animate: {};
        skeleton: {
            list: {
                item: {};
                avatar: {};
                shortLine: {};
                longLine: {};
                hr: {};
            };
            block: {
                item: {};
            };
            gallery: {
                item: {};
            };
            table: {
                item: {};
            };
            card: {
                item: {};
                cover: {};
                avatar: {};
                shortLine: {};
                longLine: {};
                hr: {};
            };
        };
    } & {
        [x: string]: {
            display: "none !important";
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            position?: undefined;
            blockSize?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            inlineSize?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            animation: "keyframes-shimmer-animation 3s infinite linear";
            background: string;
            backgroundColor: string;
            backgroundSize: string;
            display?: undefined;
            position?: undefined;
            blockSize?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            inlineSize?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            position: "relative";
            blockSize: string;
            marginBlockEnd: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            borderRadius?: undefined;
            inlineSize?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            position: "absolute";
            borderRadius: string;
            inlineSize: string;
            blockSize: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            borderRadius: string;
            inlineSize: string;
            blockSize: string;
            position: "relative";
            marginInlineStart: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            borderRadius: string;
            inlineSize: string;
            blockSize: string;
            position: "relative";
            marginInlineStart: string;
            marginBlockStart: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            inlineSize: string;
            blockSize: string;
            position: "relative";
            marginInlineStart: string;
            marginBlockStart: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            display: "flex";
            gap: string;
            justifyContent: "left";
            flexWrap: "wrap";
            paddingBlockStart: string;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            position?: undefined;
            blockSize?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            inlineSize?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            border?: undefined;
        } | {
            inlineSize: string;
            blockSize: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            position?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            marginInlineStart?: undefined;
            marginBlockStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            position: "absolute";
            borderRadius: string;
            inlineSize: string;
            blockSize: string;
            marginBlockStart: string;
            marginInlineStart: string;
            border: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
        } | {
            borderRadius: string;
            inlineSize: string;
            blockSize: string;
            marginBlockStart: string;
            position: "relative";
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            marginInlineStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        } | {
            inlineSize: string;
            blockSize: string;
            position: "relative";
            marginBlockStart: string;
            display?: undefined;
            animation?: undefined;
            background?: undefined;
            backgroundColor?: undefined;
            backgroundSize?: undefined;
            marginBlockEnd?: undefined;
            borderRadius?: undefined;
            marginInlineStart?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            flexWrap?: undefined;
            paddingBlockStart?: undefined;
            border?: undefined;
        };
        "&[aria-hidden=true]": {
            display: "none !important";
        };
    }>;
    keyframe: import("@spark-design/core/lib/types/keyframe").KeyframeOutput<{
        '@keyframes shimmer-animation': {
            '0%': {
                backgroundPosition: string;
            };
            '100%': {
                backgroundPosition: string;
            };
        };
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (prefers-reduced-motion: reduce)': {
            [x: string]: {
                animation: "none !important";
                transition: "none !important";
            };
        };
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                [x: string]: string | {
                    forcedColorAdjust: "none";
                };
                '--spark-shimmer-background-color': string;
                '--spark-shimmer-card-avatar-border-color': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            gradientColorZero: string;
            gradientColorMiddle: string;
            cardAvatarBorderColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            gradientColorZero: string;
            gradientColorMiddle: string;
            cardAvatarBorderColor: string;
        } & {
            backgroundColor: string;
            gradientColorZero: string;
            gradientColorMiddle: string;
            cardAvatarBorderColor: string;
        }>;
    };
};
