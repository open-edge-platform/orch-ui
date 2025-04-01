import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    ValueColor: palette.classicBlue,
    borderColor: palette.themeDarkGray600,
    barColor: rgba(palette.black, 0.06),
    barColorSuccess: palette.mossTint1,
    barColorError: palette.coralShade1,
    textColor: palette.themeLightGray800,
    maskBackground: palette.transparent,
    label: {
        topOverlay: {
            textColor: palette.themeDarkGray900,
            textColorSuccess: palette.themeLightGray900,
            textColorError: palette.themeDarkGray900
        }
    }
}, {
    prefix: prefix
});
export const darkMode = mode.fork({
    valueColor: palette.energyBlue,
    borderColor: palette.themeDarkGray600,
    barColor: rgba(palette.white, 0.06),
    barColorSuccess: palette.mossTint1,
    barColorError: palette.coralShade1,
    textColor: palette.themeLightGray50,
    label: {
        topOverlay: {
            textColor: palette.themeDarkGray50,
            textColorSuccess: palette.themeLightGray900,
            textColorError: palette.themeDarkGray900
        }
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
