import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
export const popoverBase = component({
    fitContent: {},
    underlay: {}
}, {
    className: prefix
});
export const popover = popoverBase.fork({
    maxBlockSize: properties.popoverHeight,
    minInlineSize: properties.popoverMinSize,
    backgroundColor: mode.background,
    color: mode.textColor,
    inlineSize: '100%',
    [`&.${popoverBase.fitContent.$}`]: {
        maxInlineSize: 'fit-content'
    },
    [`&.${popoverBase.underlay.$}`]: {
        maxBlockSize: 'inherit',
        minInlineSize: 'inherit',
        backgroundColor: mode.underlayColor,
        blockSize: '100%',
        inlineSize: '100%',
        position: 'absolute',
        content: '" "',
        display: 'flex',
        top: 0,
        left: 0
    }
});
