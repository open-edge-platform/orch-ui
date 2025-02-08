import { component } from '../../setup';
import { badgeBase } from '../badge/component';
import { buttonBase } from '../button/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { TabsSize, TabsVariant } from './types';
const tabsBase = component({
    display: 'flex',
    minInlineSize: 'max-content',
    tab: {
        display: 'flex',
        background: 'transparent',
        border: 'none',
        textDecoration: 'none',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: properties.fontWeight,
        maxInlineSize: properties.tabMaxWith
    },
    tabContent: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    active: {},
    iconOnly: {},
    disabled: {
        cursor: 'initial',
        color: mode.colorDisabled
    },
    icon: {
        marginInlineEnd: properties.iconGap
    },
    close: {
        marginInlineStart: properties.iconGap
    },
    [TabsVariant.Block]: {},
    [TabsVariant.Ghost]: {},
    scrollbar: {
        padding: properties.scrollbarPadding
    }
}, {
    className: prefix
});
export const tabs = tabsBase.fork({
    [`& .${tabsBase.tab.$} .${buttonBase.content.$}`]: {
        color: mode.color
    },
    [`& .${tabsBase.tab.$} .${buttonBase.content.$} .${badgeBase.$}`]: {
        marginInlineStart: properties.badgeStart
    },
    [`& .${tabsBase.tab.$} .${buttonBase.startSlot.$}, & .${tabsBase.tab.$} .${buttonBase.endSlot.$}`]: {
        color: mode.color
    },
    [`& .${tabsBase.tab.$}:not(.${tabsBase.disabled.$}):not(.${tabsBase.active.$})`]: {
        '&:hover': {
            backgroundColor: mode.colorHoverBackground
        },
        '&:focus': {
            backgroundColor: mode.colorHoverBackground
        }
    },
    [`&.${tabsBase[TabsVariant.Block].$}`]: {
        background: mode.colorBackground,
        boxShadow: `${properties.boxShadowX} ${properties.blockBoxShadowY}
        ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadius}
        ${mode.colorActiveBackground}`,
        paddingInlineStart: properties[TabsVariant.Block].paddingGap,
        paddingBlockStart: properties[TabsVariant.Block].paddingGap,
        [`& .${tabsBase.active.$}`]: {
            backgroundColor: mode.colorActiveBackground,
            boxShadow: `inset ${properties.boxShadowX} ${properties.activeBorderThin}
                ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadius}
                ${mode.colorActiveBorder} !important`,
            color: mode.colorActive
        },
        [`& .${tabsBase.active.$} .${buttonBase.startSlot.$}, 
        & .${tabsBase.active.$} .${buttonBase.endSlot.$},
        & .${tabsBase.active.$} .${buttonBase.content.$}`]: {
            color: mode.colorActive
        },
        [`& .${tabsBase.disabled.$}`]: {
            backgroundColor: mode.colorBackground,
            [`&.${tabsBase.active.$}`]: {
                backgroundColor: mode.colorDisabledBackground,
                boxShadow: `inset ${properties.boxShadowX} ${properties.activeBorderThin}
                    ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadius}
                    ${mode.colorDisabledBorder}`
            }
        }
    },
    [`&.${tabsBase[TabsVariant.Ghost].$}`]: {
        boxShadow: `${properties.boxShadowX} ${properties.boxShadowY}
            ${properties.boxShadowBlurRadius} ${properties.boxShadowSpreadRadius}
            ${mode.colorGhostBorder}`,
        [`& .${tabsBase.disabled.$}`]: {
            '&:after': {
                backgroundColor: mode.colorDisabledBorder
            }
        },
        [`& .${tabsBase.active.$} .${buttonBase.startSlot.$}, 
          & .${tabsBase.active.$} .${buttonBase.endSlot.$},
          & .${tabsBase.active.$} .${buttonBase.content.$}`]: {
            color: mode.colorActive
        },
        [`& .${tabsBase.active.$}:after`]: {
            content: '""',
            position: 'absolute',
            backgroundColor: mode.colorActiveBorder,
            insetBlockEnd: properties.insetBlockEnd,
            blockSize: properties.activeBorderThin,
            marginBlockEnd: properties.activeMarginEnd
        }
    },
    size: Object.keys(TabsSize).reduce((acc, size) => {
        const data = properties.size[TabsSize[size]];
        const blockData = properties[TabsVariant.Block][TabsSize[size]];
        const ghostData = properties[TabsVariant.Ghost][TabsSize[size]];
        return {
            ...acc,
            [TabsSize[size]]: {
                [`& .${tabsBase.tab.$}`]: {
                    blockSize: data.blockSize,
                    fontSize: data.fontSize
                },
                [`& .${tabsBase.tab.$}.${tabsBase.iconOnly.$} .${buttonBase.startSlot.$}`]: {
                    paddingInline: blockData.iconOnlyGap
                },
                [`&.${tabsBase[TabsVariant.Block].$}`]: {
                    [`& .${tabsBase.tab.$}`]: {
                        alignItems: 'center'
                    },
                    [`& .${tabsBase.tab.$} + .${tabsBase.tab.$}`]: {
                        marginInlineStart: blockData.gap
                    }
                },
                [`&.${tabsBase[TabsVariant.Ghost].$}`]: {
                    [`& .${tabsBase.tab.$}`]: {
                        paddingInline: ghostData.paddingInline
                    },
                    [`& .${tabsBase.tab.$} + .${tabsBase.tab.$}`]: {
                        marginInlineStart: properties[TabsVariant.Ghost].gap
                    },
                    [`& .${tabsBase.active.$}`]: {
                        '&:after': {
                            left: ghostData.paddingInline,
                            right: ghostData.paddingInline
                        }
                    }
                }
            }
        };
    }, {})
});
