import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { darkMode as inputDarkMode, mode as inputMode } from '../input/modes';
import { prefix } from './properties';
export const mode = token({
    transparent: palette.transparent,
    color: palette.themeLightGray700,
    colorHover: palette.themeLightGray800,
    colorValid: palette.mossShade1,
    colorInvalid: inputMode.colorInvalid,
    colorDisabled: palette.themeLightGray500,
    coloStartIcon: palette.themeLightGray800,
    colorActionIcon: palette.themeLightGray900,
    colorDisabledIcon: inputMode.colorDisabled,
    borderColor: inputMode.borderColor,
    splitColor: palette.themeLightGray400,
    interiorButton: {
        color: palette.themeLightGray900,
        focus: {
            backroundColor: palette.classicBlueShade1,
            color: palette.themeLightGray50
        }
    },
    focus: {
        outlineColor: palette.classicBlueShade1
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    transparent: palette.transparent,
    color: palette.themeDarkGray700,
    colorHover: palette.themeDarkGray800,
    colorInvalid: inputDarkMode.colorInvalid,
    colorDisabled: palette.themeDarkGray500,
    coloStartIcon: palette.themeDarkGray800,
    colorActionIcon: palette.themeDarkGray900,
    colorDisabledIcon: inputMode.colorDisabled,
    borderColor: inputMode.borderColor,
    splitColor: palette.themeDarkGray400,
    interiorButton: {
        color: palette.themeDarkGray900,
        focus: {
            backroundColor: palette.energyBlue,
            color: palette.themeDarkGray50
        }
    },
    focus: {
        outlineColor: palette.energyBlueTint1
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
