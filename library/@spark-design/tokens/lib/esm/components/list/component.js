import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ListSize } from './types';
const listBase = component({
    fontFamily: properties.fontFamily,
    margin: properties.margin,
    padding: properties.padding,
    listStyle: 'none',
    item: {},
    itemText: {},
    itemIcon: {},
    isSelected: {},
    isDisabled: {},
    isFocused: {},
    isDivided: {}
}, {
    className: prefix
});
export const list = listBase.fork({
    [`& .${listBase.itemText.$}`]: {
        display: 'flex',
        gap: properties.itemGap,
        justifyContent: 'center',
        alignItems: 'center'
    },
    [`&:focus-visible, &:focus`]: {
        outline: 'none'
    },
    [`& .${listBase.item.$}`]: {
        fontFamily: properties.fontFamily,
        cursor: 'pointer',
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: mode.color,
        borderWidth: properties.borderWidth,
        whiteSpace: 'nowrap',
        paddingInlineStart: properties.inlineGap,
        paddingInlineEnd: properties.inlineGap,
        '&:hover': {
            backgroundColor: mode.background.hover
        },
        [`&.${listBase.isDivided.$}`]: {
            borderBlockEnd: `${properties.borderBlockEndWidth} solid ${mode.dividerColor}`
        },
        [`&.${listBase.isDisabled.$}`]: {
            cursor: 'default',
            color: mode.colorDisabled,
            backgroundColor: 'transparent'
        },
        [`&.${listBase.isFocused.$}, &:focus`]: {
            backgroundColor: `${mode.item.focusedBG} !important`,
            color: `${mode.item.colorFocused} !important`
        },
        [`&:focus-visible, &:focus`]: {
            outline: 'none'
        }
    },
    zebra: {
        [`& .${listBase.item.$}:nth-child(2n)`]: {
            backgroundColor: mode.background.zebraColor,
            '&:hover': {
                backgroundColor: mode.background.hover
            }
        }
    },
    divide: {
        [`& .${listBase.item.$}`]: {
            borderBlockEndWidth: `${properties.borderBlockEndWidth} !important`,
            borderBlockEndColor: mode.dividerColor
        }
    },
    size: Object.keys(ListSize).reduce((acc, key) => ({
        ...acc,
        [ListSize[key]]: {
            [`& .${listBase.item.$}`]: {
                minBlockSize: properties.size[ListSize[key]].minBlockSize,
                fontSize: properties.size[ListSize[key]].fontSize,
                lineHeight: properties.size[ListSize[key]].lineHeight,
                gap: properties.size[ListSize[key]].gap
            }
        }
    }), {})
});
