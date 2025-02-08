export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        width: string;
        borderSpacing: string;
        outlineBorderWidth: string;
        outlineBorderSpacing: string;
        boxShadowX: string;
        boxShadowY: string;
        boxShadowBlurRadius: string;
        headCellMinInlineSize: string;
        headTextSize: string;
        headTextLineHeight: string;
        headMinBlockSize: string;
        headPaddingInline: string;
        headPaddingBlock: string;
        rowSortArrowSize: string;
        rowSortArrowWidth: string;
        cellMinBlockSize: string;
        cellPaddingInline: string;
        cellPaddingBlock: string;
        cellTextLineHeight: string;
        cellTextSize: string;
        border: string;
        paddingBottom: string;
        rowsSortUpPaddingLeft: string;
        rowsSortDownPaddingLeft: string;
        rowsSelectBorderRadius: string;
        rowsSelectCheckboxBorderRadius: string;
        rowSortPaddingInlineStart: string;
        rowSelectCheckboxInlineSize: string;
        rowSelectCheckboxBlockSize: string;
        inputInlineSize: string;
        rowsSubRowItemPadding: string;
        rowsSubRowItemWidth: string;
        rowsSubRowItemDisplay: string;
        rowsSubRowItemWidthTable: string;
        rowsSubRowItemDisplayTable: string;
        rowsSubRowBoxSizing: string;
        rowSortLineHeight: string;
        rowSortTop: string;
        s: {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
        m: {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
        l: {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
        xl: {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
        "2xl": {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
        "3xl": {
            textSize: string;
            minBlock: string;
            headPaddingBlock: string;
            cellPaddingBlock: string;
            sortPaddingBlock: string;
            sortMarginBlock: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        borderSpacing: string;
        inlineSize: string;
        paddingBottom: string;
        outline: {
            borderWidth: string;
            borderStyle: "solid";
            borderSpacing: string;
            borderCollapse: "collapse";
            borderColor: string;
        };
        outlineBold: {
            borderWidth: string;
            borderStyle: "solid";
            borderSpacing: string;
            borderCollapse: "collapse";
            borderColor: string;
        };
        minimal: {
            borderBottom: string;
        };
        head: {
            lineHeight: string;
            paddingBlock: string;
            paddingInline: string;
            backgroundColor: string;
            boxShadow: `inset ${string} ${string}\n                 ${string} ${string}`;
            color: string;
        };
        headCell: {
            boxSizing: "border-box";
            textAlign: "start";
        };
        headCellBoxSort: {};
        headSorted: {
            color: string;
        };
        headCellBox: {};
        cellAlignCenter: {
            textAlign: "center";
        };
        cellAlignEnd: {
            textAlign: "end";
        };
        cellAlignStart: {
            textAlign: "start";
        };
        cellBox: {};
        cell: {
            boxSizing: "border-box";
            lineHeight: string;
            paddingInline: string;
            blockSize: string;
        };
        row: {
            color: string;
            position: "relative";
            cursor: "pointer";
            backgroundColor: string;
            boxShadow: `inset ${string} ${string}\n                ${string} ${string}`;
        };
        rowsZebra: {};
        rowsSort: {};
        rowsSortUp: {};
        rowsSortDown: {};
        rowsSelect: {
            borderRadius: string;
        };
        rowsSelected: {};
        rowsSelectCheckbox: {
            accentColor: string;
            borderRadius: string;
            margin: string;
        };
        rowsSorted: {
            color: string;
        };
        rowsSubRow: {};
        rowsSubRowItem: {
            width: string;
        };
    } & {
        [x: string]: {};
        "& .spark-pagination-list ": {
            display: "flex";
            justifyContent: "end";
        };
        "& .spark-pagination-list .spark-button-content": {
            fontWeight: "500";
        };
        "& .spark-pagination-list  .spark-button-active .spark-button-content": {
            fontWeight: "600";
        };
        "&.spark-table-size-s\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line,\n    &.spark-table-size-m\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line": {
            display: "none";
        };
        "&.spark-table-size-l\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line,\n    &.spark-table-size-xl\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line,\n    &.spark-table-size-2xl\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line,\n    &.spark-table-size-3xl\n        .spark-table-body\n        .spark-table-row\n        .spark-table-cell\n        .spark-table-cell-second-line": {
            display: "block";
        };
        size: {};
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            headBackgroundColor: string;
            rowNormalBackgroundColor: string;
            rowBackgroundColorHover: string;
            rowSortArrowColor: string;
            rowSortArrowColorHover: string;
            rowSortArrowColorUp: string;
            rowSortArrowColorDown: string;
            rowZebraBackgroundColor: string;
            rowSelectBackgroundColor: string;
            rowSelectCheckboxColor: string;
            headColor: string;
            rowNormalBorder: string;
            headNormalBorder: string;
            rowBackgroundBolorHover: string;
            normalBorder: string;
            outlineBorder: string;
            outlineBoldBorder: string;
            cellZebraBackgroundColor: string;
            cellBackgroundColorFocus: string;
            minimalLinkColor: string;
            minimalBackgroundColorRowHover: string;
            minimalBackgroundColorHover: string;
            minimalLineColor: string;
            minLinkActive: string;
            rowTextColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            headBackgroundColor: string;
            rowNormalBackgroundColor: string;
            rowBackgroundColorHover: string;
            rowSortArrowColor: string;
            rowSortArrowColorHover: string;
            rowSortArrowColorUp: string;
            rowSortArrowColorDown: string;
            rowZebraBackgroundColor: string;
            rowSelectBackgroundColor: string;
            rowSelectCheckboxColor: string;
            headColor: string;
            rowNormalBorder: string;
            headNormalBorder: string;
            rowBackgroundBolorHover: string;
            normalBorder: string;
            outlineBorder: string;
            outlineBoldBorder: string;
            cellZebraBackgroundColor: string;
            cellBackgroundColorFocus: string;
            minimalLinkColor: string;
            minimalBackgroundColorRowHover: string;
            minimalBackgroundColorHover: string;
            minimalLineColor: string;
            minLinkActive: string;
            rowTextColor: string;
        } & {
            headBackgroundColor: string;
            rowNormalBackgroundColor: string;
            rowZebraBackgroundColor: string;
            rowBackgroundColorHover: string;
            headColor: string;
            rowNormalBorder: string;
            headNormalBorder: string;
            rowBackgroundBolorHover: string;
            normalNorder: string;
            outlineBorder: string;
            outlineBoldBorder: string;
            cellZebraBackgroundColor: string;
            cellBackgroundColorFocus: string;
            rowTextColor: string;
        }>;
    };
};
