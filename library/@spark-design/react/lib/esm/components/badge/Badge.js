import { jsx as _jsx } from "react/jsx-runtime";
import { badge, BadgeShape, BadgeSize, BadgeVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/badge/index.css';
const bg = badge.component;
export const Badge = ({ variant = BadgeVariant.Info, size = BadgeSize.Medium, shape = BadgeShape.Circle, style, className = '', text, ...rest }) => {
    const badgeClass = cl({
        [bg.$]: true,
        [bg.noText?.size?.[size]?.$]: size && !text,
        [bg.text?.size?.[size]?.$]: size && text,
        [bg.variant?.[variant]?.$]: variant,
        [bg.shape?.[shape]?.$]: shape,
        [className]: !!className
    });
    return (_jsx("span", { className: badgeClass, style: style, "data-testid": "badge", ...rest, children: text && _jsx("span", { className: bg.text.$, children: text }) }));
};
