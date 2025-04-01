import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import { useToggleButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { button, ButtonSize, focusVisible as focus, toggleButton as tglbtn, ToggleButtonVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Tooltip } from '../';
export const ToggleButton = ({ variant = ToggleButtonVariant.Action, size = ButtonSize.Large, iconOnly, children, startSlot, endSlot, disabledTooltip, disabledTooltipPlacement, htmlDisabled = false, className = '', style, ...props }) => {
    const btn = button.component;
    const toggleBtn = tglbtn.component;
    const fcs = focus.component;
    const domRef = useRef(null);
    const state = useToggleState(props);
    const { buttonProps, isPressed } = useToggleButton(props, state, domRef);
    const { hoverProps } = useHover(props);
    const domProps = filterDOMProps(props);
    const { onChange, isDisabled } = props;
    const ariaDisabledButtonProps = {
        ...buttonProps,
        disabled: undefined
    };
    let buttonClass = cl({
        [btn.$]: true,
        [btn.size[size]?.$]: size,
        [btn.iconOnly.$]: iconOnly,
        [btn.disabled.$]: isDisabled,
        [btn.active.$]: isPressed,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [className]: !!className
    });
    if (variant !== ToggleButtonVariant.Ghost)
        buttonClass = cl(buttonClass, {
            [btn['secondary']?.$]: !state.isSelected,
            [btn[variant]?.$]: state.isSelected
        });
    else
        buttonClass = cl(buttonClass, {
            [btn['ghost']?.$]: !state.isSelected,
            [toggleBtn.clickedGhost.$]: state.isSelected
        });
    return (_jsx(_Fragment, { children: htmlDisabled ? (isDisabled && disabledTooltip ? (_jsx(Tooltip, { content: disabledTooltip, placement: disabledTooltipPlacement, children: _jsxs("button", { ref: domRef, className: buttonClass, style: style, ...mergeProps(buttonProps, hoverProps, domProps), children: [startSlot ? (_jsx("span", { className: btn.startSlot.$, children: startSlot })) : null, _jsx("span", { className: btn.content.$, children: children }), endSlot ? _jsx("span", { className: btn.endSlot.$, children: endSlot }) : null] }) })) : (_jsxs("button", { ref: domRef, className: buttonClass, style: style, ...mergeProps(buttonProps, hoverProps, domProps), children: [startSlot ? _jsx("span", { className: btn.startSlot.$, children: startSlot }) : null, _jsx("span", { className: btn.content.$, children: children }), endSlot ? _jsx("span", { className: btn.endSlot.$, children: endSlot }) : null] }))) : isDisabled && disabledTooltip ? (_jsx(Tooltip, { content: disabledTooltip, placement: disabledTooltipPlacement, children: _jsxs("button", { onChange: isDisabled
                    ? (e) => e.preventDefault()
                    : onChange, "aria-disabled": isDisabled, className: buttonClass, style: style, ref: domRef, ...mergeProps(ariaDisabledButtonProps, hoverProps, domProps), children: [startSlot ? _jsx("span", { className: btn.startSlot.$, children: startSlot }) : null, _jsx("span", { className: btn.content.$, children: children }), endSlot ? _jsx("span", { className: btn.endSlot.$, children: endSlot }) : null] }) })) : (_jsxs("button", { onChange: isDisabled
                ? (e) => e.preventDefault()
                : onChange, "aria-disabled": isDisabled, className: buttonClass, style: style, ref: domRef, ...mergeProps(ariaDisabledButtonProps, hoverProps, domProps), children: [startSlot ? _jsx("span", { className: btn.startSlot.$, children: startSlot }) : null, _jsx("span", { className: btn.content.$, children: children }), endSlot ? _jsx("span", { className: btn.endSlot.$, children: endSlot }) : null] })) }));
};
