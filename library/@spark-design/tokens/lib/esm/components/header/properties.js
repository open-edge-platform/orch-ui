import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { token } from '../../setup';
export const prefix = 'spark-header';
export const properties = token({
    color: palette.themeLightGray50,
    fontWeight: 400,
    fontSize: '14px',
    marginInlineStart: '32px',
    marginInlineEnd: '32px',
    shadow: '1px',
    shadowColor: rgba(palette.themeDarkGray50, 0.1),
    padding: '8px',
    borderBottom: '2px',
    project: {
        fontWeight: 400,
        display: 'flex',
        fontSize: '16px'
    },
    brand: {
        padding: '8px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        blockSize: '100%',
        cursor: 'pointer',
        fontWeight: '400',
        borderBlockEnd: '2px solid transparent'
    },
    s: {
        blockSize: '48px',
        inlineSize: '48px',
        lineHeight: '48px'
    },
    m: {
        blockSize: '64px',
        inlineSize: '64px',
        lineHeight: '64px'
    },
    l: {
        blockSize: '80px',
        inlineSize: '80px',
        lineHeight: '80px'
    }
}, {
    prefix: prefix
});
