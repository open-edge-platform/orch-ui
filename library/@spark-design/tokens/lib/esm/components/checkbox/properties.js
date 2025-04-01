import { token } from '../../setup';
import { CheckboxSize } from './types';
export const prefix = 'spark-checkbox';
export const properties = token({
    checkmarkSize: '12px',
    checkmarkBorderRadius: '1px',
    noChildrenSize: '24px',
    noChildrenContainerSize: '12px',
    border: '1px',
    padding: '1px',
    labelSpaceGap: '4px',
    marginLeft: '10px',
    [CheckboxSize.Large]: {
        padding: '6px',
        fontSize: '16px',
        checkmarkGap: '12px',
        lineHeight: '20px',
        errorMessageMarginLeft: '7px',
        paddingError: '2px',
        paddingInlineStart: '22px',
        inputInsetBlockStart: '10px'
    },
    [CheckboxSize.Medium]: {
        padding: '4px',
        fontSize: '14px',
        checkmarkGap: '8px',
        lineHeight: '16px',
        errorMessageMarginLeft: '5px',
        paddingError: '2px',
        paddingInlineStart: '18px',
        inputInsetBlockStart: '6px'
    },
    [CheckboxSize.Small]: {
        padding: '4px',
        fontSize: '12px',
        checkmarkGap: '8px',
        lineHeight: '16px',
        errorMessageMarginLeft: '5px',
        paddingError: '2px',
        paddingInlineStart: '18px',
        inputInsetBlockStart: '6px'
    },
    container: {
        blockSize: '14px'
    }
}, {
    prefix: prefix
});
