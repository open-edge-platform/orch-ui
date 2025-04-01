import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
import { useLabel } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { useRadioGroup } from '@react-aria/radio';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { radioGroup } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { FieldTextWrapper } from '../fieldtext-wrapper';
import '@spark-design/css/components/radio-group/index.css';
export const RadioContext = createContext({});
export function useRadioProvider() {
    return useContext(RadioContext);
}
export const RadioGroup = ({ children, orientation = 'vertical', size = 'm', disabledMessage, validationState, className = '', style, ...props }) => {
    const state = useRadioGroupState(props);
    const { radioGroupProps, errorMessageProps, descriptionProps } = useRadioGroup(props, state);
    const { fieldProps, labelProps } = useLabel(props);
    const domProps = filterDOMProps(props);
    const { label, isRequired, errorMessage, description } = props;
    const { isDisabled } = state;
    const radioGr = radioGroup.component;
    const radioGroupClass = cl({
        [radioGr?.$]: true,
        [radioGr?.isDisabled?.$]: isDisabled,
        [className]: !!className
    });
    const radioGroupButtonsContainerClass = cl({
        [radioGr?.buttonsContainer.$]: true,
        [radioGr?.isInvalid?.$]: validationState === 'invalid',
        [radioGr?.orientation[orientation].$]: orientation
    });
    return (_jsx("div", { className: radioGroupClass, style: style, ...mergeProps(radioGroupProps, domProps), children: _jsx(FieldTextWrapper, { isDisabled: isDisabled, validationState: validationState, size: size, isRequired: isRequired, groupLabel: label, description: description, errorMessage: errorMessage, disabledMessage: disabledMessage, labelProps: labelProps, errorMessageProps: errorMessageProps, descriptionProps: descriptionProps, children: _jsx("div", { className: radioGroupButtonsContainerClass, ...fieldProps, children: _jsx(RadioContext.Provider, { value: { state, size }, children: children }) }) }) }));
};
