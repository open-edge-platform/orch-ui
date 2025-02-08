import { token } from '../../setup';
import { StepperOrientation, StepperSize } from './types';
export const prefix = 'spark-stepper';
export const properties = token({
    animationSpeed: '0.2s',
    textContainerPaddingInline: '24px',
    elementGap: '8px',
    borderWidth: '2px',
    step: {
        size: '32px',
        textPadding: '16px'
    },
    connector: {
        gapFactor: '0.8',
        size: '2px'
    },
    [StepperSize.Large]: {
        minimunInlineSize: '80px',
        horizontalGap: '16px',
        verticalGap: '8px',
        icon: {
            size: '40px',
            gapFactor: '16px',
            activeSize: '48px',
            activeGapFactor: '16px'
        }
    },
    [StepperSize.Medium]: {
        minimunInlineSize: '80px',
        horizontalGap: '16px',
        verticalGap: '8px',
        icon: {
            size: '32px',
            gapFactor: '8px',
            activeSize: '40px',
            activeGapFactor: '8px'
        }
    },
    [StepperSize.Small]: {
        minimunInlineSize: '80px',
        horizontalGap: '16px',
        verticalGap: '8px',
        icon: {
            size: '24px',
            gapFactor: '0px',
            activeSize: '32px',
            activeGapFactor: '8px'
        }
    },
    [StepperOrientation.Horizontal]: { flexDirection: 'row' },
    [StepperOrientation.Vertical]: { flexDirection: 'column' }
}, {
    prefix: prefix
});
