import { token } from '../../setup';
import { GridAlignContent, GridAlignItems, GridAutoFlow, GridGap, GridJustifyContent, GridJustifyItems } from './types';
export const prefix = 'spark-grid';
export const properties = token({
    gap: {
        [GridGap.Small]: {
            size: '4px'
        },
        [GridGap.Medium]: {
            size: '8px'
        },
        [GridGap.Large]: {
            size: '12px'
        }
    },
    justifyContent: {
        [GridJustifyContent.Start]: { justifyContent: 'start' },
        [GridJustifyContent.End]: { justifyContent: 'end' },
        [GridJustifyContent.Center]: { justifyContent: 'center' },
        [GridJustifyContent.Left]: { justifyContent: 'left' },
        [GridJustifyContent.Right]: { justifyContent: 'right' },
        [GridJustifyContent.SpaceBetween]: { justifyContent: 'space-between' },
        [GridJustifyContent.SpaceAround]: { justifyContent: 'space-around' },
        [GridJustifyContent.SpaceEvenly]: { justifyContent: 'space-evenly' },
        [GridJustifyContent.Stretch]: { justifyContent: 'stretch' },
        [GridJustifyContent.Baseline]: { justifyContent: 'baseline' },
        [GridJustifyContent.FirstBaseline]: { justifyContent: 'first baseline' },
        [GridJustifyContent.LastBaseline]: { justifyContent: 'last baseline' },
        [GridJustifyContent.SafeCenter]: { justifyContent: 'safe center' },
        [GridJustifyContent.UnsafeCenter]: { justifyContent: 'unsafe center' }
    },
    justifyItems: {
        [GridJustifyItems.Auto]: { justifyItems: 'auto' },
        [GridJustifyItems.Normal]: { justifyItems: 'normal' },
        [GridJustifyItems.Start]: { justifyItems: 'start' },
        [GridJustifyItems.End]: { justifyItems: 'end' },
        [GridJustifyItems.Center]: { justifyItems: 'center' },
        [GridJustifyItems.Left]: { justifyItems: 'left' },
        [GridJustifyItems.Right]: { justifyItems: 'right' },
        [GridJustifyItems.Stretch]: { justifyItems: 'stretch' },
        [GridJustifyItems.SelfStart]: { justifyItems: 'self-start' },
        [GridJustifyItems.SelfEnd]: { justifyItems: 'self-end' },
        [GridJustifyItems.Baseline]: { justifyItems: 'baseline' },
        [GridJustifyItems.FirstBaseline]: { justifyItems: 'first baseline' },
        [GridJustifyItems.LastBaseline]: { justifyItems: 'last baseline' },
        [GridJustifyItems.SafeCenter]: { justifyItems: 'safe center' },
        [GridJustifyItems.UnsafeCenter]: { justifyItems: 'unsafe center' },
        [GridJustifyItems.LegacyRight]: { justifyItems: 'legacy right' },
        [GridJustifyItems.LegacyLeft]: { justifyItems: 'legacy left' },
        [GridJustifyItems.LegacyCenter]: { justifyItems: 'legacy center' }
    },
    alignContent: {
        [GridAlignContent.Start]: { alignContent: 'start' },
        [GridAlignContent.End]: { alignContent: 'end' },
        [GridAlignContent.Center]: { alignContent: 'center' },
        [GridAlignContent.SpaceBetween]: { alignContent: 'space-between' },
        [GridAlignContent.SpaceAround]: { alignContent: 'space-around' },
        [GridAlignContent.SpaceEvenly]: { alignContent: 'space-evenly' },
        [GridAlignContent.Stretch]: { alignContent: 'stretch' },
        [GridAlignContent.Baseline]: { alignContent: 'baseline' },
        [GridAlignContent.FirstBaseline]: { alignContent: 'first baseline' },
        [GridAlignContent.LastBaseline]: { alignContent: 'last baseline' },
        [GridAlignContent.SafeCenter]: { alignContent: 'safe center' },
        [GridAlignContent.UnsafeCenter]: { alignContent: 'unsafe center' }
    },
    alignItems: {
        [GridAlignItems.Start]: { alignItems: 'start' },
        [GridAlignItems.End]: { alignItems: 'end' },
        [GridAlignItems.Center]: { alignItems: 'center' },
        [GridAlignItems.Stretch]: { alignItems: 'stretch' },
        [GridAlignItems.SelfStart]: { alignItems: 'self-start' },
        [GridAlignItems.SelfEnd]: { alignItems: 'self-end' },
        [GridAlignItems.Baseline]: { alignItems: 'baseline' },
        [GridAlignItems.FirstBaseline]: { alignItems: 'first baseline' },
        [GridAlignItems.LastBaseline]: { alignItems: 'last baseline' },
        [GridAlignItems.SafeCenter]: { alignItems: 'safe center' },
        [GridAlignItems.UnsafeCenter]: { alignItems: 'unsafe center' }
    },
    autoFlow: {
        [GridAutoFlow.Row]: { gridAutoFlow: 'row' },
        [GridAutoFlow.Column]: { gridAutoFlow: 'column' },
        [GridAutoFlow.RowDense]: { gridAutoFlow: 'row dense' },
        [GridAutoFlow.ColumnDense]: { gridAutoFlow: 'column dense' }
    }
}, {
    prefix: prefix
});
