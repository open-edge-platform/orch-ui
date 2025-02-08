export declare const ledgeFlex: import("@spark-design/core").ComponentOutput<{
    display: string;
    border: {};
    item: {
        border: {};
        spacer: {};
        c1: {};
        c2: {};
        c3: {};
        c4: {};
        c5: {};
        c6: {};
        c7: {};
        c8: {};
        c9: {};
        c10: {};
        c11: {};
        c12: {};
    };
    direction: {
        row: {};
        "row-reverse": {};
        column: {};
        "column-reverse": {};
    };
    alignment: {
        top: {};
        middle: {};
        bottom: {};
    };
} & {
    [x: string]: string | {
        [x: string]: {
            flexDirection: "row";
        } | {
            flexDirection: "row-reverse";
        } | {
            flexDirection: "column";
        } | {
            flexDirection: "column-reverse";
        };
        border?: undefined;
        flex?: undefined;
    } | {
        [x: string]: {
            alignItems: "flex-start";
        } | {
            alignItems: "center";
        } | {
            alignItems: "flex-end";
        };
        border?: undefined;
        flex?: undefined;
    } | {
        border: string;
        flex?: undefined;
    } | {
        [x: string]: number | {
            [x: string]: string | {
                border: string;
            };
            border: string;
            flexBasis?: undefined;
        } | {
            flexBasis: string;
            border?: undefined;
        };
        flex: number;
        border?: undefined;
    };
    flexWrap: string;
    containerType: string;
    containerName: string;
}>;
