import { token } from '../setup';
export const space = token({
    4: '4px',
    8: '8px',
    12: '12px',
    20: '20px',
    32: '32px',
    52: '52px',
    84: '84px',
    136: '136px',
    220: '220px',
    356: '356px',
    576: '576px'
}, {
    prefix: 'spark-space'
});
export const spaceConfig = {
    tokens: [space]
};
