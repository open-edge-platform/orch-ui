import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { prefix } from './properties';
import { ButtonVariant } from './types';
export const mode = token({
    transparent: [palette.transparent],
    disabled: {
        color: [palette.themeLightGray500],
        bgColor: [palette.themeLightGray200],
        borderColor: [palette.themeLightGray200]
    },
    [ButtonVariant.Action]: {
        color: [palette.themeLightGray50],
        bgColor: [palette.classicBlue],
        bgColorHover: [palette.classicBlueShade1],
        bgColorActive: [palette.classicBlueShade2],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Primary]: {
        color: [palette.classicBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeLightGray200],
        bgColorActive: [palette.themeLightGray400],
        borderColor: [palette.classicBlue]
    },
    [ButtonVariant.Secondary]: {
        color: [palette.classicBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeLightGray200],
        bgColorActive: [palette.themeLightGray400],
        borderColor: [palette.themeLightGray400]
    },
    [ButtonVariant.Ghost]: {
        color: [palette.classicBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeLightGray200],
        bgColorActive: [palette.themeLightGray400],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Alert]: {
        color: [palette.coralShade1],
        bgColor: [palette.transparent],
        bgColorActive: [palette.coralTint2],
        bgColorHover: ['#fee9e9'],
        borderColor: [palette.coralShade1]
    },
    [ButtonVariant.AlertGhost]: {
        color: [palette.coralShade1],
        bgColor: [palette.transparent],
        bgColorHover: ['#fee9e9'],
        bgColorActive: [palette.coralTint2],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Unstyled]: {
        color: [palette.classicBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.classicBlueShade1],
        bgColorActive: [palette.classicBlueShade2],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.UnstyledAlert]: {
        color: [palette.coralShade1],
        bgColor: [palette.transparent],
        bgColorHover: ['#950000'],
        bgColorActive: ['#620000'],
        borderColor: [palette.transparent]
    }
}, {
    prefix: prefix
});
export const modeDark = mode.fork({
    transparent: [palette.transparent],
    disabled: {
        color: [palette.themeDarkGray500],
        bgColor: [palette.themeDarkGray200],
        borderColor: [palette.themeDarkGray200]
    },
    [ButtonVariant.Action]: {
        color: [palette.themeDarkGray50],
        bgColor: [palette.energyBlue],
        bgColorHover: [palette.energyBlueTint1],
        bgColorActive: [palette.energyBlueTint2],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Primary]: {
        color: [palette.energyBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeDarkGray200],
        bgColorActive: [palette.themeDarkGray400],
        borderColor: [palette.energyBlue]
    },
    [ButtonVariant.Secondary]: {
        color: [palette.energyBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeDarkGray200],
        bgColorActive: [palette.themeDarkGray400],
        borderColor: [palette.themeDarkGray400]
    },
    [ButtonVariant.Ghost]: {
        color: [palette.energyBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.themeDarkGray200],
        bgColorActive: [palette.themeDarkGray400],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Alert]: {
        color: [palette.coral],
        bgColor: [palette.transparent],
        bgColorHover: ['#3a2325'],
        bgColorActive: ['#321a1b'],
        borderColor: [palette.coral]
    },
    [ButtonVariant.AlertGhost]: {
        color: [palette.coral],
        bgColor: [palette.transparent],
        bgColorHover: ['#3a2325'],
        bgColorActive: ['#321a1b'],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.Unstyled]: {
        color: [palette.energyBlue],
        bgColor: [palette.transparent],
        bgColorHover: [palette.energyBlueTint1],
        bgColorActive: [palette.energyBlueTint2],
        borderColor: [palette.transparent]
    },
    [ButtonVariant.UnstyledAlert]: {
        color: [palette.coral],
        bgColor: [palette.transparent],
        bgColorHover: [palette.coralTint1],
        bgColorActive: [palette.coralTint2],
        borderColor: [palette.transparent]
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
