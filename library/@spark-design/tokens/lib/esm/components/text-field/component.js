import { component } from '../../setup';
import { buttonBase } from '../button/component';
import { input, InputSize, InputVariant } from '../input';
import { mode } from './modes';
import { prefix, properties } from './properties';
const textFieldBase = component({
    '& [class^="spark-icon"] + [class^="spark-icon"]': {
        marginInlineStart: properties.marginInlineStart
    },
    variants: {
        message: {
            display: 'block',
            color: mode.color,
            lineHeight: properties.lineHeight
        },
        size: {
            [InputSize.Large]: {
                [`&.spark-text-field-quiet`]: {
                    marginInline: properties.variants.quiet.marginInline,
                    [`& .spark-text-field-interior-button-presence > .spark-icon`]: {
                        marginInlineEnd: properties.interiorButton.size.l.marginInlineEnd
                    }
                },
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: properties.statusIcon.l.marginBlockSize,
                    marginInline: properties.statusIcon.l.marginInlineSize
                },
                [`&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^="spark-icon"]`]: {
                    marginBlock: properties.startIconLargeMarginBlockSize,
                    marginInline: properties.startIconLargeMarginInlineSize
                }
            },
            [InputSize.Medium]: {
                [`&.spark-text-field-quiet`]: {
                    marginInline: properties.variants.quiet.marginInline,
                    [`& .spark-text-field-interior-button-presence > .spark-icon`]: {
                        marginInlineEnd: properties.interiorButton.size.m.marginInlineEnd
                    }
                },
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: properties.statusIcon.m.marginBlockSize,
                    marginInline: properties.statusIcon.m.marginInlineSize
                },
                [`&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^="spark-icon"]`]: {
                    marginBlock: properties.startIconMediumMarginBlockSize,
                    marginInline: properties.startIconMediumMarginInlineSize
                }
            },
            [InputSize.Small]: {
                [`&.spark-text-field-quiet`]: {
                    marginInline: properties.variants.quiet.marginInline,
                    [`& .spark-text-field-interior-button-presence > .spark-icon`]: {
                        marginInlineEnd: properties.interiorButton.size.s.marginInlineEnd
                    }
                },
                '&:not(.spark-text-field-quiet) [class^="spark-icon"]': {
                    marginBlock: properties.statusIcon.s.marginBlockSize,
                    marginInline: properties.statusIcon.s.marginInlineSize
                },
                [`&:not(.spark-text-field-quiet) .spark-text-field-start-slot [class^="spark-icon"]`]: {
                    marginBlock: properties.startIconSmallMarginBlockSize,
                    marginInline: properties.startIconSmallMarginInlineSize
                }
            }
        }
    },
    label: {},
    errorMessage: {},
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: properties.labelSpaceGap
    },
    startSlot: {},
    endSlot: {},
    isDisabled: {},
    interiorButton: {},
    interiorButtonPresence: {},
    size: {
        [InputSize.Large]: {},
        [InputSize.Medium]: {},
        [InputSize.Small]: {}
    },
    focusBorder: {
        outline: `${properties.focus.outlineWidth}
            solid ${mode.focus.outlineColor} !important`
    }
}, {
    className: prefix
});
const getSlots = (...sizeGroups) => sizeGroups.reduce((acc, [size, slotSize]) => ({
    ...acc,
    [`&.${textFieldBase.size[size].$}.${textFieldBase.startSlot.$}-1x`]: {
        [`& .${input.size[size].$}`]: {
            paddingInlineStart: slotSize
        },
        [`& .${textFieldBase.startSlot.$}`]: {
            inlineSize: slotSize
        }
    },
    [`&.${textFieldBase.size[size].$}.${textFieldBase.endSlot.$}-1x`]: {
        [`& .${input.size[size].$}`]: {
            paddingInlineEnd: slotSize
        },
        [`& .${textFieldBase.startSlot.$}`]: {
            inlineSize: slotSize
        }
    },
    [`&.${textFieldBase.size[size].$}.${textFieldBase.endSlot.$}-2x`]: {
        [`& .${input.size[size].$}`]: {
            paddingInlineEnd: `calc(${slotSize} + ${slotSize})`
        },
        [`& .${textFieldBase.startSlot.$}`]: {
            inlineSize: `calc(${slotSize} + ${slotSize})`
        }
    }
}), {});
export const textField = textFieldBase.fork({
    display: 'flex',
    color: mode.color,
    boxSizing: 'border-box',
    position: 'relative',
    [`& .${input.$}`]: {
        inlineSize: properties.inputInlineSize,
        textOverflow: 'ellipsis'
    },
    '& .is-valid .spark-icon.check': {
        color: mode.colorValid
    },
    '& .is-invalid .spark-icon.cross': {
        color: mode.colorInvalid
    },
    [`&.${textFieldBase.isDisabled.$}`]: {
        color: mode.colorDisabled,
        [`& + .${textFieldBase.message.$}`]: {
            color: mode.colorDisabled
        }
    },
    [`&.${textFieldBase.isDisabled.$} .${textFieldBase.startSlot.$} .spark-icon`]: {
        color: mode.colorDisabledIcon
    },
    [`& .${textFieldBase.startSlot.$},& .${textFieldBase.endSlot.$}`]: {
        position: 'absolute',
        insetBlockStart: properties.slotInsetBlockStart,
        insetBlockEnd: properties.slotInsetBlockEnd,
        display: 'flex',
        alignItems: 'center',
        '& button': {
            color: 'inherit',
            background: mode.transparent,
            outline: 'none !important',
            border: 'none',
            cursor: 'pointer',
            padding: properties.slotButtonPadding
        },
        '& .split': {
            blockSize: properties.splitBlockSize,
            borderInlineEnd: `${properties.borderInlineEnd} solid ${mode.splitColor}`
        }
    },
    [`& .${textFieldBase.startSlot.$}`]: {
        insetInlineStart: properties.insetInlineStart,
        justifyContent: 'flex-start',
        '& .spark-icon': {
            color: mode.coloStartIcon,
            transform: `translateY(calc( ${properties.iconStartSlotTranslateY} )) !important`
        }
    },
    [`& .${textFieldBase.endSlot.$}`]: {
        insetInlineEnd: properties.insetInlineEnd,
        justifyContent: 'flex-end',
        [`&.${textFieldBase.interiorButtonPresence.$} .spark-icon`]: {
            transform: `translate(${properties.iconEndSlotTranslateX}, ${properties.iconEndSlotTranslateY}) !important`
        }
    },
    variants: {
        [InputVariant.Quiet]: {
            ...getSlots([InputSize.Large, properties.variants.quiet.largeSlotSize], [InputSize.Medium, properties.variants.quiet.mediumSlotSize], [InputSize.Small, properties.variants.quiet.smallSlotSize])
        },
        [InputVariant.Outline]: {
            ...getSlots([InputSize.Large, properties.variants.outline.largeSlotSize], [InputSize.Medium, properties.variants.outline.mediumSlotSize], [InputSize.Small, properties.variants.outline.smallSlotSize])
        },
        size: Object.keys(InputSize).reduce((acc, key) => ({
            ...acc,
            [InputSize[key]]: {
                maxBlockSize: properties.interiorButton.size[InputSize[key]].inputBlockSize,
                [`& .${textFieldBase.interiorButton.$}.${buttonBase.$}.${buttonBase.iconOnly.$}`]: {
                    color: mode.interiorButton.color,
                    boxSizing: 'border-box',
                    minInlineSize: properties.interiorButton.size[InputSize[key]].inlineSize,
                    inlineSize: properties.interiorButton.size[InputSize[key]].inlineSize,
                    minBlockSize: properties.interiorButton.size[InputSize[key]].blockSize,
                    blockSize: properties.interiorButton.size[InputSize[key]].blockSize,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: `${properties.interiorButton.size[InputSize[key]].padding} !important`,
                    insetInlineEnd: properties.interiorButton.size[InputSize[key]].insetInlineEnd,
                    [`& .${buttonBase.content.$}`]: {
                        minInlineSize: properties.interiorButton.size[InputSize[key]].inlineSize,
                        inlineSize: properties.interiorButton.size[InputSize[key]].inlineSize,
                        minBlockSize: properties.interiorButton.size[InputSize[key]].blockSize,
                        blockSize: properties.interiorButton.size[InputSize[key]].blockSize
                    },
                    marginBlock: 'auto',
                    [`&:focus`]: {
                        backgroundColor: mode.interiorButton.focus.backroundColor,
                        color: mode.interiorButton.focus.color
                    },
                    [`&:focus-visible`]: {
                        outline: 'none',
                        boxShadow: 'none'
                    }
                }
            }
        }), {})
    },
    [`& .${textFieldBase.endSlot.$}.${textFieldBase.interiorButton.$}.${buttonBase.$}.${buttonBase.iconOnly.$}`]: {
        position: 'absolute !important'
    },
    [`&:hover:not(.spark-icon)`]: {
        color: mode.colorHover
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        gap: properties.labelInvalidSpaceGap,
        color: mode.colorInvalid,
        [`& .spark-icon`]: {
            color: mode.colorInvalid
        }
    }
});
