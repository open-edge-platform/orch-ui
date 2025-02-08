import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { DividerThickness, modal, ModalSize, TextSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, Divider, Heading, Icon, Text } from '../';
import { DialogContext } from './context';
const mC = modal.component;
export const ModalHeader = ({ title = '', subTitle = '', className = '', titleAriaLabel, descriptionAriaLabel, style, ...rest }) => {
    const dialogContext = useContext(DialogContext);
    const modalHeaderClass = cl({
        [mC.header.$]: true,
        [className]: !!className
    });
    const dividerStartClass = cl({
        [mC.dividerStart.$]: true
    });
    const headerSize = dialogContext.size === ModalSize.Small || dialogContext.size === ModalSize.Medium
        ? TextSize.ExtraSmall
        : TextSize.Small;
    const subTitleSize = dialogContext.size === ModalSize.Small || dialogContext.size === ModalSize.Medium
        ? TextSize.Medium
        : TextSize.Large;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: modalHeaderClass, style: style, "data-testid": "modal-header", ...rest, children: [_jsxs("div", { className: mC.headingTitles.$, children: [_jsx(Heading, { semanticLevel: 1, size: headerSize, id: dialogContext.id + '-title', "data-testid": "modal-title", "aria-label": `${titleAriaLabel ? titleAriaLabel : title}`, children: title }), _jsx(Text, { size: subTitleSize, id: dialogContext.id + '-sub-title', "aria-label": `${descriptionAriaLabel ? descriptionAriaLabel : subTitle}`, "data-testid": "modal-subtitle", children: subTitle })] }), dialogContext.isDismissible && (_jsx(Button, { size: "s", variant: "ghost", "aria-label": 'dismiss', onPress: dialogContext.onClose, iconOnly: true, children: _jsx(Icon, { altText: "Close Modal", icon: "cross" }) }))] }), dialogContext.isDivided && (_jsx(Divider, { thickness: DividerThickness.Light, className: dividerStartClass }))] }));
};
