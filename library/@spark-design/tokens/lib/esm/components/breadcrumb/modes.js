import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    colorIsCurrent: palette.themeLightGray900,
    colorSplit: palette.themeLightGray700
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    colorIsCurrent: palette.themeDarkGray900,
    colorSplit: palette.themeDarkGray700
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
