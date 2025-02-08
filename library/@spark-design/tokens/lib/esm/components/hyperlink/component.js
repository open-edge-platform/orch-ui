import { component } from '../../setup';
import { mode } from './modes';
import { prefix } from './properties';
import { HyperlinkType, HyperlinkVariant } from './types';
const hyperlinkBase = component({
    isDisabled: {},
    isPressed: {},
    [HyperlinkVariant.Primary]: {},
    [HyperlinkVariant.Secondary]: {},
    [HyperlinkType.Standard]: {},
    [HyperlinkType.Quiet]: {}
}, {
    className: prefix
});
export const hyperlink = hyperlinkBase.fork({
    [`&.${hyperlinkBase.isDisabled.$},
    &.${hyperlinkBase.isDisabled.$} a`]: {
        pointerEvents: 'none',
        color: `${mode.disabledColor} !important`
    },
    ['&']: Object.values(HyperlinkVariant).reduce((acc, variant) => ({
        ...acc,
        [`&.${hyperlinkBase[variant].$}`]: {
            color: mode.color[variant].base,
            [`& a, & a:hover, & a:focus, & a:active`]: {
                color: 'inherit '
            },
            [`&:focus:not(.${hyperlinkBase.isPressed.$})`]: {
                color: `${mode.color[variant].base} !important`
            },
            [`&:hover:not(.${hyperlinkBase.isPressed.$})`]: {
                color: `${mode.color[variant].hover} !important`
            },
            [`&.${hyperlinkBase.isPressed.$}, &:active, &.${hyperlinkBase.isPressed.$} a`]: {
                color: `${mode.color[variant].pressed} !important`,
                '&:visited, &:has(a:visited)': {
                    color: `${mode.color[variant].visited.pressed} !important`
                }
            },
            [`&:visited, &:has(a:visited), & a:visited`]: {
                color: mode.color[variant].visited.base,
                [`&:focus:not(.${hyperlinkBase.isPressed.$})`]: {
                    color: `${mode.color[variant].visited.base} !important`
                },
                '&:hover': {
                    color: `${mode.color[variant].visited.hover} !important`
                }
            }
        }
    }), {}),
    [`&.${hyperlinkBase.standard.$}, &.${hyperlinkBase.standard.$} a`]: {
        textDecoration: 'underline'
    },
    [`&.${hyperlinkBase.quiet.$}, &.${hyperlinkBase.quiet.$} a`]: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});
