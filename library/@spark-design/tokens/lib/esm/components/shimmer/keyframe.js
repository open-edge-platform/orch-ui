import { keyframe } from '../../setup';
export const shimmerKeyframe = keyframe({
    '@keyframes shimmer-animation': {
        '0%': {
            backgroundPosition: '200% 0'
        },
        '100%': {
            backgroundPosition: '-200% 0'
        }
    }
});
