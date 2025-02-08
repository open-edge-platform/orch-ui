import { component } from '../../setup';
import { button } from '../button';
import { dropdown } from '../dropdown';
import { prefix, properties } from './properties';
export const pagination = component({
    display: properties.base.display,
    justifyContent: properties.base.justifyContent,
    alignItems: properties.base.alignItems,
    control: {
        display: properties.control.display,
        alignItems: properties.control.alignItems,
        justifyContent: properties.control.justifyContent,
        gap: properties.control.gap,
        [`& .${button.$}`]: {
            marginInlineStart: properties.control.button.marginInlineStart,
            marginInlineEnd: properties.control.button.marginInlineEnd,
            outline: properties.control.button.outline
        },
        [`& .${dropdown.$}`]: {
            width: properties.control.dropdown.width,
            marginInlineStart: properties.control.dropdown.marginInlineStart
        }
    },
    list: {
        display: properties.list.display,
        [`& .${button.$}`]: {
            marginInline: properties.list.button.marginInline,
            outline: properties.list.button.outline
        }
    }
}, {
    className: prefix
});
