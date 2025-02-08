import { media } from '../../setup';
import { shimmer } from './component';
export const shimmerMedia = media({
    '@media screen and (prefers-reduced-motion: reduce)': {
        [`${shimmer.animate.$}.not-essential, .${shimmer.animate.$}.not-essential > *`]: {
            animation: 'none !important',
            transition: 'none !important'
        }
    },
    '@media screen and (forced-colors: active)': {
        [`${shimmer.$}`]: {
            '--spark-shimmer-background-color': 'GrayText',
            '--spark-shimmer-card-avatar-border-color': 'Canvas',
            [`& .${shimmer.animate.$}`]: {
                forcedColorAdjust: 'none'
            }
        }
    }
});
