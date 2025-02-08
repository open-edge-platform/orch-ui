import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    color: palette.themeLightGray900,
    colorDisabled: palette.themeLightGray500,
    colorPlaceholder: palette.themeLightGray700,
    colorPlaceholderHover: palette.themeLightGray800,
    colorInvalid: palette.coralShade1,
    borderColor: palette.themeLightGray600,
    borderColorHover: palette.themeLightGray800,
    borderColorFocus: palette.classicBlue,
    borderColorDisabled: palette.themeLightGray300,
    borderColorActive: palette.themeLightGray600,
    bgColorOutline: palette.themeLightGray50,
    bgColorOutlineDisabled: palette.themeLightGray200,
    transparentColor: palette.transparent
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    color: palette.themeDarkGray900,
    colorDisabled: palette.themeDarkGray500,
    colorPlaceholder: palette.themeDarkGray700,
    colorPlaceholderHover: palette.themeDarkGray800,
    colorInvalid: palette.coralTint1,
    borderColor: palette.themeDarkGray600,
    borderColorHover: palette.themeDarkGray800,
    borderColorFocus: palette.energyBlue,
    borderColorDisabled: palette.themeDarkGray300,
    borderColorActive: palette.themeDarkGray600,
    bgColorOutline: palette.themeDarkGray50,
    bgColorOutlineDisabled: palette.themeDarkGray200,
    transparentColor: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
