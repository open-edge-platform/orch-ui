import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    enabledUnselectedBgColor: palette.themeLightGray50,
    enabledUnselectedBorderColor: palette.themeLightGray800,
    unselectedBgColor: palette.themeLightGray50,
    selectedBgColor: palette.themeLightGray50,
    textColorDisabled: palette.themeLightGray500,
    textColor: palette.themeLightGray900,
    disabledBg: palette.themeLightGray50,
    disabledBorder: palette.themeLightGray500,
    enableSelectedBorderColor: palette.classicBlue,
    enableSelectedBgColor: palette.themeLightGray50,
    hoverUnselectedBorderColor: palette.themeLightGray900,
    hoverSelectedBorderColor: palette.classicBlueShade1,
    pressedUnselectedBgColor: palette.themeLightGray50,
    pressedUnselectedBorderColor: palette.themeLightGray900,
    pressedSelectedBgColor: palette.themeLightGray50,
    pressedSelectedBorderColor: palette.classicBlueShade1,
    transparentColor: palette.transparent
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    enabledUnselectedBgColor: palette.themeDarkGray50,
    enabledUnselectedBorderColor: palette.themeDarkGray800,
    unselectedBgColor: palette.themeDarkGray50,
    selectedBgColor: palette.themeDarkGray50,
    textColorDisabled: palette.themeDarkGray500,
    textColor: palette.themeDarkGray900,
    disabledBg: palette.themeDarkGray50,
    disabledBorder: palette.themeDarkGray500,
    enableSelectedBorderColor: palette.energyBlue,
    enableSelectedBgColor: palette.themeDarkGray50,
    hoverUnselectedBorderColor: palette.themeDarkGray900,
    hoverSelectedBorderColor: palette.energyBlueShade1,
    pressedUnselectedBgColor: palette.themeDarkGray50,
    pressedUnselectedBorderColor: palette.themeDarkGray900,
    pressedSelectedBgColor: palette.themeDarkGray50,
    pressedSelectedBorderColor: palette.energyBlueShade1,
    transparentColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
