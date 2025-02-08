import { component } from '../../setup';
import { tooltipBase } from '../tooltip';
import { mode } from './modes';
import { prefix, properties } from './properties';
const sliderBase = component({
    position: 'relative',
    display: 'flex',
    inlineSize: properties.inlineSize,
    maxInlineSize: properties.maxInlineSize,
    input: {},
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: properties.gap
    },
    valuesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: ' center'
    },
    isDisabled: {},
    isDragged: {},
    label: { color: mode.labelColor },
    track: {},
    trackFill: {},
    trackContainer: {
        blockSize: properties.blockSize,
        inlineSize: properties.inlineSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: properties.gap
    },
    thumb: {},
    thumbTrack: {
        position: 'relative',
        inlineSize: `calc(100% - ${properties.thumbTrackInlineSize})`
    },
    thumbOverlay: {},
    thumbTooltip: {},
    textField: {}
}, {
    className: prefix
});
export const slider = sliderBase.fork({
    [`& .${sliderBase.textField.$}`]: {
        inlineSize: properties.textFieldInlineSize,
        marginInlineStart: properties.textFieldMarginInlineStart
    },
    [`& .${sliderBase.textField.$} input`]: {
        textAlign: 'center'
    },
    [`& .${sliderBase.valuesContainer.$} output, .${sliderBase.trackContainer.$} output`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [`& .spark-font-25`]: {
            fontWeight: properties.fontWeight,
            color: mode.valueTextColor,
            lineHeight: properties.fontLineHeight
        }
    },
    [`&.${sliderBase.container.$} span.spark-icon`]: {
        color: mode.iconColor,
        position: 'relative'
    },
    [`&.${sliderBase.container.$}.${sliderBase.isDisabled.$} span.spark-icon`]: {
        color: mode.disabledColor,
        position: 'relative'
    },
    [`&.${sliderBase.container.$}.${sliderBase.isDisabled.$} .${sliderBase.container.$} 
    .${sliderBase.trackFill.$}`]: {
        backgroundColor: mode.disabledColor
    },
    [`&.${sliderBase.container.$}.${sliderBase.isDisabled.$} .${sliderBase.track.$}`]: {
        backgroundColor: mode.disabledColor
    },
    [`&.${sliderBase.container.$}.${sliderBase.isDisabled.$} .${sliderBase.trackFill.$}`]: {
        backgroundColor: mode.disabledColor
    },
    [`&.${sliderBase.container.$}.${sliderBase.isDisabled.$} output`]: {
        [`& .spark-font-25`]: {
            color: mode.disabledColor
        }
    },
    [`& .${sliderBase.track.$}`]: {
        backgroundColor: mode.trackBackgroundColor,
        borderRadius: properties.trackBorderRadius,
        inlineSize: properties.inlineSize,
        blockSize: properties.trackBackgroundBlockSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    [`& .${sliderBase.thumb.$}`]: {
        filter: `drop-shadow(${properties.dropShadowX} ${properties.dropShadowY} 
            ${properties.dropShadowBlurRadius} ${mode.shadowColor})`,
        blockSize: properties.thumbBlockSize,
        inlineSize: properties.thumbInlineSize,
        borderRadius: properties.borderRadius,
        WebkitAppearance: 'none',
        cursor: 'pointer',
        pointerEvents: 'auto',
        backgroundColor: mode.thumbColor,
        zIndex: `${properties.thumbZIndex} !important`,
        boxSizing: 'border-box',
        borderInline: `${properties.borderThick} solid ${mode.transparentColor}`,
        borderBlock: `${properties.borderThick} solid ${mode.transparentColor}`,
        [`&:hover`]: {
            backgroundColor: mode.thumbColorHover,
            borderInline: `${properties.borderThick} solid ${mode.thumbColorHover}`,
            borderBlock: `${properties.borderThick} solid ${mode.thumbColorHover}`,
            filter: `drop-shadow(${properties.dropShadowX} ${properties.dropShadowY}
                ${properties.dropShadowBlurRadius} ${mode.shadowColor})`
        },
        [`&.${sliderBase.isDragged.$}`]: {
            backgroundColor: mode.thumbColorActive,
            borderInline: `${properties.borderThick} solid ${mode.thumbColorActive}`,
            borderBlock: `${properties.borderThick} solid ${mode.thumbColorActive}`,
            filter: `drop-shadow(${properties.dropShadowX} ${properties.dropShadowY}
                ${properties.dropShadowBlurRadius} ${mode.shadowColor})`
        },
        [`&.${sliderBase.isDisabled.$}`]: {
            backgroundColor: mode.disabledColor,
            borderInline: `${properties.borderThick} solid ${mode.disabledColor}`,
            borderBlock: `${properties.borderThick} solid ${mode.disabledColor}`,
            cursor: 'default',
            filter: 'none',
            pointerEvents: 'none',
            [`&.${sliderBase.thumbTooltip.$}`]: {
                pointerEvents: 'auto'
            }
        },
        [`& .${tooltipBase.$}`]: {
            transform: `translateY(${properties.tooltipThumbTransform})`
        }
    },
    [`& .${sliderBase.trackFill.$}`]: {
        blockSize: properties.trackBlockSize,
        position: 'absolute',
        left: properties.trackFillLeft,
        right: 'auto',
        zIndex: properties.trackFillZIndex,
        backgroundColor: mode.trackColor,
        borderRadius: properties.trackBorderRadius,
        display: 'block',
        margin: 'auto',
        insetBlockStart: properties.trackFillInsetBlockEnd,
        insetBlockEnd: properties.trackFillInsetBlockEnd
    }
});
