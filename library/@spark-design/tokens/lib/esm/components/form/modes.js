import { palette } from '../../palette';
import { ThemeMode, token } from '../../setup';
import { FormVariant } from './types';
export const mode = token({
    backgroundColor: palette.transparent,
    [FormVariant.Ghost]: {
        backgroundColor: palette.transparent
    }
}, {
    prefix: 'spark-form'
});
export const modeDark = token({
    backgroundColor: palette.transparent,
    [FormVariant.Ghost]: {
        backgroundColor: palette.transparent
    }
});
export const modes = {
    [ThemeMode.Light]: mode,
    [ThemeMode.Dark]: modeDark
};
