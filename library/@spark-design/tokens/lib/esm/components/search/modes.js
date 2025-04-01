import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    iconColor: palette.themeLightGray800
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    iconColor: palette.themeDarkGray800
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
