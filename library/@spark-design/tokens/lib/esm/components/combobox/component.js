import { component } from '../../setup';
import { list } from '../list/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ComboboxSize, ComboboxVariant } from './types';
export const comboboxBase = component({
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'inherit',
    inlineSize: '100%',
    isDisabled: {},
    arrowButton: {},
    arrowIcon: {},
    button: {},
    buttonError: {},
    buttonIsDisabled: {},
    buttonIsFocused: {},
    buttonLabel: {},
    buttonLabelIsSelected: {},
    listBox: {},
    listBoxScroll: {},
    [ComboboxVariant.Ghost]: {},
    [ComboboxVariant.Primary]: {},
    [ComboboxSize.Small]: {},
    [ComboboxSize.Medium]: {},
    [ComboboxSize.Large]: {}
}, {
    className: prefix
});
const disabledState = {
    color: mode.text.disabledColor,
    cursor: 'default',
    [`& .${comboboxBase.button.$}`]: {
        backgroundColor: mode.button.disabledColor,
        border: 'none',
        [`& .${comboboxBase.arrowIcon.$}`]: {
            color: mode.button.disabledColor
        }
    },
    [`& input:disabled`]: {
        [`&::-webkit-input-placeholder`]: {
            color: mode.button.disabledColor
        },
        [`&::-moz-placeholder`]: {
            color: mode.button.disabledColor
        },
        [`&:-moz-placeholder`]: {
            color: mode.button.disabledColor
        },
        [`&:-ms-input-placeholder`]: {
            color: mode.button.disabledColor
        }
    }
};
export const combobox = comboboxBase.fork({
    [`& .${comboboxBase.button.$}`]: {
        display: 'flex',
        inlineSize: '100%',
        padding: properties.button.padding,
        alignItems: 'center',
        color: mode.text.color,
        backgroundColor: mode.background,
        borderWidth: properties.button.borderWidth,
        borderColor: mode.border.color,
        borderStyle: 'solid',
        borderRadius: properties.button.borderRadius,
        cursor: 'pointer',
        maxInlineSize: 'inherit',
        justifyContent: 'space-between',
        [`& .${comboboxBase.buttonLabel.$}::placeholder`]: {
            color: `${mode.text.color} !important`
        },
        '&:hover': {
            borderColor: mode.border.hoverColor
        },
        '&:active': {
            backgroundColor: mode.backgroundActive
        },
        '&.invalid': {
            borderColor: mode.border.invalidColor
        },
        [`&.${comboboxBase.buttonIsDisabled.$}`]: {
            color: `${mode.button.disabledTextColor} !important`,
            backgroundColor: `${mode.backgroundDisabled}`,
            cursor: 'default !important',
            borderColor: mode.background,
            [`& .${comboboxBase.arrowButton.$}, & .${comboboxBase.buttonLabel.$}::placeholder`]: {
                color: `${mode.button.disabledTextColor} !important`
            },
            [`& .${comboboxBase.arrowButton.$}`]: {
                cursor: 'default !important'
            }
        }
    },
    [`& .${comboboxBase.buttonError.$}`]: {
        borderColor: mode.border.invalidColor,
        borderWidth: properties.button.errorBorderWidth,
        '&:hover': {
            borderColor: `${mode.border.invalidHover} !important`
        }
    },
    [`& .${comboboxBase.buttonIsFocused.$}`]: {
        outline: `${properties.button.openedFocusOutlineWidth}
        solid ${mode.button.focusOutlineColor} !important`
    },
    [`& .${comboboxBase.buttonLabel.$}`]: {
        fontFamily: 'inherit',
        boxSizing: 'border-box',
        fontStyle: properties.textPlaceholderStyle,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        inlineSize: '100% !important',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: mode.text.placeholderColor
    },
    [`& .${comboboxBase.buttonLabelIsSelected.$}`]: {
        color: mode.text.selectedColor,
        fontStyle: 'normal'
    },
    [`& .${comboboxBase.arrowButton.$}`]: {
        padding: properties.arrowButtonPadding,
        border: 'none',
        backgroundColor: mode.background,
        cursor: 'pointer',
        color: mode.text.color
    },
    [`& .${comboboxBase.arrowIcon.$}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listBoxScroll: {
        maxBlockSize: `${properties.listBox.scroll.height} !important`,
        whiteSpace: 'normal',
        padding: `${properties.listBox.scroll.padding} !important`
    },
    listBox: Object.values(ComboboxSize).reduce((acc, size) => ({
        ...acc,
        padding: properties.listBox.padding,
        margin: properties.listBox.margin,
        listStyle: 'none',
        outline: properties.listBox.outline,
        [`&.${list.$}.spark-list-size-${size} .${list.item.$}`]: {
            paddingInline: properties[size]?.listBoxItemPaddingInlineStart
        }
    }), {}),
    variants: {
        [ComboboxVariant.Primary]: {
            color: mode.text.color,
            [`&:disabled, &.${comboboxBase.isDisabled.$}`]: {
                color: mode.text.disabledColor,
                cursor: 'default',
                [`& .${comboboxBase.button.$}`]: disabledState
            }
        },
        [ComboboxVariant.Ghost]: {
            color: mode.text.color,
            [`& .${comboboxBase.button.$}`]: {
                border: `${properties.ghost.variantBorder} !important`,
                borderBottom: `${properties.ghost.variantBorderBottom} solid 
                ${mode.ghost.borderBottomColor} !important`
            },
            [`& .${comboboxBase.buttonLabel.$}`]: {
                paddingInlineStart: `${properties.ghost.paddingInlineStart} !important`
            },
            [`& .${comboboxBase.arrowIcon.$}`]: {
                marginInlineEnd: `${properties.ghost.arrowMarginInlineEnd} !important`
            },
            [`& .${comboboxBase.buttonError.$}`]: {
                borderBottom: `${properties.ghost.variantBorderBottom} solid ${mode.border.invalidColor} !important`
            },
            [`&:disabled, &.${comboboxBase.isDisabled.$}`]: disabledState,
            [`& .${comboboxBase.buttonIsDisabled.$}`]: {
                backgroundColor: `${mode.button.disabledBackground} !important`,
                border: `${properties.ghost.variantBorder} !important`,
                borderBottom: `${properties.ghost.variantBorderBottom} 
                            solid ${mode.button.disabledColor} !important`
            }
        }
    },
    size: Object.values(ComboboxSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`& .${comboboxBase.buttonLabel.$}`]: {
                fontSize: properties[size]?.fontSize,
                paddingInlineStart: properties[size]?.labelPaddingLeft,
                paddingBlock: properties[size]?.labelPaddingBlock,
                minBlockSize: `calc(
                        ${properties[size]?.lineHeight} + 2 * ${properties[size]?.labelPaddingBlock}
                    )`,
                lineHeight: properties[size]?.lineHeight
            },
            [`& .${comboboxBase.arrowIcon.$}`]: {
                marginInlineStart: properties[size]?.iconPaddingStart,
                marginInlineEnd: properties[size]?.iconPaddingEnd
            }
        }
    }), {})
});
