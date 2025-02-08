import { ledgeFlex } from './component';
import { ledgeFlexMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
import { LedgeFlexAlignment, LedgeFlexColumnSize, LedgeFlexDirection, LedgeFlexItemSize } from './types';
export { ledgeFlex, LedgeFlexAlignment, LedgeFlexColumnSize, LedgeFlexDirection, LedgeFlexItemSize };
export const config = {
    properties,
    component: ledgeFlex,
    media: ledgeFlexMedia,
    modes
};
