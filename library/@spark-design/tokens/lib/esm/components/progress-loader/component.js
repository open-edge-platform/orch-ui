import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ProgressLoaderVariant, ProgressLoaderWeight } from './types';
const progressLoaderBase = component({
    display: 'block',
    border: {},
    maxInlineSize: properties.maxInlineSize,
    [ProgressLoaderVariant.Linear]: {
        [ProgressLoaderWeight.Normal]: {},
        [ProgressLoaderWeight.Heavy]: {}
    },
    [ProgressLoaderVariant.Circular]: {},
    whiteMask: {},
    circularContainer: {}
}, {
    className: prefix
});
export const progressLoader = progressLoaderBase.fork({
    [`& progress`]: {
        border: 'none',
        maxInlineSize: properties.maxInlineSize
    },
    [`& progress.${progressLoaderBase.circular.$}[value]::-webkit-progress-value`]: {
        backgroundColor: mode.valueColor
    },
    [`& progress.${progressLoaderBase.circular.$}:not([value])::-webkit-progress-bar`]: {
        backgroundColor: mode.transparent
    },
    [`& .${progressLoaderBase.linear.$}`]: {
        display: 'flex',
        alignItems: 'center',
        inlineSize: properties.variants.linear.InlineSize,
        blockSize: properties.variants.linear.BlockSize,
        background: mode.barColor,
        position: 'relative',
        zIndex: '0',
        '&:not(progress):after': {
            position: 'absolute',
            content: `" "`,
            display: 'flex',
            inlineSize: '100%',
            blockSize: '100%',
            borderInline: `${properties.borderSize} ${properties.borderStyle} ${mode.borderColor}`,
            borderBlock: `${properties.borderSize} ${properties.borderStyle} ${mode.borderColor}`,
            zIndex: '1'
        },
        [`&.${progressLoaderBase.linear.heavy.$}`]: {
            blockSize: properties.weight.heavy.blockSize
        },
        [`& progress`]: {
            inlineSize: properties.variants.linear.IndeterminateInlineSize,
            animation: properties.variants.linear.animation,
            zIndex: '0',
            [`&.${progressLoaderBase.linear.heavy.$}`]: {
                blockSize: properties.weight.heavy.blockSize
            }
        },
        [`& progress:not([value])`]: {
            backgroundColor: mode.valueColor,
            borderBlock: properties.zeroBorder,
            borderInline: properties.zeroBorder
        },
        [`& progress:not([value])::-webkit-progress-bar`]: {
            backgroundColor: mode.transparent
        }
    },
    [`& .${progressLoaderBase.whiteMask.$}`]: {
        display: 'block',
        borderBlock: `${properties.variants.circular.mask.outlineSize} solid ${mode.borderColor}`,
        borderInline: `${properties.variants.circular.mask.outlineSize} solid ${mode.borderColor}`,
        background: mode.maskColor,
        position: properties.variants.circular.mask.position,
        marginBlockStart: properties.variants.circular.mask.marginTop,
        marginInlineStart: properties.variants.circular.mask.marginLeft,
        borderRadius: properties.variants.circular.mask.borderRadius,
        inlineSize: properties.variants.circular.mask.width,
        blockSize: properties.variants.circular.mask.height
    },
    [`&.${progressLoaderBase.circularContainer.$}`]: {
        blockSize: properties.variants.circular.Length,
        inlineSize: properties.variants.circular.Length
    },
    [`&.${progressLoaderBase.circular.$}`]: {
        [`&.${progressLoaderBase.$}`]: {
            borderInline: `${properties.borderSize} solid ${mode.borderColor}`,
            borderBlock: `${properties.borderSize} solid ${mode.borderColor}`,
            inlineSize: properties.variants.circular.Length,
            blockSize: properties.variants.circular.Length,
            borderRadius: properties.variants.circular.borderRadius,
            boxSizing: properties.variants.circular.boxSizing,
            animation: properties.variants.circular.animation,
            background: `conic-gradient(
            ${mode.valueColor} ${properties.variants.circular.IndeterminatePercentage},
            ${mode.barColor} ${properties.variants.circular.IndeterminatePercentage},
            ${mode.barColor} ${properties.variants.circular.IndeterminatePercentage},
        )`,
            mask: `radial-gradient(
            circle,
            transparent ${properties.variants.circular.MaskThreshold},
            white calc( ${properties.variants.circular.MaskThreshold + ' + 1%'})
        )`,
            '-webkit-mask': `radial-gradient( circle, transparent var(--spark-progress-indicator-circular-mask-threshold), 
   white calc(var(--spark-progress-indicator-circular-mask-threshold) + 1%) )`
        }
    }
});
