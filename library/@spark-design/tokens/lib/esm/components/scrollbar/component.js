import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
export const scrollbarBase = component({
    maxInlineSize: properties.inlineSize,
    maxBlockSize: properties.blockSize,
    WebkitOverflowScrolling: 'touch',
    hidden: {},
    padding: `${properties.paddingHiddenTop} ${properties.paddingHiddenRight}
             ${properties.paddingHiddenBottom} ${properties.paddingHiddenLeft}`
}, {
    className: prefix
});
export const scrollbar = scrollbarBase.fork({
    '&::-webkit-scrollbar': {
        inlineSize: properties.thin,
        blockSize: properties.thin
    },
    '&:hover': {
        '&::-webkit-scrollbar': {
            inlineSize: properties.thinActive,
            blockSize: properties.thinActive
        },
        padding: properties.paddingOpen
    },
    '&::-webkit-scrollbar-track': {
        background: mode.trackColor
    },
    '&::-webkit-scrollbar-thumb': {
        background: mode.thumbColor,
        '&:active': {
            background: mode.thumbActiveColor
        }
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent'
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${mode.thumbColor} ${mode.trackColor}`,
    '&:active': {
        scrollbarColor: `${mode.thumbActiveColor} ${mode.trackColor}`
    },
    [`&.${scrollbarBase.hidden.$}`]: {
        '&::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb': {
            background: 'transparent'
        },
        '&:hover': {
            '&::-webkit-scrollbar': {
                '&:hover': {
                    '&::-webkit-scrollbar-track': {
                        background: mode.trackColor
                    }
                }
            },
            '&::-webkit-scrollbar-track:hover': {
                background: mode.trackColor
            },
            '&::-webkit-scrollbar-thumb': {
                background: mode.thumbColor,
                '&:active': {
                    background: mode.thumbActiveColor
                }
            }
        }
    },
    x: {
        overflowX: 'auto',
        whiteSpace: 'nowrap'
    },
    y: {
        overflowY: 'auto'
    }
});
