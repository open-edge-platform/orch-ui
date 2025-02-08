import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const lightMode = token({}, {
    prefix: prefix
});
export const darkMode = lightMode.fork({});
export const modes = {
    [ThemeMode.Light]: lightMode,
    [ThemeMode.Dark]: darkMode
};
