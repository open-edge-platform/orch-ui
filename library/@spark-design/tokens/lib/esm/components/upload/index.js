import { upload } from './component';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export const config = {
    properties,
    component: upload,
    modes
};
