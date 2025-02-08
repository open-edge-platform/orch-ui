import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
export const mode = token({
    colorFocusPrimary: palette.classicBlueShade1,
    colorFocusBackup: palette.themeLightGray50,
    colorFocusBackground: palette.themeLightGray50,
    colorFocusForeground: palette.carbonShade2
}, {
    prefix: 'spark-focus'
});
export const darkMode = mode.fork({
    colorFocusPrimary: palette.energyBlueTint1,
    colorFocusBackup: palette.themeDarkGray50,
    colorFocusBackground: palette.themeDarkGray50,
    colorFocusForeground: palette.themeDarkGray900
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
