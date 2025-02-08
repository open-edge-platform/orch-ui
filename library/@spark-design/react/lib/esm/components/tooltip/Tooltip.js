import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { mergeProps, useFocusWithin, useHover, useTooltip, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { FocusableProvider } from '@react-aria/focus';
import { filterDOMProps } from '@react-aria/utils';
import { shadow, tooltip as tooltipToken, TooltipPlacement, TooltipSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/tooltip/index.css';
const tp = tooltipToken.component;
const shdw = shadow.component;
export const PlacementMap = {
    [TooltipPlacement.TOP]: tp.top.$,
    [TooltipPlacement.BOTTOM]: tp.bottom.$,
    [TooltipPlacement.RIGHT]: tp.rightSide.$,
    [TooltipPlacement.LEFT]: tp.leftSide.$,
    [TooltipPlacement.TOP_END]: `${tp.top.$} ${tp.left.$}`,
    [TooltipPlacement.TOP_START]: `${tp.top.$} ${tp.right.$}`,
    [TooltipPlacement.BOTTOM_END]: `${tp.bottom.$} ${tp.left.$}`,
    [TooltipPlacement.BOTTOM_START]: `${tp.bottom.$} ${tp.right.$}`,
    [TooltipPlacement.RIGHT_END]: `${tp.right.$} ${tp.end.$}`,
    [TooltipPlacement.RIGHT_START]: `${tp.right.$} ${tp.start.$}`,
    [TooltipPlacement.LEFT_END]: `${tp.left.$} ${tp.end.$}`,
    [TooltipPlacement.LEFT_START]: `${tp.left.$} ${tp.start.$}`
};
export const TooltipPopover = ({ size = TooltipSize.Medium, content, icon, placement = TooltipPlacement.TOP, style, className = '', tooltipRef, state, ...props }) => {
    const { tooltipProps } = useTooltip(props, state);
    const domProps = filterDOMProps(props);
    const TooltipClass = cl({
        [tp.$]: true,
        [tp.size[size]?.$]: size,
        [shdw.$]: true,
        [PlacementMap[placement]]: true,
        [className]: !!className
    });
    return (_jsxs("div", { className: TooltipClass, style: style, ref: tooltipRef, ...mergeProps(tooltipProps, domProps), children: [icon, _jsx("span", { className: tp.label.$, children: content }), _jsx("span", { className: tp.tip.$ })] }));
};
export const Tooltip = ({ className = '', style, icon, children, size = TooltipSize.Medium, placement = TooltipPlacement.TOP, ...props }) => {
    props = { ...props, delay: props.showDelay ? props.showDelay : 0 };
    const state = useTooltipTriggerState(props);
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, triggerRef);
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
    const domProps = filterDOMProps(props);
    const { hoverProps, isHovered } = useHover(props);
    const { content } = props;
    const ToggleClass = cl({
        [tp.toggle.$]: true
    });
    const [isFocusWithin, setFocusWithin] = React.useState(false);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin)
    });
    useLayoutEffect(() => {
        showPos();
    }, [state.isOpen, content, props.isOpen === true]);
    useEffect(() => {
        if (isFocusWithin || isHovered) {
            return state.close;
        }
        else if (!isFocusWithin || !isHovered) {
            return state.open;
        }
    }, [(isHovered || isFocusWithin) && props.delay]);
    const getBoundingRect = (element) => {
        const style = window.getComputedStyle(element);
        const margin = {
            left: parseInt(style['margin-inline-start']),
            right: parseInt(style['margin-inline-end']),
            top: parseInt(style['margin-block-start']),
            bottom: parseInt(style['margin-block-end'])
        };
        let rect = element.getBoundingClientRect();
        rect = {
            left: rect.left - margin.left,
            right: rect.right - margin.right,
            top: rect.top - margin.top,
            bottom: rect.bottom - margin.bottom
        };
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
        return rect;
    };
    const showPos = () => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;
        const tipSize = 8;
        if (trigger && tooltip) {
            const triggerPos = getBoundingRect(trigger);
            const tooltipPos = getBoundingRect(tooltip);
            let calcToggle = 0;
            let calcTooltip = 0;
            let leftPos = 0;
            if (triggerPos && tooltipPos) {
                if (placement === TooltipPlacement.TOP) {
                    calcToggle = (triggerPos.right - Math.abs(triggerPos.left)) / 2;
                    calcTooltip = (tooltipPos.right - Math.abs(tooltipPos.left)) / 2;
                    leftPos = calcToggle - calcTooltip;
                    setTooltipPosition({
                        left: leftPos,
                        top: -(tooltipPos.height + tipSize)
                    });
                }
                if (placement === TooltipPlacement.BOTTOM) {
                    calcToggle = (triggerPos.right - Math.abs(triggerPos.left)) / 2;
                    calcTooltip = (tooltipPos.right - Math.abs(tooltipPos.left)) / 2;
                    leftPos = calcToggle - calcTooltip;
                    setTooltipPosition({
                        left: leftPos,
                        top: triggerPos.height + tipSize
                    });
                }
                if (placement === TooltipPlacement.RIGHT) {
                    calcToggle = triggerPos.width;
                    setTooltipPosition({
                        left: calcToggle + tipSize,
                        top: (triggerPos.height - tooltipPos.height) / 2
                    });
                }
                if (placement === TooltipPlacement.LEFT) {
                    setTooltipPosition({
                        left: -tooltipPos.width - tipSize,
                        top: (triggerPos.height - tooltipPos.height) / 2
                    });
                }
                if (placement === TooltipPlacement.TOP_END) {
                    calcToggle = -(tooltipPos.width - Math.abs(triggerPos.width));
                    setTooltipPosition({
                        left: calcToggle,
                        top: -(tooltipPos.height + tipSize)
                    });
                }
                if (placement === TooltipPlacement.TOP_START) {
                    setTooltipPosition({
                        left: 0,
                        top: -(tooltipPos.height + tipSize)
                    });
                }
                if (placement === TooltipPlacement.BOTTOM_END) {
                    calcToggle = -(tooltipPos.width - Math.abs(triggerPos.width));
                    setTooltipPosition({
                        left: calcToggle,
                        top: triggerPos.height + tipSize
                    });
                }
                if (placement === TooltipPlacement.BOTTOM_START) {
                    setTooltipPosition({
                        left: 0,
                        top: triggerPos.height + tipSize
                    });
                }
                if (placement === TooltipPlacement.RIGHT_START) {
                    setTooltipPosition({
                        left: triggerPos.width + tipSize,
                        top: 0
                    });
                }
                if (placement === TooltipPlacement.RIGHT_END) {
                    calcToggle = triggerPos.width;
                    setTooltipPosition({
                        left: calcToggle + tipSize,
                        top: -(tooltipPos.height - triggerPos.height)
                    });
                }
                if (placement === TooltipPlacement.LEFT_START) {
                    setTooltipPosition({
                        left: -tooltipPos.width - tipSize,
                        top: 0
                    });
                }
                if (placement === TooltipPlacement.LEFT_END) {
                    setTooltipPosition({
                        left: -tooltipPos.width - tipSize,
                        top: -(tooltipPos.height - triggerPos.height)
                    });
                }
            }
        }
    };
    const [tooltipTriggerElement] = React.Children.toArray(children);
    return (_jsxs("div", { className: ToggleClass, ref: triggerRef, ...mergeProps(focusWithinProps, hoverProps), children: [_jsx(FocusableProvider, { ...triggerProps, children: tooltipTriggerElement }), state.isOpen && (_jsx(TooltipPopover, { icon: icon, state: state, content: content, placement: placement, tooltipRef: tooltipRef, className: className, size: size, style: { left: tooltipPosition.left, top: tooltipPosition.top, ...style }, ...mergeProps(tooltipProps, domProps) }))] }));
};
