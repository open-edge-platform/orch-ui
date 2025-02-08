import { divider } from './component';
import { DividerThickness } from './types';
export { divider, DividerThickness };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        light: {
            thick: string;
        };
        bold: {
            thick: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        backgroundColor: string;
        display: string;
        horizontal: {};
        vertical: {};
    } & {
        [x: string]: {};
        thickness: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColor: string;
        }>;
    };
};
