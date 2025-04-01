import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { VisuallyHidden } from 'react-aria';
import { cl } from '@spark-design/utils';
import './style/style.css';
export var IconSize;
(function (IconSize) {
    IconSize["Small"] = "s";
    IconSize["Medium"] = "m";
    IconSize["Large"] = "l";
    IconSize["XLlarge"] = "xl";
    IconSize["2XLarge"] = "2xl";
})(IconSize || (IconSize = {}));
export const iconSizes = {
    16: '1rem',
    24: '1.5rem',
    32: '2rem',
    48: '3rem',
    64: '4rem'
};
export const mapSize = {
    [IconSize.Small]: `${iconSizes[16]}`,
    [IconSize.Medium]: `${iconSizes[24]}`,
    [IconSize.Large]: `${iconSizes[32]}`,
    [IconSize.XLlarge]: `${iconSizes[48]}`,
    [IconSize['2XLarge']]: `${iconSizes[64]}`
};
export const IconWrapper = ({ icon, size = IconSize['Large'], autoSize, artworkStyle = 'light', isAnimated = false, className = '', altText = '', style, ...rest }) => {
    const classStr = cl({
        'spark-icon': true,
        [`spark-icon-${artworkStyle}`]: !!artworkStyle,
        'spark-icon-spin': !!isAnimated,
        [className]: !!className
    });
    return (_jsxs(_Fragment, { children: [_jsx("span", { role: "img", "aria-hidden": "true", className: classStr, style: {
                    height: !autoSize ? mapSize[size] : 'inherit',
                    width: !autoSize ? mapSize[size] : 'inherit',
                    display: 'inline-flex',
                    ...style
                }, ...rest, children: icon }), altText ? (_jsx(VisuallyHidden, { className: "spark-icon-alt-text", elementType: "span", children: altText })) : null] }));
};
