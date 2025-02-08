export declare const progressLoaderMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
    '@media screen and (prefers-reduced-motion: reduce)': {
        [x: string]: {
            animation: "none !important";
            transition: "none !important";
        };
    };
    '@media screen and (forced-colors: active)': {
        [x: string]: {
            [x: string]: string | {
                [x: string]: {
                    forcedColorAdjust: "none";
                };
            };
            '--spark-progress-loader-value-color': string;
            '--spark-progress-loader-border-color': string;
        };
    };
}>;
