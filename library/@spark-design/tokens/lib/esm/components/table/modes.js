import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
export const mode = token({
    headBackgroundColor: palette.themeLightGray75,
    rowNormalBackgroundColor: palette.themeLightGray50,
    rowBackgroundColorHover: rgba(palette.themeLightGray900, 0.03),
    rowSortArrowColor: palette.themeLightGray400,
    rowSortArrowColorHover: palette.themeLightGray400,
    rowSortArrowColorUp: palette.themeLightGray400,
    rowSortArrowColorDown: palette.themeLightGray400,
    rowZebraBackgroundColor: rgba(palette.themeLightGray900, 0.02),
    rowSelectBackgroundColor: rgba(palette.themeLightGray300, 1),
    rowSelectCheckboxColor: palette.classicBlue,
    headColor: palette.themeLightGray900,
    rowNormalBorder: rgba(palette.themeLightGray900, 0.12),
    headNormalBorder: rgba(palette.themeLightGray900, 0.34),
    rowBackgroundBolorHover: rgba(palette.themeLightGray900, 0.03),
    normalBorder: rgba(palette.themeLightGray900, 0.12),
    outlineBorder: rgba(palette.themeLightGray900, 0.12),
    outlineBoldBorder: rgba(palette.themeLightGray900, 0.34),
    cellZebraBackgroundColor: rgba(palette.themeLightGray900, 0.02),
    cellBackgroundColorFocus: rgba(palette.classicBlueTint1, 0.3),
    minimalLinkColor: palette.classicBlue,
    minimalBackgroundColorRowHover: `rgba(244, 245, 245, 1)`,
    minimalBackgroundColorHover: `rgba(233, 234, 235, 1)`,
    minimalLineColor: `rgba(226,226,228,1)`,
    minLinkActive: `rgba(0, 153, 236, 1)`,
    rowTextColor: palette.themeDarkGray50
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    headBackgroundColor: palette.themeDarkGray75,
    rowNormalBackgroundColor: palette.themeDarkGray50,
    rowZebraBackgroundColor: rgba(palette.themeLightGray50, 0.02),
    rowBackgroundColorHover: rgba(palette.themeLightGray50, 0.06),
    headColor: palette.themeDarkGray900,
    rowNormalBorder: rgba(palette.themeLightGray50, 0.12),
    headNormalBorder: rgba(palette.themeLightGray50, 0.34),
    rowBackgroundBolorHover: rgba(palette.themeLightGray50, 0.06),
    normalNorder: rgba(palette.themeLightGray50, 0.12),
    outlineBorder: rgba(palette.themeLightGray50, 0.12),
    outlineBoldBorder: rgba(palette.themeLightGray50, 0.34),
    cellZebraBackgroundColor: rgba(palette.themeLightGray50, 0.02),
    cellBackgroundColorFocus: rgba(palette.classicBlueTint1, 0.3),
    rowTextColor: palette.themeLightGray50
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
