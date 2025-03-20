import { component } from '../../setup';
import { prefix, properties } from './properties';
import { RosinFlexAlignment, RosinFlexColumnSize, RosinFlexDirection } from './types';
const rosinFlexBase = component({
    display: 'flex',
    border: {},
    item: {
        border: {},
        spacer: {},
        [RosinFlexColumnSize.C1]: {},
        [RosinFlexColumnSize.C2]: {},
        [RosinFlexColumnSize.C3]: {},
        [RosinFlexColumnSize.C4]: {},
        [RosinFlexColumnSize.C5]: {},
        [RosinFlexColumnSize.C6]: {},
        [RosinFlexColumnSize.C7]: {},
        [RosinFlexColumnSize.C8]: {},
        [RosinFlexColumnSize.C9]: {},
        [RosinFlexColumnSize.C10]: {},
        [RosinFlexColumnSize.C11]: {},
        [RosinFlexColumnSize.C12]: {}
    },
    direction: {
        [RosinFlexDirection.Row]: {},
        [RosinFlexDirection.RowReverse]: {},
        [RosinFlexDirection.Column]: {},
        [RosinFlexDirection.ColumnReverse]: {}
    },
    alignment: {
        [RosinFlexAlignment.Start]: {},
        [RosinFlexAlignment.Middle]: {},
        [RosinFlexAlignment.End]: {}
    }
}, {
    className: prefix
});
export const rosinFlex = rosinFlexBase.fork({
    flexWrap: 'wrap',
    containerType: 'inline-size',
    containerName: 'spark-rosin-flex',
    [`&.${rosinFlexBase.direction.$}`]: {
        [`&-${RosinFlexDirection.Row}`]: { flexDirection: 'row' },
        [`&-${RosinFlexDirection.RowReverse}`]: { flexDirection: 'row-reverse' },
        [`&-${RosinFlexDirection.Column}`]: { flexDirection: 'column' },
        [`&-${RosinFlexDirection.ColumnReverse}`]: { flexDirection: 'column-reverse' }
    },
    [`&.${rosinFlexBase.alignment.$}`]: {
        [`&-${RosinFlexAlignment.Start}`]: { alignItems: 'flex-start' },
        [`&-${RosinFlexAlignment.Middle}`]: { alignItems: 'center' },
        [`&-${RosinFlexAlignment.End}`]: { alignItems: 'flex-end' }
    },
    [`&.${rosinFlexBase.border.$}`]: {
        border: `0.1rem solid ${properties.borderColor}`
    },
    [`& .${rosinFlexBase.item.$}`]: {
        flex: 1,
        [`&.${rosinFlexBase.item.border.$}`]: {
            border: `0.1rem solid ${properties.borderColor}`,
            [`&.${rosinFlexBase.item.spacer.$}`]: {
                border: 'none'
            }
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C1].$}`]: {
            flexBasis: properties.col['1']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C2].$}`]: {
            flexBasis: properties.col['2']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C3].$}`]: {
            flexBasis: properties.col['3']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C4].$}`]: {
            flexBasis: properties.col['4']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C5].$}`]: {
            flexBasis: properties.col['5']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C6].$}`]: {
            flexBasis: properties.col['6']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C7].$}`]: {
            flexBasis: properties.col['7']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C8].$}`]: {
            flexBasis: properties.col['8']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C9].$}`]: {
            flexBasis: properties.col['9']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C10].$}`]: {
            flexBasis: properties.col['10']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C11].$}`]: {
            flexBasis: properties.col['11']
        },
        [`&.${rosinFlexBase.item[RosinFlexColumnSize.C12].$}`]: {
            flexBasis: properties.col['12']
        }
    }
});
