import { rosinFlex } from './component';
import { rosinFlexMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
import { RosinFlexAlignment, RosinFlexColumnSize, RosinFlexDirection, RosinFlexItemSize } from './types';
export { rosinFlex, RosinFlexAlignment, RosinFlexColumnSize, RosinFlexDirection, RosinFlexItemSize };
export const config = {
    properties,
    component: rosinFlex,
    media: rosinFlexMedia,
    modes
};
