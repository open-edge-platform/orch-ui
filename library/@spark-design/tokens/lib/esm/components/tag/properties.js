import { token } from '../../setup';
import { TagRounding, TagSize, TagVariant } from './types';
export const prefix = 'spark-tag';
export const properties = token({
    padding: '8px',
    labelGap: '4px',
    fontSize: '12px',
    lineHeight: '15px',
    blockSize: '24px',
    buttonWrapperOutline: '0px',
    buttonWrapperPadding: '0px',
    buttonWrapperMargin: '0px',
    border: '1px',
    boxShadowX: '0px',
    boxShadowYOne: '0px',
    boxShadowBlurRadius: '0px',
    boxShadowSpreadRadiusOne: '1px',
    boxShadowYTwo: '1px',
    boxShadowSpreadRadiusTwo: '0px',
    borderRadius: '0px',
    variants: {
        [TagVariant.Action]: {
            InlineSize: '240px',
            MinInlineSize: '48px'
        }
    },
    size: {
        [TagSize.Small]: {
            padding: '4px',
            labelGap: '2px',
            blockSize: '16px',
            fontSize: '11px',
            lineHeight: '14px',
            icon: {
                fontSize: '13px'
            }
        },
        [TagSize.Large]: {
            padding: '8px',
            labelGap: '4px',
            blockSize: '24px',
            fontSize: '12px',
            lineHeight: '16px',
            icon: {
                fontSize: '14px'
            }
        }
    },
    rounding: {
        [TagRounding.SemiRound]: {
            borderRadius: '4px'
        },
        [TagRounding.FullyRound]: {
            borderRadius: '12px'
        }
    }
}, {
    prefix: prefix
});
