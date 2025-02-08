import { token } from '../setup';
import { Breakpoints } from './types';
export const breakpoint = token({
    [Breakpoints.Mobile]: '396px',
    [Breakpoints.Tablet]: '808px',
    [Breakpoints.Laptop]: '1440px',
    [Breakpoints.Desktop]: '1920px'
}, {
    prefix: 'spark-breakpoint'
});
export const breakpointConfig = {
    tokens: [breakpoint]
};
