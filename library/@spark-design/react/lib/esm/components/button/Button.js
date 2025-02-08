import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { mergeProps, useButton, useHover } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import { button, ButtonSize, ButtonVariant, focusVisible as focus } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Tooltip } from '../';
import '@spark-design/css/components/button/index.css';
export const Button = ({ as = 'button', variant = ButtonVariant.Action, size = ButtonSize.Medium, iconOnly, children, startSlot, endSlot, disabledTooltip, disabledTooltipPlacement, className = '', style, htmlDisabled, buttonRef, tabProps, isMonochrome, ...props }) => {
    const ref = useRef();
    const { buttonProps, isPressed } = useButton({
        ...props,
        elementType: as
    }, buttonRef ? buttonRef : ref);
    const { hoverProps, isHovered } = useHover(props);
    const domProps = filterDOMProps(props);
    const ariaButtonRoleDisabledProps = {
        ...buttonProps,
        role: as == 'a' ? undefined : null
    };
    const ariaDisabledButtonProps = {
        ...ariaButtonRoleDisabledProps,
        disabled: undefined
    };
    const { isDisabled, onPress } = props;
    const btn = button.component;
    const fcs = focus.component;
    const buttonClass = cl({
        [btn.$]: true,
        [btn[variant]?.$]: variant,
        [btn.size[size]?.$]: size,
        [btn.iconOnly.$]: iconOnly,
        [btn.disabled.$]: isDisabled,
        [btn.hovered.$]: isHovered,
        [btn.active.$]: isPressed,
        [btn.monochrome.$]: isMonochrome,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [className]: !!className
    });
    const Tag = as;
    return (_jsx(_Fragment, { children: htmlDisabled ? (disabledTooltip && isDisabled ? (_jsx(Tooltip, { content: disabledTooltip, placement: disabledTooltipPlacement, delay: 0, style: { pointerEvents: 'all' }, children: _jsxs(Tag, { onClick: isDisabled
                    ? (e) => e.preventDefault()
                    : onPress, className: buttonClass, style: style, ref: buttonRef ? buttonRef : ref, ...mergeProps(ariaButtonRoleDisabledProps, hoverProps, domProps, tabProps), tabIndex: Tag === 'span' || Tag === 'a' ? 0 : undefined, children: [startSlot && _jsx("span", { className: btn.startSlot.$, children: startSlot }), _jsx("span", { className: btn.content.$, children: children }), endSlot && _jsx("span", { className: btn.endSlot.$, children: endSlot })] }) })) : (_jsxs(Tag, { className: buttonClass, style: style, ref: buttonRef ? buttonRef : ref, ...mergeProps(ariaButtonRoleDisabledProps, hoverProps, domProps, tabProps), children: [startSlot && _jsx("span", { className: btn.startSlot.$, children: startSlot }), _jsx("span", { className: btn.content.$, children: children }), endSlot && _jsx("span", { className: btn.endSlot.$, children: endSlot })] }))) : disabledTooltip && isDisabled ? (_jsx(Tooltip, { content: disabledTooltip, placement: disabledTooltipPlacement, delay: 0, children: _jsxs(Tag, { onClick: isDisabled
                    ? (e) => e.preventDefault()
                    : onPress, className: buttonClass, style: style, ref: buttonRef ? buttonRef : ref, "aria-disabled": isDisabled, ...mergeProps(hoverProps, ariaDisabledButtonProps, domProps, tabProps), tabIndex: Tag === 'span' || Tag === 'a' ? 0 : undefined, children: [startSlot && _jsx("span", { className: btn.startSlot.$, children: startSlot }), _jsx("span", { className: btn.content.$, children: children }), endSlot && _jsx("span", { className: btn.endSlot.$, children: endSlot })] }) })) : (_jsxs(Tag, { onClick: isDisabled
                ? (e) => e.preventDefault()
                : onPress, className: buttonClass, style: style, ref: buttonRef ? buttonRef : ref, "aria-disabled": isDisabled, ...mergeProps(hoverProps, ariaDisabledButtonProps, domProps, tabProps), children: [startSlot && _jsx("span", { className: btn.startSlot.$, children: startSlot }), _jsx("span", { className: btn.content.$, children: children }), endSlot && _jsx("span", { className: btn.endSlot.$, children: endSlot })] })) }));
};
