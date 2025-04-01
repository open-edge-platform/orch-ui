export declare const toggleSwitchMedia: import("@spark-design/core/lib/types/media").MediaOutput<{
    '@media screen and (forced-colors: active)': {
        [x: string]: {
            [x: string]: string | {
                [x: string]: {
                    borderInlineColor: "Highlight";
                    borderBlockColor: "Highlight";
                    background: string;
                    '&:after': {
                        background: string;
                    };
                };
            };
            '--spark-toggle-switch-selector-color-off': string;
            '--spark-toggle-switch-selector-color-disabled': string;
            '--spark-toggle-switch-background-color-off': string;
            '--spark-toggle-switch-background-color-on': string;
            '--spark-toggle-switch-background-color-disabled': string;
            '--spark-toggle-switch-background-color-invalid': string;
        };
    };
}>;
