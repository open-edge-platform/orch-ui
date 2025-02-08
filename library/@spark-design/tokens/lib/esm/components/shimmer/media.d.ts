export declare const shimmerMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
    '@media screen and (prefers-reduced-motion: reduce)': {
        [x: string]: {
            animation: "none !important";
            transition: "none !important";
        };
    };
    '@media screen and (forced-colors: active)': {
        [x: string]: {
            [x: string]: string | {
                forcedColorAdjust: "none";
            };
            '--spark-shimmer-background-color': string;
            '--spark-shimmer-card-avatar-border-color': string;
        };
    };
}>;
