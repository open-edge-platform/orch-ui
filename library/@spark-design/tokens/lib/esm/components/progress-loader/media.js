import { media } from '../../setup';
import { progressLoader } from './component';
export const progressLoaderMedia = media({
    '@media screen and (prefers-reduced-motion: reduce)': {
        [`${progressLoader.$}.not-essential,
        .${progressLoader.$}.not-essential > *,
        .${progressLoader.linear.$}.not-essential,
        .${progressLoader.linear.$}.not-essential > *`]: {
            animation: 'none !important',
            transition: 'none !important'
        }
    },
    '@media screen and (forced-colors: active)': {
        [`${progressLoader.$}`]: {
            '--spark-progress-loader-value-color': 'Highlight',
            '--spark-progress-loader-border-color': 'ButtonBorder',
            [`&.${progressLoader.circular.$}`]: {
                [`&.${progressLoader.$}`]: {
                    forcedColorAdjust: 'none'
                }
            }
        }
    }
});
