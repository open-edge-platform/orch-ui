import { jsx as _jsx } from "react/jsx-runtime";
import { flex, FlexGap } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/flex/index.css';
export const Flex = ({ id, direction, wrap, justifyContent, alignContent, alignItems, gap = FlexGap.Medium, className = '', style, children, ...rest }) => {
    const fx = flex.component;
    const flexClass = cl({
        [fx.$]: true,
        [fx.alignItems[alignItems || 'start'].$]: alignItems,
        [fx.alignContent[alignContent || 'start'].$]: alignContent,
        [fx.justifyContent[justifyContent || 'start'].$]: justifyContent,
        [fx.wrap[wrap || 'nowrap'].$]: wrap,
        [fx.direction[direction || 'row'].$]: direction,
        [fx.gap[gap || 'm'].$]: gap,
        [className]: !!className
    });
    return (_jsx("div", { id: id, className: flexClass, style: style, ...rest, children: children }));
};
