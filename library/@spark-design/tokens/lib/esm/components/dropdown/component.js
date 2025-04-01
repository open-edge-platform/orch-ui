import { component } from '../../setup';
import { button } from '../button';
import { list } from '../list/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { DropdownSize, DropdownVariant } from './types';
const dropdownBase = component({
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'inherit',
    inlineSize: '100%',
    isDisabled: {},
    button: {},
    buttonLabel: {},
    buttonIsDisabled: {},
    buttonError: {},
    buttonIsFocused: {},
    buttonLabelIsSelected: {},
    listBox: {},
    listBoxScroll: {},
    arrowIcon: {},
    supplementaryIcon: {},
    [DropdownVariant.Ghost]: {},
    [DropdownVariant.Primary]: {},
    [DropdownSize.Small]: {},
    [DropdownSize.Medium]: {},
    [DropdownSize.Large]: {}
}, {
    className: prefix
});
const disabledState = {
    color: mode.text.disabledColor,
    cursor: 'default',
    [`& .${dropdownBase.button.$}`]: {
        backgroundColor: mode.button.disabledColor,
        border: 'none'
    },
    [`& .${dropdownBase.buttonLabel.$}`]: {
        color: mode.button.disabledColor
    },
    [`& .${dropdownBase.arrowIcon.$}`]: {
        color: mode.button.disabledColor
    }
};
export const dropdown = dropdownBase.fork({
    [`&.${dropdownBase.isDisabled.$}`]: {
        pointerEvents: 'none'
    },
    [`& .${dropdownBase.button.$}.${button.$}`]: {
        display: 'flex',
        padding: properties.button.padding,
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: mode.text.color,
        backgroundColor: 'inherit',
        borderWidth: properties.button.borderWidth,
        borderColor: mode.border.color,
        borderStyle: 'solid',
        borderRadius: properties.button.borderRadius,
        cursor: 'pointer',
        fontWeight: 'normal',
        blockSize: 'inherit',
        fontSize: properties.button.iconFontSize,
        maxInlineSize: 'inherit',
        inlineSize: '100%',
        zIndex: '1',
        [`&:hover, &.${button.hovered.$}`]: {
            borderColor: mode.border.hoverColor,
            backgroundColor: 'inherit'
        },
        [`&:active, &.${button.active.$}`]: {
            backgroundColor: 'inherit'
        },
        '&.invalid': {
            borderColor: mode.border.invalidColor
        },
        [`&:disabled, &.${dropdownBase.buttonIsDisabled.$}`]: {
            color: `${mode.button.disabledTextColor} !important`,
            backgroundColor: mode.backgroundDisabled,
            cursor: 'auto !important',
            borderColor: mode.button.disabledBackground,
            [`& .${dropdownBase.buttonLabel.$}, & .${dropdownBase.arrowIcon.$}`]: {
                color: mode.button.disabledTextColor
            }
        },
        [`& .${button.content.$}`]: {
            justifyContent: 'space-between',
            inlineSize: '100%'
        }
    },
    [`& .${dropdownBase.buttonError.$}.${button.$}`]: {
        borderColor: mode.border.invalidColor,
        borderWidth: properties.button.errorBorderWidth,
        '&:hover': {
            borderColor: `${mode.border.invalidHover} !important`
        }
    },
    [`& .${dropdownBase.buttonIsFocused.$}`]: {
        outline: `${properties.button.openedFocusOutlineWidth}
        solid ${mode.button.focusOutlineColor} !important`
    },
    [`& .${dropdownBase.buttonLabel.$}`]: {
        display: 'flex',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        fontStyle: properties.textPlaceholderStyle,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        width: 'auto !important',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: mode.text.placeholderColor,
        [`& .${dropdownBase.supplementaryIcon.$}`]: {
            display: 'flex',
            alignItems: 'center',
            paddingInlineEnd: properties.supplementaryIconPaddingInlineEnd
        }
    },
    [`& .${dropdownBase.buttonLabelIsSelected.$}`]: {
        color: mode.text.selectedColor,
        fontStyle: 'normal'
    },
    [`& .${dropdownBase.arrowIcon.$}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listBoxScroll: {
        maxBlockSize: `${properties.listBox.scroll.height} !important`,
        whiteSpace: 'normal',
        padding: `${properties.listBox.scroll.padding} !important`
    },
    listBox: Object.values(DropdownSize).reduce((acc, size) => ({
        ...acc,
        padding: properties.listBox.padding,
        margin: properties.listBox.margin,
        listStyle: 'none',
        outline: properties.listBox.outline,
        [`&.${list.$}.spark-list-size-${size} .${list.item.$}`]: {
            paddingInline: properties[size]?.listBoxItemPaddingInlineStart
        },
        [`&.${list.$}.spark-list-size-${size}.${dropdownBase.supplementaryIcon.$}.${dropdownBase.primary.$} .${list.item.$}`]: {
            paddingInlineStart: properties[size]?.supplementaryIconPrimaryPaddingInlineStart
        },
        [`&.${list.$}.spark-list-size-${size}.${dropdownBase.supplementaryIcon.$}.${dropdownBase.ghost.$} .${list.item.$}`]: {
            paddingInlineStart: properties[size]?.supplementaryIconGhostPaddingInlineStart
        }
    }), {}),
    variants: {
        [DropdownVariant.Primary]: {
            color: mode.text.color,
            [`&:disabled, &.${dropdownBase.isDisabled.$}`]: {
                color: `${mode.text.disabledColor} !important`,
                cursor: 'default !important',
                [`& .${dropdownBase.button.$}`]: disabledState
            }
        },
        [DropdownVariant.Ghost]: {
            color: mode.text.color,
            [`& .${dropdownBase.button.$}`]: {
                border: `${properties.ghost.variantBorder} !important`,
                borderBottom: `${properties.ghost.variantBorderBottom} solid 
                ${mode.ghost.borderBottomColor} !important`
            },
            [`& .${dropdownBase.buttonLabel.$}`]: {
                paddingInlineStart: `${properties.ghost.paddingInlineStart} !important`
            },
            [`& .${dropdownBase.arrowIcon.$}`]: {
                marginInlineEnd: `${properties.ghost.arrowMarginInlineEnd} !important`
            },
            [`& .${dropdownBase.buttonError.$}`]: {
                borderBottom: `${properties.ghost.variantBorderBottom} solid ${mode.border.invalidColor} !important`
            },
            [`&:disabled, &.${dropdownBase.isDisabled.$}`]: disabledState,
            [`& .${dropdownBase.buttonIsDisabled.$}`]: {
                backgroundColor: `${mode.button.disabledBackground} !important`,
                border: `${properties.ghost.variantBorder} !important`,
                borderBottom: `${properties.ghost.variantBorderBottom} 
                            solid ${mode.button.disabledColor} !important`
            }
        }
    },
    size: Object.values(DropdownSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`& .${dropdownBase.buttonLabel.$}`]: {
                fontSize: properties[size]?.fontSize,
                paddingInlineStart: properties[size]?.labelPaddingLeft,
                paddingBlock: properties[size]?.labelPaddingBlock,
                lineHeight: properties[size]?.lineHeight
            },
            [`& .${dropdownBase.arrowIcon.$}`]: {
                marginInlineStart: properties[size]?.iconPaddingStart,
                marginInlineEnd: properties[size]?.iconPaddingEnd
            }
        }
    }), {})
});
