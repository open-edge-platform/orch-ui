import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFocusRing, useLabel } from 'react-aria';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useSelectState } from '@react-stately/select';
import { dropdown, DropdownSize, DropdownVariant, focusVisible as focus } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import Popover from '../popover/Popover';
import { Button, FieldTextWrapper, Icon, List, Scrollbar } from '../';
import '@spark-design/css/components/dropdown/index.css';
const drop = dropdown.component;
const fcs = focus.component;
export const Dropdown = ({ size = DropdownSize.Medium, variant = DropdownVariant.Primary, zebra = false, disabledMessage, autoComplete, className = '', style, startIcon = 'none', popoverInlineSize, popoverFitContent = false, ...props }) => {
    const [width, setWidth] = useState(0);
    const ref = React.useRef();
    const popoverRef = React.useRef(null);
    const state = useSelectState(props);
    const { triggerProps, valueProps, menuProps, errorMessageProps, descriptionProps } = useSelect(props, state, ref);
    const { fieldProps, labelProps } = useLabel(props);
    const { focusProps } = useFocusRing();
    const domProps = filterDOMProps(props);
    const { placeholder = 'Select an option', isDisabled, isRequired, description, validationState, errorMessage, name, label } = props;
    const isInvalid = validationState === 'invalid';
    const [OverflowX, SetOverflowX] = useState(false);
    useEffect(() => {
        const count = React.Children.count(props.children);
        count > 6 && SetOverflowX(true);
    }, []);
    useLayoutEffect(() => {
        setWidth(ref.current?.offsetWidth);
    }, []);
    const dropdownClass = cl({
        [drop.$]: true,
        [drop[variant]?.$]: variant,
        [drop.size[size].$]: size,
        [drop.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    const buttonLabelClass = cl({
        [drop.buttonLabel.$]: true,
        [drop.buttonLabelIsSelected.$]: state.selectedItem
    });
    const buttonClass = cl({
        [drop.button.$]: true,
        [drop.buttonError.$]: isInvalid,
        [drop.buttonIsDisabled.$]: isDisabled,
        [drop.buttonIsFocused.$]: !!state.isOpen,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true
    });
    const listBoxClass = cl({
        [drop.listBox.$]: true,
        [drop.supplementaryIcon.$]: startIcon !== 'none',
        [drop[variant]?.$]: variant
    });
    return (_jsx("div", { className: dropdownClass, style: style, ...domProps, children: _jsxs(FieldTextWrapper, { isDisabled: isDisabled, validationState: validationState, isRequired: isRequired, size: size, groupLabel: label, description: description, errorMessage: errorMessage, disabledMessage: disabledMessage, labelProps: labelProps, errorMessageProps: errorMessageProps, descriptionProps: descriptionProps, disabledMessageLastChild: true, errorMessageLastChild: true, children: [_jsx(HiddenSelect, { autoComplete: autoComplete ? autoComplete : 'off', state: state, triggerRef: ref, label: label, name: name }), _jsxs(Button, { ...mergeProps(focusProps, fieldProps, triggerProps), className: buttonClass, buttonRef: ref, autoFocus: props.autoFocus, children: [_jsxs("span", { className: buttonLabelClass, ...valueProps, children: [startIcon !== 'none' && (_jsx(Icon, { icon: startIcon, artworkStyle: "regular", className: drop.supplementaryIcon.$ })), state.selectedItem?.props.icon && (_jsx(Icon, { className: drop.supplementaryIcon.$, icon: state.selectedItem?.props.icon, artworkStyle: state.selectedItem?.props.artworkStyle, altText: state.selectedItem?.props.altText })), state.selectedItem ? state.selectedItem.rendered : placeholder] }), _jsx(Icon, { icon: "chevron-down", artworkStyle: "regular", className: drop.arrowIcon.$ })] }), state.isOpen && (_jsx(Popover, { state: state, triggerRef: ref, popoverRef: popoverRef, placement: "bottom start", fitContent: popoverFitContent, style: {
                        maxInlineSize: !popoverFitContent
                            ? popoverInlineSize
                                ? popoverInlineSize
                                : width
                            : undefined
                    }, children: _jsx(Scrollbar, { y: true, className: drop.listBoxScroll.$, tabIndex: OverflowX ? 1 : -1, children: _jsx(List, { ...menuProps, zebra: zebra, listBoxState: state, className: listBoxClass, selectionBehavior: "replace", "aria-label": "Dropdown list", shouldFocusOnHover: false, size: size }) }) }))] }) }));
};
