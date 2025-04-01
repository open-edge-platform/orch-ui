export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        buttonSize: string;
        unitLabelGap: string;
        zeroPadding: string;
        size: {
            l: {
                paddingInlineStart: string;
                paddingInlineEnd: string;
                minInlineSize: string;
                fontSize: string;
            };
            m: {
                paddingInlineStart: string;
                paddingInlineEnd: string;
                minInlineSize: string;
                fontSize: string;
            };
            s: {
                paddingInlineStart: string;
                paddingInlineEnd: string;
                minInlineSize: string;
                fontSize: string;
            };
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        size: {
            s: {};
            m: {};
            l: {};
        };
        outline: {};
        quiet: {};
        buttonGroup: {};
        button: {};
        unitContainer: {};
        inputContainer: {};
        input: {};
        isDisabled: {};
    } & {
        [x: string]: {};
        "&": {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            transparent: string;
            color: string;
            disabledColor: string;
            disabledBgColorOutline: string;
            inputBgColor: string;
            inputBgColorDisabled: string;
            button: {
                color: string;
                bgColor: string;
                bgColorHover: string;
                bgColorActive: string;
            };
        }>;
        dark: import("@spark-design/core").TokenData<{
            transparent: string;
            color: string;
            disabledColor: string;
            disabledBgColorOutline: string;
            inputBgColor: string;
            inputBgColorDisabled: string;
            button: {
                color: string;
                bgColor: string;
                bgColorHover: string;
                bgColorActive: string;
            };
        } & {
            transparent: string;
            color: string;
            disabledColor: string;
            disabledBgColorOutline: string;
            inputBgColor: string;
            inputBgColorDisabled: string;
            button: {
                color: string;
                bgColor: string;
                bgColorHover: string;
                bgColorActive: string;
            };
        }>;
    };
};
