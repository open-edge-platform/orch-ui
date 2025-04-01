import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    color: palette.themeLightGray900,
    colorActive: palette.classicBlue,
    colorDisabled: rgba(palette.themeLightGray900, 0.34),
    dividerColor: rgba(palette.themeLightGray900, 0.12),
    background: {
        color: 'transparent',
        zebraColor: rgba(palette.themeLightGray900, 0.02),
        hover: palette.themeLightGray200,
        active: rgba(palette.themeLightGray900, 0.03),
        activeHover: rgba(palette.themeLightGray900, 0.06)
    },
    item: {
        focusedBG: palette.classicBlueShade1,
        colorFocused: palette.themeLightGray50
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    color: palette.themeDarkGray900,
    colorActive: palette.energyBlue,
    colorDisabled: rgba(palette.themeDarkGray900, 0.34),
    dividerColor: rgba(palette.themeDarkGray900, 0.12),
    background: {
        zebraColor: rgba(palette.themeDarkGray900, 0.02),
        hover: palette.themeDarkGray200,
        active: rgba(palette.themeDarkGray900, 0.03),
        activeHover: rgba(palette.themeDarkGray900, 0.06)
    },
    item: {
        focusedBG: palette.energyBlueTint1,
        colorFocused: palette.themeDarkGray50
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
