import { global } from '../setup';
import { fontFamily, fontSize, letterSpacing, lineHeight } from '../typography';
export const globalPage = global({
    '@global body': {
        fontSize: fontSize[100],
        lineHeight: lineHeight.text,
        letterSpacing: letterSpacing.zero,
        fontFamily: `${fontFamily.intelOneText}`,
        fontWeight: 'normal'
    }
});
