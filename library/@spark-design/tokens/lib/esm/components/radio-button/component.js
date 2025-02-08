import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { RadioButtonSize } from './types';
export const sharedBoxShadowPropsOne = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusOne}`;
export const sharedBoxShadowPropsTwo = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusTwo}`;
export const sharedBoxShadowPropsThree = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusThree}`;
export const radioButtonBase = component({
    input: {},
    focusRegion: {},
    isDisabled: {},
    size: {
        [RadioButtonSize.Small]: {},
        [RadioButtonSize.Medium]: {},
        [RadioButtonSize.Large]: {}
    }
}, {
    className: prefix
});
export const radioButton = radioButtonBase.fork({
    display: 'inline-flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 'fit-content',
    '& input': {
        position: 'absolute',
        opacity: properties.inputOpacity,
        cursor: 'pointer',
        blockSize: properties.inputBlockSize,
        inlineSize: properties.inlineSize
    },
    [`& input + .${radioButtonBase.focusRegion.$}`]: {
        position: 'absolute !important',
        insetBlockStart: properties.inputinsetBlockStart,
        insetInlineStart: properties.inputInsetInlineStart,
        inlineSize: '100%',
        blockSize: '100%'
    },
    [`& input:disabled ~ .${radioButtonBase.input.$}.${radioButtonBase.isDisabled.$},
      &:hover .${radioButtonBase.input.$}.${radioButtonBase.isDisabled.$}`]: {
        backgroundColor: mode.disabledBg,
        borderStyle: 'solid',
        borderColor: mode.disabledBorder,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        pointerEvents: 'none',
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor}, 
            inset ${sharedBoxShadowPropsTwo} ${mode.disabledBg}, 
            inset ${sharedBoxShadowPropsThree} ${mode.disabledBg}`
    },
    [`& input:disabled:checked ~ .${radioButtonBase.input.$}.${radioButtonBase.isDisabled.$}`]: {
        backgroundColor: mode.disabledBg,
        borderStyle: 'solid',
        borderColor: mode.disabledBorder,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        pointerEvents: 'none',
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor}, 
            inset ${sharedBoxShadowPropsTwo} ${mode.disabledBg}, 
            inset ${sharedBoxShadowPropsThree} ${mode.disabledBorder}`
    },
    [`& input ~ .${radioButtonBase.input.$}`]: {
        blockSize: properties.sideLength,
        inlineSize: properties.sideLength,
        backgroundColor: mode.enabledUnselectedBgColor,
        borderColor: mode.enabledUnselectedBorderColor,
        borderStyle: 'solid',
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor}, 
            inset ${sharedBoxShadowPropsTwo} ${mode.enabledUnselectedBgColor}, 
            inset ${sharedBoxShadowPropsThree} ${mode.enabledUnselectedBgColor}`,
        boxSizing: 'border-box',
        display: 'inline-flex',
        flexShrink: 0
    },
    [`& input:checked ~ .${radioButtonBase.input.$}`]: {
        backgroundColor: mode.enableSelectedBgColor,
        borderStyle: 'solid',
        borderColor: mode.enableSelectedBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor},
            inset ${sharedBoxShadowPropsTwo} ${mode.enableSelectedBgColor},
            inset ${sharedBoxShadowPropsThree} ${mode.enableSelectedBorderColor}`
    },
    [`&:hover input ~ .${radioButtonBase.input.$}`]: {
        backgroundColor: mode.unselectedBgColor,
        borderStyle: 'solid',
        borderColor: mode.hoverUnselectedBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor},
            inset ${sharedBoxShadowPropsTwo} ${mode.unselectedBgColor},
            inset ${sharedBoxShadowPropsThree} ${mode.unselectedBgColor}`
    },
    [`&:hover input:checked ~ .${radioButtonBase.input.$}`]: {
        backgroundColor: mode.selectedBgColor,
        borderStyle: 'solid',
        borderColor: mode.hoverSelectedBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor},
            inset ${sharedBoxShadowPropsTwo} ${mode.selectedBgColor},
            inset ${sharedBoxShadowPropsThree} ${mode.hoverSelectedBorderColor}`
    },
    [`&:active input ~ .${radioButtonBase.input.$}`]: {
        backgroundColor: mode.pressedUnselectedBgColor,
        borderStyle: 'solid',
        borderColor: mode.pressedUnselectedBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor},
            inset ${sharedBoxShadowPropsTwo} ${mode.pressedUnselectedBgColor},
            inset ${sharedBoxShadowPropsThree} ${mode.pressedUnselectedBgColor}`
    },
    [`&:active input:checked ~ .${radioButtonBase.input.$}`]: {
        backgroundColor: mode.pressedSelectedBgColor,
        borderStyle: 'solid',
        borderColor: mode.pressedSelectedBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} ${mode.transparentColor},
            inset ${sharedBoxShadowPropsTwo} ${mode.pressedSelectedBgColor},
            inset ${sharedBoxShadowPropsThree} ${mode.pressedSelectedBorderColor}`
    },
    [`&.${radioButtonBase.size.s.$} input ~ .${radioButtonBase.input.$}`]: {
        insetBlockStart: properties.insetBlockStart
    },
    size: Object.values(RadioButtonSize).reduce((acc, size) => ({
        ...acc,
        [`&-${size}.${radioButtonBase.$}`]: {
            fontSize: properties[size]?.fontSize,
            lineHeight: properties[size]?.lineHeight,
            paddingInline: `${properties[size]?.containerPaddingInlineLeft}
                    ${properties[size]?.containerPaddingInlineRight}`,
            paddingBlock: properties[size]?.containerPaddingBlock,
            gap: properties[size]?.gap,
            [`& input ~ .${radioButtonBase.input.$}`]: {
                marginBlockStart: properties[size]?.inputMarginBlockStart
            }
        }
    }), {})
});
