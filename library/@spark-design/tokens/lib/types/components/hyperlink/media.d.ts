export declare const hyperlinkMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
    '@media (forced-colors: active)': {
        [x: string]: {
            [x: string]: "LinkText" | {
                color: "VisitedText";
            } | {
                color: "GrayText !important";
            };
            color: "LinkText";
            '&:visited': {
                color: "VisitedText";
            };
        };
    };
}>;
