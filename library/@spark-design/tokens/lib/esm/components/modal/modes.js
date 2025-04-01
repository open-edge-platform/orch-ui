import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    background: palette.themeLightGray50,
    shadowColor: rgba(palette.black, 0.25),
    borderColor: palette.themeLightGray400,
    text: {
        color: palette.themeLightGray900
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    background: palette.themeDarkGray50,
    shadowColor: rgba(palette.black, 0.25),
    borderColor: palette.themeDarkGray400,
    text: {
        color: palette.themeDarkGray900
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
