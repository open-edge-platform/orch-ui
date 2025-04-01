import { token } from '../../setup';
import { InputSize, InputVariant } from '../input';
export const prefix = 'spark-text-field';
export const properties = token({
    inlineSize: '20px',
    blockSize: '100%',
    inputInlineSize: '100%',
    marginInlineStart: '0px',
    lineHeight: '14px',
    labelSpaceGap: '4px',
    labelInvalidSpaceGap: '8px',
    startIconLargeMarginInlineSize: '12px',
    startIconMediumMarginInlineSize: '8px',
    startIconSmallMarginInlineSize: '4px',
    startIconLargeMarginBlockSize: '10px',
    startIconMediumMarginBlockSize: '8px',
    startIconSmallMarginBlockSize: '5px',
    splitBlockSize: '1em',
    slotInsetBlockStart: '0px',
    slotInsetBlockEnd: '0px',
    slotButtonPadding: '0px',
    borderInlineEnd: '1px',
    insetInlineStart: '0px',
    insetInlineEnd: '0px',
    iconEndSlotTranslateX: '-24px',
    iconEndSlotTranslateY: '0px',
    iconStartSlotTranslateY: '0px',
    statusIcon: {
        [InputSize.Large]: {
            marginInlineSize: '20px',
            marginBlockSize: '10px'
        },
        [InputSize.Medium]: {
            marginInlineSize: '12px',
            marginBlockSize: '8px'
        },
        [InputSize.Small]: {
            marginInlineSize: '4px',
            marginBlockSize: '5px'
        }
    },
    variants: {
        [InputVariant.Quiet]: {
            largeSlotSize: '36px',
            mediumSlotSize: '32px',
            smallSlotSize: '24px',
            marginInline: '0px'
        },
        [InputVariant.Outline]: {
            largeSlotSize: '36px',
            mediumSlotSize: '32px',
            smallSlotSize: '24px'
        }
    },
    interiorButton: {
        size: {
            [InputSize.Large]: {
                inlineSize: '32px',
                blockSize: '32px',
                inputBlockSize: '40px',
                marginInlineEnd: '20px',
                padding: '0px',
                insetInlineEnd: '4px'
            },
            [InputSize.Medium]: {
                inlineSize: '24px',
                blockSize: '24px',
                inputBlockSize: '32px',
                marginInlineEnd: '12px',
                padding: '0px',
                insetInlineEnd: '4px'
            },
            [InputSize.Small]: {
                inlineSize: '20px',
                blockSize: '20px',
                inputBlockSize: '24px',
                marginInlineEnd: '0px',
                padding: '0px',
                insetInlineEnd: '2px'
            }
        }
    },
    container: {
        [InputSize.Large]: '40px',
        [InputSize.Medium]: '32px',
        [InputSize.Small]: '24px'
    },
    focus: {
        outlineWidth: '3px'
    }
}, {
    prefix: prefix
});
