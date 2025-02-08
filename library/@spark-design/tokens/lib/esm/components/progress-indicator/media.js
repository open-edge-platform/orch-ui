import { media } from '../../setup';
import { progressIndicator } from './component';
export const progressIndicatorMedia = media({
    '@media screen and (prefers-reduced-motion: reduce)': {
        [`${progressIndicator.linear.$}.not-essential,
        .${progressIndicator.linear.$}.not-essential > *`]: {
            animation: 'none !important',
            transition: 'none !important'
        }
    },
    '@media screen and (forced-colors: active)': {
        [`${progressIndicator.$}`]: {
            '--spark-progress-indicator-value-color': 'Highlight',
            '--spark-progress-indicator-border-color': 'ButtonBorder',
            '--spark-progress-indicator-bar-color-success': 'Highlight',
            '--spark-progress-indicator-bar-color-error': 'Highlight',
            '--spark-progress-indicator-label-top-overlay-text-color-error': 'HighlightText',
            [`& .${progressIndicator.circular.$}`]: {
                forcedColorAdjust: 'none'
            },
            [`& .${progressIndicator.filled.$} .${progressIndicator.filledLabel.$}`]: {
                forcedColorAdjust: 'none',
                color: 'HighlightText'
            },
            [`& .${progressIndicator.filled.$} .${progressIndicator.clippingMask.$} .${progressIndicator.filledLabel.$}`]: {
                color: 'CanvasText'
            }
        }
    }
});
