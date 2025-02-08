import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { mergeProps, useField } from 'react-aria';
import { useSwitch } from '@react-aria/switch';
import { filterDOMProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { focusVisible as focus, toggleSwitch, ToggleSwitchLabelAlignment, ToggleSwitchSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { FieldLabel, FieldTextWrapper } from '../';
import '@spark-design/css/components/toggle-switch/index.css';
export const ToggleSwitch = ({ size = ToggleSwitchSize.Medium, labelAlignment = ToggleSwitchLabelAlignment.Start, style, className = '', children, validationState, disabledMessage, errorMessage, description, ...props }) => {
    const inputRef = useRef(null);
    const state = useToggleState(props);
    const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField(props);
    const { inputProps } = useSwitch(props, state, inputRef);
    const domProps = filterDOMProps(props);
    const toggle = toggleSwitch.component;
    const fcs = focus.component;
    const { isDisabled, label } = props;
    const toggleSwitchClass = cl({
        [className]: !!className,
        [toggle.$]: true,
        [toggle.helperText.$]: true
    });
    const toggleSwitchWrapper = cl({
        [toggle.wrapper.$]: true,
        [toggle.size[size]?.$]: size,
        [toggle.labelAlignment[labelAlignment]?.$]: labelAlignment,
        [toggle.isDisabled.$]: isDisabled
    });
    const toggleSwitchInputClass = cl({
        [fcs.$]: true,
        [fcs.suppress.$]: true,
        [fcs.adjacent.$]: true,
        [toggle.isInvalid.$]: validationState === 'invalid'
    });
    const toggleSwitchToggleSelectorClass = cl({
        [toggle.selector.$]: true,
        [fcs.$]: true,
        [fcs.snap.$]: true
    });
    return (_jsx("div", { className: toggleSwitchClass, style: style, children: _jsx(FieldTextWrapper, { size: size, isDisabled: isDisabled, groupLabel: label, description: description, disabledMessage: disabledMessage, errorMessage: errorMessage, validationState: validationState, descriptionProps: descriptionProps, errorMessageProps: errorMessageProps, labelProps: labelProps, errorMessageLastChild: true, disabledMessageLastChild: true, children: _jsxs(FieldLabel, { className: toggleSwitchWrapper, children: [_jsx("input", { className: toggleSwitchInputClass, ref: inputRef, ...mergeProps(inputProps, fieldProps, domProps), "aria-invalid": validationState === 'invalid' ? true : undefined }), _jsx("span", { className: toggleSwitchToggleSelectorClass }), children] }) }) }));
};
