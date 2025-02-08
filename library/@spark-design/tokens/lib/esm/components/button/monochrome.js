import { monochromePalette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefixMonochrome } from './properties';
import { ButtonVariant } from './types';
export const monochrome = token({
    transparent: [monochromePalette.transparent],
    disabled: {
        color: [monochromePalette.themeLightGray500],
        bgColor: [monochromePalette.themeLightGray200],
        borderColor: [monochromePalette.themeLightGray200]
    },
    [ButtonVariant.Action]: {
        color: [monochromePalette.themeLightGray50],
        bgColor: [monochromePalette.themeLightGray900],
        bgColorHover: [monochromePalette.themeLightGray800],
        bgColorActive: [monochromePalette.themeLightGray700],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Primary]: {
        color: [monochromePalette.themeLightGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeLightGray200],
        bgColorActive: [monochromePalette.themeLightGray400],
        borderColor: [monochromePalette.themeLightGray900]
    },
    [ButtonVariant.Secondary]: {
        color: [monochromePalette.themeLightGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeLightGray200],
        bgColorActive: [monochromePalette.themeLightGray400],
        borderColor: [monochromePalette.themeLightGray400]
    },
    [ButtonVariant.Ghost]: {
        color: [monochromePalette.themeLightGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeLightGray200],
        bgColorActive: [monochromePalette.themeLightGray400],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Alert]: {
        color: [monochromePalette.coralShade1],
        bgColor: [monochromePalette.transparent],
        bgColorActive: [monochromePalette.coralTint2],
        bgColorHover: ['#fee9e9'],
        borderColor: [monochromePalette.coralShade1]
    },
    [ButtonVariant.AlertGhost]: {
        color: [monochromePalette.coralShade1],
        bgColor: [monochromePalette.transparent],
        bgColorHover: ['#fee9e9'],
        bgColorActive: [monochromePalette.coralTint2],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Unstyled]: {
        color: [monochromePalette.themeLightGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeLightGray800],
        bgColorActive: [monochromePalette.themeLightGray700],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.UnstyledAlert]: {
        color: [monochromePalette.coralShade1],
        bgColor: [monochromePalette.transparent],
        bgColorHover: ['#950000'],
        bgColorActive: ['#620000'],
        borderColor: [monochromePalette.transparent]
    }
}, {
    prefix: prefixMonochrome
});
export const monochromeDark = monochrome.fork({
    transparent: [monochromePalette.transparent],
    disabled: {
        color: [monochromePalette.themeDarkGray500],
        bgColor: [monochromePalette.themeDarkGray200],
        borderColor: [monochromePalette.themeDarkGray200]
    },
    [ButtonVariant.Action]: {
        color: [monochromePalette.themeDarkGray50],
        bgColor: [monochromePalette.themeDarkGray900],
        bgColorHover: [monochromePalette.themeDarkGray800],
        bgColorActive: [monochromePalette.themeDarkGray700],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Primary]: {
        color: [monochromePalette.themeDarkGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeDarkGray200],
        bgColorActive: [monochromePalette.themeDarkGray400],
        borderColor: [monochromePalette.themeDarkGray900]
    },
    [ButtonVariant.Secondary]: {
        color: [monochromePalette.themeDarkGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeDarkGray200],
        bgColorActive: [monochromePalette.themeDarkGray400],
        borderColor: [monochromePalette.themeDarkGray400]
    },
    [ButtonVariant.Ghost]: {
        color: [monochromePalette.themeDarkGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeDarkGray200],
        bgColorActive: [monochromePalette.themeDarkGray400],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Alert]: {
        color: [monochromePalette.coral],
        bgColor: [monochromePalette.transparent],
        bgColorHover: ['#3a2325'],
        bgColorActive: ['#321a1b'],
        borderColor: [monochromePalette.coral]
    },
    [ButtonVariant.AlertGhost]: {
        color: [monochromePalette.coral],
        bgColor: [monochromePalette.transparent],
        bgColorHover: ['#3a2325'],
        bgColorActive: ['#321a1b'],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.Unstyled]: {
        color: [monochromePalette.themeDarkGray900],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.themeDarkGray800],
        bgColorActive: [monochromePalette.themeDarkGray700],
        borderColor: [monochromePalette.transparent]
    },
    [ButtonVariant.UnstyledAlert]: {
        color: [monochromePalette.coral],
        bgColor: [monochromePalette.transparent],
        bgColorHover: [monochromePalette.coralTint1],
        bgColorActive: [monochromePalette.coralTint2],
        borderColor: [monochromePalette.transparent]
    }
});
export const monochromes = {
    [ThemeMode.Light]: monochrome,
    [ThemeMode.Dark]: monochromeDark
};
