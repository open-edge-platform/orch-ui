import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { UploadSize } from './types';
const uploadBase = component({
    inlineSize: properties.inlineSize,
    header: {
        display: 'grid',
        color: mode.headerColor
    },
    button: {
        position: 'relative',
        overflow: 'hidden'
    },
    dragAndDrop: {
        boxSizing: 'border-box',
        flex: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: mode.dragAndDropBodyBackgroundColor,
        border: `${properties.border} solid ${mode.dragAndDropBodyBorderColor}`
    },
    dragAndDropBody: {},
    dragAndDropText: {},
    files: {},
    filesItem: {},
    filesError: {}
}, {
    className: prefix
});
export const upload = uploadBase.fork({
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$}`]: {
        marginInline: 'auto',
        textAlign: 'center'
    },
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$} button`]: {
        margin: 'auto'
    },
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$} span`]: {
        display: 'block'
    },
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$} .spark-icon`]: {
        marginInline: 'auto'
    },
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$} .${uploadBase.dragAndDropText.$}`]: {
        marginBlockEnd: properties.marginBlockEnd,
        color: mode.dragAndDropTextColor,
        fontWeight: properties.fontWeight
    },
    [`& .${uploadBase.dragAndDrop.$} .${uploadBase.dragAndDropBody.$} .spark-icon-status`]: {
        color: mode.dragAndDropBodyIcon
    },
    [`& .${uploadBase.files.$} .${uploadBase.filesItem.$}`]: {
        marginBlockStart: properties.marginBlockStart,
        display: 'inline-flex',
        backgroundColor: mode.filesBackgroundColor
    },
    [`& .${uploadBase.files.$} .${uploadBase.filesError.$}`]: {
        display: 'inline-flex',
        backgroundColor: mode.filesErrorBackgroundColor,
        color: mode.filesErrorColor,
        paddingInlineStart: properties.errorPaddingInlineStart
    },
    [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .file-text`]: {
        inlineSize: '100%',
        paddingInlineStart: properties.paddingInlineStart,
        paddingInlineEnd: properties.paddingInlineEnd,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .start-slot .spark-icon`]: {
        textAlign: 'center'
    },
    size: Object.values(UploadSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            minInlineSize: properties[size]?.minInlineSize,
            minBlockSize: properties[size]?.minBlockSize,
            [`& .${uploadBase.header.$}`]: {
                marginBlockEnd: properties[size]?.headerMarginBlockEnd
            },
            [`& .${uploadBase.button.$}`]: {
                marginBlockEnd: properties[size]?.headerMarginBlockEnd
            },
            [`& .${uploadBase.dragAndDrop.$}`]: {
                minBlockSize: properties[size]?.dragAndDropMinBlockSize,
                marginBlockEnd: properties[size]?.dragAndDropMarginBlockEnd
            },
            [`& .${uploadBase.dragAndDrop.$} .can-drop`]: {
                position: 'absolute',
                border: `${properties.dashedBorder} dashed ${mode.canDropBorderColor}`,
                background: mode.canDropBackground,
                minBlockSize: properties[size]?.dragAndDropMinBlockSize,
                minInlineSize: properties[size]?.minInlineSize,
                marginBlockStart: properties[size]?.marginBlockStart
            },
            [`& .${uploadBase.files.$}`]: {
                inlineSize: properties[size]?.filesInlineSize
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesItem.$}`]: {
                blockSize: properties[size]?.filesBlockSize,
                inlineSize: properties[size]?.filesInlineSize
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesError.$}`]: {
                blockSize: properties[size]?.filesBlockSize,
                inlineSize: properties[size]?.filesInlineSize
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesError.$} span,
                & .${uploadBase.files.$} .${uploadBase.filesItem.$} span`]: {
                lineHeight: properties[size]?.filesBlockSize
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .file-text`]: {
                blockSize: properties[size]?.filesBlockSize,
                lineHeight: properties[size]?.filesLineHeight
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .start-slot`]: {
                inlineSize: properties[size]?.filesIconInlineSize,
                lineHeight: properties[size]?.filesLineHeight,
                fontSize: properties[size]?.fontSize
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .start-slot button`]: {
                inlineSize: properties[size]?.filesIconInlineSize,
                blockSize: properties[size]?.filesBlockSize,
                padding: properties.padding
            },
            [`& .${uploadBase.files.$} .${uploadBase.filesItem.$} .start-slot .spark-icon`]: {
                inlineSize: properties[size]?.filesIconInlineSize,
                blockSize: properties[size]?.filesBlockSize,
                lineHeight: properties[size]?.filesLineHeight
            }
        }
    }), {})
});
