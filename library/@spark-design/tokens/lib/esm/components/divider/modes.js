import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    backgroundColor: palette.themeLightGray400
}, {
    prefix: prefix
});
export const modeDark = token({
    backgroundColor: palette.themeDarkGray400
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
