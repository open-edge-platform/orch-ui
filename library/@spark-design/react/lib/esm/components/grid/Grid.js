import { jsx as _jsx } from "react/jsx-runtime";
import { grid } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/grid/index.css';
export const Grid = ({ id, children, alignContent, alignItems, justifyContent, justifyItems, gap, columnGap, rowGap, areas, columns, rows, gridAutoRows, gridAutoColumns, autoFlow, className = '', style, ...rest }) => {
    const getAreaGridTemplate = (arr) => {
        return arr.map((item) => `"${item}"`).join('\n');
    };
    const gridDimensionValue = (value) => {
        if (/^max-content|min-content|minmax|auto|fit-content|repeat|subgrid/.test(value)) {
            return value;
        }
        return value;
    };
    const gridTemplateValue = (value) => {
        if (Array.isArray(value)) {
            return value.map(gridDimensionValue).join(' ');
        }
        return gridDimensionValue(value);
    };
    const grd = grid.component;
    const gridClass = cl({
        [grd.$]: true,
        [grd.alignItems[alignItems || 'start'].$]: alignItems,
        [grd.alignContent[alignContent || 'start'].$]: alignContent,
        [grd.justifyContent[justifyContent || 'start'].$]: justifyContent,
        [grd.justifyItems[justifyItems || 'auto'].$]: justifyItems,
        [grd.gap[gap || 'm'].$]: gap,
        [grd.rowGap[rowGap || 'm'].$]: rowGap,
        [grd.columnGap[columnGap || 'm'].$]: columnGap,
        [grd.autoFlow[autoFlow || 'row'].$]: autoFlow,
        [className]: !!className
    });
    areas &&
        areas.length > 0 &&
        (style = {
            ...style,
            gridTemplateAreas: `${getAreaGridTemplate(areas).replace(/['"]+/g, "'")}`
        });
    columns &&
        columns.length > 0 &&
        (style = {
            ...style,
            gridTemplateColumns: `${gridTemplateValue(columns)}`
        });
    rows &&
        rows.length > 0 &&
        (style = {
            ...style,
            gridTemplateRows: `${gridTemplateValue(rows)}`
        });
    gridAutoRows &&
        (style = {
            ...style,
            gridAutoRows: gridAutoRows
        });
    gridAutoColumns &&
        (style = {
            ...style,
            gridAutoColumns: gridAutoColumns
        });
    return (_jsx("div", { id: id, className: gridClass, style: style, ...rest, children: children }));
};
