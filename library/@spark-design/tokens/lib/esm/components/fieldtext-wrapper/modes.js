import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { darkMode as inputDarkMode, mode as inputMode } from '../input/modes';
import { prefix } from './properties';
export const mode = token({
    colorInvalid: inputMode.colorInvalid,
    disabledColor: palette.themeLightGray900,
    descriptionColor: palette.themeLightGray800
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    colorInvalid: inputDarkMode.colorInvalid,
    disabledColor: palette.themeDarkGray900,
    descriptionColor: palette.themeDarkGray800
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
