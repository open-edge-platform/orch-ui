import { media } from '../../setup';
import { hyperlink } from './component';
export const hyperlinkMedia = media({
    '@media (forced-colors: active)': {
        [`${hyperlink.$}.${hyperlink.primary.$},.${hyperlink.$}.${hyperlink.secondary.$}`]: {
            color: 'LinkText',
            '&:visited': {
                color: 'VisitedText'
            },
            [`&.${hyperlink.isDisabled.$}, &.${hyperlink.isDisabled.$} > *`]: {
                color: `GrayText !important`
            }
        }
    }
});
