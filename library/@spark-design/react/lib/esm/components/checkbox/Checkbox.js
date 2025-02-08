import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { mergeProps, useCheckbox, useFocusRing, VisuallyHidden } from 'react-aria';
import { useToggleState } from 'react-stately';
import { filterDOMProps } from '@react-aria/utils';
import { checkbox, CheckboxSize, focusVisible as focus } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { FieldLabel, Icon, Text } from '../';
import { Check, Minus } from './svg-icons';
import '@spark-design/css/components/checkbox/index.css';
import '@spark-design/iconfont/dist.web/icons.css';
export const Checkbox = ({ size = CheckboxSize.Medium, className = '', style, ...props }) => {
    const state = useToggleState(props);
    const ref = useRef();
    const { inputProps } = useCheckbox(props, state, ref);
    const { isFocusVisible, focusProps } = useFocusRing();
    const domProps = filterDOMProps(props);
    const chkbx = checkbox.component;
    const fcs = focus.component;
    const { isDisabled, children, isIndeterminate, isRequired, validationState, errorMessage } = props;
    const isSelected = state.isSelected;
    const [indeterminateState, setIndeterminate] = useState(isIndeterminate);
    const checkboxClass = cl({
        [chkbx.$]: true,
        [chkbx.size[size]?.$]: size,
        [chkbx.isDisabled.$]: isDisabled,
        [chkbx.checked.$]: isSelected || indeterminateState,
        [chkbx.unChecked.$]: !isSelected && !indeterminateState,
        [chkbx.noChildren.$]: children === undefined,
        [fcs.$]: isFocusVisible,
        [fcs.within.$]: isFocusVisible,
        [fcs.snap.$]: isFocusVisible,
        [className]: !!className
    });
    const checkboxSizeClass = cl({
        [chkbx.$]: true,
        [chkbx.size[size]?.$]: size
    });
    const checkboxCheckmarkContainer = cl({
        [chkbx.invalid.$]: validationState === 'invalid',
        [chkbx.checkmarkContainer.$]: true,
        [chkbx.isDisabled.$]: isDisabled
    });
    const checkboxCheckmark = cl({
        [chkbx.checked.$]: isSelected,
        [chkbx.indeterminate.$]: isIndeterminate,
        [chkbx.unChecked.$]: !isSelected && !isIndeterminate
    });
    return (_jsxs("div", { className: checkboxSizeClass, style: style, children: [_jsxs(FieldLabel, { className: checkboxClass, onClick: () => {
                    if (indeterminateState && !isDisabled)
                        setIndeterminate(undefined);
                }, children: [_jsx(VisuallyHidden, { children: _jsx("input", { ref: ref, ...mergeProps(inputProps, focusProps, domProps) }) }), _jsxs("div", { className: checkboxCheckmarkContainer, children: [isSelected && _jsx(Check, { className: checkboxCheckmark }), isIndeterminate && !isSelected && _jsx(Minus, { className: checkboxCheckmark })] }), _jsxs("div", { className: chkbx.labelContainer.$, children: [children, " ", isRequired ? '*' : ''] })] }), validationState == 'invalid' && errorMessage && (_jsxs("div", { className: chkbx.errorMessage.$, children: [_jsx(Icon, { artworkStyle: "solid", icon: "alert-circle" }), _jsx(Text, { size: size, children: errorMessage })] }))] }));
};
