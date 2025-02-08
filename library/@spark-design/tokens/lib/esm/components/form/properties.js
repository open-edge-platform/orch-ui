import { token } from '../../setup';
import { FormSize, FormVariant } from './types';
export const properties = token({
    base: {
        sectionElementsSpacing: '16px'
    },
    [FormSize.Small]: {
        padding: '24px'
    },
    [FormSize.Medium]: {
        padding: '32px'
    },
    [FormSize.Large]: {
        padding: '40px'
    },
    [FormVariant.Normal]: {},
    [FormVariant.Ghost]: {
        padding: '0'
    }
}, {
    prefix: 'spark-form'
});
