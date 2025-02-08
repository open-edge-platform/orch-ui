import { media } from '../../setup';
import { list } from './component';
export const listMedia = media({
    '@media screen and (forced-colors: active)': {
        [`${list.$}`]: {
            '--spark-list-item-focused-b-g': 'Highlight',
            '-spark-list-item-color-focused': 'HighlightText',
            [`& .${list.isSelected.$}.${list.isFocused.$} .spark-icon,
            .${list.isSelected.$}.${list.isFocused.$} .${list.itemText.$},
            .${list.isFocused.$} .${list.itemText.$}`]: {
                color: 'HighlightText',
                forcedColorAdjust: 'none'
            }
        }
    }
});
