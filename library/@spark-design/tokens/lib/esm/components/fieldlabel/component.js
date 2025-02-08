import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { FieldLabelSize } from './types';
export const fieldLabelBase = component({
    isRequired: {},
    isInvalid: {},
    isDisabled: {},
    requiredIndicator: {
        position: 'relative',
        marginInlineStart: properties.asteriskGap,
        minInlineSize: '1ch'
    },
    requiredAsterisk: {
        position: 'absolute',
        insetBlockStart: '-0.1em',
        insetInlineStart: 0,
        fontSize: properties.asteriskSize,
        lineHeight: properties.asteriskLineHeight
    }
}, {
    className: prefix
});
export const fieldLabel = fieldLabelBase.fork({
    paddingInline: properties.paddingInline,
    color: mode.textColor,
    inlineSize: properties.inlineSize,
    [`&.${fieldLabelBase.isDisabled.$}`]: {
        color: `${mode.textDisabledColor} !important`
    },
    size: Object.values(FieldLabelSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            fontSize: properties[size]?.fontSize,
            lineHeight: properties[size]?.lineHeight
        }
    }), {})
});
