import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useId } from 'react-aria';
import { form, FormSize, FormVariant } from '@spark-design/tokens';
import { appendToObject, cl } from '@spark-design/utils';
import { ButtonGroup } from '../button-group';
import { Heading } from '../heading';
import { Text } from '../text';
import '@spark-design/css/components/form/index.css';
const formc = form.component;
export const FormActions = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
export const Form = ({ title, description, size = FormSize.Medium, variant = FormVariant.Normal, isRequired = false, isDisabled = false, isReadOnly = false, buttonGroupAlignment = 'start', validationState, action, encType, method, target, rel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, 'aria-invalid': ariaInvalid, style, className = '', children, ...rest }) => {
    let actions;
    const content = [];
    const formClass = cl({
        [formc.$]: true,
        [formc.variant?.[variant]?.$]: variant,
        [formc.size?.[size]?.$]: size,
        [className]: !!className
    });
    React.Children.forEach(children, (child, idx) => {
        if (!React.isValidElement(child))
            return;
        if (child.type === FormActions) {
            actions = child;
        }
        else {
            let influencingProps = {};
            isRequired &&
                (influencingProps = appendToObject(influencingProps, { isRequired: true }));
            isDisabled &&
                (influencingProps = appendToObject(influencingProps, { isDisabled: true }));
            isReadOnly &&
                (influencingProps = appendToObject(influencingProps, { isReadOnly: true }));
            validationState &&
                (influencingProps = appendToObject(influencingProps, {
                    validationState: validationState
                }));
            size &&
                (influencingProps = appendToObject(influencingProps, {
                    size: size
                }));
            Object.keys(influencingProps).length > 0
                ? content.push(React.cloneElement(child, { key: idx, ...influencingProps }))
                : content.push(React.cloneElement(child, { key: idx }));
        }
    });
    return (_jsxs("form", { id: useId(), action: action, encType: encType, method: method, target: target, rel: rel, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, "aria-invalid": validationState === 'invalid' ? true : ariaInvalid, className: formClass, style: style, ...rest, children: [title && (_jsx(Heading, { semanticLevel: 2, size: size, children: title })), description && _jsx(Text, { size: size, children: description }), _jsx("section", { children: content }), actions && (_jsx(ButtonGroup, { align: buttonGroupAlignment, spacing: size, children: actions }))] }));
};
