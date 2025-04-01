export declare const tabs: import("@spark-design/core").ComponentOutput<{
    display: string;
    minInlineSize: string;
    tab: {
        display: "flex";
        background: string;
        border: string;
        textDecoration: string;
        alignItems: "center";
        position: "relative";
        justifyContent: "center";
        cursor: "pointer";
        fontWeight: number;
        maxInlineSize: string;
    };
    tabContent: {
        overflow: "hidden";
        whiteSpace: "nowrap";
        textOverflow: "ellipsis";
    };
    active: {};
    iconOnly: {};
    disabled: {
        cursor: "initial";
        color: string;
    };
    icon: {
        marginInlineEnd: string;
    };
    close: {
        marginInlineStart: string;
    };
    block: {};
    ghost: {};
    scrollbar: {
        padding: string;
    };
} & {
    [x: string]: {};
    size: {};
}>;
