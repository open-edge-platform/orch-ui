import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    textColor: palette.themeLightGray900,
    titleColor: palette.themeLightGray900,
    unvisitedBackgroundColor: palette.themeLightGray200,
    unvisitedHoverBackgroundColor: palette.themeLightGray300,
    unvisitedPressBackgroundColor: palette.themeLightGray400,
    unvisitedColor: palette.themeLightGray900,
    activeBackgroundColor: palette.classicBlue,
    activeHoverBackgroundColor: palette.classicBlueShade1,
    activePressedBackgroundColor: palette.classicBlueShade2,
    activeColor: palette.themeLightGray50,
    invalidColor: palette.coralShade1,
    invalidHoverColor: '#950000',
    invalidPressColor: '#620000',
    transparent: palette.transparent
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    textColor: palette.themeDarkGray900,
    titleColor: palette.themeDarkGray900,
    unvisitedBackgroundColor: palette.themeDarkGray200,
    unvisitedHoverBackgroundColor: palette.themeDarkGray300,
    unvisitedPressBackgroundColor: palette.themeDarkGray400,
    unvisitedColor: palette.themeDarkGray900,
    activeBackgroundColor: palette.energyBlue,
    activeHoverBackgroundColor: palette.energyBlueTint1,
    activePressedBackgroundColor: palette.energyBlueTint2,
    activeColor: palette.themeDarkGray50,
    invalidColor: palette.coral,
    invalidHoverColor: palette.coralTint1,
    invalidPressColor: palette.coralTint2,
    transparent: palette.transparent
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
