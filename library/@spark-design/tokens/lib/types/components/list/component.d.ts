export declare const list: import("@spark-design/core").ComponentOutput<{
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
