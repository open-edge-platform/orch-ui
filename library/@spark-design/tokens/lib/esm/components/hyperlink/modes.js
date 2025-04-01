import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
import { HyperlinkVariant } from './types';
export const mode = token({
    color: {
        [HyperlinkVariant.Primary]: {
            base: palette.classicBlue,
            hover: palette.classicBlueShade1,
            pressed: palette.classicBlueShade2,
            visited: {
                base: palette.geode,
                hover: palette.geodeShade1,
                pressed: palette.geodeShade1
            }
        },
        [HyperlinkVariant.Secondary]: {
            base: palette.themeLightGray900,
            hover: palette.themeLightGray800,
            pressed: palette.themeLightGray700,
            visited: {
                base: palette.carbonShade1,
                hover: palette.carbonShade2,
                pressed: '#0F0F0F'
            }
        }
    },
    disabledColor: palette.themeLightGray500
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    color: {
        [HyperlinkVariant.Primary]: {
            base: palette.energyBlue,
            hover: palette.energyBlueTint1,
            pressed: palette.energyBlueTint2,
            visited: {
                base: palette.geodeTint1,
                hover: palette.geodeTint2,
                pressed: palette.geodeTint2
            }
        },
        [HyperlinkVariant.Secondary]: {
            base: palette.themeDarkGray900,
            hover: palette.themeDarkGray800,
            pressed: palette.themeDarkGray700,
            visited: {
                base: palette.carbonTint1,
                hover: palette.carbonTint2,
                pressed: '#FEFEFE'
            }
        }
    },
    disabledColor: palette.themeDarkGray500
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
