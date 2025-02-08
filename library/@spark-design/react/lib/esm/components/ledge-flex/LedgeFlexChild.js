import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ledgeFlex, LedgeFlexItemSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { MAX_COLS } from './LedgeFlex';
const LedgeFlexChild = ({ index, lastIndex, showItemBorder, child, colTotal, nextColSize, spacerCol, configs }) => {
    const fx = ledgeFlex.component;
    const ledgeFlexItemClass = cl({
        [fx.item.$]: true,
        [fx.item.border.$]: showItemBorder
    });
    const getColSize = (index) => {
        const sfiColClass = (cols, size) => `${fx.item.$}-c${cols}${size ? '-' + size : ''}`;
        const result = Object.values(LedgeFlexItemSize)
            .map((size) => {
            if (configs[size] && configs[size].length > 0) {
                return sfiColClass(configs[size][index % configs[size].length], size === LedgeFlexItemSize.Default ? null : size);
            }
            else
                return '';
        })
            .join(' ');
        return result;
    };
    const getSpacerSize = (index) => {
        spacerCol[LedgeFlexItemSize.Default] = 0;
        spacerCol[LedgeFlexItemSize.Large] = 0;
        spacerCol[LedgeFlexItemSize.Medium] = 0;
        spacerCol[LedgeFlexItemSize.Small] = 0;
        Object.values(LedgeFlexItemSize).forEach((key) => {
            if (!configs[key])
                return;
            colTotal[key] += configs[key][index % configs[key].length];
            nextColSize[key] = configs[key][(index + 1) % configs[key].length];
            if (colTotal[key] + nextColSize[key] > MAX_COLS) {
                spacerCol[key] = MAX_COLS - colTotal[key];
                if (index !== lastIndex)
                    colTotal[key] = 0;
            }
            else {
                spacerCol[key] = 0;
            }
            if (index === lastIndex) {
                spacerCol[key] = MAX_COLS - colTotal[key];
            }
        });
    };
    getSpacerSize(index);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: `${ledgeFlexItemClass} ${getColSize(index)}`.trim(), children: child }, index), Object.values(LedgeFlexItemSize).map((key, index) => {
                return (spacerCol[key] > 0 && (_jsx("div", { className: `${ledgeFlexItemClass} ${fx.item.$}-c${spacerCol[key]}${key === LedgeFlexItemSize.Default ? '' : '-' + key} ${fx.item.spacer.$}` }, key)));
            })] }));
};
export default LedgeFlexChild;
