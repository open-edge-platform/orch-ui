import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    disabledColor: palette.themeLightGray600
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    disabledColor: palette.themeDarkGray600
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
