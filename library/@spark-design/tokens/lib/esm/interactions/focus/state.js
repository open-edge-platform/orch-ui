import { component } from '../../setup';
import { mode } from './modes';
import { properties } from './properties';
export const customFocus = {
    outlineWidth: properties.outlineWidthFinalPrimary,
    outlineStyle: 'solid',
    outlineColor: mode.colorFocusPrimary,
    outlineOffset: properties.outlineWidthFinalBackup,
    boxShadow: `${properties.boxShadowX} ${properties.boxShadowY} ${properties.boxShadowBlurRadius}
calc(
  ${properties.outlineWidthFinalPrimary} +
  ${properties.outlineWidthFinalBackup} +
  ${properties.outlineWidthFinalExtra}
) ${mode.colorFocusBackup}`,
    position: 'relative',
    zIndex: 1
};
export const customFocusUndo = {
    outlineWidth: 'revert',
    outlineStyle: 'revert',
    outlineColor: 'revert',
    outlineOffset: 'revert',
    boxShadow: 'revert',
    position: 'revert',
    zIndex: 'revert'
};
export const customFocusSuppress = {
    outline: `${properties.customFocusSuppressOutline} solid transparent`,
    boxShadow: 'none'
};
export const customFocusSnapInit = {
    outlineWidth: properties.outlineWidthInitPrimary,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    outlineOffset: properties.outlineWidthInitBackup,
    boxShadow: `${properties.boxShadowX} ${properties.boxShadowY} ${properties.boxShadowBlurRadius}
  calc(
    ${properties.outlineWidthFinalPrimary} +
    ${properties.outlineWidthInitBackup} +
    ${properties.outlineWidthFinalExtra}
  ) transparent`,
    transition: `
  box-shadow ${properties.snapTransitionDuration} ${properties.snapTransitionTimingFunction},
  outline ${properties.snapTransitionDuration} ${properties.snapTransitionTimingFunction},
  outline-offset ${properties.snapTransitionDuration} ${properties.snapTransitionTimingFunction},
  background-color ${properties.snapTransitionDuration} ${properties.snapTransitionTimingFunction}`,
    WebkitTransform: 'translate3d(0,0,0)'
};
export const customFocusSnapBlur = {
    transitionDuration: '0s',
    transitionDelay: '0s'
};
export const customFocusBackground = {
    backgroundColor: mode.colorFocusBackground,
    color: mode.colorFocusForeground
};
export const customFocusBackgroundUndo = {
    backgroundColor: 'revert',
    color: 'revert'
};
const focusBase = component({
    self: {},
    within: {},
    adjacent: {},
    slider: {},
    snap: customFocusSnapInit,
    background: {},
    suppress: {}
}, {
    className: 'spark-focus'
});
export const focus = focusBase.fork({
    [`&.${focusBase.suppress.$}:focus`]: customFocusSuppress,
    [`&.${focusBase.self.$}:focus`]: customFocus,
    [`&.${focusBase.self.$}.${focusBase.snap.$}:not(:focus)`]: customFocusSnapBlur,
    [`&.${focusBase.self.$}.${focusBase.background.$}:focus`]: customFocusBackground,
    [`&.${focusBase.within.$}:focus-within`]: customFocus,
    [`&.${focusBase.within.$}.${focusBase.snap.$}:not(:focus-within)`]: customFocusSnapBlur,
    [`&.${focusBase.within.$}.${focusBase.background.$}:focus-within`]: customFocusBackground,
    [`&.${focusBase.adjacent.$}:focus + &`]: customFocus,
    [`&.${focusBase.adjacent.$}:not(:focus) + &.${focusBase.snap.$}`]: customFocusSnapBlur,
    [`&.${focusBase.adjacent.$}:focus + &.${focusBase.background.$}`]: customFocusBackground,
    [`&:where(.${focusBase.slider.$}):focus::-webkit-slider-thumb`]: customFocus,
    [`&:where(.${focusBase.slider.$}.${focusBase.snap.$})::-webkit-slider-thumb`]: customFocusSnapInit,
    [`&:where(.${focusBase.slider.$}.${focusBase.snap.$}):not(:focus)::-webkit-slider-thumb`]: customFocusSnapBlur,
    [`&:where(.${focusBase.slider.$}.${focusBase.background.$}):focus::-webkit-slider-thumb`]: customFocusBackground
});
