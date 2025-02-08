import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { filterDOMProps } from '@react-aria/utils';
import { fieldtextWrapper } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { FieldLabel, Icon, Text } from '..';
import '@spark-design/css/components/fieldtext-wrapper/index.css';
export const FieldTextWrapper = ({ size = 'm', isRequired, isDisabled, validationState, groupLabel, description, errorMessage, disabledMessage, disabledMessageLastChild, errorMessageLastChild, descriptionMessageLastChild, labelProps, errorMessageProps, descriptionProps, style, className = '', children, ...props }) => {
    const domProps = filterDOMProps(props);
    const isInvalid = validationState === 'invalid';
    const ftwrpr = fieldtextWrapper.component;
    const helperClass = cl({
        [ftwrpr.$]: true,
        [className]: !!className
    });
    const descriptionClass = cl({
        [ftwrpr.size[size]?.helpLabel.$]: size,
        [ftwrpr.description.$]: !isDisabled
    });
    const invalidTextClass = cl({
        [ftwrpr.size[size]?.invalidLabel.$]: size,
        [ftwrpr.isInvalid.$]: isInvalid && errorMessage
    });
    const disabledTextClass = cl({
        [ftwrpr.size[size]?.disabledLabel.$]: size,
        [ftwrpr.isDisabled.$]: isDisabled && disabledMessage
    });
    return (_jsx(_Fragment, { children: _jsxs("div", { className: helperClass, style: style, ...domProps, children: [groupLabel && (_jsx(FieldLabel, { isDisabled: isDisabled, size: size, isRequired: isRequired, ...labelProps, children: groupLabel })), description && !descriptionMessageLastChild && (_jsx(Text, { className: descriptionClass, isDisabled: isDisabled, size: size, ...descriptionProps, children: description })), disabledMessageLastChild && errorMessageLastChild && children, isInvalid && errorMessage && !errorMessageLastChild && (_jsxs(Text, { size: size, className: invalidTextClass, ...errorMessageProps, children: [_jsx(Icon, { artworkStyle: "solid", icon: "cross-circle" }), " ", errorMessage] })), disabledMessageLastChild && !errorMessageLastChild && children, description && descriptionMessageLastChild && (_jsx(Text, { className: descriptionClass, isDisabled: isDisabled, size: size, ...descriptionProps, children: description })), isDisabled && disabledMessage && (_jsx(Text, { className: disabledTextClass, size: size, ...descriptionProps, children: disabledMessage })), isInvalid && errorMessage && errorMessageLastChild && (_jsxs(Text, { size: size, className: invalidTextClass, ...errorMessageProps, children: [_jsx(Icon, { artworkStyle: "solid", icon: "cross-circle" }), " ", errorMessage] })), !disabledMessageLastChild && !errorMessageLastChild && children] }) }));
};
