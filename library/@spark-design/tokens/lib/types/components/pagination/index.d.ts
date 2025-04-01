import { pagination } from './component';
import { PaginationSize } from './types';
export { pagination, PaginationSize };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        base: {
            display: string;
            justifyContent: string;
            alignItems: string;
        };
        control: {
            display: string;
            alignItems: string;
            justifyContent: string;
            gap: string;
            dropdown: {
                marginInlineStart: string;
                width: string;
            };
            button: {
                marginInlineStart: string;
                outline: string;
                marginInlineEnd: string;
            };
            itemPerPage: {
                display: string;
                gap: string;
            };
        };
        list: {
            display: string;
            button: {
                marginInline: string;
                outline: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        display: string;
        justifyContent: string;
        alignItems: string;
        control: {
            [x: string]: string | {
                marginInlineStart: string;
                marginInlineEnd: string;
                outline: string;
                width?: undefined;
            } | {
                width: string;
                marginInlineStart: string;
                marginInlineEnd?: undefined;
                outline?: undefined;
            };
            display: string;
            alignItems: string;
            justifyContent: string;
            gap: string;
        };
        list: {
            [x: string]: string | {
                marginInline: string;
                outline: string;
            };
            display: string;
        };
    }>;
};
