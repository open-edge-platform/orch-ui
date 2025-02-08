import { component } from '../../setup';
import { mode } from './modes';
import { prefix } from './properties';
export const toggleButton = component({
    clickedGhost: {
        color: mode.ghostColor,
        backgroundColor: mode.ghostBgColor,
        borderColor: mode.ghostBorderColor
    }
}, {
    className: prefix
});
