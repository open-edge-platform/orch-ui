import { keyframe } from '../../setup';
import { properties } from './properties';
export const progressLoaderKeyframes = keyframe({
    '@keyframes linearIndeterminate': {
        from: {
            marginInlineStart: '0%'
        },
        to: {
            marginInlineStart: `calc(100% - ${properties.indeterminateInlineSize})`
        }
    },
    '@keyframes circularIndeterminate': {
        from: {
            transform: 'rotate(0deg)'
        },
        to: {
            transform: 'rotate(360deg)'
        }
    }
});
