import { media } from '../../setup';
import { toggleSwitch } from './component';
export const toggleSwitchMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${toggleSwitch.$}`]: {
            '--spark-toggle-switch-selector-color-off': 'ButtonBorder',
            '--spark-toggle-switch-selector-color-disabled': 'GrayText',
            '--spark-toggle-switch-background-color-off': 'ButtonBorder',
            '--spark-toggle-switch-background-color-on': 'Highlight',
            '--spark-toggle-switch-background-color-disabled': 'GrayText',
            '--spark-toggle-switch-background-color-invalid': 'ButtonBorder',
            [`& input.${toggleSwitch.isInvalid.$}`]: {
                [`&:checked + .${toggleSwitch.selector.$}`]: {
                    borderInlineColor: 'Highlight',
                    borderBlockColor: 'Highlight',
                    background: 'Highlight',
                    '&:after': {
                        background: 'Canvas'
                    }
                }
            }
        }
    }
});
