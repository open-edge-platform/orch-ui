export declare const modalBase: import("@spark-design/core").ComponentOutput<{
    backgroundColor: string;
    opacity: string;
    visibility: string;
    pointerEvents: string;
    zIndex: string;
    maxWidth: string;
    outline: string;
    grid: {
        display: "grid";
        width: string;
        gridTemplateAreas: "\n                '. . .'\n                '. header .'\n                '. dividerStart .'\n                '. content .'\n                '. dividerEnd .'\n                '. footer .'\n                '. . .'";
    };
    section: {
        boxSizing: "border-box";
        maxHeight: string;
        outline: string;
        display: "flex";
        width: string;
    };
    header: {
        display: "flex";
        justifyContent: "space-between";
        alignItems: "baseline";
    };
    headingTitles: {};
    dividerStart: {};
    dividerEnd: {};
    content: {};
    footer: {};
    isDivided: {};
    wrapper: {
        boxSizing: "border-box";
        width: string;
        height: string;
        visibility: "hidden";
        pointerEvents: "none";
        zIndex: "2";
        justifyContent: "center";
        alignItems: "center";
        display: "flex";
        position: "fixed";
        top: string;
        left: string;
    };
    backdrop: {
        isOpen: {};
    };
    s: {};
    m: {};
    l: {};
}>;
export declare const modal: import("@spark-design/core").ComponentOutput<{
    backgroundColor: string;
    opacity: string;
    visibility: string;
    pointerEvents: string;
    zIndex: string;
    maxWidth: string;
    outline: string;
    grid: {
        display: "grid";
        width: string;
        gridTemplateAreas: "\n                '. . .'\n                '. header .'\n                '. dividerStart .'\n                '. content .'\n                '. dividerEnd .'\n                '. footer .'\n                '. . .'";
    };
    section: {
        boxSizing: "border-box";
        maxHeight: string;
        outline: string;
        display: "flex";
        width: string;
    };
    header: {
        display: "flex";
        justifyContent: "space-between";
        alignItems: "baseline";
    };
    headingTitles: {};
    dividerStart: {};
    dividerEnd: {};
    content: {};
    footer: {};
    isDivided: {};
    wrapper: {
        boxSizing: "border-box";
        width: string;
        height: string;
        visibility: "hidden";
        pointerEvents: "none";
        zIndex: "2";
        justifyContent: "center";
        alignItems: "center";
        display: "flex";
        position: "fixed";
        top: string;
        left: string;
    };
    backdrop: {
        isOpen: {};
    };
    s: {};
    m: {};
    l: {};
} & {
    [x: string]: {
        marginBlockEnd: string;
        gridArea?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        [x: string]: "header" | {
            margin: string;
            flex?: undefined;
        } | {
            flex: string;
            margin?: undefined;
        };
        gridArea: "header";
        marginBlockEnd?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        gridArea: "dividerStart";
        marginBlockEnd?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        gridArea: "dividerEnd";
        marginBlockEnd?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        gridArea: "content";
        marginBlockEnd?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        gridArea: "footer";
        marginBlockEnd?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        marginBlockEnd?: undefined;
        gridArea?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        display?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    } | {
        [x: string]: string | {
            visibility: "visible";
            opacity: "0.9999";
            pointerEvents: "auto";
        };
        backgroundColor: string;
        zIndex: string;
        position: string;
        display: "flex";
        inset: string;
        overflow: "hidden";
        justifyContent: "center";
        alignItems: "center";
        marginBlockEnd?: undefined;
        gridArea?: undefined;
    } | {
        display: "none";
        marginBlockEnd?: undefined;
        gridArea?: undefined;
        backgroundColor?: undefined;
        zIndex?: undefined;
        position?: undefined;
        inset?: undefined;
        overflow?: undefined;
        justifyContent?: undefined;
        alignItems?: undefined;
    };
    size: {};
    backdrop: {
        [x: string]: string | {
            visibility: "visible";
            opacity: "0.9999";
            pointerEvents: "auto";
        };
        backgroundColor: string;
        zIndex: string;
        position: string;
        display: "flex";
        inset: string;
        overflow: "hidden";
        justifyContent: "center";
        alignItems: "center";
    };
    displayNone: {
        display: "none";
    };
}>;
