import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
import React from 'react';
import { card, CardOrientation, CardVariant, focus } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Checkbox } from '../';
import '@spark-design/css/components/card/index.css';
export const CardContext = createContext({});
export function useCardProvider() {
    return useContext(CardContext);
}
export const Card = ({ orientation = CardOrientation.Vertical, variant = CardVariant.Normal, hasCheckbox, checkboxOverlay, className = '', fullWidth, children, href, style, ...rest }) => {
    const [isChecked, setIsChecked] = useState(false);
    const fcs = focus.component;
    const car = card.component;
    const cardCheckboxDirClass = cl({
        [car.checkbox?.$]: hasCheckbox
    });
    const cardBorderClass = cl({
        [car.$]: true,
        [car[orientation]?.$]: orientation,
        [car.border?.[variant]?.$]: variant,
        [car.checked.$]: hasCheckbox && isChecked == true,
        [car.overlay.$]: checkboxOverlay,
        [car.fullWidth.$]: fullWidth,
        [car.link.$]: href,
        [fcs.$]: href,
        [fcs.self.$]: href,
        [fcs.snap.$]: href,
        [className]: !!className
    });
    const modifyChildren = (child) => {
        const customClasses = child?.props?.className ? child?.props?.className : '';
        const props = {
            className: cl({
                [fcs.$]: true,
                [fcs.self.$]: true,
                [fcs.snap.$]: true,
                [customClasses]: !!customClasses
            })
        };
        return child && child['type']?.$$typeof?.toString() === 'Symbol(react.forward_ref)'
            ? React.cloneElement(child, props)
            : child;
    };
    const Tag = href ? 'a' : 'div';
    return (_jsxs(Tag, { href: href, className: cardBorderClass, style: style, ...rest, children: [hasCheckbox && (_jsx("div", { className: cardCheckboxDirClass, children: _jsx(Checkbox, { onChange: () => setIsChecked(!isChecked) }) })), _jsx(CardContext.Provider, { value: { orientation }, children: React.Children.map(children, (child) => modifyChildren(child)) })] }));
};
