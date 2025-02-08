export declare const breadcrumbMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
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
