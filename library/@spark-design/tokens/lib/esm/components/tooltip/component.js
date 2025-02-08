import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { TooltipSize } from './types';
export const tooltipBase = component({
    insetInlineStart: properties.insetInlineStart,
    insetBlockStart: properties.insetBlockStart,
    display: 'inline-flex !important',
    flexDirection: 'row',
    zIndex: properties.zIndex,
    position: 'absolute',
    top: properties.top,
    left: properties.left,
    boxSizing: 'border-box',
    verticalAlign: 'top',
    inlineSize: 'auto',
    maxInlineSize: properties.maxInlineSize,
    wordBreak: 'break-word',
    alignItems: 'flex-start',
    backgroundColor: mode.backgroundColor,
    color: mode.color,
    visibility: 'visible',
    pointerEvents: 'auto',
    label: {},
    tip: {
        position: 'absolute',
        blockSize: properties.tipBlockSize,
        inlineSize: properties.tipInlineSize,
        borderWidth: properties.tipBorderWidth,
        borderStyle: 'solid',
        borderInlineStartColor: 'transparent',
        borderInlineEndColor: 'transparent',
        borderBlockEndColor: 'transparent',
        color: mode.tipColor
    },
    toggle: {
        display: 'flex',
        position: 'relative',
        width: 'fit-content'
    },
    rightSide: {},
    right: {},
    bottom: {},
    leftSide: {},
    start: {},
    end: {}
}, {
    className: prefix
});
export const tooltip = tooltipBase.fork({
    [`&.${tooltipBase.top.$} .${tooltipBase.tip.$}`]: {
        insetBlockStart: '100%'
    },
    [`&.${tooltipBase.rightSide.$} .${tooltipBase.tip.$}`]: {
        insetInlineEnd: '100%',
        transform: 'rotate(90deg)',
        insetBlockEnd: `calc(50% - ${properties.midTooltipSize})`
    },
    [`&.${tooltipBase.bottom.$} .${tooltipBase.tip.$}`]: {
        insetBlockEnd: '100%',
        transform: 'rotate(-180deg)'
    },
    [`&.${tooltipBase.leftSide.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '100%',
        transform: 'rotate(-90deg)',
        insetBlockEnd: `calc(50% - ${properties.midTooltipSize})`
    },
    [`&.${tooltipBase.bottom.$}.${tooltipBase.left.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '100%',
        transform: 'rotate(-180deg)'
    },
    [`&.${tooltipBase.bottom.$}.${tooltipBase.right.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '0%',
        transform: 'rotate(-180deg)',
        marginInlineStart: properties.tipMarginInlineStart
    },
    [`&.${tooltipBase.top.$}.${tooltipBase.left.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '100%',
        transform: 'rotate(0deg)'
    },
    [`&.${tooltipBase.top.$}.${tooltipBase.right.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '0%',
        transform: 'rotate(0deg)',
        marginInlineStart: properties.tipMarginInlineStart
    },
    [`&.${tooltipBase.right.$}.${tooltipBase.end.$} .${tooltipBase.tip.$}`]: {
        insetInlineEnd: '100%',
        transform: 'rotate(90deg)',
        insetBlockEnd: properties.tipInsetBlockEnd
    },
    [`&.${tooltipBase.right.$}.${tooltipBase.start.$} .${tooltipBase.tip.$}`]: {
        insetInlineEnd: '100%',
        transform: 'rotate(90deg)',
        insetBlockStart: properties.tipInsetBlockStart
    },
    [`&.${tooltipBase.left.$}.${tooltipBase.end.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '100%',
        transform: 'rotate(-90deg)',
        insetBlockEnd: properties.tipInsetBlockEnd
    },
    [`&.${tooltipBase.left.$}.${tooltipBase.start.$} .${tooltipBase.tip.$}`]: {
        insetInlineStart: '100%',
        transform: 'rotate(-90deg)',
        insetBlockStart: properties.tipInsetBlockStart
    },
    size: Object.values(TooltipSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            padding: `${properties[size]?.paddingTopBottom} ${properties[size]?.paddingRightLeft}`,
            [`& .${tooltipBase.label.$}`]: {
                display: 'flex',
                fontSize: properties[size]?.fontSize,
                fontWeight: properties[size]?.labelFontWeight,
                lineHeight: properties[size]?.labelLineHeight,
                width: 'max-content'
            },
            [`&.${tooltipBase.top.$} .${tooltipBase.tip.$}`]: {
                insetBlockStart: '100%',
                marginInlineStart: `calc(50% - ${properties[size]?.gapSize})`
            },
            [`&.${tooltipBase.bottom.$} .${tooltipBase.tip.$}`]: {
                marginInlineStart: `calc(50% - ${properties[size]?.gapSize})`
            },
            [`&.${tooltipBase.bottom.$}.${tooltipBase.left.$} .${tooltipBase.tip.$}`]: {
                marginInlineStart: `calc(-1 * ${properties[size]?.gapSize})`
            },
            [`&.${tooltipBase.top.$}.${tooltipBase.left.$} .${tooltipBase.tip.$}`]: {
                marginInlineStart: `calc(-1 * ${properties[size]?.gapSize})`
            },
            [`&.${tooltipBase.top.$}.${tooltipBase.right.$} .${tooltipBase.tip.$}`]: {
                marginInlineStart: `calc(-1 * ${properties[size]?.gapSize})`
            },
            ['& .spark-icon']: {
                marginInlineEnd: properties.marginInlineEnd,
                lineHeight: properties[size]?.iconLineHeight
            }
        }
    }), {})
});
