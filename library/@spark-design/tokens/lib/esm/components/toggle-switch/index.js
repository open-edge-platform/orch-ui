import { toggleSwitch } from './component';
import { toggleSwitchMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export const config = {
    properties,
    component: toggleSwitch,
    media: toggleSwitchMedia,
    modes
};
