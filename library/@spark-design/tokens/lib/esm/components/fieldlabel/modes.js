import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    textColor: palette.themeLightGray800,
    textDisabledColor: palette.themeLightGray600
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    textColor: palette.themeDarkGray800,
    textDisabledColor: palette.themeDarkGray600
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
