import { component } from '../../setup';
import { fonts } from '../../typography';
import { button } from '../button';
import { hyperlink } from '../hyperlink';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { StepperOrientation, StepperSize } from './types';
const stepperBase = component({
    step: {},
    stepVisited: {},
    stepActive: {},
    stepInvalid: {},
    stepContainer: {},
    stepButton: {},
    stepTextContainer: {},
    stepText: {},
    stepTitle: {},
    orientation: {
        [StepperOrientation.Vertical]: {},
        [StepperOrientation.Horizontal]: {}
    },
    size: {
        [StepperSize.Large]: {},
        [StepperSize.Medium]: {},
        [StepperSize.Small]: {}
    }
}, {
    className: prefix
});
export const stepper = stepperBase.fork({
    ...Object.values(StepperSize).reduce((acc, size) => ({
        ...acc,
        [`&.${stepperBase.size[size].$}`]: {
            [`& .${stepperBase.orientation.horizontal.$} .${stepperBase.stepContainer.$}`]: {
                '&::before': {
                    left: 0,
                    paddingRight: `calc(50% - (${properties[size].icon.size} * ${properties.connector.gapFactor}))`
                },
                '&::after': {
                    right: 0,
                    paddingLeft: `calc(50% - (${properties[size].icon.size}  * ${properties.connector.gapFactor}))`
                }
            },
            [`& .${stepperBase.orientation.vertical.$} .${stepperBase.step.$} .${stepperBase.stepContainer.$}`]: {
                maxInlineSize: properties[size].icon.activeSize,
                maxBlockSize: properties[size].icon.activeSize
            },
            [`& .${stepperBase.orientation.vertical.$}  .${stepperBase.stepTextContainer.$}`]: {
                transform: `translateY(calc((${properties[size].icon.activeSize} / 2) - ${properties[size].verticalGap} / 2))`
            },
            [`& .${stepperBase.orientation.vertical.$}`]: {
                gap: properties.elementGap
            },
            [`& .${stepperBase.orientation.vertical.$} .${stepperBase.step.$}:not(:last-child)`]: {
                position: 'relative',
                '&:after': {
                    boxSizing: 'border-box',
                    content: '" "',
                    position: 'absolute',
                    left: `calc((${properties[size].icon.activeSize} / 2 ) - ${properties.connector.size} / 2 )`,
                    top: `calc(${properties[size].icon.activeSize} + ${properties[size].verticalGap} )`,
                    zIndex: '1',
                    inlineSize: properties.connector.size,
                    blockSize: `calc(100% - (${properties[size].icon.activeSize} + (${properties[size].verticalGap} * 0.875) ))`,
                    background: `linear-gradient(90deg,
                        ${mode.unvisitedColor} 50%,
                        ${mode.activeBackgroundColor} 50%
                    )`,
                    backgroundSize: '220%',
                    backgroundPositionX: '0%',
                    transition: `background-position-x ${properties.animationSpeed} linear`
                }
            },
            [`& .${stepperBase.step.$} .${stepperBase.stepContainer.$}`]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minInlineSize: properties[size].icon.activeSize,
                minBlockSize: properties[size].icon.activeSize
            },
            [`& .${stepperBase.step.$}.${stepperBase.stepActive.$} .${stepperBase.stepButton.$}.${button.$}, 
                .${stepperBase.step.$}.${stepperBase.stepActive.$} .${stepperBase.stepButton.$}.${hyperlink.$}`]: {
                inlineSize: properties[size].icon.activeSize,
                blockSize: properties[size].icon.activeSize
            },
            [`& .${stepperBase.stepButton.$}.${hyperlink.$}`]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                inlineSize: properties[size].icon.size,
                blockSize: properties[size].icon.size
            }
        }
    }), {}),
    [`& .${stepperBase.stepButton.$}.${button.$}.${button.action.$}`]: {
        borderRadius: `100%`,
        backgroundColor: mode.unvisitedBackgroundColor,
        color: mode.unvisitedColor,
        padding: 'inherit',
        [`& .${button.content.$} .${fonts[75].$}`]: {
            fontWeight: '500'
        },
        [`&.${button.hovered.$}`]: {
            backgroundColor: mode.unvisitedHoverBackgroundColor
        },
        [`&.${button.active.$}`]: {
            backgroundColor: mode.unvisitedPressBackgroundColor
        }
    },
    [`& .${stepperBase.stepButton.$}.${hyperlink.$}`]: {
        borderRadius: `100%`,
        backgroundColor: mode.unvisitedBackgroundColor,
        color: mode.unvisitedColor,
        padding: 'inherit',
        [`&.${hyperlink.isDisabled.$}:not(.${stepperBase.stepActive.$}):not(.${stepperBase.stepInvalid.$})`]: {
            color: `${mode.unvisitedColor} !important`,
            '& .spark-icon': {
                color: `${mode.unvisitedColor} !important`
            }
        },
        [`& .${button.content.$} .${fonts[75].$}`]: {
            fontWeight: '500'
        },
        [`&:focus:not(.${hyperlink.isPressed.$})`]: {
            color: `${mode.unvisitedColor} !important`
        },
        [`&:hover`]: {
            backgroundColor: mode.unvisitedHoverBackgroundColor,
            color: `${mode.unvisitedColor} !important`
        },
        [`&.${hyperlink.isPressed.$}`]: {
            backgroundColor: mode.unvisitedPressBackgroundColor,
            color: `${mode.unvisitedColor} !important`
        },
        [`&.${hyperlink.isPressed.$}:focus`]: {
            color: `${mode.unvisitedColor} !important`
        }
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepActive.$}:not(.${stepperBase.stepInvalid.$}) .${stepperBase.stepButton.$}.${button.$}, 
    .${stepperBase.step.$}.${stepperBase.stepVisited.$}:not(.${stepperBase.stepInvalid.$}) .${stepperBase.stepButton.$}.${button.$}`]: {
        backgroundColor: mode.activeBackgroundColor,
        color: mode.activeColor,
        [`&.${button.hovered.$}`]: {
            backgroundColor: mode.activeHoverBackgroundColor
        },
        [`&.${button.active.$}`]: {
            backgroundColor: mode.activePressedBackgroundColor
        },
        [`& .spark-icon`]: {
            color: mode.activeColor
        }
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepActive.$}:not(.${stepperBase.stepInvalid.$}) .${stepperBase.stepButton.$}.${hyperlink.$}, 
    .${stepperBase.step.$}.${stepperBase.stepVisited.$}:not(.${stepperBase.stepInvalid.$}) .${stepperBase.stepButton.$}.${hyperlink.$}`]: {
        backgroundColor: mode.activeBackgroundColor,
        color: mode.activeColor,
        [`&.${hyperlink.isDisabled.$}`]: {
            color: `${mode.activeColor} !important`,
            '& .spark-icon': {
                color: `${mode.activeColor} !important`
            }
        },
        [`&:focus:not(.${hyperlink.isPressed.$})`]: {
            color: `${mode.activeColor} !important`
        },
        [`&:hover`]: {
            backgroundColor: mode.activeHoverBackgroundColor,
            color: `${mode.activeColor} !important`
        },
        [`&.${hyperlink.isPressed.$}`]: {
            backgroundColor: mode.activePressedBackgroundColor,
            color: `${mode.activeColor} !important`
        },
        [`&.${hyperlink.isPressed.$}:focus`]: {
            color: `${mode.activeColor} !important`
        },
        [`& .spark-icon`]: {
            color: mode.activeColor
        }
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepInvalid.$} .${stepperBase.stepButton.$}.${button.$}`]: {
        backgroundColor: mode.transparent,
        color: mode.invalidColor,
        borderInline: `solid ${properties.borderWidth} ${mode.invalidColor}`,
        borderBlock: `solid ${properties.borderWidth} ${mode.invalidColor}`,
        [`& .spark-icon`]: {
            color: mode.invalidColor
        },
        [`&.${button.hovered.$}:not(.${button.active.$})`]: {
            color: mode.invalidHoverColor,
            borderColor: mode.invalidHoverColor,
            [`& .spark-icon`]: {
                color: mode.invalidHoverColor
            }
        },
        [`&.${button.active.$}`]: {
            color: mode.invalidPressColor,
            borderColor: mode.invalidPressColor,
            [`& .spark-icon`]: {
                color: mode.invalidPressColor
            }
        }
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepInvalid.$} .${stepperBase.stepButton.$}.${hyperlink.$}`]: {
        backgroundColor: mode.transparent,
        color: mode.invalidColor,
        borderInline: `solid ${properties.borderWidth} ${mode.invalidColor}`,
        borderBlock: `solid ${properties.borderWidth} ${mode.invalidColor}`,
        [`&.${hyperlink.isDisabled.$}`]: {
            color: `${mode.invalidColor} !important`,
            '& .spark-icon': {
                color: `${mode.invalidColor} !important`
            }
        },
        [`& .spark-icon`]: {
            color: mode.invalidColor
        },
        [`&:hover:not(.${hyperlink.isPressed.$})`]: {
            color: `${mode.invalidHoverColor} !important`,
            borderColor: mode.invalidHoverColor,
            [`& .spark-icon`]: {
                color: mode.invalidHoverColor
            }
        },
        [`&.${hyperlink.isPressed.$}`]: {
            color: `${mode.invalidPressColor} !important`,
            borderColor: mode.invalidPressColor,
            [`&:focus:not(.${hyperlink.isPressed.$})`]: {
                color: `${mode.invalidPressColor} !important`
            },
            [`& .spark-icon`]: {
                color: mode.invalidPressColor
            },
            [`&.${hyperlink.isPressed.$}:focus`]: {
                color: `${mode.invalidPressColor} !important`
            }
        }
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepInvalid.$} .${stepperBase.stepTextContainer.$},
    .${stepperBase.step.$}.${stepperBase.stepInvalid.$} .${stepperBase.stepTextContainer.$} .${stepperBase.stepTitle.$}`]: {
        color: mode.invalidColor
    },
    [`& .${stepperBase.step.$}:first-child .${stepperBase.stepContainer.$}::before,
    & .${stepperBase.step.$}:last-child .${stepperBase.stepContainer.$}::after`]: {
        display: 'none'
    },
    [`& .${stepperBase.step.$}.${stepperBase.stepActive.$} .${stepperBase.stepContainer.$}::before, 
    .${stepperBase.step.$}.${stepperBase.stepVisited.$} .${stepperBase.stepContainer.$}::before, 
    .${stepperBase.step.$}.${stepperBase.stepVisited.$} .${stepperBase.stepContainer.$}::after`]: {
        backgroundPositionX: '-100%'
    },
    [`& .${stepperBase.orientation.vertical.$} .${stepperBase.step.$}.${stepperBase.stepVisited.$}::after`]: {
        backgroundPositionX: '-100%'
    },
    [`& .${stepperBase.stepActive.$} .${stepperBase.stepContainer.$}::before, & 
    .${stepperBase.stepActive.$} .${stepperBase.stepContainer.$}::after`]: {
        transitionDelay: properties.animationSpeed
    },
    [`& .${stepperBase.orientation.vertical.$} .${stepperBase.stepTextContainer.$}`]: {
        display: 'flex',
        flexDirection: 'column',
        color: mode.textColor,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        [`& .${stepperBase.stepTitle.$}`]: {
            fontWeight: '500'
        }
    },
    [`& .${stepperBase.orientation.vertical.$} .${stepperBase.step.$}.${stepperBase.stepVisited.$}:after`]: {
        backgroundPositionX: '-100% !important'
    },
    [`& .${stepperBase.orientation.vertical.$} .${stepperBase.step.$}`]: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: properties.elementGap,
        paddingBlockEnd: '48px'
    },
    [`& .${stepperBase.orientation.horizontal.$}  .${stepperBase.stepTextContainer.$}`]: {
        display: 'flex',
        flexDirection: 'column',
        gap: properties.elementGap,
        color: mode.textColor,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingInline: properties.textContainerPaddingInline,
        [`& .${stepperBase.stepTitle.$}`]: {
            fontWeight: '500'
        }
    },
    [`& .${stepperBase.orientation.horizontal.$} .${stepperBase.step.$}`]: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: properties.elementGap
    },
    [`& .${stepperBase.orientation.horizontal.$} .${stepperBase.stepContainer.$}`]: {
        position: 'relative',
        inlineSize: '100%',
        display: 'flex',
        justifyContent: 'center',
        '&::before,&::after': {
            content: '" "',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            background: `linear-gradient(90deg,
                ${mode.unvisitedColor} 50%,
                ${mode.activeBackgroundColor} 50%
            )`,
            backgroundSize: '200%',
            backgroundPositionX: '0%',
            transition: `background-position-y ${properties.animationSpeed} linear`,
            blockSize: properties.connector.size
        }
    },
    ...Object.values(StepperOrientation).reduce((acc, orientation) => ({
        ...acc,
        [`& .${stepperBase.orientation[orientation].$}`]: {
            display: 'flex',
            flexDirection: properties[orientation].flexDirection
        }
    }), {})
});
