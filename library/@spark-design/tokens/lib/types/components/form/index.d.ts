import { form } from './component';
import { FormSize, FormVariant } from './types';
export { form, FormSize, FormVariant };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        base: {
            sectionElementsSpacing: string;
        };
        s: {
            padding: string;
        };
        m: {
            padding: string;
        };
        l: {
            padding: string;
        };
        normal: {};
        ghost: {
            padding: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        backgroundColor: string;
    } & {
        size: {};
        variant: {
            ghost: {
                "&": {
                    paddingInline: string;
                };
            };
            normal: {
                "&": {};
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            ghost: {
                backgroundColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            backgroundColor: string;
            ghost: {
                backgroundColor: string;
            };
        }>;
    };
};
