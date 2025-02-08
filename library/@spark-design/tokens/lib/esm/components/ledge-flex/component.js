import { component } from '../../setup';
import { prefix, properties } from './properties';
import { LedgeFlexAlignment, LedgeFlexColumnSize, LedgeFlexDirection } from './types';
const ledgeFlexBase = component({
    display: 'flex',
    border: {},
    item: {
        border: {},
        spacer: {},
        [LedgeFlexColumnSize.C1]: {},
        [LedgeFlexColumnSize.C2]: {},
        [LedgeFlexColumnSize.C3]: {},
        [LedgeFlexColumnSize.C4]: {},
        [LedgeFlexColumnSize.C5]: {},
        [LedgeFlexColumnSize.C6]: {},
        [LedgeFlexColumnSize.C7]: {},
        [LedgeFlexColumnSize.C8]: {},
        [LedgeFlexColumnSize.C9]: {},
        [LedgeFlexColumnSize.C10]: {},
        [LedgeFlexColumnSize.C11]: {},
        [LedgeFlexColumnSize.C12]: {}
    },
    direction: {
        [LedgeFlexDirection.Row]: {},
        [LedgeFlexDirection.RowReverse]: {},
        [LedgeFlexDirection.Column]: {},
        [LedgeFlexDirection.ColumnReverse]: {}
    },
    alignment: {
        [LedgeFlexAlignment.Start]: {},
        [LedgeFlexAlignment.Middle]: {},
        [LedgeFlexAlignment.End]: {}
    }
}, {
    className: prefix
});
export const ledgeFlex = ledgeFlexBase.fork({
    flexWrap: 'wrap',
    containerType: 'inline-size',
    containerName: 'spark-ledge-flex',
    [`&.${ledgeFlexBase.direction.$}`]: {
        [`&-${LedgeFlexDirection.Row}`]: { flexDirection: 'row' },
        [`&-${LedgeFlexDirection.RowReverse}`]: { flexDirection: 'row-reverse' },
        [`&-${LedgeFlexDirection.Column}`]: { flexDirection: 'column' },
        [`&-${LedgeFlexDirection.ColumnReverse}`]: { flexDirection: 'column-reverse' }
    },
    [`&.${ledgeFlexBase.alignment.$}`]: {
        [`&-${LedgeFlexAlignment.Start}`]: { alignItems: 'flex-start' },
        [`&-${LedgeFlexAlignment.Middle}`]: { alignItems: 'center' },
        [`&-${LedgeFlexAlignment.End}`]: { alignItems: 'flex-end' }
    },
    [`&.${ledgeFlexBase.border.$}`]: {
        border: `0.1rem solid ${properties.borderColor}`
    },
    [`& .${ledgeFlexBase.item.$}`]: {
        flex: 1,
        [`&.${ledgeFlexBase.item.border.$}`]: {
            border: `0.1rem solid ${properties.borderColor}`,
            [`&.${ledgeFlexBase.item.spacer.$}`]: {
                border: 'none'
            }
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C1].$}`]: {
            flexBasis: properties.col['1']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C2].$}`]: {
            flexBasis: properties.col['2']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C3].$}`]: {
            flexBasis: properties.col['3']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C4].$}`]: {
            flexBasis: properties.col['4']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C5].$}`]: {
            flexBasis: properties.col['5']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C6].$}`]: {
            flexBasis: properties.col['6']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C7].$}`]: {
            flexBasis: properties.col['7']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C8].$}`]: {
            flexBasis: properties.col['8']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C9].$}`]: {
            flexBasis: properties.col['9']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C10].$}`]: {
            flexBasis: properties.col['10']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C11].$}`]: {
            flexBasis: properties.col['11']
        },
        [`&.${ledgeFlexBase.item[LedgeFlexColumnSize.C12].$}`]: {
            flexBasis: properties.col['12']
        }
    }
});
