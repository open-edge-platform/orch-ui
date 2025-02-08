import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ToastPosition, ToastState, ToastVisibility } from './types';
const toastBase = component({
    content: {
        message: {},
        action: {},
        visibility: {
            [ToastVisibility.Hide]: {},
            [ToastVisibility.Show]: {}
        },
        state: {
            [ToastState.Danger]: {},
            [ToastState.Default]: {},
            [ToastState.Info]: {},
            [ToastState.Success]: {},
            [ToastState.Warning]: {}
        }
    },
    placement: {
        [ToastPosition.TopLeft]: {},
        [ToastPosition.TopCenter]: {},
        [ToastPosition.TopRight]: {},
        [ToastPosition.BottomRight]: {},
        [ToastPosition.BottomCenter]: {},
        [ToastPosition.BottomLeft]: {}
    }
}, {
    className: prefix
});
export const toast = toastBase.fork({
    position: 'fixed',
    margin: properties.margin,
    overflow: 'hidden',
    [`&.${toastBase.placement.topLeft.$}`]: {
        top: properties.defaultPlacement,
        left: properties.defaultPlacement
    },
    [`&.${toastBase.placement.topCenter.$}`]: {
        top: properties.defaultPlacement,
        left: properties.middle,
        transform: `translateX(calc( -1 * ${properties.middle}))`
    },
    [`&.${toastBase.placement.topRight.$}`]: {
        top: properties.defaultPlacement,
        right: properties.defaultPlacement
    },
    [`&.${toastBase.placement.bottomRight.$}`]: {
        bottom: properties.defaultPlacement,
        right: properties.defaultPlacement
    },
    [`&.${toastBase.placement.bottomCenter.$}`]: {
        bottom: properties.defaultPlacement,
        left: properties.middle,
        transform: `translateX(calc( -1 * ${properties.middle}))`
    },
    [`&.${toastBase.placement.bottomLeft.$}`]: {
        bottom: properties.defaultPlacement,
        left: properties.defaultPlacement
    },
    [`& .${toastBase.content.$}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${properties.paddingBlockSize} ${properties.paddingInline}`,
        transition: `transform ${properties.animationSpeed} ease-in-out`,
        [`&.${toastBase.content.state.default.$}`]: {
            border: `${properties.border} solid ${mode.state.default}`
        },
        [`&.${toastBase.content.state.danger.$}`]: {
            backgroundColor: mode.state.danger
        },
        [`&.${toastBase.content.state.info.$}`]: {
            backgroundColor: mode.state.info
        },
        [`&.${toastBase.content.state.success.$}`]: {
            backgroundColor: mode.state.success
        },
        [`&.${toastBase.content.state.warning.$}`]: {
            backgroundColor: mode.state.warning
        },
        [`&.${toastBase.content.visibility.hide.$}`]: {
            transform: `translateY(${properties.translateY})`
        },
        [`&.${toastBase.content.visibility.show.$}`]: {
            transform: 'translateY(0)'
        },
        [`& .${toastBase.content.message.$}`]: {
            margin: properties.defaultMessageMargin,
            maxWidth: properties.maxWidth,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        [`& .${toastBase.content.action.$}`]: {
            transition: `transform ${properties.animationSpeed} ease-in-out`,
            backgroundColor: 'transparent',
            '& .spark-icon': {
                color: mode.iconColor
            },
            [`&:hover`]: {
                transform: 'scale(1.2)'
            }
        }
    }
});
