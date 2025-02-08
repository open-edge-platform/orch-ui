import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { buttonGroup, ButtonGroupSpacing } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/button-group/index.css';
export const ButtonGroup = (props) => {
    const { children, orientation = 'horizontal', isDisabled = false, htmlDisabled = false, align = 'start', spacing = ButtonGroupSpacing.Medium, className = '', disabledTooltip, disabledTooltipPlacement, ...rest } = props;
    const btnGrp = buttonGroup.component;
    const buttonGroupClass = cl({
        [btnGrp.$]: true,
        [btnGrp.isDisabled.$]: isDisabled,
        [btnGrp.orientation[orientation].$]: orientation,
        [btnGrp.align[align]?.$]: align,
        [btnGrp.spacing[spacing]?.$]: spacing,
        [className]: !!className
    });
    function addPropsToReactElement(element, props, i) {
        if (React.isValidElement(element)) {
            return React.cloneElement(element, { key: i, ...props });
        }
        return element;
    }
    function addPropsToChildren(children, props) {
        if (!Array.isArray(children)) {
            return addPropsToReactElement(children, props);
        }
        return children.map((childElement, i) => addPropsToReactElement(childElement, props, i));
    }
    function getDisabledProps(htmlDisabled, isDisabled, disabledTooltip, disabledTooltipPlacement) {
        return {
            htmlDisabled: htmlDisabled,
            isDisabled: isDisabled,
            disabledTooltip: disabledTooltip,
            disabledTooltipPlacement: disabledTooltipPlacement
        };
    }
    if (isDisabled) {
        const disabledProps = getDisabledProps(htmlDisabled, isDisabled, disabledTooltip, disabledTooltipPlacement);
        return (_jsx("div", { className: buttonGroupClass, ...rest, children: addPropsToChildren(children, disabledProps) }));
    }
    return (_jsx("div", { className: buttonGroupClass, ...rest, children: children }));
};
