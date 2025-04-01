import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    backgroundColor: palette.themeLightGray50,
    borderColor: palette.themeLightGray400,
    shadowColor: rgba(palette.black, 0.25),
    backdrop: {
        backgroundColor: palette.themeLightGray900
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    backgroundColor: palette.themeDarkGray50,
    shadowColor: rgba(palette.black, 0.25),
    borderColor: palette.themeDarkGray400,
    backdrop: {
        backgroundColor: palette.themeDarkGray50
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
