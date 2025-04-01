import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { CheckboxSize } from './types';
const checkboxBase = component({
    checked: {},
    unChecked: {},
    isDisabled: {},
    indeterminate: {},
    invalid: {},
    checkmarkContainer: {
        alignSelf: 'start'
    },
    labelContainer: {
        marginLeft: properties.marginLeft
    },
    errorMessage: {},
    noChildren: {
        blockSize: properties.noChildrenSize,
        inlineSize: `${properties.noChildrenContainerSize} !important`
    }
}, {
    className: prefix
});
export const checkbox = checkboxBase.fork({
    boxSizing: 'border-box',
    display: 'block !important',
    alignItems: 'center',
    position: 'relative',
    [`&.${checkboxBase.isDisabled.$}`]: {
        color: mode.colorDisabled
    },
    [`&.${checkboxBase.checked.$} .${checkboxBase.checkmarkContainer.$}`]: {
        backgroundColor: mode.colorOn,
        [`&:not(.${checkboxBase.invalid.$})`]: {
            backgroundColor: mode.colorOn,
            borderColor: mode.colorOn
        },
        [`&.${checkboxBase.invalid.$}`]: {
            backgroundColor: mode.colorInvalid,
            borderColor: mode.colorInvalid
        },
        [`&.${checkboxBase.isDisabled.$}`]: {
            backgroundColor: mode.colorDisabled,
            borderColor: mode.colorDisabled
        }
    },
    [`&.${checkboxBase.unChecked.$} .${checkboxBase.checkmarkContainer.$}`]: {
        backgroundColor: 'transparent',
        '&:hover': {
            borderColor: mode.uncheckedHoverBorderColor
        },
        [`&.${checkboxBase.invalid.$}, &.${checkboxBase.invalid.$}:hover`]: {
            borderColor: mode.colorInvalid
        },
        [`&.${checkboxBase.isDisabled.$}`]: {
            borderColor: mode.colorDisabled
        }
    },
    [`& .${checkboxBase.checkmarkContainer.$}`]: {
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        inlineSize: properties.checkmarkSize,
        blockSize: properties.checkmarkSize,
        borderRadius: properties.checkmarkBorderRadius,
        borderInline: `${properties.border} solid ${mode.uncheckedBorderColor}`,
        borderBlock: `${properties.border} solid ${mode.uncheckedBorderColor}`,
        [`& .${checkboxBase.checked.$},
        & .${checkboxBase.indeterminate.$}`]: {
            color: mode.iconColor,
            padding: properties.padding,
            inlineSize: 'auto',
            blockSize: properties.checkmarkSize
        },
        [`& .${checkboxBase.unChecked.$}`]: {
            color: mode.colorOn
        }
    },
    size: Object.values(CheckboxSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            fontSize: `${properties[size]?.fontSize} !important`,
            lineHeight: `${properties[size]?.lineHeight} !important`,
            paddingBlock: properties[size]?.padding,
            paddingInlineEnd: properties[size]?.padding,
            [`& .${checkboxBase.labelContainer.$}`]: {
                paddingInlineStart: properties[size]?.checkmarkGap,
                lineHeight: properties[size]?.lineHeight
            },
            [`& .${checkboxBase.errorMessage.$}`]: {
                display: 'flex',
                alignItems: 'center',
                gap: properties[size].errorMessageMarginLeft,
                color: mode.colorInvalid,
                paddingBlockStart: properties[size].paddingError,
                paddingInlineStart: properties[size].paddingInlineStart,
                [`& .spark-icon`]: {
                    color: mode.colorInvalid
                }
            },
            [`& .${checkboxBase.checkmarkContainer.$}`]: {
                insetBlockStart: properties[size].inputInsetBlockStart,
                insetInlineStart: 0
            }
        }
    }), {})
});
