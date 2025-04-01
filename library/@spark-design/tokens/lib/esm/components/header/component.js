import { component } from '../../setup';
import { button } from '../index';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { HeaderSize, HeaderVariant } from './types';
const headerBase = component({
    display: 'inline-flex',
    inlineSize: '100%',
    regionEnd: {
        display: 'flex',
        alignItems: 'center',
        marginInlineEnd: properties.marginInlineEnd
    },
    regionCenter: {
        marginInline: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    regionStart: {
        whiteSpace: 'nowrap',
        display: 'flex',
        inlineSize: 'fit-content',
        minInlineSize: 'max-content',
        marginInlineStart: properties.marginInlineStart
    },
    projectName: {
        fontWeight: properties.project.fontWeight,
        fontSize: properties.project.fontSize,
        marginInlineEnd: properties.marginInlineEnd
    },
    item: {
        selected: {}
    },
    brand: {
        logoimg: {}
    },
    [HeaderSize.Small]: {},
    [HeaderSize.Medium]: {},
    [HeaderSize.Large]: {},
    [HeaderVariant.Classic]: { backgroundColor: mode.classicBg, color: properties.color },
    [HeaderVariant.Dark]: { backgroundColor: mode.darkBg, color: properties.color },
    [HeaderVariant.Light]: {
        backgroundColor: mode.lightBg,
        color: mode.lightColor,
        borderBlockEnd: `1px solid ${mode.borderLight}`
    }
}, {
    className: prefix
});
export const header = headerBase.fork({
    [`& .${headerBase.item.$}`]: {
        display: properties.item.display,
        alignItems: properties.item.alignItems,
        blockSize: properties.item.blockSize,
        cursor: properties.item.cursor,
        fontWeight: properties.item.fontWeight,
        borderBlockEnd: properties.item.borderBlockEnd,
        [`&:hover`]: {
            backgroundColor: mode.backgroundHoverButton
        }
    },
    [`& .${headerBase.item.$} > *`]: {
        color: mode.buttonColorAction,
        textDecoration: 'none'
    },
    [`& .${headerBase.item.selected.$}`]: {
        borderBottom: `${properties.borderBottom} solid ${mode.color}`
    },
    [`& .${headerBase.brand.$} .${headerBase.brand.logoimg.$}`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    [`& .${headerBase.brand.$}`]: {
        textAlign: 'center',
        marginInlineStart: `calc(${properties.marginInlineStart} - ${properties.padding})`
    },
    size: Object.values(HeaderSize).reduce((acc, size) => ({
        ...acc,
        [size]: {
            blockSize: properties[size].blockSize,
            lineHeight: properties[size].lineHeight,
            [`&.${headerBase.brand.$}-img > *`]: {
                inlineSize: `calc(${properties[size].inlineSize} - calc(${properties.padding}) * 2);`
            },
            [`&.${headerBase.$}-item`]: {
                paddingBlockEnd: button.properties[size].paddingBlock,
                paddingBlockStart: button.properties[size].paddingBlock,
                paddingInlineEnd: button.properties[size].paddingInline,
                paddingInlineStart: button.properties[size].paddingInline
            }
        }
    }), {})
});
