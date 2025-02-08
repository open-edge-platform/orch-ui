import { media } from '../../setup';
import { radioButton } from './component';
export const radioButtonMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${radioButton.$}`]: {
            '--spark-radio-button-enable-selected-border-color': 'Highlight',
            '--spark-radio-button-hover-selected-border-color': 'Highlight',
            '--spark-radio-button-pressed-selected-border-color': 'Highlight',
            '--spark-radio-button-hover-unselected-border-color': 'ButtonBorder',
            '--spark-radio-button-enabled-unselected-border-color': 'ButtonBorder',
            '--spark-radio-button-pressed-unselected-border-color': 'ButtonBorder',
            '--spark-radio-button-enable-selected-bg-color': 'Canvas',
            '--spark-radio-button-pressed-selected-bg-color': 'Canvas',
            '--spark-radio-button-pressed-unselected-bg-color': 'Canvas',
            '--spark-radio-button-selected-bg-color': 'Canvas',
            '--spark-radio-button-enabled-unselected-bg-color': 'Canvas',
            '--spark-radio-button-unselected-bg-color': 'Canvas',
            [`& input:checked ~ .${radioButton.input.$}`]: {
                forcedColorAdjust: 'none'
            }
        }
    }
});
