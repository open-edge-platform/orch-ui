import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useButton, useComboBox, useFilter, useFocusWithin } from 'react-aria';
import { useComboBoxState } from 'react-stately';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { combobox, ComboboxSize, ComboboxVariant, focusVisible as focus } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import Popover from '../popover/Popover';
import { FieldTextWrapper, Icon, List, Scrollbar } from '..';
import '@spark-design/css/components/combobox/index.css';
const combo = combobox.component;
const fcs = focus.component;
export const Combobox = ({ size = ComboboxSize.Medium, variant = ComboboxVariant.Primary, zebra = false, disabledMessage, autoComplete, allowsCustomValue = false, type, className = '', style, popoverInlineSize, popoverFitContent = false, ...props }) => {
    const [width, setWidth] = useState(0);
    const widthRef = React.useRef();
    const { contains } = useFilter({ sensitivity: 'base' });
    const state = useComboBoxState({
        ...props,
        defaultFilter: contains,
        allowsCustomValue
    });
    const buttonRef = useRef(null);
    const inputRef = useRef(null);
    const listBoxRef = useRef(null);
    const popoverRef = useRef(null);
    const [isFocusWithin, setFocusWithin] = React.useState(false);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin)
    });
    const { buttonProps: buttonTriggerProps, inputProps, listBoxProps, descriptionProps, errorMessageProps, labelProps } = useComboBox({
        ...props,
        inputRef,
        buttonRef,
        popoverRef,
        listBoxRef
    }, state);
    const { buttonProps } = useButton(buttonTriggerProps, buttonRef);
    const { placeholder = 'Select an option', isDisabled, isRequired, description, validationState, errorMessage, name, label } = props;
    const domProps = filterDOMProps(props);
    const isInvalid = validationState === 'invalid';
    const [OverflowX, SetOverflowX] = useState(false);
    useEffect(() => {
        const count = React.Children.count(props.children);
        count > 6 && SetOverflowX(true);
    }, []);
    useLayoutEffect(() => {
        setWidth(widthRef.current?.offsetWidth);
    }, []);
    const comboboxClass = cl({
        [combo.$]: true,
        [combo[variant]?.$]: variant,
        [combo.size[size].$]: size,
        [combo.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    const buttonClass = cl({
        [combo.button.$]: true,
        [combo.buttonError.$]: isInvalid,
        [combo.buttonIsDisabled.$]: isDisabled,
        [combo.buttonIsFocused.$]: isFocusWithin,
        [fcs.$]: true,
        [fcs.within.$]: true,
        [fcs.snap.$]: true
    });
    const buttonLabelClass = cl({
        [combo.buttonLabel.$]: true,
        [combo.buttonLabelIsSelected.$]: state.selectedItem
    });
    return (_jsx("div", { className: comboboxClass, style: style, ...mergeProps(focusWithinProps, domProps), children: _jsxs(FieldTextWrapper, { isDisabled: isDisabled, validationState: validationState, isRequired: isRequired, size: size, groupLabel: label, description: description, errorMessage: errorMessage, disabledMessage: disabledMessage, labelProps: labelProps, errorMessageProps: errorMessageProps, descriptionProps: descriptionProps, disabledMessageLastChild: true, errorMessageLastChild: true, children: [_jsxs("div", { className: buttonClass, ref: widthRef, children: [_jsx("input", { ...inputProps, ref: inputRef, autoComplete: autoComplete ? autoComplete : 'off', type: type, placeholder: placeholder, name: name, className: buttonLabelClass }), _jsx("button", { ref: buttonRef, ...buttonProps, className: combo.arrowButton.$, children: _jsx(Icon, { icon: "chevron-down", artworkStyle: "regular", className: combo.arrowIcon.$ }) })] }), state.isOpen && (_jsx(Popover, { state: state, triggerRef: inputRef, popoverRef: popoverRef, placement: "bottom start", fitContent: popoverFitContent, style: {
                        maxInlineSize: !popoverFitContent
                            ? popoverInlineSize
                                ? popoverInlineSize
                                : width
                            : undefined
                    }, children: _jsx(Scrollbar, { y: true, className: combo.listBoxScroll.$, tabIndex: OverflowX ? 1 : -1, children: _jsx(List, { ...listBoxProps, listBoxState: state, listBoxRef: listBoxRef, className: combo.listBox.$, selectionBehavior: "replace", "aria-label": "Combobox list", zebra: zebra, size: size }) }) }))] }) }));
};
