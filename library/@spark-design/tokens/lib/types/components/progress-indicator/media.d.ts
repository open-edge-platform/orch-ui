export declare const progressIndicatorMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
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
                color?: undefined;
            } | {
                forcedColorAdjust: "none";
                color: "HighlightText";
            } | {
                color: "CanvasText";
                forcedColorAdjust?: undefined;
            };
            '--spark-progress-indicator-value-color': string;
            '--spark-progress-indicator-border-color': string;
            '--spark-progress-indicator-bar-color-success': string;
            '--spark-progress-indicator-bar-color-error': string;
            '--spark-progress-indicator-label-top-overlay-text-color-error': string;
        };
    };
}>;
