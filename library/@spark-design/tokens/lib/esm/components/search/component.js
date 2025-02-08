import { component } from '../../setup';
import { button } from '../button';
import { input } from '../input';
import { textField } from '../text-field';
import { mode } from './modes';
import { prefix, properties } from './properties';
export const search = component({
    display: 'flex',
    [`& .${button.$}`]: {
        marginInlineStart: properties.searchButtonGap
    },
    [`& .${input.$}[type="search"]::-webkit-search-cancel-button`]: {
        WebkitAppearance: 'none'
    },
    [`& .${input.$}:placeholder-shown + .end-slot .clear`]: {
        opacity: properties.inputOpacity,
        pointerEvents: 'none'
    },
    [`& .${textField.$}:not(.is-disabled) [class^="intelicon"]`]: {
        color: mode.iconColor
    }
}, {
    className: prefix
});
