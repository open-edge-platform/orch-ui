import { token } from '../../setup';
import { TabsSize, TabsVariant } from './types';
export const prefix = 'spark-tabs';
export const properties = token({
    fontWeight: 500,
    activeBorderThin: '2px',
    activeMarginEnd: '1px',
    tabMaxWith: '400px',
    iconGap: '4px',
    badgeGap: '4px',
    badgeStart: '4px',
    zeroGap: '0px',
    boxShadowX: '0px',
    boxShadowBlurRadius: '0px',
    boxShadowSpreadRadius: '0px',
    boxShadowY: '1px',
    blockBoxShadowY: '2px',
    insetBlockEnd: '-1px',
    boxShadowZero: '0px',
    scrollbarPadding: '0px',
    size: {
        [TabsSize.Large]: {
            blockSize: 'auto',
            fontSize: '16px',
            lineHeight: '18px'
        },
        [TabsSize.Medium]: {
            blockSize: 'auto',
            fontSize: '14px'
        },
        [TabsSize.Small]: {
            blockSize: 'auto',
            fontSize: '12px'
        }
    },
    [TabsVariant.Block]: {
        paddingGap: '4px',
        [TabsSize.Large]: {
            iconOnlyGap: '0px',
            iconPaddingEnd: '8px',
            paddingInline: '16px',
            gap: '4px',
            gapThin: '0px',
            inverseGap: '-4px'
        },
        [TabsSize.Medium]: {
            iconOnlyGap: '0px',
            iconPaddingEnd: '0px',
            paddingInline: '12px',
            gap: '4px',
            gapThin: '1px',
            inverseGap: '-4px'
        },
        [TabsSize.Small]: {
            iconOnlyGap: '0px',
            iconPaddingEnd: '0px',
            paddingInline: '8px',
            gap: '2px',
            gapThin: '2px',
            inverseGap: '-2px'
        }
    },
    [TabsVariant.Ghost]: {
        gap: '1px',
        [TabsSize.Large]: {
            paddingInline: '12px'
        },
        [TabsSize.Medium]: {
            paddingInline: '8px'
        },
        [TabsSize.Small]: {
            paddingInline: '6px'
        }
    }
}, {
    prefix: prefix
});
