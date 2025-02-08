import { token } from '../setup';
export const prefix = 'spark-font';
export const globalFontFamily = token({
    appleSystem: '-apple-system',
    blinkMacSystemFont: 'BlinkMacSystemFont',
    segoeUi: `'Segoe UI'`,
    roboto: 'Roboto',
    helvetica: 'Helvetica',
    Arial: 'Arial',
    sansSerif: 'sans-serif',
    appleColorEmoji: `'Apple Color Emoji'`,
    segoeUiEmoji: `'Segoe UI Emoji'`,
    segoeUiSymbol: `'Segoe UI Symbol'`
}, {
    prefix: 'global-font'
});
export const fontFamily = token({
    intelOneText: [
        'IntelOneText',
        globalFontFamily.appleSystem,
        globalFontFamily.blinkMacSystemFont,
        globalFontFamily.segoeUi,
        globalFontFamily.roboto,
        globalFontFamily.helvetica,
        globalFontFamily.Arial,
        globalFontFamily.sansSerif,
        globalFontFamily.appleColorEmoji,
        globalFontFamily.segoeUiEmoji,
        globalFontFamily.segoeUiSymbol
    ],
    intelOneDisplay: [
        'IntelOneDisplay',
        globalFontFamily.appleSystem,
        globalFontFamily.blinkMacSystemFont,
        globalFontFamily.segoeUi,
        globalFontFamily.roboto,
        globalFontFamily.helvetica,
        globalFontFamily.Arial,
        globalFontFamily.sansSerif,
        globalFontFamily.appleColorEmoji,
        globalFontFamily.segoeUiEmoji,
        globalFontFamily.segoeUiSymbol
    ]
}, {
    prefix: prefix
});
export const fontSize = token({
    25: '0.6875rem',
    50: '0.75rem',
    75: '0.875rem',
    100: '1rem',
    200: '1.25rem',
    300: '1.5rem',
    350: '2rem',
    400: '2.25rem',
    500: '3rem',
    600: '3.75rem',
    700: '4.5rem'
}, {
    prefix: 'spark-font-size'
});
export const lineHeight = token({
    text: '1.5',
    heading: '1.3'
}, {
    prefix: 'spark-line-height'
});
export const letterSpacing = token({
    small: '0.015625rem',
    zero: '0rem'
}, {
    prefix: 'spark-letter-spacing'
});
