import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    trackColor: rgba(palette.themeLightGray600, 0.15),
    thumbColor: palette.themeLightGray600,
    thumbActiveColor: palette.classicBlue
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    trackColor: rgba(palette.themeDarkGray600, 0.15),
    thumbColor: palette.themeDarkGray600,
    thumbActiveColor: palette.energyBlue
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
