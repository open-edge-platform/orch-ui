import { media } from '../../setup';
import { hyperlink } from '../hyperlink';
import { breadcrumb } from './component';
export const breadcrumbMedia = media({
    '@media (forced-colors: active)': {
        [`${breadcrumb.item.$}`]: {
            '&:not(:first-of-type)': {
                '&:before': {
                    backgroundColor: 'CanvasText'
                }
            },
            [`&.${breadcrumb.isCurrent.$}`]: {
                [`& .${hyperlink.$}.${hyperlink.primary.$}, & .${hyperlink.$}.${hyperlink.secondary.$}`]: {
                    color: `ActiveText !important`
                }
            }
        }
    }
});
