import { component } from '../../setup';
import { button } from '../button';
import { InputSize, InputVariant } from '../input';
import { inputBase } from '../input/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
const numberFieldBase = component({
    size: {
        [InputSize.Small]: {},
        [InputSize.Medium]: {},
        [InputSize.Large]: {}
    },
    [InputVariant.Outline]: {},
    [InputVariant.Quiet]: {},
    buttonGroup: {},
    button: {},
    unitContainer: {},
    inputContainer: {},
    input: {},
    isDisabled: {}
}, {
    className: prefix
});
export const numberField = numberFieldBase.fork({
    [`& .${numberFieldBase.button.$}.${button.disabled.$}.${button.$}`]: {
        backgroundColor: `${mode.transparent} !important`,
        borderColor: `${mode.transparent} !important`,
        color: mode.disabledColor
    },
    [`&.${numberFieldBase.isDisabled.$}`]: {
        color: mode.disabledColor,
        [`& .${numberFieldBase.inputContainer.$}:not(.spark-input-${InputVariant.Quiet})`]: {
            backgroundColor: mode.disabledBgColorOutline,
            [`& .${numberFieldBase.input.$}`]: {
                backgroundColor: mode.disabledBgColorOutline
            }
        },
        [`& .${numberFieldBase.inputContainer.$}.spark-input-${InputVariant.Quiet} .${numberFieldBase.input.$}`]: {
            backgroundColor: mode.transparent
        },
        [`& .${numberFieldBase.input.$}.${numberFieldBase.isDisabled.$}`]: {
            color: mode.disabledColor
        }
    },
    [`& .${numberFieldBase.unitContainer.$}`]: {
        display: 'flex',
        inlineSize: '100%',
        gap: properties.unitLabelGap,
        alignItems: 'center'
    },
    [`& .${numberFieldBase.inputContainer.$}.${inputBase.$}`]: {
        display: 'flex',
        inlineSize: '100%',
        boxSizing: 'border-box',
        [`& .${numberFieldBase.input.$}`]: {
            backgroundColor: mode.inputBgColor,
            color: mode.color,
            border: 'none',
            display: 'flex',
            inlineSize: '100%',
            blockSize: '100%',
            padding: properties.zeroPadding,
            '&:focus': {
                outline: 'unset'
            }
        },
        [`&.spark-input-${InputVariant.Quiet} .${numberFieldBase.input.$}`]: {
            backgroundColor: mode.transparent
        }
    },
    [`& .${numberFieldBase.buttonGroup.$}`]: {
        alignItems: 'center',
        minInlineSize: 'max-content',
        inlineSize: 'fit-content',
        [`& .${numberFieldBase.button.$}.${button.$}.${button.iconOnly.$}`]: {
            inlineSize: properties.buttonSize,
            blockSize: properties.buttonSize,
            minInlineSize: properties.buttonSize,
            minBlockSize: properties.buttonSize,
            padding: properties.zeroPadding,
            color: mode.button.color,
            backgroundColor: mode.button.bgColor,
            '&:hover': {
                backgroundColor: mode.button.bgColorHover
            },
            [`&.${button.active.$}`]: {
                backgroundColor: mode.button.bgColorActive
            }
        }
    },
    ['&']: Object.values(InputSize).reduce((acc, size) => ({
        ...acc,
        [`&.${numberFieldBase.size[size].$} .${inputBase.$}.${inputBase.size[size].$}:not(.${inputBase.quiet.$}).${numberFieldBase.inputContainer.$}`]: {
            paddingInlineStart: properties.size[size].paddingInlineStart,
            paddingInlineEnd: properties.size[size].paddingInlineEnd,
            minInlineSize: properties.size[size].minInlineSize
        },
        [`&.${numberFieldBase.size[size].$} .${inputBase.$}.${inputBase.size[size].$}.${numberFieldBase.inputContainer.$} .${numberFieldBase.input.$}`]: {
            fontSize: properties.size[size].fontSize
        }
    }), {})
});
