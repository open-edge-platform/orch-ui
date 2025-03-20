import { palette } from '../../palette';
import { token } from '../../setup';
export const prefix = 'spark-rosin-flex';
export const properties = token({
    borderColor: palette.classicBlue,
    verticalAlignment: {
        top: 'flex-start',
        middle: 'center',
        bottom: 'flex-end'
    },
    col: {
        ['1']: '8.3%',
        ['2']: '16.6%',
        ['3']: '25%',
        ['4']: '33.3%',
        ['5']: '41.6%',
        ['6']: '50%',
        ['7']: '58.3%',
        ['8']: '66.6%',
        ['9']: '75%',
        ['10']: '83.3%',
        ['11']: '91.6%',
        ['12']: '100%'
    }
}, {
    prefix: prefix
});
