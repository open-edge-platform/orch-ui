export declare const scrollbarBase: import("@spark-design/core").ComponentOutput<{
    maxInlineSize: string;
    maxBlockSize: string;
    WebkitOverflowScrolling: string;
    hidden: {};
    padding: string;
}>;
export declare const scrollbar: import("@spark-design/core").ComponentOutput<{
    maxInlineSize: string;
    maxBlockSize: string;
    WebkitOverflowScrolling: string;
    hidden: {};
    padding: string;
} & {
    [x: string]: string | {
        inlineSize: string;
        blockSize: string;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        '&::-webkit-scrollbar': {
            inlineSize: string;
            blockSize: string;
        };
        padding: string;
        inlineSize?: undefined;
        blockSize?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        background: string;
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        background: string;
        '&:active': {
            background: string;
        };
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        scrollbarColor: `${string} ${string}`;
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb': {
            background: string;
        };
        '&:hover': {
            '&::-webkit-scrollbar': {
                '&:hover': {
                    '&::-webkit-scrollbar-track': {
                        background: string;
                    };
                };
            };
            '&::-webkit-scrollbar-track:hover': {
                background: string;
            };
            '&::-webkit-scrollbar-thumb': {
                background: string;
                '&:active': {
                    background: string;
                };
            };
        };
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
        overflowY?: undefined;
    } | {
        overflowX: "auto";
        whiteSpace: "nowrap";
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowY?: undefined;
    } | {
        overflowY: "auto";
        inlineSize?: undefined;
        blockSize?: undefined;
        '&::-webkit-scrollbar'?: undefined;
        padding?: undefined;
        background?: undefined;
        '&:active'?: undefined;
        scrollbarColor?: undefined;
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb'?: undefined;
        '&:hover'?: undefined;
        overflowX?: undefined;
        whiteSpace?: undefined;
    };
    '&::-webkit-scrollbar': {
        inlineSize: string;
        blockSize: string;
    };
    '&:hover': {
        '&::-webkit-scrollbar': {
            inlineSize: string;
            blockSize: string;
        };
        padding: string;
    };
    '&::-webkit-scrollbar-track': {
        background: string;
    };
    '&::-webkit-scrollbar-thumb': {
        background: string;
        '&:active': {
            background: string;
        };
    };
    '&::-webkit-scrollbar-corner': {
        background: string;
    };
    scrollbarWidth: string;
    scrollbarColor: string;
    '&:active': {
        scrollbarColor: `${string} ${string}`;
    };
    x: {
        overflowX: "auto";
        whiteSpace: "nowrap";
    };
    y: {
        overflowY: "auto";
    };
}>;
