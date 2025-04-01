import { codeSnippet } from './component';
import { codeSnippetKeyframe } from './keyframe';
import { modes } from './modes';
import { properties } from './properties';
export { codeSnippet };
export * from './types';
export const config = {
    properties,
    component: codeSnippet,
    keyframe: codeSnippetKeyframe,
    modes
};
