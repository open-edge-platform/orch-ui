import { component } from '../../setup';
import { mode } from './modes';
import { prefix } from './properties';
export const text = component({
    isDisabled: {
        color: mode.disabledColor
    }
}, {
    className: prefix
});
