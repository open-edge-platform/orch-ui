export declare const sharedBoxShadowPropsOne: string;
export declare const sharedBoxShadowPropsTwo: string;
export declare const sharedBoxShadowPropsThree: string;
export declare const radioButtonBase: import("@spark-design/core").ComponentOutput<{
    input: {};
    focusRegion: {};
    isDisabled: {};
    size: {
        s: {};
        m: {};
        l: {};
    };
}>;
export declare const radioButton: import("@spark-design/core").ComponentOutput<{
    input: {};
    focusRegion: {};
    isDisabled: {};
    size: {
        s: {};
        m: {};
        l: {};
    };
} & {
    [x: string]: {};
    display: string;
    position: string;
    flexDirection: string;
    alignItems: string;
    width: string;
    '& input': {
        position: "absolute";
        opacity: number;
        cursor: "pointer";
        blockSize: string;
        inlineSize: string;
    };
    size: {};
}>;
