import { media } from '../../setup';
import { focusVisible } from '../focus-visible/state';
export const focusVisibleMedia = media({
    '@media (forced-colors: active)': {
        [`${focusVisible.$}-snap`]: {
            outlineStyle: 'revert'
        }
    }
});
