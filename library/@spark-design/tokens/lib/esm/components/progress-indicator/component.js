import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ProgressIndicatorVariant, ProgressIndicatorWeight } from './types';
const progressIndicatorBase = component({
    display: 'block',
    maxInlineSize: properties.maxInlineSize,
    inlineSize: properties.linear.inlineSize,
    position: 'relative',
    bar: {},
    label: {},
    labelContainer: {},
    percentage: {},
    overlay: {},
    clippingMask: {},
    circularContainer: {},
    linearLabel: {},
    filledLabel: {},
    maskCircular: {},
    [ProgressIndicatorWeight.Normal]: {},
    [ProgressIndicatorWeight.Heavy]: {},
    [ProgressIndicatorVariant.Circular]: {},
    [ProgressIndicatorVariant.Minimum]: {},
    [ProgressIndicatorVariant.Filled]: {},
    [ProgressIndicatorVariant.Linear]: {}
}, {
    className: prefix
});
export const progressIndicator = progressIndicatorBase.fork({
    [`& progress`]: {
        border: 'none',
        maxInlineSize: properties.maxInlineSize,
        minInlineSize: properties.maxInlineSize
    },
    [`& progress[value]::-webkit-progress-value, & progress:not([value])`]: {
        backgroundColor: mode.ValueColor,
        transition: properties.linear.bar.transition
    },
    [`& progress[value]::-webkit-progress-bar, & progress:not([value])::-webkit-progress-bar`]: {
        backgroundColor: 'transparent',
        transition: properties.linear.bar.transition
    },
    [`& progress.success[value]:not(.error)::-webkit-progress-value`]: {
        backgroundColor: mode.barColorSuccess,
        transition: properties.linear.bar.transition
    },
    [`& progress.error[value]:not(.success)::-webkit-progress-value`]: {
        backgroundColor: mode.barColorError,
        transition: properties.linear.bar.transition
    },
    [`& .${progressIndicatorBase.maskCircular.$}`]: {
        inlineSize: properties.circular.mask.width,
        blockSize: properties.circular.mask.height,
        outline: `${properties.circular.mask.outlineSize} solid ${mode.borderColor}`,
        marginBlockStart: properties.circular.mask.marginTop,
        marginInlineStart: properties.circular.mask.marginLeft,
        background: mode.maskBackground,
        borderRadius: properties.circular.mask.borderRadius
    },
    [`&.${progressIndicatorBase.circularContainer.$}`]: {
        blockSize: properties.circular.ContainerLength,
        inlineSize: properties.circular.ContainerLength
    },
    [`&.${progressIndicatorBase.clippingMask.$}`]: {
        position: 'absolute',
        inset: '0',
        zIndex: '1',
        backgroundColor: 'transparent'
    },
    [`& .${progressIndicatorBase.linear.$}`]: {
        background: mode.barColor,
        inlineSize: properties.linear.inlineSize,
        minInlineSize: properties.linear.minInlineSize,
        borderBlock: `${properties.borderSize} solid ${mode.borderColor}`,
        borderInline: `${properties.borderSize} solid ${mode.borderColor}`,
        [`& progress.${progressIndicatorBase.bar.$}`]: {
            WebkitAppearance: 'none',
            appearance: 'none',
            backgroundColor: 'transparent',
            transition: properties.linear.bar.transition
        },
        [`& .${progressIndicatorBase.bar.$}`]: {
            background: mode.ValueColor
        },
        [`& progress.${progressIndicatorBase.bar.$}, & .${progressIndicatorBase.bar.$}`]: {
            display: 'flex',
            blockSize: properties.linear.bar.blockSize,
            inlineSize: 'var(--percentage)',
            transition: properties.linear.bar.transition,
            [`&.success[value]:not(.error)::-webkit-progress-value, &.success[value]:not(.error)::-moz-progress-bar`]: {
                backgroundColor: mode.barColorSuccess
            },
            [`&.error[value]::-webkit-progress-value, &.error[value]::-moz-progress-bar`]: {
                backgroundColor: mode.barColorError
            },
            [`&.${progressIndicatorBase.overlay.$}`]: {
                color: mode.label.topOverlay.textColor,
                [`&.success`]: {
                    backgroundColor: mode.barColorSuccess
                },
                [`&.error`]: {
                    backgroundColor: mode.barColorError
                }
            }
        },
        [`&.${progressIndicatorBase.filled.$}`]: {
            blockSize: properties.linear.bar.filled.blockSize,
            position: 'relative'
        },
        [`&.${progressIndicatorBase.minimum.$}`]: {
            minInlineSize: properties.linear.bar.minimum.minInlineSize,
            blockSize: properties.linear.bar.minimum.blockSize
        },
        [`&.${progressIndicatorBase.heavy.$}`]: {
            blockSize: properties.linear.bar.heavy.blockSize
        }
    },
    [`& .${progressIndicatorBase.linear.$}.${progressIndicatorBase.normal.$}`]: {
        blockSize: properties.linear.blockSize
    },
    [`& .${progressIndicatorBase.label.$}`]: {
        [`&.${progressIndicatorBase.filledLabel.$}`]: {
            position: properties.label.filled.position,
            marginInlineStart: properties.label.filled.padding
        }
    },
    [`& .${progressIndicatorBase.label.$}, & .${progressIndicatorBase.percentage.$}`]: {
        display: 'flex',
        lineHeight: properties.label.lineHeight,
        paddingBlockEnd: properties.label.padding,
        paddingBlockStart: properties.label.padding,
        color: mode.textColor,
        [`&.${progressIndicatorBase.linearLabel.$}`]: {
            fontSize: properties.label.fontSize,
            maxInlineSize: properties.label.overflowInlineSize
        },
        [`&.${progressIndicatorBase.heavy.$}`]: {
            maxInlineSize: properties.label.overflowInlineSize
        },
        [`&.${progressIndicatorBase.heavy.$},
          &.${progressIndicatorBase.filledLabel.$}`]: {
            fontSize: properties.label.heavy.fontSize
        },
        [`&.${progressIndicatorBase.overlay.$}`]: {
            color: mode.label.topOverlay.textColor,
            [`&.success`]: {
                color: mode.label.topOverlay.textColorSuccess
            },
            [`&.error`]: {
                color: mode.label.topOverlay.textColorError
            }
        }
    },
    [`& .${progressIndicatorBase.percentage.$}`]: {
        fontWeight: 'bold',
        [`&.${progressIndicatorBase.filledLabel.$}`]: {
            position: properties.label.filled.position,
            inlineSize: `calc(
                ${properties.linear.inlineSize} - ${properties.label.overflowInlineSize}
            )`,
            textAlign: properties.label.filled.textAlign,
            marginInlineStart: `calc(
                ${properties.label.overflowInlineSize} - ${properties.label.filled.padding}
            )`
        }
    },
    [`& .${progressIndicatorBase.labelContainer.$}`]: {
        display: properties.label.container.display,
        justifyContent: properties.label.container.justifyContent,
        minInlineSize: properties.label.container.minInlineSize
    },
    [`& .${progressIndicatorBase.circular.$}`]: {
        borderInline: `${properties.borderSize} solid ${mode.borderColor}`,
        borderBlock: `${properties.borderSize} solid ${mode.borderColor}`,
        inlineSize: properties.circular.Length,
        blockSize: properties.circular.Length,
        borderRadius: properties.circular.borderRadius,
        boxSizing: properties.circular.boxSizing,
        transition: properties.linear.bar.transition,
        background: `conic-gradient(
            ${mode.ValueColor} var(--percentage),
            ${mode.barColor} var(--percentage),
        )`,
        mask: `radial-gradient(
            circle,
            transparent ${properties.circular.MaskThreshold},
            white calc( ${properties.circular.MaskThreshold + ' + 1%'})
        )`,
        ' -webkit-mask': `radial-gradient(
            circle,
            transparent var(--spark-progress-indicator-circular-mask-threshold), 
            white calc(var(--spark-progress-indicator-circular-mask-threshold) + 1%) )`,
        [`&.success`]: {
            background: `conic-gradient(
                ${mode.barColorSuccess} var(--percentage),
                ${mode.barColor} var(--percentage),
            )`
        },
        [`&.error`]: {
            background: `conic-gradient(
                ${mode.barColorError} var(--percentage),
                ${mode.barColor} var(--percentage),
            )`
        }
    },
    [`& .${progressIndicatorBase.filled.$}`]: {
        [`& progress`]: {
            opacity: properties.opacityZero
        },
        [`& .${progressIndicatorBase.label.$}`]: {},
        [`& .${progressIndicatorBase.percentage.$}`]: {
            display: 'flex',
            flexDirection: 'row-reverse'
        }
    }
});
