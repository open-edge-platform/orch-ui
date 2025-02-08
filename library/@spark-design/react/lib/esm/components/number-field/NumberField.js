import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { useField, useLocale, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { focus, input, InputSize, numberField } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, ButtonGroup, FieldLabel, FieldTextWrapper, Icon } from '../';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/number-field/index.css';
import '@spark-design/css/components/input/index.css';
export const NumberField = ({ style, disabledMessage, numberUnit, className = '', size = InputSize.Medium, variant = 'outline', ...props }) => {
    props = { ...props, defaultValue: props.defaultValue ? props.defaultValue : 0 };
    const { locale } = useLocale();
    const state = useNumberFieldState({ ...props, locale });
    const inputRef = useRef(null);
    const { labelProps: labelUnitProps, fieldProps, descriptionProps, errorMessageProps } = useField(props);
    const { labelProps, groupProps, inputProps, incrementButtonProps, decrementButtonProps } = useNumberField(props, state, inputRef);
    const domProps = filterDOMProps(props);
    const { label, isRequired, isDisabled, description, errorMessage, validationState, isReadOnly } = props;
    const fcs = focus.component;
    const nf = numberField.component;
    const inp = input.component;
    const textFieldClass = cl({
        [nf?.$]: true,
        [nf.size?.[size]?.$]: size,
        [nf?.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    const inputClass = cl({
        [inp.$]: true,
        [inp?.[variant]?.$]: variant,
        [inp.size?.[size]?.$]: size,
        [inp.isReadOnly.$]: isReadOnly,
        [inp.isInvalid.$]: validationState === 'invalid',
        [inp.isDisabled.$]: isDisabled,
        [nf.inputContainer?.$]: true,
        [fcs.$]: true,
        [fcs.within.$]: true,
        [fcs.snap.$]: true
    });
    const numberFieldInputClass = cl({
        [nf?.input.$]: true,
        [nf?.isDisabled.$]: isDisabled
    });
    return (_jsx(_Fragment, { children: _jsx("div", { className: textFieldClass, style: style, children: _jsx(FieldTextWrapper, { size: size, labelProps: labelProps, groupLabel: label, description: description, isRequired: isRequired, isDisabled: isDisabled, disabledMessage: disabledMessage, errorMessage: errorMessage, validationState: validationState, descriptionProps: descriptionProps, errorMessageProps: errorMessageProps, errorMessageLastChild: true, disabledMessageLastChild: true, children: _jsxs("div", { className: nf.unitContainer.$, children: [_jsxs("div", { className: inputClass, ...groupProps, children: [_jsx("input", { className: numberFieldInputClass, ...mergeProps(fieldProps, inputProps, domProps), ref: inputRef }), _jsxs(ButtonGroup, { className: nf.buttonGroup.$, spacing: "m", children: [_jsx(Button, { className: nf.button.$, iconOnly: true, variant: "ghost", ...decrementButtonProps, children: _jsx(Icon, { icon: "chevron-small-down", altText: "Decrement button icon", artworkStyle: "regular" }) }), _jsx(Button, { className: nf.button.$, iconOnly: true, variant: "ghost", ...incrementButtonProps, children: _jsx(Icon, { icon: "chevron-small-up", altText: "Increment button icon", artworkStyle: "regular" }) })] })] }), numberUnit && (_jsx(FieldLabel, { ...labelUnitProps, size: size, "aria-label": "Number field unit", children: numberUnit }))] }) }) }) }));
};
