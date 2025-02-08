import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    classicBg: palette.classicBlue,
    darkBg: palette.themeDarkGray50,
    lightBg: palette.themeLightGray50,
    lightColor: palette.themeLightGray900,
    color: palette.themeLightGray50,
    borderLight: palette.themeLightGray200,
    backgroundHoverButton: palette.classicBlueShade1,
    buttonColorAction: palette.themeLightGray50
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    classicBg: palette.classicBlueShade1,
    darkBg: palette.themeDarkGray200,
    lightBg: palette.themeDarkGray200,
    color: palette.themeDarkGray900,
    borderLight: palette.themeDarkGray200,
    lightColor: palette.themeDarkGray900,
    backgroundHoverButton: palette.energyBlueTint1,
    buttonColorAction: palette.themeDarkGray50
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
