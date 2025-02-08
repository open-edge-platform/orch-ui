import { token } from '../../setup';
export const prefix = 'spark-scrollbar';
export const properties = token({
    thin: '4px',
    thinActive: '8px',
    blockSize: '100%',
    inlineSize: '100%',
    paddingHiddenTop: '0px',
    paddingHiddenRight: '4px',
    paddingHiddenBottom: '4px',
    paddingHiddenLeft: '0px',
    paddingOpen: '0px'
}, {
    prefix: prefix
});
