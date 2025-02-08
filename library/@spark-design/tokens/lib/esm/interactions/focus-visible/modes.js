import { ThemeMode, token } from '../../setup';
export const mode = token({}, {
    prefix: 'spark-focus-visible'
});
export const darkMode = mode.fork({});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
