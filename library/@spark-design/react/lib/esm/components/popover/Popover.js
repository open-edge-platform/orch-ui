import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DismissButton, Overlay, usePopover } from 'react-aria';
import { popover, shadow } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/popover/index.css';
const Popover = ({ children, state, className = '', popoverRef, fitContent = false, style, ...props }) => {
    const offset = 8;
    const { popoverProps, underlayProps, placement } = usePopover({
        ...props,
        offset,
        popoverRef
    }, state);
    const pop = popover.component;
    const popoverClass = cl({
        [pop.$]: true,
        [pop.fitContent.$]: fitContent,
        [shadow.component.$]: true,
        [className]: !!className
    });
    const popoverUnderlayClass = cl({
        [pop.$]: true,
        [pop.underlay.$]: true
    });
    return (_jsxs(Overlay, { children: [_jsx("div", { className: popoverUnderlayClass, ...underlayProps }), _jsxs("div", { ...popoverProps, ref: popoverRef, className: popoverClass, "data-placement": placement, style: {
                    ...popoverProps.style,
                    ...style
                }, children: [_jsx(DismissButton, { onDismiss: state.close }), children, _jsx(DismissButton, { onDismiss: state.close })] })] }));
};
export default Popover;
