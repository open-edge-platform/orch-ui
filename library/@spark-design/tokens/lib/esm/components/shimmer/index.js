import { shimmer } from './component';
import { shimmerKeyframe } from './keyframe';
import { shimmerMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export { shimmer };
export const config = {
    properties,
    component: shimmer,
    keyframe: shimmerKeyframe,
    media: shimmerMedia,
    modes
};
