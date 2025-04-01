import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    regular: {
        default: {
            textColor: palette.themeDarkGray50,
            borderColor: palette.white,
            backgroundColor: palette.white,
            iconColor: palette.themeDarkGray50
        },
        success: {
            textColor: palette.themeDarkGray50,
            borderColor: palette.moss,
            backgroundColor: palette.moss,
            iconColor: palette.moss
        },
        warning: {
            textColor: palette.themeDarkGray50,
            borderColor: palette.daisyShade1,
            backgroundColor: palette.daisyShade1,
            iconColor: palette.daisyShade1
        },
        white: {
            textColor: palette.themeDarkGray50,
            borderColor: palette.themeLightGray300,
            backgroundColor: palette.white
        },
        grey: {
            textColor: palette.themeDarkGray50,
            borderColor: palette.themeLightGray400,
            backgroundColor: palette.themeLightGray400
        },
        info: {
            textColor: palette.white,
            borderColor: palette.classicBlue,
            backgroundColor: palette.classicBlue,
            iconColor: palette.classicBlue
        },
        error: {
            textColor: palette.white,
            borderColor: palette.coralShade1,
            backgroundColor: palette.coralShade1,
            iconColor: palette.coralShade1
        },
        black: {
            textColor: palette.white,
            borderColor: palette.themeDarkGray50,
            backgroundColor: palette.themeDarkGray50
        }
    },
    outlined: {
        textColor: palette.themeDarkGray50,
        backgroundColor: palette.transparent
    }
}, {
    prefix
});
export const darkMode = mode.fork({
    regular: {
        default: {
            textColor: palette.white,
            borderColor: palette.themeDarkGray50,
            backgroundColor: palette.themeDarkGray50
        }
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: darkMode
};
