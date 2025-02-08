import { media } from '../../setup';
import { textField } from './component';
export const textFieldMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${textField.$}`]: {
            '--spark-input-color': 'FieldText',
            '--spark-input-bg-color-outline': 'Field',
            '--spark-input-color-placeholder': 'GrayText'
        }
    }
});
