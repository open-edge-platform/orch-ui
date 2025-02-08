import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    color: palette.themeLightGray900,
    backgroundColor: palette.themeLightGray200,
    borderColor: palette.themeLightGray400,
    numberingColor: palette.themeLightGray900
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    color: palette.themeDarkGray900,
    backgroundColor: palette.themeDarkGray200,
    borderColor: palette.themeDarkGray400,
    numberingColor: palette.themeDarkGray900
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
