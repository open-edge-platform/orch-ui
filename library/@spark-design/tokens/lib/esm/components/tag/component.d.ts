export declare const tag: import("@spark-design/core").ComponentOutput<{
    display: string;
    flexDirection: string;
    blockSize: string;
    fontSize: string;
    lineHeight: string;
    paddingInline: string;
    gap: string;
    alignItems: string;
    verticalAlign: string;
    cursor: string;
    "& .spark-icon": {
        color: string;
    };
    buttonWrapper: {
        outline: string;
        background: string;
        border: string;
        textDecoration: string;
        cursor: "pointer";
        display: "flex";
        padding: string;
        margin: string;
    };
    shadow: {};
    theme: {};
} & {
    [x: string]: {};
    size: {};
    rounding: {};
    "&.is-disabled": {
        pointerEvents: "none";
    };
    "& .spark-icon": {
        cursor: "pointer";
        lineHeight: string;
        color: string;
    };
    action: {
        [x: string]: string | {
            color: string;
            background?: undefined;
        } | {
            background: string;
            color?: undefined;
        };
        background: string;
        color: string;
        "&:hover": {
            background: string;
        };
        "&:active": {
            background: string;
        };
        "&:focus-visible": {
            background: string;
        };
    };
    primary: {
        border: string;
    };
    secondary: {};
    ghost: {};
    none: {};
    theme: {};
    "&.is-disabled, &.is-disabled .spark-icon": {
        background: string;
        color: `${string} !important`;
        boxShadow: "none !important";
        borderColor: string;
    };
}>;
