import { component } from '../setup';
import { fontFamily, fontSize, letterSpacing, lineHeight } from './properties';
import { prefix } from './properties';
export const fonts = component({
    25: {
        fontSize: fontSize[25],
        lineHeight: lineHeight.text,
        letterSpacing: letterSpacing.small,
        fontFamily: fontFamily.intelOneText,
        fontWeight: 'normal'
    },
    50: {
        fontSize: fontSize[50],
        lineHeight: lineHeight.text,
        letterSpacing: letterSpacing.small,
        fontFamily: fontFamily.intelOneText,
        fontWeight: 'normal'
    },
    75: {
        fontSize: fontSize[75],
        lineHeight: lineHeight.text,
        letterSpacing: letterSpacing.zero,
        fontFamily: fontFamily.intelOneText,
        fontWeight: 'normal'
    },
    100: {
        fontSize: fontSize[100],
        lineHeight: lineHeight.text,
        letterSpacing: letterSpacing.zero,
        fontFamily: fontFamily.intelOneText,
        fontWeight: 'normal'
    },
    ...[200, 300, 350, 400, 500, 600, 700].reduce((acc, el) => ({
        ...acc,
        [el]: {
            fontSize: fontSize[el],
            lineHeight: lineHeight.heading,
            letterSpacing: letterSpacing.zero,
            fontFamily: fontFamily.intelOneDisplay,
            fontWeight: 'normal'
        }
    }), {})
}, {
    className: prefix
});
