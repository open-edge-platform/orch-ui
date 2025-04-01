import { token } from '../../setup';
import { DividerThickness } from './types';
export const prefix = 'spark-divider';
export const properties = token({
    [DividerThickness.Light]: {
        thick: '1px'
    },
    [DividerThickness.Bold]: {
        thick: '2px'
    }
}, {
    prefix: prefix
});
