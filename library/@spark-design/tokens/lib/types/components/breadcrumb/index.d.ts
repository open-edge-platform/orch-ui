export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        splitGap: string;
        margin: number;
        padding: number;
        blockSize: string;
        inlineSize: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
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
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media (forced-colors: active)': {
            [x: string]: {
                [x: string]: {
                    '&:before': {
                        backgroundColor: "CanvasText";
                    };
                } | {
                    [x: string]: {
                        color: "ActiveText !important";
                    };
                    '&:before'?: undefined;
                };
                '&:not(:first-of-type)': {
                    '&:before': {
                        backgroundColor: "CanvasText";
                    };
                };
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            colorIsCurrent: string;
            colorSplit: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            colorIsCurrent: string;
            colorSplit: string;
        } & {
            colorIsCurrent: string;
            colorSplit: string;
        }>;
    };
};
