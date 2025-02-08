import { component } from '../../setup';
import { prefix } from './properties';
const viewBase = component({
    display: 'flex'
}, {
    className: prefix
});
export const view = viewBase.fork({});
