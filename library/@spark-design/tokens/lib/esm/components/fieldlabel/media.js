import { media } from '../../setup';
import { fieldLabel } from './component';
export const fieldLabelMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${fieldLabel.$}`]: {
            '--spark-fieldlabel-text-disabled-color': 'GrayText'
        }
    }
});
