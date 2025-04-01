import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    color: palette.themeLightGray700,
    colorActive: palette.themeLightGray900,
    colorActiveBorder: palette.classicBlue,
    colorActiveBackground: palette.themeLightGray50,
    colorDisabled: palette.themeLightGray600,
    colorDisabledBorder: palette.themeLightGray400,
    colorDisabledBackground: palette.themeLightGray100,
    colorBackground: palette.themeLightGray100,
    colorGhostBorder: palette.themeLightGray400,
    colorHoverBackground: palette.themeLightGray200
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    color: palette.themeDarkGray700,
    colorActive: palette.themeDarkGray900,
    colorActiveBorder: palette.energyBlue,
    colorActiveBackground: palette.themeDarkGray200,
    colorDisabled: palette.themeDarkGray600,
    colorDisabledBorder: palette.themeDarkGray400,
    colorDisabledBackground: palette.themeDarkGray200,
    colorBackground: palette.themeDarkGray50,
    colorGhostBorder: palette.themeDarkGray400,
    colorHoverBackground: palette.themeDarkGray200
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
