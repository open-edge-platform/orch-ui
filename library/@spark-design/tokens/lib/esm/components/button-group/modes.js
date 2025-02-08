import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    disabledColor: palette.themeLightGray500,
    disabledBgColor: palette.themeLightGray200,
    disabledBorderColor: palette.themeLightGray200
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    disabledColor: palette.themeDarkGray500,
    disabledBgColor: palette.themeDarkGray200,
    disabledBorderColor: palette.themeDarkGray200
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
