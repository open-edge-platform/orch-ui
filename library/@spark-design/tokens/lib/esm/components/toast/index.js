import { toast } from './component';
import { modes } from './modes';
import { properties } from './properties';
export * from './types';
export { toast };
export const config = {
    properties,
    component: toast,
    modes
};
