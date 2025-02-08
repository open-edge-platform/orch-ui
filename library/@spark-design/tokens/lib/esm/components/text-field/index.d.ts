import { textField } from './component';
export { textField };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        inlineSize: string;
        blockSize: string;
        inputInlineSize: string;
        marginInlineStart: string;
        lineHeight: string;
        labelSpaceGap: string;
        labelInvalidSpaceGap: string;
        startIconLargeMarginInlineSize: string;
        startIconMediumMarginInlineSize: string;
        startIconSmallMarginInlineSize: string;
        startIconLargeMarginBlockSize: string;
        startIconMediumMarginBlockSize: string;
        startIconSmallMarginBlockSize: string;
        splitBlockSize: string;
        slotInsetBlockStart: string;
        slotInsetBlockEnd: string;
        slotButtonPadding: string;
        borderInlineEnd: string;
        insetInlineStart: string;
        insetInlineEnd: string;
        iconEndSlotTranslateX: string;
        iconEndSlotTranslateY: string;
        iconStartSlotTranslateY: string;
        statusIcon: {
            l: {
                marginInlineSize: string;
                marginBlockSize: string;
            };
            m: {
                marginInlineSize: string;
                marginBlockSize: string;
            };
            s: {
                marginInlineSize: string;
                marginBlockSize: string;
            };
        };
        variants: {
            quiet: {
                largeSlotSize: string;
                mediumSlotSize: string;
                smallSlotSize: string;
                marginInline: string;
            };
            outline: {
                largeSlotSize: string;
                mediumSlotSize: string;
                smallSlotSize: string;
            };
        };
        interiorButton: {
            size: {
                l: {
                    inlineSize: string;
                    blockSize: string;
                    inputBlockSize: string;
                    marginInlineEnd: string;
                    padding: string;
                    insetInlineEnd: string;
                };
                m: {
                    inlineSize: string;
                    blockSize: string;
                    inputBlockSize: string;
                    marginInlineEnd: string;
                    padding: string;
                    insetInlineEnd: string;
                };
                s: {
                    inlineSize: string;
                    blockSize: string;
                    inputBlockSize: string;
                    marginInlineEnd: string;
                    padding: string;
                    insetInlineEnd: string;
                };
            };
        };
        container: {
            l: string;
            m: string;
            s: string;
        };
        focus: {
            outlineWidth: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<Omit<Omit<{
        '& [class^="spark-icon"] + [class^="spark-icon"]': {
            marginInlineStart: string;
        };
        variants: {
            message: {
                display: "block";
                color: string;
                lineHeight: string;
            };
            size: {
                l: {
                    "&.spark-text-field-quiet": {
                        marginInline: string;
                        "& .spark-text-field-interior-button-presence > .spark-icon": {
                            marginInlineEnd: string;
                        };
                    };
                    '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                        marginBlock: string;
                        marginInline: string;
                    };
                    "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                        marginBlock: string;
                        marginInline: string;
                    };
                };
                m: {
                    "&.spark-text-field-quiet": {
                        marginInline: string;
                        "& .spark-text-field-interior-button-presence > .spark-icon": {
                            marginInlineEnd: string;
                        };
                    };
                    '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                        marginBlock: string;
                        marginInline: string;
                    };
                    "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                        marginBlock: string;
                        marginInline: string;
                    };
                };
                s: {
                    "&.spark-text-field-quiet": {
                        marginInline: string;
                        "& .spark-text-field-interior-button-presence > .spark-icon": {
                            marginInlineEnd: string;
                        };
                    };
                    '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                        marginBlock: string;
                        marginInline: string;
                    };
                    "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                        marginBlock: string;
                        marginInline: string;
                    };
                };
            };
        };
        label: {};
        errorMessage: {};
        container: {
            display: "flex";
            flexDirection: "column";
            gap: string;
        };
        startSlot: {};
        endSlot: {};
        isDisabled: {};
        interiorButton: {};
        interiorButtonPresence: {};
        size: {
            l: {};
            m: {};
            s: {};
        };
        focusBorder: {
            outline: string;
        };
    }, "variants"> & {
        message: {
            display: "block";
            color: string;
            lineHeight: string;
        };
        size: {
            l: {
                "&.spark-text-field-quiet": {
                    marginInline: string;
                    "& .spark-text-field-interior-button-presence > .spark-icon": {
                        marginInlineEnd: string;
                    };
                };
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: string;
                    marginInline: string;
                };
                "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                    marginBlock: string;
                    marginInline: string;
                };
            };
            m: {
                "&.spark-text-field-quiet": {
                    marginInline: string;
                    "& .spark-text-field-interior-button-presence > .spark-icon": {
                        marginInlineEnd: string;
                    };
                };
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: string;
                    marginInline: string;
                };
                "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                    marginBlock: string;
                    marginInline: string;
                };
            };
            s: {
                "&.spark-text-field-quiet": {
                    marginInline: string;
                    "& .spark-text-field-interior-button-presence > .spark-icon": {
                        marginInlineEnd: string;
                    };
                };
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: string;
                    marginInline: string;
                };
                "&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^=\"spark-icon\"]": {
                    marginBlock: string;
                    marginInline: string;
                };
            };
        };
    } & import("jss").Styles<string, unknown, undefined> & {
        variants?: import("jss").Styles<string, unknown, undefined> | undefined;
    }, "variants"> & import("jss").Styles<string, unknown, undefined>>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                '--spark-input-color': string;
                '--spark-input-bg-color-outline': string;
                '--spark-input-color-placeholder': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            transparent: string;
            color: string;
            colorHover: string;
            colorValid: string;
            colorInvalid: string;
            colorDisabled: string;
            coloStartIcon: string;
            colorActionIcon: string;
            colorDisabledIcon: string;
            borderColor: string;
            splitColor: string;
            interiorButton: {
                color: string;
                focus: {
                    backroundColor: string;
                    color: string;
                };
            };
            focus: {
                outlineColor: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            transparent: string;
            color: string;
            colorHover: string;
            colorValid: string;
            colorInvalid: string;
            colorDisabled: string;
            coloStartIcon: string;
            colorActionIcon: string;
            colorDisabledIcon: string;
            borderColor: string;
            splitColor: string;
            interiorButton: {
                color: string;
                focus: {
                    backroundColor: string;
                    color: string;
                };
            };
            focus: {
                outlineColor: string;
            };
        } & {
            transparent: string;
            color: string;
            colorHover: string;
            colorInvalid: string;
            colorDisabled: string;
            coloStartIcon: string;
            colorActionIcon: string;
            colorDisabledIcon: string;
            borderColor: string;
            splitColor: string;
            interiorButton: {
                color: string;
                focus: {
                    backroundColor: string;
                    color: string;
                };
            };
            focus: {
                outlineColor: string;
            };
        }>;
    };
};
