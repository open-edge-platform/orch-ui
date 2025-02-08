import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    backgroundColorOn: palette.classicBlue,
    backgroundColorOff: palette.themeLightGray900,
    backgroundColorDisabled: palette.themeLightGray500,
    backgroundColorInvalid: palette.coralShade1,
    colorTransparent: palette.transparent,
    selectorColorOff: palette.themeLightGray900,
    selectorColorOn: palette.themeLightGray50,
    selectorColorDisabled: palette.themeLightGray500
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    backgroundColorOn: palette.energyBlue,
    backgroundColorOff: palette.themeDarkGray900,
    backgroundColorDisabled: palette.themeDarkGray500,
    backgroundColorInvalid: palette.coralTint1,
    colorTransparent: palette.transparent,
    selectorColorOff: palette.themeDarkGray900,
    selectorColorOn: palette.themeDarkGray50,
    selectorColorDisabled: palette.themeDarkGray500
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
