import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    headerColor: palette.themeLightGray900,
    dragAndDropTextColor: palette.themeLightGray700,
    dragAndDropBodyIcon: palette.themeLightGray500,
    dragAndDropBodyBorderColor: rgba(palette.black, 0.12),
    dragAndDropBodyBackgroundColor: rgba(palette.themeLightGray50, 0.12),
    filesErrorBackgroundColor: palette.coralShade1,
    filesErrorColor: palette.themeLightGray50,
    filesBackgroundColor: rgba(palette.black, 0.02),
    canDropBorderColor: palette.classicBlue,
    canDropBackground: rgba(palette.energyBlue, 0.06),
    iconSuccess: palette.mossTint1
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    headerColor: palette.themeLightGray50,
    dragAndDropTextColor: palette.themeDarkGray700,
    dragAndDropBodyIcon: palette.themeDarkGray500,
    dragAndDropBodyBorderColor: rgba(palette.themeLightGray50, 0.12),
    dragAndDropBodyBackgroundColor: rgba(palette.black, 0.12),
    filesErrorBackgroundColor: palette.coralShade1,
    filesErrorColor: palette.themeLightGray50,
    filesBackgroundColor: rgba(palette.themeLightGray50, 0.02)
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
