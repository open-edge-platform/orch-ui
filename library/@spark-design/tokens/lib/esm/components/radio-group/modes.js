import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    invalidInputBg: palette.themeLightGray50,
    invalidInputBgBorderColor: palette.coralShade1
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    invalidInputBg: palette.themeDarkGray50,
    invalidInputBgBorderColor: palette.coralTint1
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
