import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { FieldTextWrapperSize } from './types';
const fieldtextWrapperBase = component({
    isInvalid: {},
    isDisabled: {},
    description: {}
}, {
    className: prefix
});
export const fieldtextWrapper = fieldtextWrapperBase.fork({
    display: 'flex',
    flexDirection: 'column',
    gap: properties.columnGap,
    [`& .${fieldtextWrapperBase.description.$}`]: {
        color: mode.descriptionColor,
        display: 'flow-root'
    },
    [`& .${fieldtextWrapperBase.isInvalid.$}`]: {
        gap: properties.labelGap,
        color: mode.colorInvalid,
        display: 'flex',
        alignItems: 'center'
    },
    [`& .${fieldtextWrapperBase.isDisabled.$}`]: {
        display: 'flow-root',
        color: `${mode.disabledColor} !important`
    },
    size: Object.values(FieldTextWrapperSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            helpLabel: {
                fontSize: `${properties[size]?.helpLabelFontSize} !important`
            },
            disabledLabel: {
                fontSize: `${properties[size]?.disabledLabelFontSize} !important`
            },
            invalidLabel: {
                fontSize: `${properties[size]?.invalidLabelFontSize} !important`
            }
        }
    }), {})
});
