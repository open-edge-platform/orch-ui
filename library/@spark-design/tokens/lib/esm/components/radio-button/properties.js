import { token } from '../../setup';
import { RadioButtonSize } from './types';
export const prefix = 'spark-radio-button';
export const properties = token({
    sideLength: '12px',
    borderWidth: '1px',
    borderRadius: '50%',
    inlineSize: '0px',
    inputOpacity: 0,
    inputBlockSize: '0px',
    inputinsetBlockStart: '0px',
    inputInsetInlineStart: '0px',
    boxShadowSpreadRadiusOne: '2px',
    boxShadowSpreadRadiusTwo: '3px',
    boxShadowSpreadRadiusThree: '6px',
    insetBlockStart: '0.8px',
    boxShadowX: '0px',
    boxShadowY: '0px',
    boxShadowBlurRadius: '0px',
    [RadioButtonSize.Large]: {
        fontSize: '16px',
        lineHeight: '20px',
        inlineSize: '160px',
        padding: '8px',
        margin: '8px',
        containerPaddingInlineLeft: '0px',
        containerPaddingInlineRight: '5px',
        containerPaddingBlock: '5px',
        gap: '10px',
        inputMarginBlockStart: '4px'
    },
    [RadioButtonSize.Medium]: {
        fontSize: '14px',
        lineHeight: '16px',
        inlineSize: '140px',
        padding: '4px',
        margin: '4px',
        containerPaddingInlineLeft: '0px',
        containerPaddingInlineRight: '4px',
        containerPaddingBlock: '4px',
        gap: '6px',
        inputMarginBlockStart: '2px'
    },
    [RadioButtonSize.Small]: {
        fontSize: '12px',
        lineHeight: '14px',
        inlineSize: '120px',
        padding: '4px',
        margin: '4px',
        containerPaddingInlineLeft: '0px',
        containerPaddingInlineRight: '6px',
        containerPaddingBlock: '6px',
        gap: '6px',
        inputMarginBlockStart: '0'
    }
}, {
    prefix: prefix
});
