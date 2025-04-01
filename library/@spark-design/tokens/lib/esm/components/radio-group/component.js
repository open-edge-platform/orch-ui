import { component } from '../../setup';
import { radioButtonBase } from '../radio-button/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
const rdiobtn = radioButtonBase;
export var RadioGroupOrientation;
(function (RadioGroupOrientation) {
    RadioGroupOrientation["vertical"] = "vertical";
    RadioGroupOrientation["horizontal"] = "horizontal";
})(RadioGroupOrientation || (RadioGroupOrientation = {}));
const sharedBoxShadowPropsOne = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusOne}`;
const sharedBoxShadowPropsTwo = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusTwo}`;
const sharedBoxShadowPropsThree = `
    ${properties.boxShadowX}
    ${properties.boxShadowY}
    ${properties.boxShadowBlurRadius}
    ${properties.boxShadowSpreadRadiusThree}`;
const radioGroupBase = component({
    display: 'flex',
    flexDirection: 'column',
    gap: properties.gap,
    buttonsContainer: {},
    isDisabled: {},
    isInvalid: {},
    orientation: {
        vertical: {},
        horizontal: {}
    }
}, {
    className: prefix
});
export const radioGroup = radioGroupBase.fork({
    [`& .${radioGroupBase.buttonsContainer.$}`]: {
        display: 'flex',
        [`&.${radioGroupBase.orientation.vertical.$}`]: {
            flexDirection: 'column'
        },
        [`&.${radioGroupBase.orientation.horizontal.$}`]: {
            flexDirection: 'row',
            gap: properties.gap
        }
    },
    [`& .${radioGroupBase.isInvalid.$} .${rdiobtn.input.$}, 
    &:hover .${radioGroupBase.isInvalid.$} input ~ .${rdiobtn.input.$}`]: {
        backgroundColor: mode.invalidInputBg,
        borderStyle: 'solid',
        borderColor: mode.invalidInputBgBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius
    },
    [`& .${radioGroupBase.isInvalid.$} input:checked ~ .${rdiobtn.input.$},
    &:hover .${radioGroupBase.isInvalid.$} input:checked ~ .${rdiobtn.input.$}`]: {
        backgroundColor: mode.invalidInputBg,
        borderStyle: 'solid',
        borderColor: mode.invalidInputBgBorderColor,
        borderWidth: properties.borderWidth,
        borderRadius: properties.borderRadius,
        boxShadow: `${sharedBoxShadowPropsOne} transparent,
        inset ${sharedBoxShadowPropsTwo} ${mode.invalidInputBg},
        inset ${sharedBoxShadowPropsThree} ${mode.invalidInputBgBorderColor}`
    }
});
