import { token } from '../../setup';
import { ComboboxSize, ComboboxVariant } from './types';
export const prefix = 'spark-combobox';
export const properties = token({
    textPlaceholderStyle: 'normal',
    arrowButtonPadding: '0px',
    listBox: {
        padding: 0,
        margin: 0,
        outline: '0px',
        scroll: {
            height: '192px',
            padding: '0px'
        },
        item: {
            paddingInlineStart: '12px'
        }
    },
    button: {
        padding: 0,
        borderWidth: '1px',
        borderRadius: 0,
        errorBorderWidth: '1px',
        openedFocusOutlineWidth: '3px'
    },
    [ComboboxVariant.Ghost]: {
        variantBorder: 0,
        variantBorderBottom: '2px',
        paddingInlineStart: '0px',
        arrowMarginInlineEnd: '0px'
    },
    [ComboboxSize.Large]: {
        labelPaddingLeft: '16px',
        labelPaddingBlock: '9px',
        iconPaddingStart: '8px',
        iconPaddingEnd: '16px',
        fontSize: '16px',
        lineHeight: '20px',
        listBoxItemPaddingInlineStart: '16px'
    },
    [ComboboxSize.Medium]: {
        labelPaddingLeft: '12px',
        labelPaddingBlock: '7px',
        iconPaddingStart: '4px',
        iconPaddingEnd: '12px',
        fontSize: '14px',
        lineHeight: '16px',
        listBoxItemPaddingInlineStart: '12px'
    },
    [ComboboxSize.Small]: {
        labelPaddingLeft: '8px',
        labelPaddingBlock: '4px',
        iconPaddingStart: '4px',
        iconPaddingEnd: '8px',
        fontSize: '12px',
        lineHeight: '14px',
        listBoxItemPaddingInlineStart: '8px'
    }
}, {
    prefix: prefix
});
