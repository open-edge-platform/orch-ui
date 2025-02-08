import { token } from '../../setup';
import { ButtonGroupSpacing } from './types';
export const prefix = 'spark-button-group';
export const properties = token({
    [ButtonGroupSpacing.None]: {
        gap: '0px'
    },
    [ButtonGroupSpacing.Small]: {
        gap: '2px'
    },
    [ButtonGroupSpacing.Medium]: {
        gap: '4px'
    },
    [ButtonGroupSpacing.Large]: {
        gap: '8px'
    },
    [ButtonGroupSpacing.XLarge]: {
        gap: '12px'
    }
}, {
    prefix: prefix
});
