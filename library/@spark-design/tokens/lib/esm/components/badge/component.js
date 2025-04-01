import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { BadgeShape, BadgeSize, BadgeVariant } from './types';
export const badgeBase = component({
    display: properties.base.display,
    alignItems: properties.base.textAlign,
    color: mode.color,
    justifyContent: properties.base.textAlign,
    text: {},
    noText: {}
}, {
    className: prefix
});
export const badge = badgeBase.fork({
    text: {
        size: {
            ...Object.values(BadgeSize).reduce((acc, size) => ({
                ...acc,
                [size]: {
                    [`&`]: {
                        blockSize: properties[size].height,
                        inlineSize: 'fit-content',
                        fontSize: properties[size].fontSize,
                        lineHeight: properties[size].lineHeight.text,
                        letterSpacing: properties[size].letterSpacing,
                        fontWeight: 'normal',
                        paddingInline: properties[size].paddingInline,
                        minInlineSize: properties[size].width
                    }
                }
            }), {})
        }
    },
    noText: {
        size: {
            ...Object.values(BadgeSize).reduce((acc, size) => ({
                ...acc,
                [size]: {
                    [`&`]: {
                        blockSize: properties[size].height,
                        inlineSize: properties[size].width,
                        paddingInline: '0'
                    }
                }
            }), {})
        }
    },
    shape: {
        ...Object.values(BadgeShape).reduce((acc, shape) => ({
            ...acc,
            [shape]: {
                [`&`]: {
                    borderRadius: properties[shape].borderRadius
                }
            }
        }), {})
    },
    variant: {
        ...Object.values(BadgeVariant).reduce((acc, variant) => ({
            ...acc,
            [variant]: {
                [`&`]: {
                    backgroundColor: mode[variant].backgroundColor
                }
            }
        }), {})
    }
});
