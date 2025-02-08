import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    basic: rgba(palette.black, 0.1)
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    basic: rgba(palette.black, 0.38)
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
