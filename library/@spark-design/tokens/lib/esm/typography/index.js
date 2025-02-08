import { fonts } from './component';
import { fontFamily, fontSize, globalFontFamily, letterSpacing, lineHeight } from './properties';
export * from './properties';
export { fonts };
export const typographyConfig = {
    components: [fonts],
    tokens: [fontFamily, globalFontFamily, fontSize, lineHeight, letterSpacing]
};
