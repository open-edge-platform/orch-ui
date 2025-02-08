import { token } from '../../setup';
import { TableSize } from './types';
export const prefix = 'spark-table';
export const properties = token({
    width: '100%',
    borderSpacing: '0px',
    outlineBorderWidth: '1px',
    outlineBorderSpacing: '1px',
    boxShadowX: '0px',
    boxShadowY: '-1px',
    boxShadowBlurRadius: '0px',
    headCellMinInlineSize: '220px',
    headTextSize: '14px',
    headTextLineHeight: '18px',
    headMinBlockSize: '32px',
    headPaddingInline: '8px',
    headPaddingBlock: '7px',
    rowSortArrowSize: '12px',
    rowSortArrowWidth: '15px',
    cellMinBlockSize: '32px',
    cellPaddingInline: '8px',
    cellPaddingBlock: '7px',
    cellTextLineHeight: '18px',
    cellTextSize: '14px',
    border: '1px',
    paddingBottom: '10px',
    rowsSortUpPaddingLeft: '3px',
    rowsSortDownPaddingLeft: '3px',
    rowsSelectBorderRadius: '0px',
    rowsSelectCheckboxBorderRadius: '0px',
    rowSortPaddingInlineStart: '3px',
    rowSelectCheckboxInlineSize: '0px',
    rowSelectCheckboxBlockSize: '3px',
    inputInlineSize: '10px',
    rowsSubRowItemPadding: '20px',
    rowsSubRowItemWidth: '100%',
    rowsSubRowItemDisplay: 'block',
    rowsSubRowItemWidthTable: '100%',
    rowsSubRowItemDisplayTable: 'table',
    rowsSubRowBoxSizing: 'border-box',
    rowSortLineHeight: '7px',
    rowSortTop: '4px',
    [TableSize.Small]: {
        textSize: '12px',
        minBlock: '24px',
        headPaddingBlock: '3px',
        cellPaddingBlock: '3px',
        sortPaddingBlock: '3px',
        sortMarginBlock: '2px'
    },
    [TableSize.Medium]: {
        textSize: '14px',
        minBlock: '32px',
        headPaddingBlock: '8px',
        cellPaddingBlock: '8px',
        sortPaddingBlock: '5px',
        sortMarginBlock: '3px'
    },
    [TableSize.Large]: {
        textSize: '14px',
        minBlock: '40px',
        headPaddingBlock: '15px',
        cellPaddingBlock: '15px',
        sortPaddingBlock: '8px',
        sortMarginBlock: '3px'
    },
    [TableSize.XLlarge]: {
        textSize: '14px',
        minBlock: '48px',
        headPaddingBlock: '20px',
        cellPaddingBlock: '20px',
        sortPaddingBlock: '10px',
        sortMarginBlock: '3px'
    },
    [TableSize['2XLarge']]: {
        textSize: '14px',
        minBlock: '56px',
        headPaddingBlock: '25px',
        cellPaddingBlock: '25px',
        sortPaddingBlock: '12px',
        sortMarginBlock: '3px'
    },
    [TableSize['3XLarge']]: {
        textSize: '14px',
        minBlock: '64px',
        headPaddingBlock: '30px',
        cellPaddingBlock: '30px',
        sortPaddingBlock: '15px',
        sortMarginBlock: '3px'
    }
}, {
    prefix: prefix
});
