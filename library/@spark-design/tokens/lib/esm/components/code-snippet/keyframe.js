import { keyframe } from '../../setup';
import { prefix, properties } from './properties';
export const codeSnippetKeyframe = keyframe({
    [`@keyframes ${prefix}-tooltip-animation-l`]: {
        '0%': {
            marginInlineStart: '100%'
        },
        '37%, 62%': {
            inlineSize: '100%',
            marginInlineStart: `calc(100% - ${properties.single.l.inlineTooltipSize})`,
            position: 'absolute'
        },
        '100%': {
            marginInlineStart: '100%'
        }
    },
    [`@keyframes ${prefix}-tooltip-animation-m`]: {
        '0%': {
            marginInlineStart: '100%'
        },
        '37%, 62%': {
            inlineSize: '100%',
            marginInlineStart: `calc(100% - ${properties.single.m.inlineTooltipSize})`,
            position: 'absolute'
        },
        '100%': {
            marginInlineStart: '100%'
        }
    },
    [`@keyframes ${prefix}-tooltip-animation-s`]: {
        '0%': {
            marginInlineStart: '100%'
        },
        '37%, 62%': {
            inlineSize: '100%',
            marginInlineStart: `calc(100% - ${properties.single.s.inlineTooltipSize})`,
            position: 'absolute'
        },
        '100%': {
            marginInlineStart: '100%'
        }
    }
});
