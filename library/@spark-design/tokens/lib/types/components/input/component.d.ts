export declare const inputBase: import("@spark-design/core").ComponentOutput<Omit<{
    cursor: string;
    borderStyle: string;
    boxSizing: string;
    color: string;
    borderColor: string;
    fontFamily: string;
    display: string;
    alignItems: string;
    isReadOnly: {};
    isDisabled: {};
    isInvalid: {};
    '&:hover, &:focus': {
        borderColor: string;
        '&::placeholder': {
            color: string;
        };
    };
    '&:focus-visible': {
        outline: string;
    };
    '&::placeholder': {
        color: string;
        fontStyle: "italic";
    };
    variants: {
        quiet: {
            borderWidth: string;
            backgroundColor: string;
            borderBlockEndWidth: string;
        };
        size: {
            l: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
        };
    };
}, "variants"> & {
    quiet: {
        borderWidth: string;
        backgroundColor: string;
        borderBlockEndWidth: string;
    };
    size: {
        l: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
        m: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
        s: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
    };
}>;
export declare const input: import("@spark-design/core").ComponentOutput<Omit<Omit<{
    cursor: string;
    borderStyle: string;
    boxSizing: string;
    color: string;
    borderColor: string;
    fontFamily: string;
    display: string;
    alignItems: string;
    isReadOnly: {};
    isDisabled: {};
    isInvalid: {};
    '&:hover, &:focus': {
        borderColor: string;
        '&::placeholder': {
            color: string;
        };
    };
    '&:focus-visible': {
        outline: string;
    };
    '&::placeholder': {
        color: string;
        fontStyle: "italic";
    };
    variants: {
        quiet: {
            borderWidth: string;
            backgroundColor: string;
            borderBlockEndWidth: string;
        };
        size: {
            l: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            m: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
            s: {
                blockSize: string;
                fontSize: string;
                lineHeight: string;
            };
        };
    };
}, "variants"> & {
    quiet: {
        borderWidth: string;
        backgroundColor: string;
        borderBlockEndWidth: string;
    };
    size: {
        l: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
        m: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
        s: {
            blockSize: string;
            fontSize: string;
            lineHeight: string;
        };
    };
} & {
    [x: string]: {
        borderColor: string;
        cursor?: undefined;
        color?: undefined;
        '&::placeholder'?: undefined;
        outline?: undefined;
    } | {
        cursor: "default";
        color: `${string} !important`;
        borderColor: `${string} !important`;
        '&::placeholder': {
            color: `${string} !important`;
        };
        outline?: undefined;
    } | {
        outline: {
            [x: string]: string | {
                backgroundColor: string;
                paddingInline?: undefined;
            } | {
                paddingInline: string;
                backgroundColor?: undefined;
            };
            borderWidth: string;
            backgroundColor: string;
        };
        borderColor?: undefined;
        cursor?: undefined;
        color?: undefined;
        '&::placeholder'?: undefined;
    };
    variants: {
        outline: {
            [x: string]: string | {
                backgroundColor: string;
                paddingInline?: undefined;
            } | {
                paddingInline: string;
                backgroundColor?: undefined;
            };
            borderWidth: string;
            backgroundColor: string;
        };
    };
}, "variants"> & {
    outline: {
        [x: string]: string | {
            backgroundColor: string;
            paddingInline?: undefined;
        } | {
            paddingInline: string;
            backgroundColor?: undefined;
        };
        borderWidth: string;
        backgroundColor: string;
    };
}>;
