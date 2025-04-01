import { jsx as _jsx } from "react/jsx-runtime";
import { modal } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
export const ModalUnderlay = (props) => {
    const { isOpen, ...rest } = props;
    const mC = modal.component;
    const modalBackdropClass = cl({
        [mC.backdrop.$]: true,
        [`${mC.backdrop.$}-is-open`]: isOpen
    });
    return _jsx("div", { className: modalBackdropClass, "data-testid": "modal-underlay", ...rest });
};
