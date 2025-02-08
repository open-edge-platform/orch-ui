import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    ghostColor: palette.themeLightGray900,
    ghostBgColor: palette.themeLightGray400,
    ghostBorderColor: palette.transparent
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    ghostColor: palette.themeDarkGray900,
    ghostBgColor: palette.themeDarkGray400,
    ghostBorderColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
