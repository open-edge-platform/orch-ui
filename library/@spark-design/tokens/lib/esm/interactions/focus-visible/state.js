import { component } from '../../setup';
import { customFocus, customFocusBackground, customFocusBackgroundUndo, customFocusSnapBlur, customFocusSnapInit, customFocusSuppress, customFocusUndo } from '../focus/state';
const base = component({
    self: {},
    within: {},
    adjacent: {},
    slider: {},
    snap: customFocusSnapInit,
    background: {},
    suppress: {}
}, {
    className: 'spark-focus-visible'
});
export const focusVisible = base.fork({
    [`&.${base.suppress.$}:focus`]: customFocusSuppress,
    [`&.${base.self.$}:focus`]: customFocus,
    [`&.${base.self.$}:focus:not(:focus-visible)`]: customFocusUndo,
    [`&.${base.self.$}:focus-visible`]: customFocus,
    [`&.${base.self.$}.${base.snap.$}:not(:focus-visible)`]: customFocusSnapBlur,
    [`&.${base.self.$}.${base.background.$}:focus`]: customFocusBackground,
    [`&.${base.self.$}.${base.background.$}:focus:not(:focus-visible)`]: customFocusBackgroundUndo,
    [`&.${base.self.$}.${base.background.$}:focus-visible`]: customFocusBackground,
    [`&.${base.within.$}:has(:focus-visible)`]: customFocus,
    [`&.${base.within.$}.${base.snap.$}:not(:has(:focus-visible))`]: customFocusSnapBlur,
    [`&.${base.within.$}.${base.background.$}:has(:focus-visible)`]: customFocusBackground,
    [`&.${base.adjacent.$}:focus + &`]: customFocus,
    [`&.${base.adjacent.$}:focus:not(:focus-visible) + &`]: customFocusUndo,
    [`&.${base.adjacent.$}:focus-visible + &`]: customFocus,
    [`&.${base.adjacent.$}:not(:focus-visible) + &.${base.snap.$}`]: customFocusSnapBlur,
    [`&.${base.adjacent.$}:focus + &.${base.background.$}`]: customFocusBackground,
    [`&.${base.adjacent.$}:focus:not(:focus-visible) + &.${base.background.$}`]: customFocusBackgroundUndo,
    [`&.${base.adjacent.$}:focus-visible + &.${base.background.$}`]: customFocusBackground,
    [`&:where(.${base.slider.$}):focus::-webkit-slider-thumb`]: customFocus,
    [`&:where(.${base.slider.$}):focus:not(:focus-visible)::-webkit-slider-thumb`]: customFocusUndo,
    [`&:where(.${base.slider.$}):focus-visible::-webkit-slider-thumb`]: customFocus,
    [`&:where(.${base.slider.$}.${base.snap.$})::-webkit-slider-thumb`]: customFocusSnapInit,
    [`&:where(.${base.slider.$}.${base.snap.$}):not(:focus-visible)::-webkit-slider-thumb`]: customFocusSnapBlur,
    [`&:where(.${base.slider.$}.${base.background.$}):focus::-webkit-slider-thumb`]: customFocusBackground,
    [`&:where(.${base.slider.$}.${base.background.$}):focus:not(:focus-visible)::-webkit-slider-thumb`]: customFocusBackgroundUndo,
    [`&:where(.${base.slider.$}.${base.background.$}):focus-visible::-webkit-slider-thumb`]: customFocusBackground
});
