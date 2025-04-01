import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { darkMode as inputDarkMode, mode as inputMode } from '../input/modes';
import { prefix } from './properties';
import { ComboboxVariant } from './types';
export const mode = token({
    background: palette.transparent,
    backgroundActive: palette.transparent,
    backgroundDisabled: palette.themeLightGray300,
    text: {
        color: palette.themeLightGray900,
        disabledColor: palette.themeLightGray500,
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
        color: palette.themeLightGray600,
        invalidColor: inputMode.colorInvalid,
        hoverColor: palette.themeLightGray800,
        invalidHover: '#950000',
        openedColor: palette.themeLightGray400
    },
    [ComboboxVariant.Ghost]: {
        borderBottomColor: palette.themeLightGray400
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    background: palette.transparent,
    backgroundActive: palette.transparent,
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
    [ComboboxVariant.Ghost]: {
        borderBottomColor: palette.themeDarkGray400
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
