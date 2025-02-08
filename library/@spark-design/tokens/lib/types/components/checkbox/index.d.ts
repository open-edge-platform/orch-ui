import { checkbox } from './component';
export * from './types';
export { checkbox };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        checkmarkSize: string;
        checkmarkBorderRadius: string;
        noChildrenSize: string;
        noChildrenContainerSize: string;
        border: string;
        padding: string;
        labelSpaceGap: string;
        marginLeft: string;
        l: {
            padding: string;
            fontSize: string;
            checkmarkGap: string;
            lineHeight: string;
            errorMessageMarginLeft: string;
            paddingError: string;
            paddingInlineStart: string;
            inputInsetBlockStart: string;
        };
        m: {
            padding: string;
            fontSize: string;
            checkmarkGap: string;
            lineHeight: string;
            errorMessageMarginLeft: string;
            paddingError: string;
            paddingInlineStart: string;
            inputInsetBlockStart: string;
        };
        s: {
            padding: string;
            fontSize: string;
            checkmarkGap: string;
            lineHeight: string;
            errorMessageMarginLeft: string;
            paddingError: string;
            paddingInlineStart: string;
            inputInsetBlockStart: string;
        };
        container: {
            blockSize: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        checked: {};
        unChecked: {};
        isDisabled: {};
        indeterminate: {};
        invalid: {};
        checkmarkContainer: {
            alignSelf: "start";
        };
        labelContainer: {
            marginLeft: string;
        };
        errorMessage: {};
        noChildren: {
            blockSize: string;
            inlineSize: string;
        };
    } & {
        [x: string]: {};
        boxSizing: string;
        display: string;
        alignItems: string;
        position: string;
        size: {};
    }>;
    media: import("@spark-design/core/lib/types/media").MediaOutput<{
        '@media screen and (forced-colors: active)': {
            [x: string]: {
                '--spark-checkbox-icon-color': string;
                '--spark-checkbox-color-on': string;
                '--spark-checkbox-unchecked-border-color': string;
                '--spark-checkbox-color-disabled': string;
            };
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            colorOn: string;
            colorDisabled: string;
            colorInvalid: string;
            iconColor: string;
            uncheckedBorderColor: string;
            uncheckedHoverBorderColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            colorOn: string;
            colorDisabled: string;
            colorInvalid: string;
            iconColor: string;
            uncheckedBorderColor: string;
            uncheckedHoverBorderColor: string;
        } & {
            colorOn: string;
            colorDisabled: string;
            iconColor: string;
            uncheckedBorderColor: string;
            uncheckedHoverBorderColor: string;
        }>;
    };
};
