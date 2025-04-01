import { token } from '../../setup';
import { ProgressIndicatorVariant, ProgressIndicatorWeight } from './types';
export const prefix = 'spark-progress-indicator';
export const properties = token({
    display: 'block',
    fontSize: '11px',
    lineHeight: '16px',
    maxInlineSize: '100%',
    inlineSize: '100%',
    minInlineSize: '48px',
    indeterminateInlineSize: '38.75%',
    borderSize: '1px',
    opacityZero: 0,
    label: {
        display: 'block',
        fontSize: '11px',
        lineHeight: '16px',
        overflowInlineSize: '100%',
        padding: '4px',
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            minInlineSize: '240px'
        },
        [ProgressIndicatorVariant.Filled]: {
            position: 'absolute',
            padding: '8px',
            textAlign: 'end'
        },
        [ProgressIndicatorWeight.Heavy]: {
            fontSize: '12px'
        }
    },
    linear: {
        inlineSize: '100%',
        minInlineSize: '240px',
        blockSize: '4px',
        indeterminateInlineSize: '38.75%',
        bar: {
            inlineSize: 'var(--percentage)',
            blockSize: '100%',
            transition: 'inline-size 0.5s ease',
            [ProgressIndicatorWeight.Heavy]: {
                blockSize: '8px'
            },
            [ProgressIndicatorVariant.Filled]: {
                blockSize: '24px'
            },
            [ProgressIndicatorVariant.Minimum]: {
                minInlineSize: '48px',
                blockSize: '4px'
            }
        }
    },
    [ProgressIndicatorVariant.Circular]: {
        Length: '100%',
        ContainerLength: '32px',
        indeterminatePercentage: '75%',
        maskThreshold: '56%',
        borderRadius: '100%',
        boxSizing: 'border-box',
        MaskThreshold: '56%',
        mask: {
            position: 'relative',
            width: '24px',
            height: '24px',
            marginTop: '-28px',
            marginLeft: '4px',
            borderRadius: '50%',
            outlineSize: '1px'
        }
    }
}, {
    prefix: prefix
});
