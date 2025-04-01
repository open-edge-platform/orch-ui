import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
import { BadgeVariant } from './types';
export const mode = token({
    color: palette.white,
    [BadgeVariant.Success]: {
        backgroundColor: palette.moss
    },
    [BadgeVariant.Info]: {
        backgroundColor: palette.classicBlue
    },
    [BadgeVariant.Warning]: {
        backgroundColor: palette.daisy
    },
    [BadgeVariant.Alert]: {
        backgroundColor: palette.coralShade1
    },
    [BadgeVariant.Unknown]: {
        backgroundColor: palette.carbonShade1
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    color: palette.white,
    [BadgeVariant.Success]: {
        backgroundColor: palette.moss
    },
    [BadgeVariant.Info]: {
        backgroundColor: palette.energyBlue
    },
    [BadgeVariant.Warning]: {
        backgroundColor: palette.daisy
    },
    [BadgeVariant.Alert]: {
        backgroundColor: palette.coralShade1
    },
    [BadgeVariant.Unknown]: {
        backgroundColor: palette.carbonShade1
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
