import { token } from '../../setup';
import { BadgeShape, BadgeSize } from './types';
export const prefix = 'spark-badge';
export const properties = token({
    base: {
        display: 'flex',
        textAlign: 'center'
    },
    [BadgeSize.ExtraSmall]: {
        height: '12px',
        width: '12px',
        fontSize: '8px',
        paddingInline: '2px',
        lineHeight: { text: '1.5' },
        letterSpacing: '0.25px'
    },
    [BadgeSize.Small]: {
        height: '16px',
        width: '16px',
        fontSize: '10px',
        paddingInline: '4px',
        lineHeight: { text: '1.5' },
        letterSpacing: '0.25px'
    },
    [BadgeSize.Medium]: {
        height: '24px',
        width: '24px',
        fontSize: '12px',
        paddingInline: '8px',
        lineHeight: { text: '1.5' },
        letterSpacing: '0px'
    },
    [BadgeSize.Large]: {
        height: '32px',
        width: '32px',
        fontSize: '14px',
        paddingInline: '12px',
        lineHeight: { text: '1.5' },
        letterSpacing: '0px'
    },
    [BadgeSize.ExtraLarge]: {
        height: '40px',
        width: '40px',
        fontSize: '16px',
        paddingInline: '14px',
        lineHeight: { text: '1.5' },
        letterSpacing: '0px'
    },
    [BadgeShape.Circle]: {
        borderRadius: '50%'
    },
    [BadgeShape.Pill]: {
        borderRadius: '40px'
    },
    [BadgeShape.Square]: {
        borderRadius: '5px'
    }
}, {
    prefix: prefix
});
