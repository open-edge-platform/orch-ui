import { jsx as _jsx } from "react/jsx-runtime";
import { Overlay as ReactAriaOverlay } from '@react-aria/overlays';
export const Overlay = ({ children, isOpen, container, ...props }) => {
    const mountOverlay = isOpen;
    if (!mountOverlay) {
        return null;
    }
    return (_jsx(ReactAriaOverlay, { portalContainer: container, disableFocusManagement: true, ...props, children: children }));
};
