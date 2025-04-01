import { component } from '../../setup';
import { prefix } from './properties';
import { logoVariants, properties } from './properties';
export const logoBase = component({
    display: 'inline-block'
}, {
    className: prefix
});
export const logo = logoBase.fork({
    variant: Object.keys(logoVariants).reduce((acc, logo) => ({
        ...acc,
        [logo]: {
            background: properties[logo]
        }
    }), {})
});
