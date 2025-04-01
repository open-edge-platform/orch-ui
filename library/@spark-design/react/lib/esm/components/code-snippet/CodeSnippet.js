import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from 'react';
import { codeSnippet, CodeSnippetSize, CodeSnippetVariant, tooltip } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, Icon, Scrollbar } from '../';
import '@spark-design/css/components/code-snippet/index.css';
const TOOLTIP_SPEED = 3900;
export const CodeSnippet = (props) => {
    const { variant = CodeSnippetVariant.Single, size = variant == CodeSnippetVariant.Inline
        ? CodeSnippetSize.Inherit
        : CodeSnippetSize.Medium, hideNumbering = false, copyIcon, children, onCopy, className = '', style, ...rest } = props;
    const cs = codeSnippet.component;
    const tp = tooltip.component;
    const [toolTipActive, setToolTipActive] = useState(false);
    const codeSnippetClass = cl({
        [cs.$]: true
    });
    const specialSize = size === CodeSnippetSize.Inherit ? CodeSnippetSize.Medium : size;
    const csScrollbarClass = cl({
        [cs.$]: true,
        [`${cs.size?.$}-${specialSize}`]: specialSize,
        [cs.inherit?.$]: variant === CodeSnippetVariant.Inline && size === CodeSnippetSize.Inherit,
        [cs[variant]?.$]: variant,
        [cs.scrollbar.isHidden.$]: toolTipActive,
        [cs.single.scrollbarY.isHidden.$]: variant === CodeSnippetVariant.Single,
        [className]: !!className
    });
    const TooltipClass = cl({
        [tp.$]: true,
        [tp.size[specialSize]?.$]: specialSize != CodeSnippetSize.Large,
        [`${cs.animate?.$}-${specialSize}`]: toolTipActive,
        [cs.tooltip[size]?.$]: size,
        [cs.tooltip.multiline.$]: !toolTipActive,
        [`${cs.tooltip.multiline.$}-is-opened`]: toolTipActive
    });
    const copyIconVisibility = cl({
        [cs.copyIcon.$]: toolTipActive,
        [cs.isVisible.$]: !toolTipActive
    });
    const hideNumberingClass = cl({
        [cs.pre.$]: true,
        [cs.hideNumbering.$]: hideNumbering
    });
    function enableToolTip() {
        setToolTipActive(true);
        setTimeout(disableToolTip, TOOLTIP_SPEED);
    }
    function disableToolTip() {
        setToolTipActive(false);
    }
    function copyCodeText(content) {
        navigator.clipboard.writeText(content);
        enableToolTip();
    }
    const getTooltip = (_jsxs("div", { role: "tooltip", className: TooltipClass, children: [_jsx(Icon, { altText: "Information", artworkStyle: "solid", icon: "alert-circle" }), _jsx("span", { className: tp.label.$, children: "Copied to clipboard" })] }));
    const copyIconHtml = (_jsx("output", { children: _jsx("div", { className: `${cs[variant].$}-copy-icon`, children: _jsx(Button, { "data-testid": "code-snippet-button-test", size: variant === CodeSnippetVariant.MultiLine
                    ? CodeSnippetSize.Medium
                    : size == CodeSnippetSize.Inherit
                        ? CodeSnippetSize.Medium
                        : size, className: copyIconVisibility, iconOnly: true, variant: "ghost", onPress: () => copyCodeText(children), children: _jsx(Icon, { altText: "Copy to clipboard", artworkStyle: "regular", icon: "copy" }) }) }) }));
    const getCodeRows = (children) => {
        const rows = [];
        children = children.split('\n');
        for (let i = 0; i < children.length; i++) {
            rows.push(_jsxs(Fragment, { children: [!hideNumbering && _jsx("span", { className: cs.lineCount.$ }), _jsx("code", { children: children[i] })] }, i));
        }
        return rows;
    };
    if (variant == CodeSnippetVariant.MultiLine) {
        return (_jsxs("div", { className: codeSnippetClass, children: [_jsxs(Scrollbar, { x: true, y: true, tabIndex: 0, "aria-label": "Code sample", className: csScrollbarClass, style: style, ...rest, children: [_jsx("pre", { onCopy: onCopy, className: hideNumberingClass, children: getCodeRows(children) }), getTooltip] }), copyIcon && copyIconHtml] }));
    }
    else if (variant == CodeSnippetVariant.Single) {
        return (_jsxs("div", { className: codeSnippetClass, children: [_jsxs(Scrollbar, { x: true, tabIndex: 0, "aria-label": "Code sample", className: csScrollbarClass, style: style, ...rest, children: [_jsx("pre", { onCopy: onCopy, children: _jsx("code", { children: children }) }), toolTipActive && getTooltip] }), copyIcon && copyIconHtml] }));
    }
    return (_jsx("code", { onCopy: onCopy, className: csScrollbarClass, style: style, ...rest, children: children }));
};
