import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { header, HeaderSize, HeaderVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/header/index.css';
const mapChildren = (children) => {
    return Array.isArray(children)
        ? React.Children.map(children, (child, idx) => {
            return React.cloneElement(child, {
                ...child.props,
                idx
            });
        })
        : React.cloneElement(children, { ...children.props, idx: 0 });
};
export const HeaderItem = ({ size = HeaderSize.Medium, className = '', style, selected, children, ...rest }) => {
    const hdc = header.component;
    const itemCl = cl({
        [hdc.item.$]: true,
        [hdc.size[size]?.$]: size,
        [hdc.item.selected.$]: selected,
        [className]: !!className
    });
    return (_jsx("div", { className: itemCl, style: style, ...rest, children: children }));
};
export const Header = ({ title, size = HeaderSize.Medium, variant = HeaderVariant.Classic, logo, children = [], style, className = '', ...rest }) => {
    const hdc = header.component;
    const headerClasses = cl({
        [hdc.$]: true,
        [`${hdc.size?.$}-${size}`]: size,
        [hdc[variant]?.$]: variant,
        [className]: !!className
    });
    const brandClasses = cl({
        [hdc.brand.$]: true
    });
    const regionStartCl = cl({
        [`${hdc.size?.$}-${size}`]: size,
        [hdc.regionStart.$]: true
    });
    const nameCl = cl({
        [`${hdc.size?.$}-${size}`]: size,
        [hdc.projectName.$]: true
    });
    const imgCl = cl({
        [hdc.brand['logoimg'].$]: true,
        [`${hdc.size?.$}-${size}`]: size
    });
    let hasHeaderItem = false;
    React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === HeaderItem) {
            hasHeaderItem = true;
        }
    });
    return (_jsx(React.Fragment, { children: _jsxs("header", { role: "banner", className: headerClasses, style: style, ...rest, children: [logo && (_jsx("div", { className: brandClasses, children: _jsx("div", { className: imgCl, children: logo }) })), hasHeaderItem && (_jsxs("nav", { className: regionStartCl, children: [title ? _jsx("div", { className: nameCl, children: title }) : null, children ? mapChildren(children) : null] })), !hasHeaderItem && children] }) }));
};
