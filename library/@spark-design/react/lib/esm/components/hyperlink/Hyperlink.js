import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import React from 'react';
import { useLink } from 'react-aria';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { focusVisible as focus, hyperlink, HyperlinkType, HyperlinkVariant, levelMap, TextSize, typographyConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/hyperlink/index.css';
const modifyChildren = (child) => {
    const props = {
        tabIndex: `-1`
    };
    return typeof child === 'string' ? child : React.cloneElement(child, props);
};
export const Hyperlink = ({ size = TextSize.Medium, variant = HyperlinkVariant.Primary, visualType = HyperlinkType.Standard, as = 'a', children, className = '', style, href, isDisabled = false, ...props }) => {
    const ref = useRef();
    const { linkProps, isPressed } = useLink({ ...props, elementType: as }, ref);
    const allowedSpreadProps = [
        'aria-current',
        'target',
        'ref',
        'rel',
        'referrerPolicy',
        'hrefLang',
        'type',
        'download',
        'ping'
    ];
    const domProps = filterDOMProps(props, {
        labelable: true,
        propNames: new Set(allowedSpreadProps)
    });
    const hprlnk = hyperlink.component;
    const typog = typographyConfig.components;
    const fcs = focus.component;
    const hyperlinkClass = cl({
        [hprlnk.$]: true,
        [hprlnk.isDisabled.$]: isDisabled,
        [hprlnk.isPressed.$]: isPressed,
        [hprlnk[variant]?.$]: variant,
        [hprlnk[visualType]?.$]: visualType,
        [typog[0].$ + '-' + levelMap[size]]: size,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [fcs.background.$]: true,
        [className]: !!className
    });
    const Tag = as;
    return (_jsx(Tag, { ref: ref, href: href, className: hyperlinkClass, style: style, ...mergeProps(linkProps, domProps), tabIndex: isDisabled ? -1 : 1, children: React.Children.map(children, (child) => modifyChildren(child)) }));
};
