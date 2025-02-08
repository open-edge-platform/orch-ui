import { component } from '../../setup';
import { mode } from './modes';
import { properties } from './properties';
import { FormSize, FormVariant } from './types';
export const baseForm = component({
    backgroundColor: mode.backgroundColor
}, {
    className: 'spark-form'
});
export const form = baseForm.fork({
    size: Object.values(FormSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`&`]: {
                paddingBlock: properties[size].padding,
                paddingInline: properties[size].padding
            },
            [`& section`]: {
                marginBlock: properties[size].padding
            },
            [`& section > *`]: {
                marginBlock: properties.base.sectionElementsSpacing
            }
        }
    }), {}),
    variant: {
        [FormVariant.Ghost]: {
            [`&`]: {
                paddingInline: properties[FormVariant.Ghost].padding
            }
        },
        [FormVariant.Normal]: {
            [`&`]: {}
        }
    }
});
