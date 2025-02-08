import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
export const shadow = component({
    boxShadow: `${properties.X} ${properties.Y} ${properties.blurRadius} ${mode.basic}`,
    display: 'inline-block'
}, {
    className: prefix
});
