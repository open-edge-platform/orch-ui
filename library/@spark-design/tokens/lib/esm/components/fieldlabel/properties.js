import { token } from '../../setup';
import { FieldLabelSize } from './types';
export const prefix = 'spark-fieldlabel';
export const properties = token({
    marginInline: '5px',
    marginBlock: '5px',
    inlineSize: 'max-content',
    asteriskSize: '20px',
    asteriskLineHeight: '100%',
    asteriskGap: '4px',
    paddingInline: '0px',
    [FieldLabelSize.Large]: {
        fontSize: '14px',
        lineHeight: '16px'
    },
    [FieldLabelSize.Medium]: {
        fontSize: '12px',
        lineHeight: '14px'
    },
    [FieldLabelSize.Small]: {
        fontSize: '11px',
        lineHeight: '12px'
    }
}, {
    prefix: prefix
});
