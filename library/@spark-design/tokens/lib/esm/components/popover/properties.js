import { token } from '../../setup';
export const prefix = 'spark-popover';
export const properties = token({
    popoverZIndex: 999,
    popoverBoxShadowX: '0px',
    popoverBoxShadowY: '2px',
    popoverBoxShadowBlurRadius: '4px',
    popoverHeight: '192px',
    popoverMinSize: '80px'
}, {
    prefix: prefix
});
