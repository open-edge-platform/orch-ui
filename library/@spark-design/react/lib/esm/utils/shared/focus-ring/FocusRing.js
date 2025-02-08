import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export const FocusRing = ({ disabledFocusLock = false, state, children, ...rest }) => {
    const specificDivRef = useRef(null);
    useEffect(() => {
        const modalElement = specificDivRef.current;
        if (state.isOpen && modalElement && !disabledFocusLock) {
            const focusableSelectors = [
                'a[href]:not([disabled])',
                'button:not([disabled])',
                'textarea:not([disabled])',
                'input:not([disabled])',
                'select:not([disabled])',
                'iframe',
                'object',
                'embed',
                'details',
                '[tabindex]:not([tabindex="-1"])'
            ];
            let focusableElements = Array.from(modalElement.querySelectorAll(focusableSelectors.join(',')));
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            const handleKeyDown = (event) => {
                if (event.key === 'Tab') {
                    if (event.shiftKey) {
                        if (document.activeElement === firstElement ||
                            document.activeElement === modalElement) {
                            event.preventDefault();
                            lastElement.focus();
                        }
                    }
                    else {
                        if (document.activeElement === lastElement) {
                            event.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };
            modalElement.addEventListener('keydown', handleKeyDown);
            const observer = new MutationObserver(() => {
                focusableElements = Array.from(modalElement.querySelectorAll(focusableSelectors.join(',')));
            });
            observer.observe(modalElement, { childList: true, subtree: true });
            firstElement.focus();
            return () => {
                modalElement.removeEventListener('keydown', handleKeyDown);
                observer.disconnect();
            };
        }
    }, [state.isOpen, disabledFocusLock]);
    return (_jsx("div", { ref: specificDivRef, tabIndex: -1, ...rest, children: children }));
};
