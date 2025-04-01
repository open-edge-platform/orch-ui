import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { InputSize, InputVariant } from './types';
export const inputBase = component({
    cursor: 'pointer',
    borderStyle: 'solid',
    boxSizing: 'border-box',
    color: mode.color,
    borderColor: mode.borderColor,
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    isReadOnly: {},
    isDisabled: {},
    isInvalid: {},
    '&:hover, &:focus': {
        borderColor: mode.borderColorHover,
        '&::placeholder': {
            color: mode.colorPlaceholderHover
        }
    },
    '&:focus-visible': {
        outline: 'none'
    },
    '&::placeholder': {
        color: mode.colorPlaceholder,
        fontStyle: 'italic'
    },
    variants: {
        [InputVariant.Quiet]: {
            borderWidth: properties.quietBorderWidth,
            backgroundColor: mode.transparentColor,
            borderBlockEndWidth: properties.borderWidth
        },
        size: {
            [InputSize.Large]: {
                blockSize: properties.l.blockSize,
                fontSize: properties.l.fontSize,
                lineHeight: properties.l.lineHeight
            },
            [InputSize.Medium]: {
                blockSize: properties.m.blockSize,
                fontSize: properties.m.fontSize,
                lineHeight: properties.m.lineHeight
            },
            [InputSize.Small]: {
                blockSize: properties.s.blockSize,
                fontSize: properties.s.fontSize,
                lineHeight: properties.s.lineHeight
            }
        }
    }
}, {
    className: prefix
});
export const input = inputBase.fork({
    [`&:hover.${inputBase.isReadOnly.$} , &:focus.${inputBase.isReadOnly.$}`]: {
        borderColor: mode.borderColor
    },
    [`&:disabled,&.${inputBase.isDisabled.$}`]: {
        cursor: 'default',
        color: `${mode.colorDisabled} !important`,
        borderColor: `${mode.borderColorDisabled} !important`,
        '&::placeholder': {
            color: `${mode.colorDisabled} !important`
        }
    },
    [`&:invalid,&.${inputBase.isInvalid.$}`]: {
        borderColor: mode.colorInvalid
    },
    variants: {
        [InputVariant.Outline]: {
            borderWidth: properties.borderWidth,
            backgroundColor: mode.bgColorOutline,
            [`&:disabled,&.${inputBase.isDisabled.$}`]: {
                backgroundColor: mode.bgColorOutlineDisabled
            },
            [`&.${inputBase.size[InputSize.Large].$}`]: {
                paddingInline: properties.l.paddingOutlineInline
            },
            [`&.${inputBase.size[InputSize.Medium].$}`]: {
                paddingInline: properties.m.paddingOutlineInline
            },
            [`&.${inputBase.size[InputSize.Small].$}`]: {
                paddingInline: properties.s.paddingOutlineInline
            }
        }
    }
});
