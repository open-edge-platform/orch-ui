import { media } from '../../setup';
import { checkbox } from './component';
export const checkboxMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${checkbox.$}`]: {
            '--spark-checkbox-icon-color': 'HighlightText',
            '--spark-checkbox-color-on': 'Highlight',
            '--spark-checkbox-unchecked-border-color': 'ButtonBorder',
            '--spark-checkbox-color-disabled': 'GrayText'
        }
    }
});
