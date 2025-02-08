import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useEffect, useRef } from 'react';
import { useId } from 'react-aria';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { ModalSize } from '@spark-design/tokens';
import { DialogContext } from './context';
import { Modal } from './Modal';
export const DialogTrigger = ({ children, type = 'modal', size = ModalSize.Medium, isDismissible, isDivided, isKeyboardDismissDisabled, style, className = '', ...props }) => {
    if (!Array.isArray(children) || children.length > 2) {
        throw new Error('DialogTrigger must have exactly 2 children');
    }
    const [trigger, content] = children;
    const state = useOverlayTriggerState(props);
    const wasOpen = useRef(false);
    useEffect(() => {
        wasOpen.current = state.isOpen;
    }, [state.isOpen]);
    const isExiting = useRef(false);
    const onExiting = () => (isExiting.current = true);
    const onExited = () => (isExiting.current = false);
    useEffect(() => {
        return () => {
            if (wasOpen.current || isExiting.current) {
                console.warn(`A DialogTrigger unmounted while open.`);
            }
        };
    }, []);
    const renderOverlay = () => {
        return (_jsx(Modal, { ...props, state: state, isDismissible: type === 'modal' ? isDismissible : false, isDivided: isDivided, disabledFocusLock: false, type: "modal", size: size, isKeyboardDismissDisabled: isKeyboardDismissDisabled, onExiting: onExiting, onExited: onExited, style: style, className: className, children: typeof content === 'function' ? content(state.close) : content }));
    };
    return (_jsx(DialogTriggerBase, { id: useId(), type: 'modal', state: state, isDivided: isDivided, disabledFocusLock: false, isDismissible: isDismissible, trigger: trigger, overlay: renderOverlay() }));
};
export const DialogTriggerBase = ({ id, type, state, isDismissible = false, isDivided = false, disabledFocusLock = false, dialogProps = {}, triggerProps = {}, overlay, trigger }) => {
    const context = {
        id,
        type,
        onClose: state.close,
        isDivided,
        disabledFocusLock,
        isDismissible,
        ...dialogProps
    };
    const triggerWithPressProps = React.cloneElement(trigger, {
        ...triggerProps,
        onPress: state.toggle,
        'aria-expanded': state.isOpen,
        'aria-controls': context.id
    });
    return (_jsxs(Fragment, { children: [triggerWithPressProps, _jsx(DialogContext.Provider, { value: context, children: overlay })] }));
};
