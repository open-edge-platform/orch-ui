import { token } from '../../setup';
import { InputSize } from '../input';
export const prefix = 'spark-number-field';
export const properties = token({
    buttonSize: '20px',
    unitLabelGap: '8px',
    zeroPadding: '0px',
    size: {
        [InputSize.Large]: {
            paddingInlineStart: '16px',
            paddingInlineEnd: '4px',
            minInlineSize: '92px',
            fontSize: '16px'
        },
        [InputSize.Medium]: {
            paddingInlineStart: '12px',
            paddingInlineEnd: '2px',
            minInlineSize: '78px',
            fontSize: '14px'
        },
        [InputSize.Small]: {
            paddingInlineStart: '8px',
            paddingInlineEnd: '2px',
            minInlineSize: '72px',
            fontSize: '12px'
        }
    }
}, {
    prefix: prefix
});
