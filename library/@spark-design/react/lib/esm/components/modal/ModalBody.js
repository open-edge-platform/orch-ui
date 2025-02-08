import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext } from 'react';
import { DividerThickness, modal } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Divider, Text } from '../';
import { DialogContext } from './context';
export const ModalBody = ({ content, className = '', style, ...rest }) => {
    const dialogContext = useContext(DialogContext);
    const mC = modal.component;
    const modalBodyClass = cl({
        [mC.content.$]: true,
        [className]: !!className
    });
    const dividerEndClass = cl({
        [mC.dividerEnd.$]: true
    });
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: modalBodyClass, style: style, "data-testid": "modal-body", ...rest, children: typeof content === 'string' ? (_jsx(Text, { "data-testid": "modal-content", children: content })) : React.isValidElement(content) ? (content) : ('Invalid Content') }), dialogContext.isDivided && (_jsx(Divider, { thickness: DividerThickness.Bold, className: dividerEndClass }))] }));
};
