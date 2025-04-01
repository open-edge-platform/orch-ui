import { media } from '../../setup';
import { focus } from '../focus/state';
export const focusMedia = media({
    '@media (forced-colors: active)': {
        [`${focus.snap.$}`]: {
            outlineStyle: 'revert'
        }
    }
});
