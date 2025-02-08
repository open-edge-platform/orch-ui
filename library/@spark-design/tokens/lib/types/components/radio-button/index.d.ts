export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        sideLength: string;
        borderWidth: string;
        borderRadius: string;
        inlineSize: string;
        inputOpacity: number;
        inputBlockSize: string;
        inputinsetBlockStart: string;
        inputInsetInlineStart: string;
        boxShadowSpreadRadiusOne: string;
        boxShadowSpreadRadiusTwo: string;
        boxShadowSpreadRadiusThree: string;
        insetBlockStart: string;
        boxShadowX: string;
        boxShadowY: string;
        boxShadowBlurRadius: string;
        l: {
            fontSize: string;
            lineHeight: string;
            inlineSize: string;
            padding: string;
            margin: string;
            containerPaddingInlineLeft: string;
            containerPaddingInlineRight: string;
            containerPaddingBlock: string;
            gap: string;
            inputMarginBlockStart: string;
        };
        m: {
            fontSize: string;
            lineHeight: string;
            inlineSize: string;
            padding: string;
            margin: string;
            containerPaddingInlineLeft: string;
            containerPaddingInlineRight: string;
            containerPaddingBlock: string;
            gap: string;
            inputMarginBlockStart: string;
        };
        s: {
            fontSize: string;
            lineHeight: string;
            inlineSize: string;
            padding: string;
            margin: string;
            containerPaddingInlineLeft: string;
            containerPaddingInlineRight: string;
            containerPaddingBlock: string;
            gap: string;
            inputMarginBlockStart: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
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
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                [x: string]: string | {
                    forcedColorAdjust: "none";
                };
                '--spark-radio-button-enable-selected-border-color': string;
                '--spark-radio-button-hover-selected-border-color': string;
                '--spark-radio-button-pressed-selected-border-color': string;
                '--spark-radio-button-hover-unselected-border-color': string;
                '--spark-radio-button-enabled-unselected-border-color': string;
                '--spark-radio-button-pressed-unselected-border-color': string;
                '--spark-radio-button-enable-selected-bg-color': string;
                '--spark-radio-button-pressed-selected-bg-color': string;
                '--spark-radio-button-pressed-unselected-bg-color': string;
                '--spark-radio-button-selected-bg-color': string;
                '--spark-radio-button-enabled-unselected-bg-color': string;
                '--spark-radio-button-unselected-bg-color': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            enabledUnselectedBgColor: string;
            enabledUnselectedBorderColor: string;
            unselectedBgColor: string;
            selectedBgColor: string;
            textColorDisabled: string;
            textColor: string;
            disabledBg: string;
            disabledBorder: string;
            enableSelectedBorderColor: string;
            enableSelectedBgColor: string;
            hoverUnselectedBorderColor: string;
            hoverSelectedBorderColor: string;
            pressedUnselectedBgColor: string;
            pressedUnselectedBorderColor: string;
            pressedSelectedBgColor: string;
            pressedSelectedBorderColor: string;
            transparentColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            enabledUnselectedBgColor: string;
            enabledUnselectedBorderColor: string;
            unselectedBgColor: string;
            selectedBgColor: string;
            textColorDisabled: string;
            textColor: string;
            disabledBg: string;
            disabledBorder: string;
            enableSelectedBorderColor: string;
            enableSelectedBgColor: string;
            hoverUnselectedBorderColor: string;
            hoverSelectedBorderColor: string;
            pressedUnselectedBgColor: string;
            pressedUnselectedBorderColor: string;
            pressedSelectedBgColor: string;
            pressedSelectedBorderColor: string;
            transparentColor: string;
        } & {
            enabledUnselectedBgColor: string;
            enabledUnselectedBorderColor: string;
            unselectedBgColor: string;
            selectedBgColor: string;
            textColorDisabled: string;
            textColor: string;
            disabledBg: string;
            disabledBorder: string;
            enableSelectedBorderColor: string;
            enableSelectedBgColor: string;
            hoverUnselectedBorderColor: string;
            hoverSelectedBorderColor: string;
            pressedUnselectedBgColor: string;
            pressedUnselectedBorderColor: string;
            pressedSelectedBgColor: string;
            pressedSelectedBorderColor: string;
            transparentColor: string;
        }>;
    };
};
