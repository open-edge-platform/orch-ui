import { token } from '../../setup';
import { ListSize } from './types';
export const prefix = 'spark-list';
export const properties = token({
    fontFamily: 'inherit',
    inlineGap: '8px',
    margin: '0px',
    padding: '0px',
    borderWidth: '0px',
    borderBlockEndWidth: '1px',
    itemGap: '8px',
    size: {
        [ListSize.S]: {
            minBlockSize: '24px',
            fontSize: '12px',
            lineHeight: '15.48px',
            gap: '4px'
        },
        [ListSize.M]: {
            minBlockSize: '32px',
            fontSize: '14px',
            lineHeight: '18.06px',
            gap: '8px'
        },
        [ListSize.L]: {
            minBlockSize: '40px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize.XL]: {
            minBlockSize: '48px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize['2XL']]: {
            minBlockSize: '56px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize['3XL']]: {
            minBlockSize: '64px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize['4XL']]: {
            minBlockSize: '72px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize['5XL']]: {
            minBlockSize: '80px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        },
        [ListSize['6XL']]: {
            minBlockSize: '96px',
            fontSize: '16px',
            lineHeight: '20.64px',
            gap: '8px'
        }
    }
}, {
    prefix: prefix
});
