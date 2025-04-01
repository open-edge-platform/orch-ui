import { component } from '../../setup';
import { prefix, properties } from './properties';
import { FlexAlignContent, FlexAlignItems, FlexDirection, FlexGap, FlexJustifyContent, FlexWrap } from './types';
const flexBase = component({
    display: 'flex'
}, {
    className: prefix
});
export const flex = flexBase.fork({
    gap: Object.values(FlexGap).reduce((acc, gap) => ({
        ...acc,
        [gap]: {
            gap: properties.gap[gap].size
        }
    }), {}),
    direction: Object.values(FlexDirection).reduce((acc, direction) => ({
        ...acc,
        [direction]: {
            flexDirection: properties.direction[direction].direction
        }
    }), {}),
    wrap: Object.values(FlexWrap).reduce((acc, wrap) => ({
        ...acc,
        [wrap]: {
            flexFlow: properties.wrap[wrap].wrap
        }
    }), {}),
    justifyContent: Object.values(FlexJustifyContent).reduce((acc, justifyContent) => ({
        ...acc,
        [justifyContent]: {
            justifyContent: properties.justifyContent[justifyContent].justifyContent
        }
    }), {}),
    alignContent: Object.values(FlexAlignContent).reduce((acc, alignContent) => ({
        ...acc,
        [alignContent]: {
            alignContent: properties.alignContent[alignContent].alignContent
        }
    }), {}),
    alignItems: Object.values(FlexAlignItems).reduce((acc, alignItems) => ({
        ...acc,
        [alignItems]: {
            alignItems: properties.alignItems[alignItems].alignItems
        }
    }), {})
});
