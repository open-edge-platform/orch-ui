import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { VisuallyHidden } from 'react-aria';
import { cl } from '@spark-design/utils';
import '@spark-design/iconfont/dist.web/icons.css';
export const Icon = ({ icon = 'picture', artworkStyle = 'light', isAnimated = false, className = '', altText = '', style, ...rest }) => {
    const classStr = cl({
        'spark-icon': true,
        [`spark-icon-${icon}`]: !!icon,
        [`spark-icon-${artworkStyle}`]: !!artworkStyle,
        'spark-icon-spin': !!isAnimated,
        [className]: !!className
    });
    return (_jsxs(_Fragment, { children: [_jsx("span", { ...rest, "aria-hidden": "true", role: "img", className: classStr, style: style }), altText ? (_jsx(VisuallyHidden, { className: "spark-icon-alt-text", elementType: "span", children: altText })) : null] }));
};
