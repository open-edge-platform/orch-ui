import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    colorOn: palette.classicBlue,
    colorDisabled: palette.themeLightGray500,
    colorInvalid: palette.coralShade1,
    iconColor: palette.themeLightGray50,
    uncheckedBorderColor: palette.themeLightGray800,
    uncheckedHoverBorderColor: palette.themeLightGray900
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    colorOn: palette.energyBlue,
    colorDisabled: palette.themeDarkGray500,
    iconColor: palette.themeDarkGray50,
    uncheckedBorderColor: palette.themeDarkGray800,
    uncheckedHoverBorderColor: palette.themeDarkGray900
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
