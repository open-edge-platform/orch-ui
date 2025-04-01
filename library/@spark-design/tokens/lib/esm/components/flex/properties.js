import { token } from '../../setup';
import { FlexAlignContent, FlexAlignItems, FlexDirection, FlexGap, FlexJustifyContent, FlexWrap } from './types';
export const prefix = 'spark-flex';
export const properties = token({
    gap: {
        [FlexGap.NoGap]: {
            size: '0px'
        },
        [FlexGap.Small]: {
            size: '4px'
        },
        [FlexGap.Medium]: {
            size: '8px'
        },
        [FlexGap.Large]: {
            size: '12px'
        }
    },
    direction: {
        [FlexDirection.Row]: { direction: 'row' },
        [FlexDirection.Column]: { direction: 'column' },
        [FlexDirection.RowReverse]: { direction: 'row-reverse' },
        [FlexDirection.ColumnReverse]: { direction: 'column-reverse' }
    },
    wrap: {
        [FlexWrap.Wrap]: { wrap: 'wrap' },
        [FlexWrap.Nowrap]: { wrap: 'no-wrap' },
        [FlexWrap.WrapReverse]: { wrap: 'wrap-reverse' }
    },
    justifyContent: {
        [FlexJustifyContent.Start]: { justifyContent: 'start' },
        [FlexJustifyContent.End]: { justifyContent: 'end' },
        [FlexJustifyContent.Center]: { justifyContent: 'center' },
        [FlexJustifyContent.Left]: { justifyContent: 'left' },
        [FlexJustifyContent.Right]: { justifyContent: 'right' },
        [FlexJustifyContent.SpaceBetween]: { justifyContent: 'space-between' },
        [FlexJustifyContent.SpaceAround]: { justifyContent: 'space-around' },
        [FlexJustifyContent.SpaceEvenly]: { justifyContent: 'space-evenly' },
        [FlexJustifyContent.Stretch]: { justifyContent: 'stretch' },
        [FlexJustifyContent.Baseline]: { justifyContent: 'baseline' },
        [FlexJustifyContent.FirstBaseline]: { justifyContent: 'first baseline' },
        [FlexJustifyContent.LastBaseline]: { justifyContent: 'last baseline' },
        [FlexJustifyContent.SafeCenter]: { justifyContent: 'safe center' },
        [FlexJustifyContent.UnsafeCenter]: { justifyContent: 'unsafe center' }
    },
    alignContent: {
        [FlexAlignContent.Start]: { alignContent: 'start' },
        [FlexAlignContent.End]: { alignContent: 'end' },
        [FlexAlignContent.Center]: { alignContent: 'center' },
        [FlexAlignContent.SpaceBetween]: { alignContent: 'space-between' },
        [FlexAlignContent.SpaceAround]: { alignContent: 'space-around' },
        [FlexAlignContent.SpaceEvenly]: { alignContent: 'space-evenly' },
        [FlexAlignContent.Stretch]: { alignContent: 'stretch' },
        [FlexAlignContent.Baseline]: { alignContent: 'baseline' },
        [FlexAlignContent.FirstBaseline]: { alignContent: 'first baseline' },
        [FlexAlignContent.LastBaseline]: { alignContent: 'last baseline' },
        [FlexAlignContent.SafeCenter]: { alignContent: 'safe center' },
        [FlexAlignContent.UnsafeCenter]: { alignContent: 'unsafe center' }
    },
    alignItems: {
        [FlexAlignItems.Start]: { alignItems: 'start' },
        [FlexAlignItems.End]: { alignItems: 'end' },
        [FlexAlignItems.Center]: { alignItems: 'center' },
        [FlexAlignItems.Stretch]: { alignItems: 'stretch' },
        [FlexAlignItems.SelfStart]: { alignItems: 'self-start' },
        [FlexAlignItems.SelfEnd]: { alignItems: 'self-end' },
        [FlexAlignItems.Baseline]: { alignItems: 'baseline' },
        [FlexAlignItems.FirstBaseline]: { alignItems: 'first baseline' },
        [FlexAlignItems.LastBaseline]: { alignItems: 'last baseline' },
        [FlexAlignItems.SafeCenter]: { alignItems: 'safe center' },
        [FlexAlignItems.UnsafeCenter]: { alignItems: 'unsafe center' }
    }
}, {
    prefix: prefix
});
