import { token } from '../../setup';
export const properties = token({
    outlineWidthFinalExtra: '0px',
    outlineWidthFinalPrimary: '3px',
    outlineWidthFinalBackup: '3px',
    outlineWidthInitPrimary: '12px',
    outlineWidthInitBackup: '3px',
    snapTransitionDuration: '1.5s',
    snapTransitionTimingFunction: 'cubic-bezier(0.06, 0.98, 0.20, 0.99)',
    customFocusSuppressOutline: '2px',
    boxShadowX: '0px',
    boxShadowY: '0px',
    boxShadowBlurRadius: '0px'
}, {
    prefix: 'spark-focus'
});
