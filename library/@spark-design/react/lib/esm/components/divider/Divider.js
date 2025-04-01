import { jsx as _jsx } from "react/jsx-runtime";
import { mergeProps, useSeparator } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import { divider, DividerThickness } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/divider/index.css';
export const Divider = ({ thickness = DividerThickness.Light, className = '', style, as = 'div', ...props }) => {
    props = { orientation: 'horizontal', ...props };
    const { separatorProps } = useSeparator(props);
    const domProps = filterDOMProps(props);
    const { orientation } = props;
    const dvdr = divider.component;
    const dividerClass = cl({
        [dvdr.$]: true,
        [dvdr.thickness?.[thickness]?.$]: thickness,
        [dvdr.horizontal.$]: orientation === 'horizontal',
        [dvdr.vertical.$]: orientation !== 'horizontal',
        [className]: !!className
    });
    const Tag = as;
    return (_jsx(Tag, { tabIndex: -1, className: dividerClass, style: style, "aria-orientation": orientation, ...mergeProps(separatorProps, domProps) }));
};
