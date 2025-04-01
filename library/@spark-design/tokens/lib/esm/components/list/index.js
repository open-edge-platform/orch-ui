import { list } from './component';
import { listMedia } from './media';
import { modes } from './modes';
import { properties } from './properties';
import { ListSize } from './types';
export { list, ListSize };
export const config = {
    properties,
    component: list,
    media: listMedia,
    modes
};
