import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useRef } from 'react';
import { useBreadcrumbItem, useBreadcrumbs } from 'react-aria';
import { FocusableProvider } from '@react-aria/focus';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { breadcrumb, focusVisible as focus, hyperlink, HyperlinkVariant, levelMap, TextSize, typographyConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Hyperlink } from '..';
import '@spark-design/css/components/breadcrumb/index.css';
export var BreadcrumbType;
(function (BreadcrumbType) {
    BreadcrumbType["Quiet"] = "quiet";
})(BreadcrumbType || (BreadcrumbType = {}));
const BreadcrumbContext = createContext(null);
export const Breadcrumb = ({ children, variant = HyperlinkVariant.Primary, size = TextSize.Medium, visualType = BreadcrumbType.Quiet, className = '', style, ...props }) => {
    const { navProps } = useBreadcrumbs(props);
    const domProps = filterDOMProps(props);
    const brdcrmb = breadcrumb.component;
    const breadcrumbClass = cl({
        [brdcrmb.$]: true,
        [className]: !!className
    });
    const breadcrumbItemsClass = cl({
        [brdcrmb.items.$]: true
    });
    return (_jsx(BreadcrumbContext.Provider, { value: { size, visualType, variant, children }, children: _jsx("nav", { className: breadcrumbClass, style: style, ...mergeProps(domProps, navProps), children: _jsx("ol", { className: breadcrumbItemsClass, children: children }) }) }));
};
export const BreadcrumbItem = ({ ...props }) => {
    const breadcrumbContext = useContext(BreadcrumbContext);
    const ref = useRef();
    const { itemProps } = useBreadcrumbItem(props, ref);
    const { children, isCurrent, as, href, className = '', style } = props;
    const brdcrmb = breadcrumb.component;
    const fcs = focus.component;
    const hprlnk = hyperlink.component;
    const typog = typographyConfig.components;
    let brdCtx = undefined;
    if (breadcrumbContext) {
        brdCtx = breadcrumbContext;
    }
    const hyperlinkClass = cl({
        [hprlnk.$]: true,
        [hprlnk.isDisabled.$]: isCurrent,
        [hprlnk[brdCtx.variant]?.$]: brdCtx?.variant,
        [hprlnk[brdCtx.visualType]?.$]: brdCtx?.visualType,
        [typog[0].$ + '-' + levelMap[brdCtx?.size]]: brdCtx?.size,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [fcs.background.$]: true,
        [className]: !!className
    });
    const breadcrumbItemClass = cl({
        [brdcrmb.item.$]: true,
        [brdcrmb.isCurrent?.$]: isCurrent,
        [className]: !!className
    });
    const modifyChildren = (child) => {
        const props = {
            tabIndex: `1`,
            className: hyperlinkClass
        };
        return typeof child === 'string' ? child : React.cloneElement(child, props);
    };
    if (href)
        return (_jsx("li", { className: breadcrumbItemClass, children: _jsx(FocusableProvider, { ref: ref, ...itemProps, children: _jsx(Hyperlink, { as: as, href: href, size: breadcrumbContext?.size, variant: breadcrumbContext?.variant, visualType: breadcrumbContext?.visualType, isDisabled: isCurrent, style: style, children: children }) }) }));
    else {
        return (_jsx("li", { className: breadcrumbItemClass, children: _jsx(FocusableProvider, { ref: ref, ...itemProps, children: React.Children.map(children, (child) => modifyChildren(child)) }) }));
    }
};
