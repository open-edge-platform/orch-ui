import { token } from '../../setup';
export const prefix = 'spark-code-snippet';
export const properties = token({
    fontFamily: `IntelOneMono, monospace`,
    justifyContent: 'space-between',
    preMargin: '0px',
    zeroPadding: '0px',
    zeroMargin: '0px',
    closedOpacity: '0',
    openedOpacity: '1',
    inline: {
        l: {
            blockSize: '24px',
            fontSize: '16px',
            paddingInline: '8px',
            width: 'fit-content'
        },
        m: {
            blockSize: '21px',
            fontSize: '14px',
            paddingInline: '6px',
            width: 'fit-content'
        },
        s: {
            blockSize: '18px',
            fontSize: '12px',
            paddingInline: '4px',
            width: 'fit-content'
        }
    },
    single: {
        padding: '0px',
        insetBlockStartCopyIcon: '0px',
        insetInlineEndCopyIcon: '0px',
        l: {
            blockSize: '40px',
            fontSize: '16px',
            paddingInlineStart: '16px',
            lineHeight: '40px',
            inlineTooltipSize: '200px'
        },
        m: {
            blockSize: '32px',
            fontSize: '14px',
            paddingInlineStart: '12px',
            lineHeight: '32px',
            inlineTooltipSize: '160px'
        },
        s: {
            blockSize: '24px',
            fontSize: '12px',
            paddingInlineStart: '8px',
            lineHeight: '24px',
            inlineTooltipSize: '145px'
        }
    },
    multiline: {
        insetBlockStartCopyIcon: '0px',
        insetInlineEndCopyIcon: '8px',
        l: {
            fontSize: '16px',
            blockSize: '196px',
            paddingInlineStart: '8px',
            paddingBlockStart: '8px',
            gap: '16px',
            tooltipTop: '12px',
            tooltipRight: '16px'
        },
        m: {
            fontSize: '14px',
            blockSize: '180px',
            paddingInlineStart: '8px',
            paddingBlockStart: '8px',
            gap: '12px'
        },
        s: {
            fontSize: '12px',
            blockSize: '160px',
            paddingInlineStart: '8px',
            paddingBlockStart: '8px',
            gap: '8px'
        }
    },
    copyIcon: {
        fontSize: '16px',
        flexShrink: 0,
        marginInlineEnd: 0,
        paddingInlineEnd: '0px'
    },
    lineNumbering: {
        paddingInlineStart: '8px',
        paddingInlineEnd: '5px',
        paddingInlineTop: '8px',
        borderInlineEnd: '1px',
        marginRight: '10px'
    }
}, {
    prefix: prefix
});
