import { hyperlink } from './component';
import { hyperlinkMedia } from './media';
import { modes } from './modes';
import { prefix } from './properties';
export * from './types';
export { hyperlink };
export const config = {
    prefix,
    component: hyperlink,
    media: hyperlinkMedia,
    modes
};
