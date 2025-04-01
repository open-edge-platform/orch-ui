import { media } from '../../setup';
import { slider } from './component';
export const sliderMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${slider.$}`]: {
            '--spark-slider-track-color': 'Highlight',
            '--spark-slider-icon-color': 'CanvasText',
            '--spark-slider-disabled-color': 'GrayText',
            '--spark-slider-label-color': 'CanvasText',
            '--spark-slider-track-background-color': 'ButtonBorder',
            '--spark-slider-thumb-color': 'Highlight',
            '--spark-slider-transparent-color': 'unset',
            '--spark-slider-border-thick': '0',
            '--spark-slider-thumb-color-hover': 'Highlight',
            '--spark-slider-thumb-color-active': 'Highlight'
        }
    }
});
