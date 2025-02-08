import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    backgroundColor: palette.themeLightGray400,
    gradientColorZero: rgba(palette.themeLightGray50, 0),
    gradientColorMiddle: rgba(palette.themeLightGray50, 0.5),
    cardAvatarBorderColor: palette.themeLightGray50
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    backgroundColor: palette.themeDarkGray200,
    gradientColorZero: rgba(palette.themeLightGray50, 0),
    gradientColorMiddle: rgba(palette.themeLightGray50, 0.1),
    cardAvatarBorderColor: palette.themeDarkGray50
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
