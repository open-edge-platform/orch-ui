import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { TagRounding, TagSize, TagTheme, TagVariant } from './types';
const tagBase = component({
    display: 'inline-flex',
    flexDirection: 'row',
    blockSize: properties.blockSize,
    fontSize: properties.fontSize,
    lineHeight: properties.lineHeight,
    paddingInline: properties.padding,
    gap: properties.labelGap,
    alignItems: 'center',
    verticalAlign: 'middle',
    cursor: 'default',
    [`& .spark-icon`]: {
        color: mode.closeIconColor
    },
    buttonWrapper: {
        outline: properties.buttonWrapperOutline,
        background: 'transparent',
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        padding: properties.buttonWrapperPadding,
        margin: properties.buttonWrapperMargin
    },
    shadow: {},
    theme: {}
}, {
    className: prefix
});
export const tag = tagBase.fork({
    size: Object.values(TagSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`&.${tagBase.$}`]: {
                blockSize: properties.size[size]?.blockSize,
                fontSize: properties.size[size]?.fontSize,
                lineHeight: properties.size[size]?.lineHeight,
                padding: properties.size[size]?.padding,
                gap: properties.size[size]?.labelGap,
                [`& .spark-icon`]: {
                    fontSize: properties.size[size]?.icon.fontSize
                }
            }
        }
    }), {}),
    rounding: Object.values(TagRounding).reduce((acc, rounding) => ({
        ...acc,
        [rounding]: {
            borderRadius: properties.rounding[rounding]?.borderRadius
        }
    }), {}),
    [`&.is-disabled`]: {
        pointerEvents: 'none'
    },
    [`& .spark-icon`]: {
        cursor: 'pointer',
        lineHeight: properties.lineHeight,
        color: mode.textColor
    },
    [`&-${[TagVariant.Primary]}, &-${[TagVariant.Secondary]}, &-${[TagVariant.Ghost]}`]: {
        background: mode.backgroundColor,
        color: mode.textColor,
        [`& .spark-icon`]: {
            color: mode.textColor
        },
        [`&:hover`]: {
            background: mode.hover.color
        },
        [`&:active`]: {
            background: mode.active.color
        },
        [`&:focus-visible`]: {
            backgroundColor: mode.focus.backgroundColor,
            color: mode.theme.classic.hover,
            [`& .spark-icon`]: {
                color: mode.theme.classic.hover
            }
        }
    },
    [TagVariant.Action]: {
        background: mode.theme.classic.color,
        color: mode.variant.action.textColor,
        [`&.${tagBase.$} .spark-icon`]: {
            color: mode.variant.action.textColor
        },
        [`&:hover`]: {
            background: mode.theme.classic.hover
        },
        [`&:active`]: {
            background: mode.theme.classic.active
        },
        [`&:focus-visible`]: {
            background: mode.theme.classic.hover
        }
    },
    [TagVariant.Primary]: {
        border: `${properties.border} solid ${mode.variant.primary.borderColor}`
    },
    [TagVariant.Secondary]: Object.values(TagTheme).reduce((acc, theme) => ({
        ...acc,
        border: `${properties.border} solid ${mode.variant.secondary.borderColor}`,
        [`&.${tagBase.theme.$}-${[theme]}.${tagBase.shadow.$}`]: {
            boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowYOne}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusOne}
                    ${mode.variant.secondary.borderColor},
                    ${properties.boxShadowX} ${properties.boxShadowYTwo}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusTwo}
                    ${mode.theme[theme]?.color} !important`,
            borderRadius: properties.borderRadius
        },
        [`&.${tagBase.shadow.$}:focus-visible`]: {
            background: mode.focus.backgroundColor,
            color: mode.focus.borderColor
        },
        [`&.${tagBase.shadow.$}.is-disabled`]: {
            boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowYOne}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusOne}
                    ${mode.disabled.backgroundColor} !important`
        },
        [`&.${tagBase.$}-${[theme]} .spark-icon,
            &.${tagBase.$}-${[theme]}:focus-visible .spark-icon`]: {
            color: mode.theme[theme]?.color
        }
    }), {}),
    [TagVariant.Ghost]: Object.values(TagTheme).reduce((acc, theme) => ({
        ...acc,
        [`&.${tagBase.$}.${tagBase.shadow.$}`]: {
            boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowYOne}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusOne}
                    transparent,
                    ${properties.boxShadowX} ${properties.boxShadowYTwo}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusTwo}
                    ${mode.textColor} !important`,
            borderRadius: properties.borderRadius
        },
        [`&.${tagBase.theme.$}-${[theme]}.${tagBase.shadow.$}`]: {
            boxShadow: `inset ${properties.boxShadowX} ${properties.boxShadowYOne}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusOne}
                    transparent,
                    ${properties.boxShadowX} ${properties.boxShadowYTwo}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadiusTwo}
                    ${mode.theme[theme]?.color} !important`,
            borderRadius: properties.borderRadius
        }
    }), {}),
    [TagTheme.None]: {},
    theme: Object.values(TagTheme).reduce((acc, theme) => ({
        ...acc,
        [theme]: {
            [`&.${tagBase.$}-${[TagVariant.Action]}`]: {
                background: mode.theme[theme]?.color,
                [`&:hover, &:focus-visible `]: {
                    background: mode.theme[theme]?.hover
                },
                [`&:active`]: {
                    background: mode.theme[theme]?.active
                },
                [`&.${tagBase.$} .spark-icon`]: {
                    color: mode.variant.action.textColor
                }
            },
            [`&.${tagBase.$} .spark-icon`]: {
                color: mode.theme[theme]?.color
            }
        }
    }), {}),
    [`&.is-disabled, &.is-disabled .spark-icon`]: {
        background: mode.disabled.backgroundColor,
        color: `${mode.disabled.textColor} !important`,
        boxShadow: 'none !important',
        borderColor: `${mode.disabled.backgroundColor}`
    }
});
