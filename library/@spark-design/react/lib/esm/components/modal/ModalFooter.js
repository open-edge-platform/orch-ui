import { jsx as _jsx } from "react/jsx-runtime";
import { modal } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
const mC = modal.component;
export const ModalFooter = ({ children, className = '', style, ...rest }) => {
    const modalFooterClass = cl({
        [mC.footer.$]: true,
        [className]: !!className
    });
    return (_jsx("div", { className: modalFooterClass, style: style, "data-testid": "modal-footer", ...rest, children: children }));
};
