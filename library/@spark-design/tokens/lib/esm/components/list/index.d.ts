import { list } from './component';
import { ListSize } from './types';
export { list, ListSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        fontFamily: string;
        inlineGap: string;
        margin: string;
        padding: string;
        borderWidth: string;
        borderBlockEndWidth: string;
        itemGap: string;
        size: {
            s: {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            m: {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            l: {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            xl: {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            "2xl": {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            "3xl": {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            "4xl": {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            "5xl": {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
            "6xl": {
                minBlockSize: string;
                fontSize: string;
                lineHeight: string;
                gap: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        fontFamily: string;
        margin: string;
        padding: string;
        listStyle: string;
        item: {};
        itemText: {};
        itemIcon: {};
        isSelected: {};
        isDisabled: {};
        isFocused: {};
        isDivided: {};
    } & {
        [x: string]: {
            display: "flex";
            gap: string;
            justifyContent: "center";
            alignItems: "center";
            outline?: undefined;
            fontFamily?: undefined;
            cursor?: undefined;
            borderStyle?: undefined;
            boxSizing?: undefined;
            color?: undefined;
            borderWidth?: undefined;
            whiteSpace?: undefined;
            paddingInlineStart?: undefined;
            paddingInlineEnd?: undefined;
            '&:hover'?: undefined;
            "&:focus-visible, &:focus"?: undefined;
        } | {
            outline: string;
            display?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            alignItems?: undefined;
            fontFamily?: undefined;
            cursor?: undefined;
            borderStyle?: undefined;
            boxSizing?: undefined;
            color?: undefined;
            borderWidth?: undefined;
            whiteSpace?: undefined;
            paddingInlineStart?: undefined;
            paddingInlineEnd?: undefined;
            '&:hover'?: undefined;
            "&:focus-visible, &:focus"?: undefined;
        } | {
            [x: string]: string | {
                backgroundColor: string;
                borderBlockEnd?: undefined;
                cursor?: undefined;
                color?: undefined;
                outline?: undefined;
            } | {
                borderBlockEnd: string;
                backgroundColor?: undefined;
                cursor?: undefined;
                color?: undefined;
                outline?: undefined;
            } | {
                cursor: "default";
                color: string;
                backgroundColor: "transparent";
                borderBlockEnd?: undefined;
                outline?: undefined;
            } | {
                backgroundColor: `${string} !important`;
                color: `${string} !important`;
                borderBlockEnd?: undefined;
                cursor?: undefined;
                outline?: undefined;
            } | {
                outline: string;
                backgroundColor?: undefined;
                borderBlockEnd?: undefined;
                cursor?: undefined;
                color?: undefined;
            };
            fontFamily: string;
            cursor: "pointer";
            borderStyle: "solid";
            boxSizing: "border-box";
            display: "flex";
            alignItems: "center";
            justifyContent: "space-between";
            color: string;
            borderWidth: string;
            whiteSpace: "nowrap";
            paddingInlineStart: string;
            paddingInlineEnd: string;
            '&:hover': {
                backgroundColor: string;
            };
            "&:focus-visible, &:focus": {
                outline: string;
            };
            gap?: undefined;
            outline?: undefined;
        } | {
            [x: string]: {
                backgroundColor: string;
                '&:hover': {
                    backgroundColor: string;
                };
            };
            display?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            alignItems?: undefined;
            outline?: undefined;
            fontFamily?: undefined;
            cursor?: undefined;
            borderStyle?: undefined;
            boxSizing?: undefined;
            color?: undefined;
            borderWidth?: undefined;
            whiteSpace?: undefined;
            paddingInlineStart?: undefined;
            paddingInlineEnd?: undefined;
            '&:hover'?: undefined;
            "&:focus-visible, &:focus"?: undefined;
        } | {
            [x: string]: {
                borderBlockEndWidth: string;
                borderBlockEndColor: string;
            };
            display?: undefined;
            gap?: undefined;
            justifyContent?: undefined;
            alignItems?: undefined;
            outline?: undefined;
            fontFamily?: undefined;
            cursor?: undefined;
            borderStyle?: undefined;
            boxSizing?: undefined;
            color?: undefined;
            borderWidth?: undefined;
            whiteSpace?: undefined;
            paddingInlineStart?: undefined;
            paddingInlineEnd?: undefined;
            '&:hover'?: undefined;
            "&:focus-visible, &:focus"?: undefined;
        };
        "&:focus-visible, &:focus": {
            outline: string;
        };
        zebra: {
            [x: string]: {
                backgroundColor: string;
                '&:hover': {
                    backgroundColor: string;
                };
            };
        };
        divide: {
            [x: string]: {
                borderBlockEndWidth: string;
                borderBlockEndColor: string;
            };
        };
        size: {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                [x: string]: string | {
                    color: "HighlightText";
                    forcedColorAdjust: "none";
                };
                '--spark-list-item-focused-b-g': string;
                '-spark-list-item-color-focused': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            color: string;
            colorActive: string;
            colorDisabled: string;
            dividerColor: string;
            background: {
                color: string;
                zebraColor: string;
                hover: string;
                active: string;
                activeHover: string;
            };
            item: {
                focusedBG: string;
                colorFocused: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            color: string;
            colorActive: string;
            colorDisabled: string;
            dividerColor: string;
            background: {
                color: string;
                zebraColor: string;
                hover: string;
                active: string;
                activeHover: string;
            };
            item: {
                focusedBG: string;
                colorFocused: string;
            };
        } & {
            color: string;
            colorActive: string;
            colorDisabled: string;
            dividerColor: string;
            background: {
                zebraColor: string;
                hover: string;
                active: string;
                activeHover: string;
            };
            item: {
                focusedBG: string;
                colorFocused: string;
            };
        }>;
    };
};
