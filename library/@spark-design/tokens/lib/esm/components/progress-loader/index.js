import { progressLoader } from './component';
import { progressLoaderKeyframes } from './keyframes';
import { progressLoaderMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export const config = {
    properties,
    component: progressLoader,
    keyframe: progressLoaderKeyframes,
    media: progressLoaderMedia,
    modes
};
