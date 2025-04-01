import { token } from '../../setup';
import { DropdownSize, DropdownVariant } from './types';
export const prefix = 'spark-dropdown';
export const properties = token({
    textPlaceholderStyle: 'normal',
    supplementaryIconPaddingInlineEnd: '8px',
    listBox: {
        padding: 0,
        margin: 0,
        outline: '0px',
        scroll: {
            height: '192px',
            padding: '0px'
        }
    },
    button: {
        padding: 0,
        borderWidth: '1px',
        borderRadius: 0,
        errorBorderWidth: '1px',
        openedFocusOutlineWidth: '3px',
        iconFontSize: '14px'
    },
    [DropdownVariant.Ghost]: {
        variantBorder: 0,
        variantBorderBottom: '2px',
        paddingInlineStart: '0px',
        arrowMarginInlineEnd: '0px'
    },
    [DropdownSize.Large]: {
        labelPaddingLeft: '16px',
        labelPaddingBlock: '9px',
        iconPaddingStart: '8px',
        iconPaddingEnd: '16px',
        fontSize: '16px',
        lineHeight: '20px',
        listBoxItemPaddingInlineStart: '16px',
        supplementaryIconPrimaryPaddingInlineStart: '40px',
        supplementaryIconGhostPaddingInlineStart: '24px'
    },
    [DropdownSize.Medium]: {
        labelPaddingLeft: '12px',
        labelPaddingBlock: '7px',
        iconPaddingStart: '4px',
        iconPaddingEnd: '12px',
        fontSize: '14px',
        lineHeight: '16px',
        listBoxItemPaddingInlineStart: '12px',
        supplementaryIconPrimaryPaddingInlineStart: '36px',
        supplementaryIconGhostPaddingInlineStart: '22px'
    },
    [DropdownSize.Small]: {
        labelPaddingLeft: '8px',
        labelPaddingBlock: '4px',
        iconPaddingStart: '4px',
        iconPaddingEnd: '8px',
        fontSize: '12px',
        lineHeight: '14px',
        listBoxItemPaddingInlineStart: '8px',
        supplementaryIconPrimaryPaddingInlineStart: '28px',
        supplementaryIconGhostPaddingInlineStart: '20px'
    }
}, {
    prefix: prefix
});
