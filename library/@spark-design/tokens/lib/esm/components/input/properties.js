import { token } from '../../setup';
export const prefix = 'spark-input';
export const properties = token({
    borderWidth: '1px',
    quietBorderWidth: '0px',
    l: {
        blockSize: '40px',
        fontSize: '16px',
        lineHeight: '18px',
        paddingOutlineInline: '16px'
    },
    m: {
        blockSize: '32px',
        fontSize: '14px',
        lineHeight: '16px',
        paddingOutlineInline: '12px'
    },
    s: {
        blockSize: '24px',
        fontSize: '12px',
        lineHeight: '14px',
        paddingOutlineInline: '8px'
    }
}, {
    prefix: prefix
});
