import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { CardOrientation, CardVariant } from './types';
const cardBase = component({
    display: 'flex',
    zIndex: '0',
    textDecoration: 'none',
    checkbox: {},
    overlay: {},
    checked: {},
    fullWidth: {},
    link: {},
    chevron: {},
    options: {},
    bg: {
        fit: {
            fill: { objectFit: properties.bg.fill },
            contain: { objectFit: properties.bg.contain },
            cover: { objectFit: properties.bg.cover },
            none: { objectFit: properties.bg.none },
            ['scale-down']: { objectFit: properties.bg.scaleDown }
        }
    },
    vertical: {
        checkbox: {},
        avatar: {},
        icon: { container: {} },
        bg: { image: {} }
    },
    horizontal: {
        checkbox: {},
        avatar: {},
        icon: { container: {} },
        bg: { image: {} }
    },
    border: {
        normal: {},
        ghost: {}
    },
    menu: {
        display: 'flex'
    }
}, {
    className: prefix
});
export const card = cardBase.fork({
    contentOverlay: {
        [`&::after`]: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            content: '" "',
            zIndex: '1',
            top: '0',
            left: '0',
            backgroundColor: mode.checkboxCheckedCardBackgroundColorOverlay
        }
    },
    border: {
        [CardVariant.Normal]: {
            boxShadow: `0 0 0 ${properties.boxShadow1} ${mode.normal.borderColor} !important`,
            inlineSize: 'min-content',
            blockSize: 'min-content',
            [`&.${cardBase.overlay.$}.${cardBase.checked.$}::after`]: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                content: '" "',
                zIndex: '1',
                top: '0',
                left: '0',
                backgroundColor: mode.checkboxCheckedCardBackgroundColorOverlay
            },
            [`&.${cardBase.checked.$}`]: {
                position: 'relative',
                boxShadow: `0 0 0 ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor} !important`,
                [`&:hover`]: {
                    boxShadow: `0 0 0 
                    ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor} !important`
                },
                [`& .${cardBase.vertical.checkbox.$}, & .${cardBase.horizontal.checkbox.$}`]: {
                    opacity: '1'
                }
            },
            [`&:hover`]: {
                boxShadow: `0 0 0 ${properties.boxShadow1} ${mode.normal.hover.borderColor} !important`,
                [`& .${cardBase.vertical.checkbox.$}, & .${cardBase.horizontal.checkbox.$}`]: {
                    opacity: '1'
                },
                [`&.${cardBase.link.$}`]: {
                    boxShadow: `0 0 0 ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor}`
                }
            },
            [`&.${cardBase.fullWidth.$}`]: {
                inlineSize: '100%',
                blockSize: 'fit-content',
                [`& .${prefix}-vertical`]: {
                    inlineSize: '100%'
                }
            }
        },
        [CardVariant.Ghost]: {
            boxShadow: `0 0 0 ${properties.boxShadow1} ${mode.ghost.borderColor}`,
            inlineSize: 'min-content',
            blockSize: 'min-content',
            [`&.${cardBase.overlay.$}.${cardBase.checked.$}::after`]: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                content: '" "',
                zIndex: '1',
                top: '0',
                left: '0',
                backgroundColor: mode.checkboxCheckedCardBackgroundColorOverlay
            },
            [`&.${cardBase.checked.$}`]: {
                position: 'relative',
                boxShadow: `0 0 0 ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor}`,
                [`&:hover`]: {
                    boxShadow: `0 0 0 ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor}`
                },
                [`& .${cardBase.vertical.checkbox.$}, & .${cardBase.horizontal.checkbox.$}`]: {
                    opacity: '1'
                }
            },
            [`&:hover`]: {
                boxShadow: `0 0 0 ${properties.boxShadow1}  ${mode.ghost.hover.borderColor}`,
                [`& .${cardBase.vertical.checkbox.$}, & .${cardBase.horizontal.checkbox.$}`]: {
                    opacity: '1'
                },
                [`&.${cardBase.link.$}`]: {
                    boxShadow: `0 0 0 ${properties.boxShadow2} ${mode.checkboxCheckedCardBorderColor}`
                }
            },
            [`&.${cardBase.fullWidth.$}`]: {
                inlineSize: '100%',
                blockSize: 'fit-content',
                [`& .${cardBase.vertical.$}`]: {
                    inlineSize: '100%'
                }
            }
        }
    },
    horizontalLine: {
        backgroundColor: mode.normal.borderColor,
        inlineSize: properties.horizontalLine.inlineSize,
        blockSize: properties.horizontalLine.blockSize,
        boxSizing: 'border-box'
    },
    checkbox: {
        position: properties.checkboxContainer.position,
        marginBlockStart: properties.checkboxContainer.marginBlockStart,
        marginInlineStart: properties.checkboxContainer.marginInlineStart,
        zIndex: 3,
        inlineSize: properties.checkboxContainer.sideLength,
        blockSize: properties.checkboxContainer.sideLength,
        paddingInlineStart: properties.checkboxContainer.paddingInlineStart,
        backgroundColor: mode.checkboxContainerBackground,
        [`& .spark-checkbox`]: {
            position: properties.checkboxContainer.checkbox.position,
            paddingInlineStart: properties.checkboxContainer.checkbox.paddingInlineStart
        }
    },
    [CardOrientation.Horizontal]: {
        blockSize: properties.horizontal.minBlockSize,
        minInlineSize: properties.horizontal.minInlineSize,
        flexDirection: properties.horizontal.flexDirection,
        position: properties.horizontal.position,
        boxShadow: properties.horizontal.boxShadow,
        [`& .${cardBase.horizontal.bg.image.$}`]: {
            blockSize: properties.horizontal.bg.image.blockSize,
            inlineSize: properties.horizontal.bg.image.inlineSize,
            zIndex: properties.horizontal.bg.image.zIndex
        },
        [`& .${cardBase.horizontal.avatar.$}`]: {
            inlineSize: properties.horizontal.avatar.sideLength,
            blockSize: properties.horizontal.avatar.sideLength,
            borderRadius: properties.horizontal.avatar.borderRadius,
            zIndex: properties.horizontal.avatar.zIndex
        },
        [`& a`]: {
            textDecoration: 'none !important'
        },
        wrapper: {
            display: 'grid',
            gridTemplateColumns: 'min-content auto'
        },
        informationContainer: {
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: properties.horizontal.informationContainer.inlineSize,
            blockSize: properties.horizontal.informationContainer.blockSize,
            maxBlockSize: properties.horizontal.informationContainer.maxBlockSize,
            paddingInlineEnd: properties.horizontal.informationContainer.padding,
            paddingInlineStart: properties.horizontal.informationContainer.padding,
            paddingBlockStart: properties.horizontal.informationContainer.padding,
            gap: properties.horizontal.informationContainer.gap
        },
        titlesContainer: {
            color: mode.color,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: properties.horizontal.titlesContainer.inlineSize,
            marginInlineStart: `calc(${properties.horizontal.avatar.sideLength} + 
                ${properties.horizontal.avatar.marginInlineStart})`,
            marginBlockStart: properties.horizontal.titlesContainer.marginBlockStart
        },
        title: {
            marginBlock: '0px !important',
            fontWeight: '500 !important',
            paddingInlineEnd: properties.horizontal.title.paddingInlineEnd,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxInlineSize: properties.horizontal.title.maxInlineSize,
            minInlineSize: properties.horizontal.title.minInlineSize
        },
        subtitle: {
            inlineSize: properties.horizontal.subTitle.inlineSize,
            blockSize: properties.vertical.subTitle.lineHeight,
            fontSize: properties.horizontal.subTitle.fontSize,
            lineHeight: properties.horizontal.subTitle.lineHeight,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        description: {
            color: mode.horizontal.mainTextColor,
            inlineSize: properties.horizontal.description.inlineSize,
            minBlockSize: properties.horizontal.description.minBlockSize,
            fontSize: properties.horizontal.description.fontSize,
            lineHeight: properties.horizontal.description.lineHeight,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical'
        },
        propertiesContainer: {
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'row',
            position: 'absolute',
            color: mode.color,
            right: properties.horizontal.propertiesContainer.paddingInline,
            top: properties.horizontal.propertiesContainer.paddingInline,
            gap: properties.horizontal.propertiesContainer.gap,
            maxBlockSize: properties.horizontal.propertiesContainer.maxBlockSize,
            alignItems: 'center',
            [`& .${cardBase.chevron.$}`]: {
                fontSize: properties.metricsContainer.sparkChevronIcon.fontSize
            },
            [`& .${cardBase.horizontal.icon.container.$}`]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: properties.horizontal.propertiesContainer.iconGap
            }
        },
        footerContainer: {
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: '-webkit-fill-available',
            paddingInlineEnd: properties.horizontal.informationContainer.padding,
            paddingInlineStart: properties.horizontal.informationContainer.padding,
            paddingBlockEnd: properties.horizontal.informationContainer.padding,
            gap: properties.horizontal.informationContainer.gap,
            position: 'absolute',
            marginBlockStart: properties.horizontal.informationContainer.marginStart,
            marginInlineStart: properties.horizontal.informationContainer.inlineStart
        },
        buttonsContainer: {
            display: 'flex',
            flexFlow: 'row',
            inlineSize: '100%',
            justifyContent: 'space-between'
        }
    },
    [CardOrientation.Vertical]: {
        minInlineSize: properties.vertical.inlineSize,
        minBlockSize: properties.vertical.blockSize,
        display: properties.vertical.display,
        flexDirection: 'column',
        position: 'relative',
        [`& .${cardBase.vertical.bg.image.$}`]: {
            blockSize: properties.vertical.bg.image.blockSize,
            inlineSize: properties.vertical.bg.image.inlineSize,
            zIndex: properties.vertical.bg.image.zIndex,
            position: 'absolute'
        },
        [`& .${cardBase.vertical.avatar.$}`]: {
            inlineSize: properties.vertical.avatar.sideLength,
            blockSize: properties.vertical.avatar.sideLength,
            borderRadius: properties.vertical.avatar.borderRadius,
            zIndex: properties.vertical.avatar.zIndex,
            marginInlineStart: properties.vertical.avatar.marginInlineStart,
            marginBlockStart: properties.vertical.avatar.marginBlockStart,
            boxShadow: `0 0 0 ${properties.vertical.avatar.boxShadow} inset 
                        ${mode.vertical.avatar.borderColor}`
        },
        [`& a`]: {
            textDecoration: 'none !important'
        },
        titlesContainer: {
            color: mode.color,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: properties.vertical.titlesContainer.inlineSize
        },
        metricsContainer: {
            display: 'flex',
            flexDirection: 'row',
            inlineSize: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: properties.vertical.subTitle.fontSize,
            lineHeight: properties.vertical.subTitle.lineHeight,
            gap: properties.vertical.gap,
            [`& .${cardBase.options.$}`]: {
                display: 'flex',
                gap: properties.vertical.sparkCardOptions.gap,
                flexDirection: 'row',
                alignItems: 'center'
            },
            [`& .spark-checkbox`]: {
                position: properties.vertical.metricsContainer.checkbox.position,
                maxInlineSize: properties.vertical.metricsContainer.checkbox.maxInlineSize
            },
            [`& .spark-icon`]: {
                cursor: 'pointer',
                padding: properties.iconPadding,
                marginInlineEnd: properties.iconMarginEnd
            },
            [`& .spark-icon::not(ellipsis-v)`]: {
                paddingInlineEnd: properties.vertical.metricsContainer.sparkIcon.paddingInlineEnd
            },
            [`& .spark-icon.hidden-metrics`]: {
                transform: 'rotate(180deg)'
            }
        },
        optionsItem: {
            display: 'flex',
            alignItems: 'center',
            gap: properties.vertical.optionsItem.gap
        },
        [`&-subtitle, &-metrics-container, &-metrics-container`]: {
            color: mode.vertical.subTextColor
        },
        informationContainer: {
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: properties.vertical.informationContainer.inlineSize,
            blockSize: properties.vertical.informationContainer.blockSize,
            maxBlockSize: properties.vertical.informationContainer.maxBlockSize,
            paddingInlineEnd: properties.vertical.informationContainer.padding,
            paddingInlineStart: properties.vertical.informationContainer.padding,
            paddingBlockStart: properties.vertical.informationContainer.padding,
            gap: properties.vertical.informationContainer.gap
        },
        propertiesContainer: {
            color: mode.color,
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: properties.vertical.propertiesContainer.gap,
            inlineSize: properties.vertical.propertiesContainer.inlineSize,
            blockSize: properties.vertical.propertiesContainer.blockSize,
            maxBlockSize: properties.vertical.propertiesContainer.maxBlockSize,
            paddingInlineEnd: properties.vertical.propertiesContainer.paddingInlineStartEnd,
            paddingInlineStart: properties.vertical.propertiesContainer.paddingInlineStartEnd,
            paddingBlockEnd: properties.vertical.propertiesContainer.paddingBlockStartEnd,
            paddingBlockStart: properties.vertical.propertiesContainer.paddingBlockStartEnd,
            [`& .${cardBase.chevron.$}`]: {
                fontSize: properties.metricsContainer.sparkChevronIcon.fontSize
            },
            [`& .${cardBase.vertical.icon.container.$}`]: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: properties.vertical.propertiesContainer.iconGap
            }
        },
        footerContainer: {
            display: 'flex',
            boxSizing: 'border-box',
            flexDirection: 'column',
            alignItems: 'flex-start',
            inlineSize: properties.vertical.informationContainer.inlineSize,
            blockSize: properties.vertical.informationContainer.blockSize,
            paddingInlineEnd: properties.vertical.informationContainer.padding,
            paddingInlineStart: properties.vertical.informationContainer.padding,
            paddingBlockEnd: properties.vertical.informationContainer.padding,
            gap: properties.vertical.informationContainer.gap
        },
        buttonsContainer: {
            display: 'flex',
            flexFlow: 'row',
            inlineSize: '100%',
            justifyContent: 'space-between'
        },
        title: {
            marginBlock: '0px !important',
            fontWeight: '500 !important',
            paddingInlineEnd: properties.vertical.title.paddingInlineEnd,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxInlineSize: properties.vertical.title.maxInlineSize,
            minInlineSize: properties.vertical.title.minInlineSize
        },
        subtitle: {
            inlineSize: properties.vertical.subTitle.inlineSize,
            blockSize: properties.vertical.subTitle.lineHeight,
            fontSize: properties.vertical.subTitle.fontSize,
            lineHeight: properties.vertical.subTitle.lineHeight,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        description: {
            color: mode.vertical.mainTextColor,
            inlineSize: properties.vertical.description.inlineSize,
            minBlockSize: properties.vertical.description.minBlockSize,
            fontSize: properties.vertical.description.fontSize,
            lineHeight: properties.vertical.description.lineHeight,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical'
        }
    },
    link: {
        [`&.${cardBase.$}`]: {
            color: 'inherit'
        }
    }
});
