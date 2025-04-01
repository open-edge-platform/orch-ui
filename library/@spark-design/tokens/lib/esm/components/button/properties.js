import { token } from '../../setup';
export const prefix = 'spark-button';
export const prefixMonochrome = 'spark-button-monochrome';
export const properties = token({
    fontWeight: '500',
    fontFamily: 'inherit',
    maxInlineSize: '600px',
    borderWidth: '1px',
    l: {
        blockSize: '40px',
        fontSize: '16px',
        lineHeight: '22px',
        paddingBlock: '12px',
        paddingInline: '20px',
        iconGap: '8px'
    },
    m: {
        blockSize: '32px',
        fontSize: '14px',
        lineHeight: '18px',
        paddingBlock: '8px',
        paddingInline: '16px',
        iconGap: '4px'
    },
    s: {
        blockSize: '24px',
        fontSize: '12px',
        lineHeight: '14px',
        paddingBlock: '4px',
        paddingInline: '12px',
        iconGap: '4px'
    },
    startSlot: {
        fontSize: '16px',
        flexShrink: 0
    },
    endSlot: {
        fontSize: '16px',
        flexShrink: 0
    },
    iconOnly: {
        l: {
            fontSize: '16px',
            paddingInline: '8px'
        },
        m: {
            fontSize: '16px',
            paddingInline: '8px'
        },
        s: {
            fontSize: '16px',
            paddingInline: '4px'
        }
    }
}, {
    prefix: prefix
});
