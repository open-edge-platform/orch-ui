import { component } from '../../setup';
import { fieldLabel } from '../fieldlabel/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ToggleSwitchLabelAlignment, ToggleSwitchSize } from './types';
const toggleSwitchBase = component({
    selector: {},
    size: {
        [ToggleSwitchSize.Large]: {},
        [ToggleSwitchSize.Medium]: {},
        [ToggleSwitchSize.Small]: {}
    },
    isInvalid: {},
    wrapper: {},
    labelAlignment: {
        [ToggleSwitchLabelAlignment.Start]: {},
        [ToggleSwitchLabelAlignment.End]: {}
    },
    helperText: {},
    isDisabled: {}
}, {
    className: prefix
});
export const toggleSwitch = toggleSwitchBase.fork({
    boxSizing: 'border-box',
    [`& .${toggleSwitchBase.wrapper.$}`]: {
        boxSizing: 'border-box',
        display: 'flex !important',
        alignItems: 'center',
        inlineSize: 'fit-content !important',
        [`&.${toggleSwitchBase.isDisabled.$}`]: {
            color: mode.backgroundColorDisabled,
            '& input:disabled': {
                [`& + .${toggleSwitchBase.selector.$}`]: {
                    cursor: 'initial',
                    borderInlineColor: mode.backgroundColorDisabled,
                    borderBlockColor: mode.backgroundColorDisabled,
                    '&:after': {
                        background: mode.selectorColorDisabled
                    }
                },
                [`&:checked + .${toggleSwitchBase.selector.$}`]: {
                    borderInlineColor: mode.backgroundColorDisabled,
                    borderBlockColor: mode.backgroundColorDisabled,
                    background: mode.backgroundColorDisabled,
                    '&:after': {
                        background: mode.selectorColorOn
                    }
                }
            }
        },
        [`&.${toggleSwitchBase.labelAlignment.end.$}`]: {
            flexDirection: 'row-reverse',
            [`& .${fieldLabel.$}`]: {
                minInlineSize: properties.minInlineSizeLabelStart
            }
        }
    },
    [`&.${toggleSwitchBase.helperText.$}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: properties.helperTextGap,
        boxSizing: 'border-box'
    },
    '& input': {
        opacity: properties.opacity,
        border: 'none',
        outline: 'none',
        padding: properties.padding,
        margin: properties.margin,
        inlineSize: properties.inlineSize,
        blockSize: properties.blockSize,
        cursor: 'pointer'
    },
    [`& .${toggleSwitchBase.selector.$}`]: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        background: mode.colorTransparent,
        borderBlock: `${properties.borderWidth} solid ${mode.backgroundColorOff}`,
        borderInline: `${properties.borderWidth} solid ${mode.backgroundColorOff}`,
        boxSizing: 'border-box',
        '&:after': {
            content: '""',
            display: 'block',
            background: mode.selectorColorOff,
            borderRadius: '100%'
        }
    },
    [`& input:checked + .${toggleSwitchBase.selector.$}`]: {
        background: mode.backgroundColorOn,
        borderBlockColor: mode.backgroundColorOn,
        borderInlineColor: mode.backgroundColorOn,
        '&:after': {
            marginInlineStart: 'auto',
            borderRadius: '100%',
            background: mode.selectorColorOn
        }
    },
    [`& input.${toggleSwitchBase.isInvalid.$}`]: {
        [`& + .${toggleSwitchBase.selector.$}`]: {
            borderInlineColor: mode.backgroundColorInvalid,
            borderBlockColor: mode.backgroundColorInvalid,
            '&:after': {
                background: mode.backgroundColorInvalid
            }
        },
        [`&:checked + .${toggleSwitchBase.selector.$}`]: {
            borderInlineColor: mode.backgroundColorInvalid,
            borderBlockColor: mode.backgroundColorInvalid,
            background: mode.backgroundColorInvalid,
            '&:after': {
                background: mode.selectorColorOn
            }
        }
    },
    ['&']: Object.values(ToggleSwitchSize).reduce((acc, size) => ({
        ...acc,
        [`& .${toggleSwitchBase.size[size].$}`]: {
            fontSize: properties.size[size].fontSize,
            [`& .${toggleSwitchBase.selector.$}`]: {
                inlineSize: properties.size[size].inlineSize,
                blockSize: properties.size[size].blockSize,
                padding: properties.size[size].padding,
                borderRadius: properties.size[size].borderRadius,
                marginInlineEnd: properties.size[size].gap,
                '&:after': {
                    inlineSize: properties.size[size].selector,
                    blockSize: properties.size[size].selector
                }
            },
            [`&.${toggleSwitchBase.labelAlignment.end.$}`]: {
                [`&  .${toggleSwitchBase.selector.$}`]: {
                    marginInlineStart: properties.size[size].gap,
                    marginInlineEnd: 'initial'
                }
            },
            [`& input:checked + .${toggleSwitchBase.selector.$}`]: {
                '&:after': {
                    inlineSize: properties.size[size].selectorActive,
                    blockSize: properties.size[size].selectorActive
                }
            }
        }
    }), {})
});
