import { focusVisibleMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
import { focusVisible } from './state';
export { focusVisible };
export const config = {
    properties: properties,
    component: focusVisible,
    media: focusVisibleMedia,
    modes: modes
};
