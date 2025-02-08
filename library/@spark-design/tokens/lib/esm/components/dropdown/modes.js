import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { darkMode as inputDarkMode, mode as inputMode } from '../input/modes';
import { prefix } from './properties';
import { DropdownVariant } from './types';
export const mode = token({
    backgroundDisabled: palette.themeLightGray300,
    text: {
        color: inputMode.color,
        disabledColor: inputMode.colorDisabled,
        invalidColor: inputMode.colorInvalid,
        placeholderColor: palette.themeLightGray900,
        selectedColor: palette.themeLightGray900
    },
    button: {
        disabledBackground: palette.transparent,
        focusOutlineColor: palette.classicBlueShade1,
        disabledColor: palette.themeLightGray500,
        disabledTextColor: palette.themeLightGray500
    },
    border: {
        color: inputMode.borderColor,
        invalidColor: inputMode.colorInvalid,
        hoverColor: inputMode.borderColorHover,
        invalidHover: '#950000',
        openedColor: palette.themeLightGray400
    },
    [DropdownVariant.Ghost]: {
        borderBottomColor: palette.themeLightGray400
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    backgroundDisabled: palette.themeDarkGray200,
    text: {
        color: palette.themeDarkGray900,
        disabledColor: palette.themeDarkGray500,
        invalidColor: inputDarkMode.colorInvalid,
        placeholderColor: palette.themeDarkGray900,
        selectedColor: palette.themeDarkGray900
    },
    button: {
        disabledBackground: palette.transparent,
        focusOutlineColor: palette.energyBlueTint1,
        disabledColor: palette.themeDarkGray300,
        disabledTextColor: palette.themeDarkGray500
    },
    border: {
        color: palette.themeDarkGray600,
        invalidColor: inputDarkMode.colorInvalid,
        hoverColor: palette.themeDarkGray400,
        invalidHover: palette.coralTint1,
        openedColor: palette.themeDarkGray400
    },
    [DropdownVariant.Ghost]: {
        borderBottomColor: palette.themeDarkGray400
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
