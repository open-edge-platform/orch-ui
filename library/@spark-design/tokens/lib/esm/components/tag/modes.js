import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
import { TagTheme, TagVariant } from './types';
export const mode = token({
    closeIconColor: palette.themeLightGray600,
    backgroundColor: palette.transparent,
    textColor: palette.themeLightGray900,
    hover: {
        color: palette.themeLightGray200
    },
    active: {
        color: palette.themeLightGray400
    },
    focus: {
        color: palette.themeLightGray50,
        backgroundColor: palette.transparent,
        borderColor: palette.classicBlueShade1
    },
    disabled: {
        backgroundColor: palette.themeLightGray200,
        textColor: palette.themeLightGray500
    },
    variant: {
        [TagVariant.Action]: {
            textColor: palette.themeLightGray50
        },
        [TagVariant.Primary]: {
            borderColor: palette.themeLightGray700
        },
        [TagVariant.Secondary]: {
            borderColor: palette.themeLightGray400
        }
    },
    theme: {
        [TagTheme.Classic]: {
            color: palette.classicBlue,
            hover: palette.classicBlueShade1,
            active: palette.classicBlueShade2
        },
        [TagTheme.Coral]: {
            color: palette.coral,
            hover: palette.coralTint1,
            active: palette.coralShade1
        },
        [TagTheme.Geode]: {
            color: palette.geode,
            hover: palette.geodeTint1,
            active: palette.geodeShade1
        },
        [TagTheme.Moss]: {
            color: palette.moss,
            hover: palette.mossShade1,
            active: palette.mossShade2
        },
        [TagTheme.Rust]: {
            color: palette.rust,
            hover: palette.rustTint1,
            active: palette.rustShade1
        },
        [TagTheme.Cobalt]: {
            color: palette.cobalt,
            hover: palette.cobaltTint1,
            active: palette.cobaltShade1
        }
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    closeIconColor: palette.themeLightGray50,
    backgroundColor: palette.transparent,
    textColor: palette.themeLightGray50,
    hover: {
        color: palette.themeDarkGray200
    },
    active: {
        color: palette.themeDarkGray400
    },
    focus: {
        color: palette.themeLightGray50,
        backgroundColor: palette.transparent,
        borderColor: palette.energyBlue
    },
    disabled: {
        backgroundColor: palette.themeDarkGray200,
        textColor: palette.themeDarkGray500
    },
    variant: {
        [TagVariant.Action]: {
            textColor: palette.themeDarkGray50,
            backgroundColor: palette.energyBlue,
            hover: {
                backgroundColor: palette.energyBlueShade1
            },
            active: {
                backgroundColor: palette.energyBlueShade2
            },
            focus: {
                backgroundColor: palette.energyBlueShade1
            }
        },
        [TagVariant.Primary]: {
            borderColor: palette.themeDarkGray700
        },
        [TagVariant.Secondary]: {
            borderColor: palette.themeDarkGray400
        }
    },
    theme: {
        [TagTheme.Classic]: {
            color: palette.energyBlue,
            hover: palette.energyBlueShade1,
            active: palette.energyBlueShade2
        },
        [TagTheme.Coral]: {
            color: palette.coralTint1,
            hover: palette.coral,
            active: palette.coralShade1
        },
        [TagTheme.Geode]: {
            color: palette.geodeTint1,
            hover: palette.geode,
            active: palette.geodeShade1
        },
        [TagTheme.Moss]: {
            color: palette.mossTint1,
            hover: palette.moss,
            active: palette.mossShade1
        },
        [TagTheme.Rust]: {
            color: palette.rustTint1,
            hover: palette.rust,
            active: palette.rustShade1
        },
        [TagTheme.Cobalt]: {
            color: palette.cobaltTint1,
            hover: palette.cobalt,
            active: palette.cobaltShade1
        }
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
