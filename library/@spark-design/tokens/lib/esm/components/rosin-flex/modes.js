import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const lightMode = token({
    backgroundPrimary: palette.classicBlue
}, {
    prefix: prefix
});
export const darkMode = lightMode.fork({
    backgroundPrimary: palette.themeDarkGray50
});
export const modes = {
    [ThemeMode.Light]: lightMode,
    [ThemeMode.Dark]: darkMode
};
