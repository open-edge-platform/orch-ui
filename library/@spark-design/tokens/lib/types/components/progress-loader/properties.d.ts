export declare const prefix = "spark-progress-loader";
export declare const properties: import("@spark-design/core").TokenData<{
    display: string;
    maxInlineSize: string;
    minInlineSize: string;
    indeterminateInlineSize: string;
    blockSize: string;
    blockSizeThick: string;
    blockSizeFilled: string;
    borderStyle: string;
    borderSize: string;
    zeroBorder: string;
    variants: {
        linear: {
            InlineSize: string;
            MinInlineSize: string;
            IndeterminateInlineSize: string;
            BlockSize: string;
            BlockSizeThick: string;
            BlockSizeFilled: string;
            animation: string;
        };
        circular: {
            Length: string;
            IndeterminatePercentage: string;
            MaskThreshold: string;
            borderRadius: string;
            boxSizing: string;
            animation: string;
            mask: {
                display: string;
                width: string;
                height: string;
                background: string;
                position: string;
                outlineSize: string;
                outlineColor: string;
                marginLeft: string;
                marginTop: string;
                borderRadius: string;
            };
        };
    };
    weight: {
        normal: {};
        heavy: {
            blockSize: string;
        };
    };
}>;
