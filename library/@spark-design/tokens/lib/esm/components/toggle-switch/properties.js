import { token } from '../../setup';
import { ToggleSwitchSize } from './types';
export const prefix = 'spark-toggle-switch';
export const properties = token({
    opacity: 0,
    padding: '0px',
    margin: '0px',
    inlineSize: '0px',
    blockSize: '0px',
    borderWidth: '1px',
    minInlineSizeLabelStart: '80px',
    helperTextGap: '8px',
    size: {
        [ToggleSwitchSize.Large]: {
            selector: '10px',
            selectorActive: '12px',
            blockSize: '18px',
            inlineSize: '32px',
            fontSize: '16px',
            padding: '3px',
            borderRadius: '16px',
            gap: '8px'
        },
        [ToggleSwitchSize.Medium]: {
            selector: '8px',
            selectorActive: '10px',
            blockSize: '14px',
            inlineSize: '24px',
            fontSize: '14px',
            padding: '2px',
            borderRadius: '12px',
            gap: '6px'
        },
        [ToggleSwitchSize.Small]: {
            selector: '6px',
            selectorActive: '8px',
            blockSize: '12px',
            inlineSize: '20px',
            fontSize: '12px',
            padding: '2px',
            borderRadius: '8px',
            gap: '4px'
        }
    }
}, {
    prefix: prefix
});
