export declare const breadcrumb: import("@spark-design/core").ComponentOutput<{
    items: {
        display: "flex";
        flexWrap: "wrap";
        listStyle: "none";
        margin: number;
        padding: number;
    };
    item: {
        display: "flex";
        alignItems: "center";
        '&:not(:first-of-type)': {
            '&:before': {
                content: "\"\"";
                display: "flex";
                blockSize: string;
                inlineSize: string;
                marginInline: string;
                backgroundColor: string;
                transform: "skew(-18deg)";
            };
        };
    };
    isCurrent: {
        [x: string]: {
            color: `${string} !important`;
        };
    };
}>;
