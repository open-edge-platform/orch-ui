import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    textColor: palette.themeLightGray900,
    background: palette.themeLightGray50,
    popoverShadowColor: rgba(palette.themeLightGray900, 0.25),
    underlayColor: palette.transparent
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    textColor: palette.themeDarkGray900,
    background: palette.themeDarkGray50,
    popoverShadowColor: rgba(palette.themeDarkGray900, 0.25),
    underlayColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
