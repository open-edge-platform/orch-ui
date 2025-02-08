import { rgba } from '../../helpers';
import { palette } from '../../palette';
import { token } from '../../setup';
import { ModalSize } from './types';
export const prefix = 'spark-modal';
export const properties = token({
    noSpacing: '0px',
    backdrop: {
        position: 'fixed',
        zIndex: '2',
        insetInlineStart: '0',
        insetBlockStart: '0',
        inlineSize: '100%',
        blockSize: '100%',
        backgroundColor: rgba(palette.black, 0.5)
    },
    [ModalSize.Small]: {
        tempRow: '24px',
        tempCol: '24px',
        contentMinBlockSize: '80px',
        rowGap: '8px',
        headerGap: '4px',
        margin: '16px',
        size: '500px',
        minInlineSize: '320px'
    },
    [ModalSize.Medium]: {
        tempRow: '32px',
        tempCol: '32px',
        contentMinBlockSize: '80px',
        rowGap: '12px',
        headerGap: '8px',
        margin: '18px',
        size: '640px',
        minInlineSize: '320px'
    },
    [ModalSize.Large]: {
        tempRow: '40px',
        tempCol: '40px',
        contentMinBlockSize: '80px',
        rowGap: '16px',
        headerGap: '10px',
        margin: '22px',
        size: '800px',
        minInlineSize: '320px'
    }
}, {
    prefix: prefix
});
