import { jsx as _jsx } from "react/jsx-runtime";
import { shadow } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/shadow/index.css';
export const Shadow = ({ children, className = '', style, ...rest }) => {
    const shdw = shadow.component;
    const shadowClass = cl({
        [shdw.$]: true,
        [className]: !!className
    });
    return (_jsx("div", { className: shadowClass, style: style, ...rest, children: children }));
};
