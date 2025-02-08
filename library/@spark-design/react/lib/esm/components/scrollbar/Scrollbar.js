import { jsx as _jsx } from "react/jsx-runtime";
import { focusVisible as focus, scrollbar as scrollbarConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/scrollbar/index.css';
const scrollbar = scrollbarConfig.component;
const fcs = focus.component;
export const Scrollbar = ({ hidden, y, x, className = '', style, children, ...rest }) => {
    const classStr = cl({
        [scrollbar.$]: true,
        [scrollbar.y.$]: y,
        [scrollbar.x.$]: x,
        [scrollbar.hidden.$]: hidden,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [className]: !!className
    });
    return (_jsx("div", { tabIndex: 0, className: classStr, style: style, "aria-label": "Scrolling content", role: "group", ...rest, children: children }));
};
