import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    trackBackgroundColor: palette.themeLightGray600,
    trackColor: palette.classicBlue,
    iconColor: palette.themeLightGray800,
    valueTextColor: palette.themeLightGray800,
    thumbColor: palette.classicBlue,
    shadowColor: rgba(palette.themeLightGray900, 0.24),
    thumbColorHover: palette.classicBlueShade1,
    thumbColorActive: palette.classicBlueShade2,
    doubleValueTextColor: palette.themeLightGray700,
    disabledColor: palette.themeLightGray400,
    labelColor: palette.themeLightGray700,
    transparentColor: palette.transparent
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    trackBackgroundColor: palette.themeDarkGray600,
    trackColor: palette.energyBlue,
    iconColor: palette.themeDarkGray800,
    valueTextColor: palette.themeDarkGray800,
    thumbColor: palette.energyBlue,
    shadowColor: rgba(palette.themeDarkGray900, 0.1),
    thumbColorHover: palette.energyBlueTint1,
    thumbColorActive: palette.energyBlueTint2,
    disabledColor: palette.themeDarkGray400,
    labelColor: palette.themeDarkGray700,
    transparentColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
