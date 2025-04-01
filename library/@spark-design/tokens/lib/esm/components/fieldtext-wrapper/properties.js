import { token } from '../../setup';
export const prefix = 'spark-fieldtext-wrapper';
export const properties = token({
    columnGap: '4px',
    labelGap: '8px',
    l: {
        helpLabelFontSize: '14px',
        disabledLabelFontSize: '12px',
        invalidLabelFontSize: '14px'
    },
    m: {
        helpLabelFontSize: '12px',
        disabledLabelFontSize: '11px',
        invalidLabelFontSize: '12px'
    },
    s: {
        helpLabelFontSize: '11px',
        disabledLabelFontSize: '10px',
        invalidLabelFontSize: '11px'
    }
}, {
    prefix: prefix
});
