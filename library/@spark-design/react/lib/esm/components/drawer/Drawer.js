import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { drawer, DrawerPosition, DrawerSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { DrawerHeader } from './DrawerHeader';
import '@spark-design/css/components/drawer/index.css';
const dc = drawer.component;
export const Drawer = ({ show, onHide, backdropIsVisible = true, backdropClosable = true, position = DrawerPosition.Right, size = DrawerSize.Small, hasHeader = true, headerProps, bodyContent, footerContent, className = '', style, ...rest }) => {
    const drawerClass = cl({
        [dc.base.$]: true,
        [dc.shadow.$]: true,
        [dc.position?.[position]?.$]: position,
        [dc.size?.[size]?.[position]?.$]: [size, position],
        [dc.show.$]: show,
        [dc.hide.$]: !show,
        [className]: !!className
    });
    const drawerBackdropClass = cl({
        [dc.backdrop.$]: true,
        [dc.show.$]: show,
        [dc.hide.$]: !show,
        [dc.backdropTransparent.$]: !backdropIsVisible,
        [dc.backdropBlack.$]: backdropIsVisible
    });
    const drawerBodyClass = cl({
        [dc.body.$]: true
    });
    const drawerFooterClass = cl({
        [dc.footer.$]: true
    });
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: drawerBackdropClass, onClick: () => {
                    if (backdropClosable && onHide) {
                        onHide();
                    }
                }, "data-testid": "drawer-backdrop" }), _jsxs("div", { className: drawerClass, style: style, tabIndex: -1, "aria-labelledby": "drawerLabel", "aria-modal": "true", role: "dialog", "data-testid": "drawer", ...rest, children: [hasHeader && _jsx(DrawerHeader, { onHide: onHide, ...headerProps }), _jsx("div", { className: drawerBodyClass, "data-testid": "drawer-body", children: bodyContent }), footerContent && (_jsx("div", { className: drawerFooterClass, "data-testid": "drawer-footer", children: footerContent }))] })] }));
};
