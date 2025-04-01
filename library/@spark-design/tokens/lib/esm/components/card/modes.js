import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
import { CardOrientation, CardVariant } from './types';
export const mode = token({
    color: palette.themeLightGray900,
    imageContainerBorderBottom: palette.themeLightGray400,
    checkboxContainerBackground: rgba(palette.themeLightGray50, 0.87),
    checkboxCheckedCardBorderColor: palette.classicBlue,
    checkboxCheckedCardBackgroundColorOverlay: rgba(palette.classicBlue, 0.12),
    [CardOrientation.Vertical]: {
        avatar: {
            borderColor: palette.themeLightGray50
        },
        subTextColor: palette.themeLightGray800,
        mainTextColor: palette.themeLightGray900
    },
    [CardOrientation.Horizontal]: {
        subTextColor: palette.themeLightGray800,
        mainTextColor: palette.themeLightGray900
    },
    [CardVariant.Normal]: {
        borderColor: palette.themeLightGray200,
        hover: {
            borderColor: palette.themeLightGray400
        }
    },
    [CardVariant.Ghost]: {
        borderColor: palette.transparent,
        hover: {
            borderColor: palette.themeLightGray400
        }
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    color: palette.themeDarkGray900,
    imageContainerBorderBottom: palette.themeDarkGray200,
    checkboxContainerBackground: rgba(palette.themeDarkGray50, 0.87),
    checkboxCheckedCardBorderColor: palette.energyBlue,
    checkboxCheckedCardBackgroundColorOverlay: rgba(palette.energyBlue, 0.12),
    [CardOrientation.Vertical]: {
        avatar: {
            borderColor: palette.themeDarkGray50
        },
        subTextColor: palette.themeDarkGray800,
        mainTextColor: palette.themeDarkGray900
    },
    [CardOrientation.Horizontal]: {
        subTextColor: palette.themeDarkGray800,
        mainTextColor: palette.themeDarkGray900
    },
    [CardVariant.Normal]: {
        borderColor: palette.themeDarkGray200,
        hover: {
            borderColor: palette.themeDarkGray400
        }
    },
    [CardVariant.Ghost]: {
        borderColor: palette.transparent,
        hover: {
            borderColor: palette.themeDarkGray400
        }
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
