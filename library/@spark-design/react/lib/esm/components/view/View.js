import { jsx as _jsx } from "react/jsx-runtime";
import { view } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/view/index.css';
export const View = ({ id, as = 'div', className = '', style, children, ...rest }) => {
    const viw = view.component;
    const viewClass = cl({
        [viw.$]: true,
        [className]: !!className
    });
    const Tag = as;
    return (_jsx(Tag, { id: id, className: viewClass, style: style, ...rest, children: children }));
};
