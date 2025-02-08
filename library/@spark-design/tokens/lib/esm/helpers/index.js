import { rgba as rgbaFn } from 'polished';
export const rgba = (a, b) => rgbaFn(a.toValue({ isUnwrapValue: true }), b);
