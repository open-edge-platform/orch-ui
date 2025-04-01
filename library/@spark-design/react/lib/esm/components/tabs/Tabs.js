import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useTabList } from '@react-aria/tabs';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { useTabListState } from '@react-stately/tabs';
import { tabs as tabsConfig, TabsSize, TabsVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import '@spark-design/css/components/tabs/index.css';
export const Tabs = (props) => {
    const { size = TabsSize.Medium, variant = TabsVariant.Ghost, artworkStyle = 'solid', isCloseable = false, isDisabled = false, panelX, panelY, panelHidden, className = '', style, classNamePanel = '', panelStyle } = props;
    const ariaTabListState = useTabListState(props);
    const domProps = filterDOMProps(props);
    const ref = React.createRef();
    const tabsTokens = tabsConfig.component;
    const tabsContainerClasses = cl({
        [tabsTokens.$]: true,
        [tabsTokens.size[size].$]: size,
        [tabsTokens[variant].$]: variant,
        [className]: !!className
    });
    Array.from(ariaTabListState.collection).map((item) => {
        if (item?.props?.isDisabled)
            ariaTabListState?.disabledKeys?.add(item?.key.toString());
    });
    const onCloseHandler = (elem) => {
        let nextTab;
        let switchedTab = false;
        if (elem.target.parentElement.parentElement.nextSibling) {
            nextTab = elem.target.parentElement.parentElement.nextSibling;
            while (nextTab) {
                if (nextTab.disabled === true) {
                    nextTab = nextTab.nextSibling;
                    continue;
                }
                else {
                    nextTab.click();
                    switchedTab = true;
                    break;
                }
            }
        }
        if (elem.target.parentElement.parentElement.previousSibling && switchedTab === false) {
            nextTab = elem.target.parentElement.parentElement.previousSibling;
            while (nextTab) {
                if (nextTab.disabled === true) {
                    nextTab = nextTab.previousSibling;
                    continue;
                }
                else {
                    nextTab.click();
                    break;
                }
            }
        }
        if (elem.target.parentElement.parentElement) {
            elem.target.parentElement.parentElement.remove();
        }
    };
    const { tabListProps } = useTabList(props, ariaTabListState, ref);
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: ref, className: tabsContainerClasses, style: style, ...mergeProps(tabListProps, domProps), children: Array.from(ariaTabListState.collection).map((item) => (_jsx(Tab, { item: item, state: ariaTabListState, onCloseCb: (elem) => onCloseHandler(elem), isCloseable: item.props.isCloseable == undefined
                        ? isCloseable
                        : item.props.isCloseable, isDisabled: item.props.isDisabled == undefined ? isDisabled : item.props.isDisabled, icon: item.props?.icon, artworkStyle: item.props.artworkStyle == undefined
                        ? artworkStyle
                        : item.props.artworkStyle, size: size, variant: variant, badge: item.props?.badge, iconOnly: item.props?.iconOnly, style: item.props?.style, className: item.props?.className }, item.key))) }), _jsx(TabPanel, { state: ariaTabListState, className: classNamePanel, style: panelStyle, panelY: panelY, panelX: panelX, panelHidden: panelHidden }, ariaTabListState.selectedItem?.key)] }));
};
Tabs.displayName = 'Tabs';
