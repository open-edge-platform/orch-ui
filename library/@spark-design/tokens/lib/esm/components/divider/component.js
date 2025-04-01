import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { DividerThickness } from './types';
export const baseDivider = component({
    backgroundColor: mode.backgroundColor,
    display: 'inline-block',
    horizontal: {},
    vertical: {}
}, {
    className: prefix
});
export const divider = baseDivider.fork({
    [`&.${baseDivider.horizontal.$}`]: {
        inlineSize: '100%'
    },
    [`&.${baseDivider.vertical.$}`]: {
        blockSize: '100%'
    },
    thickness: Object.values(DividerThickness).reduce((acc, thickness) => ({
        ...acc,
        [thickness]: {
            [`&.${baseDivider.horizontal.$}`]: {
                blockSize: `${properties[thickness].thick}`
            },
            [`&.${baseDivider.vertical.$}`]: {
                inlineSize: `${properties[thickness].thick}`
            }
        }
    }), {})
});
