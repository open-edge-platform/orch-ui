import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    transparent: palette.transparent,
    color: palette.themeLightGray900,
    disabledColor: palette.themeLightGray500,
    disabledBgColorOutline: palette.themeLightGray200,
    inputBgColor: palette.themeLightGray50,
    inputBgColorDisabled: palette.themeLightGray200,
    button: {
        color: palette.themeLightGray800,
        bgColor: palette.transparent,
        bgColorHover: palette.themeLightGray200,
        bgColorActive: palette.themeLightGray400
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    transparent: palette.transparent,
    color: palette.themeDarkGray900,
    disabledColor: palette.themeDarkGray500,
    disabledBgColorOutline: palette.themeDarkGray200,
    inputBgColor: palette.themeDarkGray50,
    inputBgColorDisabled: palette.themeDarkGray200,
    button: {
        color: palette.themeDarkGray800,
        bgColor: palette.transparent,
        bgColorHover: palette.themeDarkGray200,
        bgColorActive: palette.themeDarkGray400
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
