export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        border: string;
        marginBlockEnd: string;
        fontWeight: string;
        marginBlockStart: string;
        inlineSize: string;
        errorPaddingInlineStart: string;
        paddingInlineStart: string;
        paddingInlineEnd: string;
        dashedBorder: string;
        padding: string;
        l: {
            fontSize: string;
            minInlineSize: string;
            minBlockSize: string;
            headerMarginBlockEnd: string;
            dragAndDropMinBlockSize: string;
            dragAndDropSizeIconSize: string;
            filesInlineSize: string;
            filesIconInlineSize: string;
            filesBlockSize: string;
            filesLineHeight: string;
            dragAndDropMarginBlockEnd: string;
            marginBlockStart: string;
        };
        m: {
            fontSize: string;
            minInlineSize: string;
            minBlockSize: string;
            headerMarginBlockEnd: string;
            dragAndDropMinBlockSize: string;
            dragAndDropSizeIconSize: string;
            filesInlineSize: string;
            filesIconInlineSize: string;
            filesBlockSize: string;
            filesLineHeight: string;
            dragAndDropMarginBlockEnd: string;
            marginBlockStart: string;
        };
        s: {
            fontSize: string;
            minInlineSize: string;
            minBlockSize: string;
            headerMarginBlockEnd: string;
            dragAndDropMinBlockSize: string;
            dragAndDropSizeIconSize: string;
            filesInlineSize: string;
            filesIconInlineSize: string;
            filesBlockSize: string;
            filesLineHeight: string;
            dragAndDropMarginBlockEnd: string;
            marginBlockStart: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        inlineSize: string;
        header: {
            display: "grid";
            color: string;
        };
        button: {
            position: "relative";
            overflow: "hidden";
        };
        dragAndDrop: {
            boxSizing: "border-box";
            flex: string;
            display: "flex";
            justifyContent: "center";
            alignItems: "center";
            background: string;
            border: string;
        };
        dragAndDropBody: {};
        dragAndDropText: {};
        files: {};
        filesItem: {};
        filesError: {};
    } & {
        [x: string]: {};
        size: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            headerColor: string;
            dragAndDropTextColor: string;
            dragAndDropBodyIcon: string;
            dragAndDropBodyBorderColor: string;
            dragAndDropBodyBackgroundColor: string;
            filesErrorBackgroundColor: string;
            filesErrorColor: string;
            filesBackgroundColor: string;
            canDropBorderColor: string;
            canDropBackground: string;
            iconSuccess: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            headerColor: string;
            dragAndDropTextColor: string;
            dragAndDropBodyIcon: string;
            dragAndDropBodyBorderColor: string;
            dragAndDropBodyBackgroundColor: string;
            filesErrorBackgroundColor: string;
            filesErrorColor: string;
            filesBackgroundColor: string;
            canDropBorderColor: string;
            canDropBackground: string;
            iconSuccess: string;
        } & {
            headerColor: string;
            dragAndDropTextColor: string;
            dragAndDropBodyIcon: string;
            dragAndDropBodyBorderColor: string;
            dragAndDropBodyBackgroundColor: string;
            filesErrorBackgroundColor: string;
            filesErrorColor: string;
            filesBackgroundColor: string;
        }>;
    };
};
