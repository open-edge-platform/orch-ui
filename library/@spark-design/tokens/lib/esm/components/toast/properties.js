import { token } from '../../setup';
export const prefix = 'spark-toast';
export const properties = token({
    paddingBlockSize: '0.5rem',
    paddingInline: '1rem',
    margin: '1rem',
    animationSpeed: '0.2s',
    middle: '50%',
    translateY: '3rem',
    maxWidth: '50vw',
    defaultPlacement: 0,
    defaultMessageMargin: 0,
    border: '0.1rem'
}, {
    prefix: prefix
});
