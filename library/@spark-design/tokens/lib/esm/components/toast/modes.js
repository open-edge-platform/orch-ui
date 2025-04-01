import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { monochrome, monochromeDark } from '../button/monochrome';
import { prefix } from './properties';
export const mode = token({
    iconColor: monochrome.ghost.color,
    state: {
        default: palette.carbonTint2,
        danger: palette.coral,
        success: palette.moss,
        info: palette.energyBlue,
        warning: palette.daisy
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    iconColor: monochromeDark.ghost.color,
    state: {
        default: palette.carbonTint2,
        danger: palette.coral,
        success: palette.moss,
        info: palette.energyBlue,
        warning: palette.daisy
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
