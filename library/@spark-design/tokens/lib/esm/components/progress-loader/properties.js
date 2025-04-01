import { token } from '../../setup';
import { ProgressLoaderVariant, ProgressLoaderWeight } from './types';
export const prefix = 'spark-progress-loader';
export const properties = token({
    display: 'block',
    maxInlineSize: '100%',
    minInlineSize: '48px',
    indeterminateInlineSize: '38.75%',
    blockSize: '4px',
    blockSizeThick: '8px',
    blockSizeFilled: '24px',
    borderStyle: 'solid',
    borderSize: '1px',
    zeroBorder: '0px',
    variants: {
        [ProgressLoaderVariant.Linear]: {
            InlineSize: '100%',
            MinInlineSize: '48px',
            IndeterminateInlineSize: '38.75%',
            BlockSize: '4px',
            BlockSizeThick: '8px',
            BlockSizeFilled: '24px',
            animation: '1s infinite alternate keyframes-linearIndeterminate'
        },
        [ProgressLoaderVariant.Circular]: {
            Length: '30px',
            IndeterminatePercentage: '75%',
            MaskThreshold: '56%',
            borderRadius: '100%',
            boxSizing: 'border-box',
            animation: '2s infinite linear keyframes-circularIndeterminate',
            mask: {
                display: 'block',
                width: '24px',
                height: '24px',
                background: 'black',
                position: 'relative',
                outlineSize: '1px',
                outlineColor: 'black',
                marginLeft: '3px',
                marginTop: '-27px',
                borderRadius: '50%'
            }
        }
    },
    weight: {
        [ProgressLoaderWeight.Normal]: {},
        [ProgressLoaderWeight.Heavy]: {
            blockSize: '8px'
        }
    }
}, {
    prefix: prefix
});
