import { token } from '../../setup';
import { DrawerPosition, DrawerSize } from './types';
export const prefix = 'spark-drawer';
export const properties = token({
    base: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        zIndex: '100',
        transition: 'transform 0.3s ease-in-out',
        transitionHide: 'visibility 0.3s linear, transform 0.3s ease-in-out'
    },
    show: {
        visibility: 'visible',
        transform: 'none'
    },
    hide: {
        visibility: 'hidden',
        inlineSize: '0px'
    },
    header: {
        borderBlockEndStyle: 'solid',
        borderBlockEndWidth: '2px',
        marginBlockStart: '24px',
        marginInline: '24px',
        paddingBlockEnd: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        heading: {
            paddingBlockEnd: '16px',
            marginBlock: '0px'
        },
        button: {
            border: '0px',
            backgroundColor: 'transparent',
            outline: 'none',
            size: '24px',
            paddingBlock: '0px',
            paddingInline: '0px'
        }
    },
    body: {
        marginBlock: '24px',
        marginInline: '24px',
        flex: '1',
        overflow: 'auto'
    },
    footer: {
        borderTopStyle: 'solid',
        borderTopWidth: '2px',
        insetBlockEnd: '0px',
        paddingBlockStart: '24px',
        marginBlockEnd: '24px',
        marginInline: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        inlineSize: '100%',
        buttonContainerRight: {
            display: 'flex',
            gap: '8px',
            justifyContent: 'right'
        }
    },
    backdrop: {
        opacity: '0.5',
        zIndex: '10',
        position: 'fixed',
        insetInlineStart: '0px',
        insetBlockStart: '0px',
        inlineSize: '100%',
        blockSize: '100%',
        transparent: {
            opacity: '0'
        }
    },
    shadow: {
        x: '0px',
        y: '4px',
        blur: '4px'
    },
    [DrawerPosition.Left]: {
        insetBlockStart: '0px',
        insetInlineStart: '0px',
        insetBlockEnd: 'auto',
        insetInlineEnd: 'auto',
        transform: 'translateX(-100%)',
        [DrawerSize.ExtraSmall]: {
            blockSize: '100%',
            inlineSize: '540px'
        },
        [DrawerSize.Small]: {
            blockSize: '100%',
            inlineSize: '50%'
        },
        [DrawerSize.Medium]: {
            blockSize: '100%',
            inlineSize: '840px'
        },
        [DrawerSize.Large]: {
            blockSize: '100%',
            inlineSize: '1240px'
        }
    },
    [DrawerPosition.Right]: {
        blockSize: '100%',
        inlineSize: '50%',
        insetBlockStart: '0px',
        insetInlineEnd: '0px',
        insetBlockEnd: 'auto',
        insetInlineStart: 'auto',
        transform: 'translateX(200%)',
        [DrawerSize.ExtraSmall]: {
            blockSize: '100%',
            inlineSize: '540px'
        },
        [DrawerSize.Small]: {
            blockSize: '100%',
            inlineSize: '50%'
        },
        [DrawerSize.Medium]: {
            blockSize: '100%',
            inlineSize: '840px'
        },
        [DrawerSize.Large]: {
            blockSize: '100%',
            inlineSize: '1240px'
        }
    },
    [DrawerPosition.Top]: {
        blockSize: '70%',
        inlineSize: '100%',
        insetBlockStart: '0px',
        insetInlineStart: '0px',
        insetBlockEnd: 'auto',
        insetInlineEnd: 'auto',
        transform: 'translateY(-100%)',
        [DrawerSize.ExtraSmall]: {
            blockSize: '30%',
            inlineSize: '100%'
        },
        [DrawerSize.Small]: {
            blockSize: '50%',
            inlineSize: '100%'
        },
        [DrawerSize.Medium]: {
            blockSize: '70%',
            inlineSize: '100%'
        },
        [DrawerSize.Large]: {
            blockSize: '90%',
            inlineSize: '100%'
        }
    },
    [DrawerPosition.Bottom]: {
        insetBlockEnd: '0px',
        insetInlineStart: '0px',
        insetBlockStart: 'auto',
        insetInlineEnd: 'auto',
        transform: 'translateY(200%)',
        [DrawerSize.ExtraSmall]: {
            blockSize: '30%',
            inlineSize: '100%'
        },
        [DrawerSize.Small]: {
            blockSize: '50%',
            inlineSize: '100%'
        },
        [DrawerSize.Medium]: {
            blockSize: '70%',
            inlineSize: '100%'
        },
        [DrawerSize.Large]: {
            blockSize: '90%',
            inlineSize: '100%'
        }
    }
}, {
    prefix: prefix
});
