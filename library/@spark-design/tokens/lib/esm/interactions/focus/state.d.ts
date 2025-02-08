export declare const customFocus: {
    outlineWidth: string;
    outlineStyle: string;
    outlineColor: string;
    outlineOffset: string;
    boxShadow: string;
    position: string;
    zIndex: number;
};
export declare const customFocusUndo: {
    outlineWidth: string;
    outlineStyle: string;
    outlineColor: string;
    outlineOffset: string;
    boxShadow: string;
    position: string;
    zIndex: string;
};
export declare const customFocusSuppress: {
    outline: string;
    boxShadow: string;
};
export declare const customFocusSnapInit: {
    outlineWidth: string;
    outlineStyle: string;
    outlineColor: string;
    outlineOffset: string;
    boxShadow: string;
    transition: string;
    WebkitTransform: string;
};
export declare const customFocusSnapBlur: {
    transitionDuration: string;
    transitionDelay: string;
};
export declare const customFocusBackground: {
    backgroundColor: string;
    color: string;
};
export declare const customFocusBackgroundUndo: {
    backgroundColor: string;
    color: string;
};
export declare const focus: import("@spark-design/core").ComponentOutput<{
    self: {};
    within: {};
    adjacent: {};
    slider: {};
    snap: {
        outlineWidth: string;
        outlineStyle: string;
        outlineColor: string;
        outlineOffset: string;
        boxShadow: string;
        transition: string;
        WebkitTransform: string;
    };
    background: {};
    suppress: {};
} & {
    [x: string]: {
        outlineWidth: string;
        outlineStyle: string;
        outlineColor: string;
        outlineOffset: string;
        boxShadow: string;
        position: string;
        zIndex: number;
    } | {
        outline: string;
        boxShadow: string;
    } | {
        outlineWidth: string;
        outlineStyle: string;
        outlineColor: string;
        outlineOffset: string;
        boxShadow: string;
        transition: string;
        WebkitTransform: string;
    } | {
        transitionDuration: string;
        transitionDelay: string;
    } | {
        backgroundColor: string;
        color: string;
    };
}>;
