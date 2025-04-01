export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        searchButtonGap: string;
        inputOpacity: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        [x: string]: string | {
            marginInlineStart: string;
            WebkitAppearance?: undefined;
            opacity?: undefined;
            pointerEvents?: undefined;
            color?: undefined;
        } | {
            WebkitAppearance: "none";
            marginInlineStart?: undefined;
            opacity?: undefined;
            pointerEvents?: undefined;
            color?: undefined;
        } | {
            opacity: string;
            pointerEvents: "none";
            marginInlineStart?: undefined;
            WebkitAppearance?: undefined;
            color?: undefined;
        } | {
            color: string;
            marginInlineStart?: undefined;
            WebkitAppearance?: undefined;
            opacity?: undefined;
            pointerEvents?: undefined;
        };
        display: string;
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            iconColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            iconColor: string;
        } & {
            iconColor: string;
        }>;
    };
};
