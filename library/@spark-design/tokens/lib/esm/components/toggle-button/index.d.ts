export * from './types';
export declare const config: {
    prefix: string;
    component: import("@spark-design/core").ComponentOutput<{
        clickedGhost: {
            color: string;
            backgroundColor: string;
            borderColor: string;
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            ghostColor: string;
            ghostBgColor: string;
            ghostBorderColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            ghostColor: string;
            ghostBgColor: string;
            ghostBorderColor: string;
        } & {
            ghostColor: string;
            ghostBgColor: string;
            ghostBorderColor: string;
        }>;
    };
};
