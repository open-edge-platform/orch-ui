import { fieldLabel, fieldLabelBase } from './component';
import { fieldLabelMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export { fieldLabelBase };
export const config = {
    properties,
    component: fieldLabel,
    media: fieldLabelMedia,
    modes
};
