import { jsx as _jsx } from "react/jsx-runtime";
import { Children } from 'react';
import { ledgeFlex, LedgeFlexAlignment, LedgeFlexDirection } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import LedgeFlexChild from './LedgeFlexChild';
import '@spark-design/css/components/ledge-flex/index.css';
export const MAX_COLS = 12;
export const LedgeFlex = ({ showBorder = false, showItemBorder = false, children, alignment = LedgeFlexAlignment.Middle, direction = LedgeFlexDirection.Row, className = '', cols = [], colsSm = [], colsMd = [], colsLg = [], ...rest }) => {
    const colTotal = { default: 0, lg: 0, md: 0, sm: 0 };
    const nextColSize = { default: 0, lg: 0, md: 0, sm: 0 };
    const spacerCol = { default: 0, lg: 0, md: 0, sm: 0 };
    const configs = {
        default: cols,
        lg: colsLg,
        md: colsMd,
        sm: colsSm
    };
    const fx = ledgeFlex.component;
    const ledgeFlexClass = cl({
        [fx.$]: true,
        [fx.border.$]: showBorder,
        [fx.alignment[alignment].$]: true,
        [fx.direction[direction].$]: true,
        [className]: !!className
    });
    const arrayChildren = Children.toArray(children);
    return (_jsx("div", { className: ledgeFlexClass, ...rest, children: Children.map(arrayChildren, (child, index) => {
            return (_jsx(LedgeFlexChild, { child: child, colTotal: colTotal, configs: configs, index: index, lastIndex: arrayChildren.length - 1, nextColSize: nextColSize, showItemBorder: showItemBorder, spacerCol: spacerCol }, index));
        }) }));
};
