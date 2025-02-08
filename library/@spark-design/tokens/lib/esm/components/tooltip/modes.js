import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    backgroundColor: palette.themeDarkGray200,
    color: palette.themeLightGray50,
    tipColor: palette.themeDarkGray200
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    backgroundColor: palette.themeDarkGray900,
    color: palette.themeLightGray900,
    tipColor: palette.themeDarkGray900
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
