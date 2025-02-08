import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTab } from '@react-aria/tabs';
import { filterDOMProps } from '@react-aria/utils';
import { tabs as tabsConfig, TabsSize, TabsVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Badge, Button, Icon } from '../';
import '@spark-design/css/components/tabs/index.css';
export const Tab = ({ size = TabsSize.Medium, variant = TabsVariant.Ghost, isCloseable = true, iconOnly = false, isDisabled = false, artworkStyle = 'regular', badge = '', state, item, icon, className = '', style, onCloseCb = (elem) => false }) => {
    const { key, rendered, props } = item;
    const ref = React.useRef(null);
    const { tabProps } = useTab({ key }, state, ref);
    const isSelected = state.selectedKey === key;
    const domProps = filterDOMProps(props);
    const tabsTokens = tabsConfig.component;
    const tabClass = cl({
        [tabsTokens.tab.$]: true,
        [tabsTokens.active.$]: isSelected,
        [tabsTokens.iconOnly.$]: iconOnly,
        [tabsTokens.disabled.$]: isDisabled,
        [tabsTokens.size[size].$]: size,
        [tabsTokens[variant].$]: variant,
        [className]: !!className
    });
    return (_jsxs(Button, { buttonRef: ref, className: tabClass, variant: "ghost", isDisabled: isDisabled || tabProps['aria-disabled'] === true, size: size, startSlot: icon && _jsx(Icon, { icon: icon, altText: rendered, artworkStyle: artworkStyle }), endSlot: isCloseable && (_jsx(Icon, { tabIndex: -1, className: tabsTokens.close.$, icon: "cross", artworkStyle: "regular", onClick: (elem) => onCloseCb(elem) })), style: style, tabProps: tabProps, ...domProps, children: [!iconOnly && rendered, !tabProps['aria-disabled'] && badge && (_jsx(Badge, { shape: "circle", size: "s", variant: "info", text: badge }))] }));
};
