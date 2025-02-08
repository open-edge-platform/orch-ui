import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useRef } from 'react';
import { useDialog } from '@react-aria/dialog';
import { mergeProps } from '@react-aria/utils';
import { modal } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { DialogContext } from './context';
export const Dialog = ({ children, ...props }) => {
    const { ...contextProps } = useContext(DialogContext) || {};
    const domRef = useRef(null);
    const gridRef = useRef(null);
    const { dialogProps } = useDialog(mergeProps(contextProps, props), domRef);
    const mC = modal.component;
    const modalSectionClass = cl({
        [mC.section.$]: true
    });
    const modalGridClass = cl({
        [mC.grid.$]: true
    });
    return (_jsx("section", { ref: domRef, className: modalSectionClass, ...dialogProps, role: "alertdialog", "aria-modal": "true", "aria-labelledby": contextProps['aria-labelledby'] || contextProps.id + '-title', "aria-describedby": contextProps['aria-describedby'] || contextProps.id + '-sub-title', children: _jsx("div", { ref: gridRef, className: modalGridClass, children: children }) }));
};
