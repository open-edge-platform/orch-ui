export declare const table: import("@spark-design/core").ComponentOutput<{
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
