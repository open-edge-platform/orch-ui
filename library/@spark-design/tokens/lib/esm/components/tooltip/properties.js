import { token } from '../../setup';
import { TooltipSize } from './types';
export const prefix = 'spark-tooltip';
export const properties = token({
    insetInlineStart: '0px',
    insetBlockStart: '0px',
    zIndex: '999',
    top: '0px',
    left: '0px',
    tipBlockSize: '0px',
    tipInlineSize: '0px',
    tipBorderWidth: '5px',
    marginInlineEnd: '8px',
    gapSize: '18px',
    insetBlockEnd: '12px',
    tipMarginInlineStart: '4px',
    tipInsetBlockStart: '4px',
    tipInsetBlockEnd: '4px',
    maxInlineSize: '30ch',
    midTooltipSize: '5px',
    [TooltipSize.Medium]: {
        fontSize: '12px',
        labelFontWeight: '400',
        labelLineHeight: '16px',
        iconLineHeight: '16px',
        paddingTopBottom: '8px',
        paddingRightLeft: '12px',
        gapSize: '17px',
        tooltipGap: '8px',
        diffSizeGap: '0px'
    },
    [TooltipSize.Small]: {
        fontSize: '11px',
        labelFontWeight: '400',
        labelLineHeight: '16px',
        iconLineHeight: '16px',
        paddingTopBottom: '4px',
        paddingRightLeft: '8px',
        gapSize: '13px',
        tooltipGap: '13px',
        diffSizeGap: '4px'
    }
}, {
    prefix: prefix
});
