import { text } from './component';
export { text };
export * from './types';
export declare const config: {
    prefix: string;
    component: import("@spark-design/core").ComponentOutput<{
        isDisabled: {
            color: string;
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            disabledColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            disabledColor: string;
        } & {
            disabledColor: string;
        }>;
    };
};
