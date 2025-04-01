import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    transparent: palette.transparent,
    valueColor: palette.classicBlue,
    barColor: rgba(palette.themeDarkGray50, 0.06),
    borderColor: palette.themeDarkGray600,
    maskColor: palette.transparent
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    transparent: palette.transparent,
    valueColor: palette.energyBlue,
    barColor: rgba(palette.themeLightGray50, 0.06),
    borderColor: palette.themeLightGray600,
    maskColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
