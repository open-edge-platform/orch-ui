import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useModalOverlay } from '@react-aria/overlays';
import { modal } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { FocusRing } from '../../utils/shared';
import { ModalUnderlay } from './ModalUnderlay';
import { Overlay } from './Overlay';
import '@spark-design/css/components/modal/index.css';
export const Modal = ({ ...props }) => {
    const { children, state, size, style, className = '', isDivided, ...otherProps } = props;
    const wrapperRef = useRef(null);
    return (_jsx(Overlay, { ...otherProps, isOpen: state.isOpen, nodeRef: wrapperRef, children: _jsx(ModalWrapper, { size: size, isDivided: isDivided, style: style, className: className, wrapperRef: wrapperRef, ...props, children: children }) }));
};
const ModalWrapper = ({ ...props }) => {
    const { size, isDivided, children, state, disabledFocusLock, className = '', style } = props;
    const refMod = useRef(null);
    const { modalProps, underlayProps } = useModalOverlay(props, state, refMod);
    const mC = modal.component;
    const modalWrapperClass = cl({
        [mC.wrapper.$]: true
    });
    const modalClass = cl({
        [mC.$]: true,
        [mC.size?.[size || 'm']?.$]: size,
        [mC.isDivided.$]: isDivided,
        [className]: !!className
    });
    return (_jsxs(_Fragment, { children: [_jsx(ModalUnderlay, { ...underlayProps, isOpen: state.isOpen }), _jsx("div", { className: modalWrapperClass, children: _jsx(FocusRing, { disabledFocusLock: disabledFocusLock, state: state, ...modalProps, className: modalClass, style: style, "data-testid": "test-modal-main", children: children }) })] }));
};
