import { token } from '../../setup';
import { UploadSize } from './types';
export const prefix = 'spark-upload';
export const properties = token({
    border: '1px',
    marginBlockEnd: '4px',
    fontWeight: '500',
    marginBlockStart: '1px',
    inlineSize: '280px',
    errorPaddingInlineStart: '28px',
    paddingInlineStart: '2px',
    paddingInlineEnd: '8px',
    dashedBorder: '4px',
    padding: '0px',
    [UploadSize.Large]: {
        fontSize: '16px',
        minInlineSize: '426px',
        minBlockSize: '108px',
        headerMarginBlockEnd: '8px',
        dragAndDropMinBlockSize: '268px',
        dragAndDropSizeIconSize: '32px',
        filesInlineSize: '352px',
        filesIconInlineSize: '30px',
        filesBlockSize: '30px',
        filesLineHeight: '30px',
        dragAndDropMarginBlockEnd: '24px',
        marginBlockStart: '24px'
    },
    [UploadSize.Medium]: {
        fontSize: '14px',
        minInlineSize: '356px',
        minBlockSize: '86px',
        headerMarginBlockEnd: '16px',
        dragAndDropMinBlockSize: '258px',
        dragAndDropSizeIconSize: '21px',
        filesInlineSize: '356px',
        filesIconInlineSize: '26px',
        filesBlockSize: '26px',
        filesLineHeight: '26px',
        dragAndDropMarginBlockEnd: '16px',
        marginBlockStart: '15px'
    },
    [UploadSize.Small]: {
        fontSize: '12px',
        minInlineSize: '280px',
        minBlockSize: '66px',
        headerMarginBlockEnd: '8px',
        dragAndDropMinBlockSize: '174px',
        dragAndDropSizeIconSize: '16px',
        filesInlineSize: '280px',
        filesIconInlineSize: '26px',
        filesBlockSize: '24px',
        filesLineHeight: '24px',
        dragAndDropMarginBlockEnd: '8px',
        marginBlockStart: '8px'
    }
}, {
    prefix: prefix
});
