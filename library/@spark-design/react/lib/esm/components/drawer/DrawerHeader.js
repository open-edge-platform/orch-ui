import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonSize, ButtonVariant, drawer } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, Heading, Icon, Text } from '../';
import '@spark-design/css/components/badge/index.css';
const dc = drawer.component;
export const DrawerHeader = ({ closable = true, onHide, title = '', subTitle = '', headerContent, className = '', style, ...rest }) => {
    const drawerHeaderClass = cl({
        [dc.header.$]: true,
        [className]: !!className
    });
    return headerContent ? (headerContent) : (_jsxs("div", { className: drawerHeaderClass, style: style, "data-testid": "drawer-header", ...rest, children: [_jsxs("div", { children: [_jsx(Heading, { semanticLevel: 1, size: "s", "data-testid": "drawer-header-title", children: title }), _jsx(Text, { size: "l", "data-testid": "drawer-header-subtitle", children: subTitle })] }), closable && onHide && (_jsx(Button, { iconOnly: true, onPress: onHide, variant: ButtonVariant.Secondary, size: ButtonSize.Large, "data-testid": "drawer-header-close-btn", children: _jsx(Icon, { icon: "cross" }) }))] }));
};
