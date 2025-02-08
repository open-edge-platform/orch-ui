import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { TableSize } from './types';
const tableBase = component({
    borderSpacing: properties.borderSpacing,
    inlineSize: properties.width,
    paddingBottom: properties.paddingBottom,
    outline: {
        borderWidth: properties.outlineBorderWidth,
        borderStyle: 'solid',
        borderSpacing: properties.outlineBorderSpacing,
        borderCollapse: 'collapse',
        borderColor: mode.normalBorder
    },
    outlineBold: {
        borderWidth: properties.outlineBorderWidth,
        borderStyle: 'solid',
        borderSpacing: properties.outlineBorderSpacing,
        borderCollapse: 'collapse',
        borderColor: mode.outlineBoldBorder
    },
    minimal: {
        borderBottom: '0'
    },
    head: {
        lineHeight: properties.headTextLineHeight,
        paddingBlock: properties.headPaddingBlock,
        paddingInline: properties.headPaddingInline,
        backgroundColor: mode.headBackgroundColor,
        boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowY}
                 ${properties.boxShadowBlurRadius} ${mode.headNormalBorder}`,
        color: mode.headColor
    },
    headCell: {
        boxSizing: 'border-box',
        textAlign: 'start'
    },
    headCellBoxSort: {},
    headSorted: {
        color: mode.rowSortArrowColorHover
    },
    headCellBox: {},
    cellAlignCenter: {
        textAlign: 'center'
    },
    cellAlignEnd: {
        textAlign: 'end'
    },
    cellAlignStart: {
        textAlign: 'start'
    },
    cellBox: {},
    cell: {
        boxSizing: 'border-box',
        lineHeight: properties.cellTextLineHeight,
        paddingInline: properties.cellPaddingInline,
        blockSize: properties.cellMinBlockSize
    },
    row: {
        color: mode.rowTextColor,
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: mode.rowNormalBackgroundColor,
        boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowY}
                ${properties.boxShadowBlurRadius} ${mode.rowNormalBorder}`
    },
    rowsZebra: {},
    rowsSort: {},
    rowsSortUp: {},
    rowsSortDown: {},
    rowsSelect: {
        borderRadius: properties.rowsSelectBorderRadius
    },
    rowsSelected: {},
    rowsSelectCheckbox: {
        accentColor: mode.rowSelectCheckboxColor,
        borderRadius: properties.rowsSelectCheckboxBorderRadius,
        margin: `${properties.rowSelectCheckboxBlockSize} ${properties.rowSelectCheckboxInlineSize}`
    },
    rowsSorted: {
        color: mode.rowSortArrowColorHover
    },
    rowsSubRow: {},
    rowsSubRowItem: {
        width: properties.rowsSubRowItemWidth
    }
}, {
    className: prefix
});
export const table = tableBase.fork({
    [`& .spark-pagination-list `]: {
        display: 'flex',
        justifyContent: 'end'
    },
    [`& .spark-pagination-list .spark-button-content`]: {
        fontWeight: '500'
    },
    [`& .spark-pagination-list  .spark-button-active .spark-button-content`]: {
        fontWeight: '600'
    },
    [`& .${tableBase.row.$}:focus-visible, &.${tableBase.rowsZebra.$} tr:nth-child(even):focus-visible`]: {
        background: mode.cellBackgroundColorFocus,
        outline: 'none'
    },
    [`& .${tableBase.minimal.$} .${tableBase.rowsSubRowItem.$}`]: {
        boxShadow: `0 0 0 0.0625rem ${mode.minimalLineColor}`
    },
    [`& .${tableBase.rowsSubRowItem.$} table`]: {
        display: properties.rowsSubRowItemDisplayTable,
        width: properties.rowsSubRowItemWidthTable
    },
    [`& .${tableBase.rowsSubRowItem.$} .subrow-cell`]: {
        padding: properties.rowsSubRowItemPadding
    },
    [`& .${tableBase.rowsSelected.$} .${tableBase.cell.$}`]: {
        backgroundColor: mode.rowSelectBackgroundColor,
        boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowY}
        ${properties.boxShadowBlurRadius} ${mode.rowNormalBorder}`
    },
    [`& .${tableBase.rowsSort.$}`]: {
        inlineSize: properties.rowSortArrowWidth,
        fontSize: properties.rowSortArrowSize,
        color: mode.rowSortArrowColor,
        display: 'inline-block',
        position: 'relative',
        top: properties.rowSortTop,
        paddingInlineStart: properties.rowSortPaddingInlineStart,
        lineHeight: properties.rowSortLineHeight
    },
    [`& .${tableBase.rowsSortUp.$}, &.${tableBase.rowsSortDown.$}`]: {
        color: mode.rowSortArrowColorHover,
        paddingInlineStart: properties.rowSortPaddingInlineStart,
        fontSize: properties.rowSortArrowSize
    },
    [`& .${tableBase.rowsSort.$} .icon`]: {
        lineHeight: '0.55'
    },
    [`& .${tableBase.rowsSort.$} input`]: {
        inlineSize: properties.inputInlineSize
    },
    [`&.${tableBase.rowsSelectCheckbox.$}:hover`]: {
        accentColor: mode.rowSelectBackgroundColor
    },
    [`&.${tableBase.rowsSelectCheckbox.$}:hover:active`]: {
        accentColor: mode.rowSelectCheckboxColor
    },
    [`&.${tableBase.rowsZebra.$} tr:nth-child(even)`]: {
        backgroundColor: mode.rowBackgroundColorHover,
        boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowY}
            ${properties.boxShadowBlurRadius} rgba(43, 44, 48, 0.12)`
    },
    [`& .${tableBase.row.$}:focus-visible, &.${tableBase.rowsZebra.$} tr:nth-child(even):focus-visible`]: {
        background: mode.cellBackgroundColorFocus,
        outline: 'none'
    },
    [`&.${tableBase.outline.$} .${tableBase.headCell.$}, &.${tableBase.outline.$} .${tableBase.cell.$}`]: {
        border: `${properties.border} solid`,
        borderColor: mode.outlineBorder
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.headCell.$}`]: {
        borderInlineStart: `${properties.border} solid ${mode.outlineBorder}`,
        borderInlineEnd: `${properties.border} solid ${mode.outlineBorder}`,
        borderBlockEnd: `${properties.border} solid ${mode.outlineBorder}`
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.cell.$}`]: {
        borderInlineStart: `${properties.border} solid ${mode.outlineBorder}`,
        borderInlineEnd: `${properties.border} solid ${mode.outlineBorder}`,
        borderBlockStart: `${properties.border} solid ${mode.outlineBorder}`
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.cell.$}:nth-child(1),
      &.${tableBase.outlineBold.$} .${tableBase.headCell.$}:nth-child(1)`]: {
        borderInlineStart: `${properties.border} solid ${mode.outlineBoldBorder}`
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.cell.$}:nth-last-child(odd),
      &.${tableBase.outlineBold.$} .${tableBase.headCell.$}:nth-last-child(odd)`]: {
        borderInlineEnd: `${properties.border} solid ${mode.outlineBoldBorder}`
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.head.$} tr:nth-child(1) `]: {
        borderBlockStart: `${properties.border} solid ${mode.outlineBoldBorder}`
    },
    [`&.${tableBase.outlineBold.$} .${tableBase.row.$}:nth-last-child(1)`]: {
        borderBlockEnd: `${properties.border} solid ${mode.outlineBoldBorder}`
    },
    [`&.${tableBase.minimal.$} .${tableBase.row.$}, &.${tableBase.minimal.$} .${tableBase.head.$}`]: {
        border: `solid 0.25rem ${mode.normalBorder}`,
        boxShadow: `0 0 0 0.0625rem ${mode.minimalLineColor}`
    },
    [`&.${tableBase.minimal.$} .${tableBase.headCellBoxSort.$}`]: {
        width: 'max-content'
    },
    [`&.${tableBase.minimal.$} .spark-pagination-list .spark-button`]: {
        background: 'white',
        borderColor: `${mode.normalBorder}`
    },
    [`&.${tableBase.minimal.$} .${tableBase.headCellBox.$}`]: {
        width: 'auto'
    },
    [`&.${tableBase.minimal.$} .${tableBase.headCellBoxSort.$}:hover`]: {
        background: `${mode.minimalBackgroundColorHover}`
    },
    [`&.${tableBase.minimal.$} .${tableBase.headCell.$} `]: {
        background: 'white',
        borderBottom: `solid 0.0625rem ${mode.normalBorder}`,
        fontWeight: '500'
    },
    [`&.${tableBase.rowsSort.$} .caret-up-select , 
    &.${tableBase.rowsSort.$} .caret-down-select`]: {
        color: `${mode.minimalLinkColor}`
    },
    [`&.${tableBase.minimal.$} .${tableBase.row.$}:hover`]: {
        backgroundColor: mode.minimalBackgroundColorRowHover
    },
    [`&.spark-table-size-s
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line,
    &.spark-table-size-m
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line`]: {
        display: 'none'
    },
    [`&.spark-table-size-l
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line,
    &.spark-table-size-xl
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line,
    &.spark-table-size-2xl
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line,
    &.spark-table-size-3xl
        .spark-table-body
        .spark-table-row
        .spark-table-cell
        .spark-table-cell-second-line`]: {
        display: 'block'
    },
    size: Object.values(TableSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`& .${tableBase.head.$}`]: {
                fontSize: properties[size]?.textSize,
                blockSize: properties[size]?.minBlock,
                paddingInline: properties[size]?.cellPaddingBlock
            },
            [`& .${tableBase.cell.$}`]: {
                fontSize: properties[size]?.textSize,
                blockSize: properties[size]?.minBlock,
                paddingInline: properties[size]?.cellPaddingBlock
            },
            [`& .${tableBase.headCell.$}`]: {
                fontSize: properties[size]?.textSize,
                blockSize: properties[size]?.minBlock,
                paddingInline: properties[size]?.cellPaddingBlock
            },
            [`&.${tableBase.minimal.$} .${tableBase.headCellBox.$},
                &.${tableBase.minimal.$} .${tableBase.cellBox.$} `]: {
                padding: `0 ${properties[size]?.sortPaddingBlock} `
            },
            [`&.${tableBase.minimal.$} .active-sort`]: {
                padding: properties[size]?.sortPaddingBlock,
                margin: `${properties[size]?.sortMarginBlock} 0`
            }
        }
    }), {})
});
