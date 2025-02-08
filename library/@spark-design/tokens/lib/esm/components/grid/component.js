import { component } from '../../setup';
import { prefix, properties } from './properties';
import { GridAlignContent, GridAlignItems, GridAutoFlow, GridGap, GridJustifyContent, GridJustifyItems } from './types';
const gridBase = component({
    display: 'grid'
}, {
    className: prefix
});
export const grid = gridBase.fork({
    gap: Object.values(GridGap).reduce((acc, gap) => ({
        ...acc,
        [gap]: {
            gap: properties.gap[gap].size
        }
    }), {}),
    rowGap: Object.values(GridGap).reduce((acc, rowGap) => ({
        ...acc,
        [rowGap]: {
            rowGap: properties.gap[rowGap].size
        }
    }), {}),
    columnGap: Object.values(GridGap).reduce((acc, columnGap) => ({
        ...acc,
        [columnGap]: {
            columnGap: properties.gap[columnGap].size
        }
    }), {}),
    justifyContent: Object.values(GridJustifyContent).reduce((acc, justifyContent) => ({
        ...acc,
        [justifyContent]: {
            justifyContent: properties.justifyContent[justifyContent].justifyContent
        }
    }), {}),
    justifyItems: Object.values(GridJustifyItems).reduce((acc, justifyItems) => ({
        ...acc,
        [justifyItems]: {
            justifyItems: properties.justifyItems[justifyItems].justifyItems
        }
    }), {}),
    autoFlow: Object.values(GridAutoFlow).reduce((acc, autoFlow) => ({
        ...acc,
        [autoFlow]: {
            gridAutoFlow: properties.autoFlow[autoFlow].gridAutoFlow
        }
    }), {}),
    alignContent: Object.values(GridAlignContent).reduce((acc, alignContent) => ({
        ...acc,
        [alignContent]: {
            alignContent: properties.alignContent[alignContent].alignContent
        }
    }), {}),
    alignItems: Object.values(GridAlignItems).reduce((acc, alignItems) => ({
        ...acc,
        [alignItems]: {
            alignItems: properties.alignItems[alignItems].alignItems
        }
    }), {})
});
