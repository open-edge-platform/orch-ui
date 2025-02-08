import { media } from '../../setup';
import { badge } from './component';
export const badgeMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${badge.$}`]: {
            '--spark-badge-color': 'HighlightText',
            '--spark-badge-success-background-color': 'Highlight',
            '--spark-badge-info-background-color': 'Highlight',
            '--spark-badge-warning-background-color': 'Highlight',
            '--spark-badge-alert-background-color': 'Highlight',
            '--spark-badge-unknown-background-color': 'Highlight'
        },
        [`${badge.text.$}`]: {
            forcedColorAdjust: 'none'
        }
    }
});
