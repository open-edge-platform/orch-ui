export declare const popoverBase: import("@spark-design/core").ComponentOutput<{
    fitContent: {};
    underlay: {};
}>;
export declare const popover: import("@spark-design/core").ComponentOutput<{
    fitContent: {};
    underlay: {};
} & {
    [x: string]: string | {
        maxInlineSize: string;
        maxBlockSize?: undefined;
        minInlineSize?: undefined;
        backgroundColor?: undefined;
        blockSize?: undefined;
        inlineSize?: undefined;
        position?: undefined;
        content?: undefined;
        display?: undefined;
        top?: undefined;
        left?: undefined;
    } | {
        maxBlockSize: string;
        minInlineSize: string;
        backgroundColor: string;
        blockSize: string;
        inlineSize: string;
        position: "absolute";
        content: "\" \"";
        display: "flex";
        top: number;
        left: number;
        maxInlineSize?: undefined;
    };
    maxBlockSize: string;
    minInlineSize: string;
    backgroundColor: string;
    color: string;
    inlineSize: string;
}>;
