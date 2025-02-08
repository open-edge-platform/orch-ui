import { component } from '../../setup';
import { mode } from './modes';
import { monochrome } from './monochrome';
import { prefix, properties } from './properties';
import { ButtonSize, ButtonVariant } from './types';
const UnstyledVariantsFilter = (value) => value === ButtonVariant.Unstyled || value === ButtonVariant.UnstyledAlert;
export const buttonBase = component({
    maxInlineSize: properties.maxInlineSize,
    cursor: 'pointer',
    borderWidth: properties.borderWidth,
    borderStyle: 'solid',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    inlineSize: 'max-content',
    fontWeight: properties.fontWeight,
    fontFamily: properties.fontFamily,
    startSlot: {
        fontSize: properties.startSlot.fontSize,
        flexShrink: properties.startSlot.flexShrink,
        display: 'flex',
        justifyContent: 'center'
    },
    endSlot: {
        fontSize: properties.endSlot.fontSize,
        flexShrink: properties.endSlot.flexShrink,
        display: 'flex',
        justifyContent: 'center'
    },
    disabled: {
        pointerEvents: 'none'
    },
    iconOnly: {},
    content: {
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    active: {},
    hovered: {},
    monochrome: {},
    size: {
        [ButtonSize.Large]: {},
        [ButtonSize.Medium]: {},
        [ButtonSize.Small]: {}
    },
    [ButtonVariant.Action]: {},
    [ButtonVariant.Primary]: {},
    [ButtonVariant.Secondary]: {},
    [ButtonVariant.Ghost]: {},
    [ButtonVariant.Alert]: {},
    [ButtonVariant.AlertGhost]: {},
    [ButtonVariant.Unstyled]: {},
    [ButtonVariant.UnstyledAlert]: {}
}, {
    className: prefix
});
export const button = buttonBase.fork({
    variants: Object.values(ButtonVariant)
        .filter((value) => value !== ButtonVariant.Unstyled && value !== ButtonVariant.UnstyledAlert)
        .reduce((acc, variant) => ({
        ...acc,
        [`&.${buttonBase[variant].$}`]: {
            color: mode[variant].color,
            backgroundColor: mode[variant].bgColor,
            borderColor: mode[variant].borderColor,
            [`&:hover,&.${buttonBase.hovered.$}`]: {
                backgroundColor: mode[variant].bgColorHover
            },
            [`&:visited`]: {
                color: mode[variant].color
            },
            [`&:active,&.${buttonBase.active.$}`]: {
                backgroundColor: mode[variant].bgColorActive
            },
            [`&:disabled,&.${buttonBase.disabled.$}`]: {
                color: mode.disabled.color,
                backgroundColor: mode.disabled.bgColor,
                borderColor: mode.disabled.borderColor,
                cursor: 'default'
            },
            [`& .${buttonBase.content.$} a`]: {
                color: mode[variant].color,
                textDecoration: 'none'
            },
            [`&:disabled a,&.${buttonBase.disabled.$} .${buttonBase.content.$} a`]: {
                color: mode.disabled.color,
                cursor: 'default',
                backgroundColor: mode.transparent,
                borderColor: mode.transparent
            }
        },
        [`&.${buttonBase[variant].$}.${buttonBase.monochrome.$}`]: {
            color: monochrome[variant].color,
            backgroundColor: monochrome[variant].bgColor,
            borderColor: monochrome[variant].borderColor,
            [`&:hover,&.${buttonBase.hovered.$}`]: {
                backgroundColor: monochrome[variant].bgColorHover
            },
            [`&:visited`]: {
                color: monochrome[variant].color
            },
            [`&:active,&.${buttonBase.active.$}`]: {
                backgroundColor: monochrome[variant].bgColorActive
            },
            [`&:disabled,&.${buttonBase.disabled.$}`]: {
                color: monochrome.disabled.color,
                backgroundColor: monochrome.disabled.bgColor,
                borderColor: monochrome.disabled.borderColor
            },
            [`& .${buttonBase.content.$} a`]: {
                color: monochrome[variant].color
            },
            [`&:disabled a,&.${buttonBase.disabled.$} .${buttonBase.content.$} a`]: {
                color: monochrome.disabled.color,
                backgroundColor: monochrome.transparent,
                borderColor: monochrome.transparent
            }
        }
    }), {}),
    ...Object.values(ButtonVariant)
        .filter(UnstyledVariantsFilter)
        .reduce((acc, variant) => ({
        ...acc,
        [`&.${buttonBase[variant].$}`]: {
            color: mode[variant].color,
            backgroundColor: mode.transparent,
            borderBlockStart: 'none',
            borderInline: 'none',
            borderBlockEnd: `${properties.borderWidth} solid ${mode[variant].color}`,
            fontWeight: 'normal',
            textDecoration: 'none',
            '& a': {
                color: 'inherit',
                borderColor: 'inherit',
                textDecoration: 'none'
            },
            [`&.${buttonBase.iconOnly.$}`]: {
                borderBlockEnd: 'none'
            },
            [`&:hover,&.${buttonBase.hovered.$}`]: {
                color: mode[variant].bgColorHover,
                borderBlockEndColor: mode[variant].bgColorHover,
                backgroundColor: mode.transparent,
                '& a': {
                    color: 'inherit',
                    borderColor: 'inherit'
                }
            },
            [`&:active,&.${buttonBase.active.$}`]: {
                color: mode[variant].bgColorActive,
                borderBlockEndColor: mode[variant].bgColorActive,
                backgroundColor: mode.transparent,
                '& a': {
                    color: 'inherit',
                    borderColor: 'inherit'
                }
            },
            [`&:disabled, &.${buttonBase.disabled.$}`]: {
                borderBlockEndColor: mode.disabled.color,
                color: mode.disabled.color,
                cursor: 'default',
                '& a': {
                    color: 'inherit',
                    borderColor: 'inherit'
                }
            }
        },
        [`&.${buttonBase[variant].$}.${buttonBase.monochrome.$}`]: {
            color: monochrome[variant].color,
            backgroundColor: monochrome.transparent,
            borderBlockEnd: `${properties.borderWidth} solid ${monochrome[variant].color}`,
            [`&:hover,&.${buttonBase.hovered.$}`]: {
                color: monochrome[variant].bgColorHover,
                borderBlockEndColor: monochrome[variant].bgColorHover,
                backgroundColor: monochrome.transparent
            },
            [`&:active,&.${buttonBase.active.$}`]: {
                color: monochrome[variant].bgColorActive,
                borderBlockEndColor: monochrome[variant].bgColorActive,
                backgroundColor: monochrome.transparent
            },
            [`&:disabled, &.${buttonBase.disabled.$}`]: {
                borderBlockEndColor: monochrome.disabled.color,
                color: monochrome.disabled.color
            }
        }
    }), {}),
    ['&']: Object.values(ButtonSize).reduce((acc, size) => ({
        ...acc,
        [`&.${buttonBase.size[size].$}`]: {
            blockSize: properties[size].blockSize,
            fontSize: properties[size].fontSize,
            lineHeight: properties[size].lineHeight,
            paddingBlockStart: properties[size].paddingBlock,
            paddingBlockEnd: properties[size].paddingBlock,
            paddingInlineStart: properties[size].paddingInline,
            paddingInlineEnd: properties[size].paddingInline,
            minInlineSize: properties[size].blockSize,
            [`&.${buttonBase.iconOnly.$}`]: {
                minInlineSize: properties[size].blockSize,
                maxInlineSize: properties[size].blockSize,
                paddingInlineStart: properties.iconOnly[size].paddingInline,
                paddingInlineEnd: properties.iconOnly[size].paddingInline,
                fontSize: properties.iconOnly[size].fontSize
            },
            [`&:not(.${buttonBase.iconOnly.$})`]: {
                [`& .${buttonBase.startSlot.$}`]: {
                    paddingInlineEnd: properties[size].iconGap
                },
                [`& .${buttonBase.endSlot.$}`]: {
                    paddingInlineStart: properties[size].iconGap,
                    paddingInlineEnd: properties[size].iconGap
                }
            },
            ...Object.values(ButtonVariant)
                .filter(UnstyledVariantsFilter)
                .reduce((acc, variant) => ({
                ...acc,
                [`&.${buttonBase[variant].$}:not(.${buttonBase.iconOnly.$})`]: {
                    blockSize: 'inherit',
                    padding: 'inherit',
                    minInlineSize: 'inherit'
                }
            }), {})
        }
    }), {})
});
