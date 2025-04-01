import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { mergeProps } from 'react-aria';
import { useTabPanel } from '@react-aria/tabs';
import { tabs as tabsConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Scrollbar } from '../';
export const TabPanel = forwardRef(function TabPanel(props, ref) {
    const { state, panelX, panelY, panelHidden, className = '', style, ...otherProps } = props;
    const { tabPanelProps } = useTabPanel(props, state, ref);
    const tabsTokens = tabsConfig.component;
    const tabsPanelClasses = cl({
        [tabsTokens.scrollbar.$]: true,
        [className]: !!className
    });
    return (_jsx(Scrollbar, { ref: ref, x: panelX, y: panelY, hidden: panelHidden, className: tabsPanelClasses, style: style, ...mergeProps(tabPanelProps, otherProps), children: state.selectedItem?.props.children }));
});
