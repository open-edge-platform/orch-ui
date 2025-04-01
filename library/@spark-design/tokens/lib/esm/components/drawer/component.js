import { component } from '../../setup';
import { button } from '../button';
import { heading } from '../heading';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { DrawerPosition, DrawerSize } from './types';
export const drawerBase = component({
    base: {
        zIndex: properties.base.zIndex,
        backgroundColor: mode.backgroundColor,
        transition: properties.base.transition,
        display: properties.base.display,
        position: properties.base.position,
        flexDirection: properties.base.flexDirection
    },
    show: {
        visibility: properties.show.visibility,
        transform: properties.show.transform
    },
    hide: {
        visibility: properties.hide.visibility,
        inlineSize: properties.hide.inlineSize
    },
    header: {
        borderBlockEndStyle: properties.header.borderBlockEndStyle,
        borderBlockEndWidth: properties.header.borderBlockEndWidth,
        borderColor: mode.borderColor,
        paddingBlockEnd: properties.header.paddingBlockEnd,
        marginBlockStart: properties.header.marginBlockStart,
        marginInline: properties.header.marginInline,
        display: properties.header.display,
        justifyContent: properties.header.justifyContent,
        alignItems: properties.header.alignItems,
        [`& .${heading.$}`]: {
            paddingBlockEnd: properties.header.heading.paddingBlockEnd,
            marginBlock: properties.header.heading.marginBlock
        },
        [`& .${button.$}`]: {
            border: properties.header.button.border,
            backgroundColor: properties.header.button.backgroundColor,
            outline: properties.header.button.outline,
            fontSize: properties.header.button.size,
            paddingBlock: properties.header.button.paddingBlock,
            paddingInline: properties.header.button.paddingInline
        }
    },
    body: {
        marginBlock: properties.body.marginBlock,
        marginInline: properties.body.marginInline,
        flex: properties.body.flex,
        overflow: properties.body.overflow
    },
    footer: {
        backgroundColor: mode.backgroundColor,
        borderTopStyle: properties.footer.borderTopStyle,
        borderTopWidth: properties.footer.borderTopWidth,
        borderColor: mode.borderColor,
        paddingBlockStart: properties.footer.paddingBlockStart,
        marginBlock: properties.footer.marginBlockEnd,
        marginInline: properties.footer.marginInline,
        display: properties.footer.display,
        justifyContent: properties.footer.justifyContent
    },
    buttonContainerRight: {
        display: properties.footer.buttonContainerRight.display,
        gap: properties.footer.buttonContainerRight.gap,
        justifyContent: properties.footer.buttonContainerRight.justifyContent
    },
    backdrop: {
        backgroundColor: mode.backdrop.backgroundColor,
        zIndex: properties.backdrop.zIndex,
        insetInlineStart: properties.backdrop.insetInlineStart,
        insetBlockStart: properties.backdrop.insetBlockStart,
        inlineSize: properties.backdrop.inlineSize,
        blockSize: properties.backdrop.blockSize,
        position: properties.backdrop.position
    },
    backdropTransparent: {
        opacity: properties.backdrop.transparent.opacity
    },
    backdropBlack: {
        opacity: properties.backdrop.opacity
    },
    shadow: {
        boxShadow: `${properties.shadow.x} ${properties.shadow.y} 
            ${properties.shadow.blur} ${mode.shadowColor}`
    }
}, {
    className: prefix
});
export const drawer = drawerBase.fork({
    base: {
        [`&.${drawerBase.hide.$}`]: {
            transition: properties.base.transitionHide
        }
    },
    size: {
        ...Object.values(DrawerSize).reduce((allSizes, size) => ({
            ...allSizes,
            [size]: {
                ...Object.values(DrawerPosition).reduce((allPositions, position) => ({
                    ...allPositions,
                    [position]: {
                        ['&']: {
                            inlineSize: properties[position][size].inlineSize,
                            blockSize: properties[position][size].blockSize
                        }
                    }
                }), {})
            }
        }), {})
    },
    position: {
        ...Object.values(DrawerPosition).reduce((allPositions, position) => ({
            ...allPositions,
            [position]: {
                ['&']: {
                    insetInlineStart: properties[position].insetInlineStart,
                    insetBlockStart: properties[position].insetBlockStart,
                    insetInlineEnd: properties[position].insetInlineEnd,
                    insetBlockEnd: properties[position].insetBlockEnd
                },
                [`&.${drawerBase.hide.$}`]: {
                    transform: properties[position].transform
                }
            }
        }), {})
    }
});
