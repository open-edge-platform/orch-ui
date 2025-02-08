import { token } from '../../setup';
import { CardCoverObjectFit, CardOrientation } from './types';
export const prefix = 'spark-card';
export const properties = token({
    boxShadow1: '1px',
    boxShadow2: '2px',
    horizontalLine: {
        inlineSize: '100%',
        blockSize: '1px'
    },
    metricsContainer: {
        checkbox: {
            position: 'relative',
            maxInlineSize: '20px'
        },
        sparkIcon: {
            paddingInlineEnd: '4px',
            vertical: {
                paddingInlineEnd: '4px'
            }
        },
        sparkChevronIcon: {
            fontSize: '16px'
        }
    },
    checkboxContainer: {
        marginBlockStart: '16px',
        marginInlineStart: '16px',
        paddingInlineStart: '5px',
        sideLength: '32px',
        position: 'absolute',
        checkbox: {
            position: 'absolute',
            paddingInlineStart: '5px'
        }
    },
    bg: {
        fill: [CardCoverObjectFit.Fill],
        contain: [CardCoverObjectFit.Contain],
        cover: [CardCoverObjectFit.Cover],
        none: [CardCoverObjectFit.None],
        scaleDown: [CardCoverObjectFit.ScaleDown]
    },
    iconPadding: '4px',
    iconMarginEnd: '-4px',
    [CardOrientation.Horizontal]: {
        minBlockSize: '210px',
        minInlineSize: '880px',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        boxShadow: 'none',
        bg: {
            image: {
                blockSize: 'auto',
                inlineSize: '340px',
                maxInlineSize: '340px',
                zIndex: '-1'
            }
        },
        avatar: {
            sideLength: '40px',
            borderRadius: '100%',
            zIndex: '1',
            marginInlineStart: '16px',
            marginBlockStart: '16px'
        },
        informationContainer: {
            inlineSize: '100%',
            blockSize: '100%',
            padding: '16px',
            gap: '12px',
            maxBlockSize: '289px',
            marginStart: '150px',
            inlineStart: '340px'
        },
        titlesContainer: {
            inlineSize: '-webkit-fill-available',
            marginBlockStart: '-52px'
        },
        title: {
            fontSize: '16px',
            lineHeight: '24px',
            paddingInlineEnd: '16px',
            maxInlineSize: '316px',
            minInlineSize: '72px'
        },
        subTitle: {
            fontSize: '12px',
            lineHeight: '18px',
            inlineSize: '100%',
            maxInlineSize: '460px',
            minInlineSize: '460px',
            letterSpacing: '0.25px'
        },
        description: {
            fontSize: '14px',
            lineHeight: '20px',
            inlineSize: '100%',
            minBlockSize: '20px'
        },
        propertiesContainer: {
            inlineSize: '100%',
            blockSize: '100%',
            paddingInline: '16px',
            paddingBlockStartEnd: '12px',
            maxBlockSize: '289px',
            gap: '16px',
            iconGap: '4px'
        }
    },
    [CardOrientation.Vertical]: {
        inlineSize: '272px',
        blockSize: 'auto',
        display: 'flex',
        gap: '16px',
        bg: {
            image: {
                blockSize: '168px',
                inlineSize: '100%',
                maxInlineSize: '340px',
                zIndex: '-1'
            }
        },
        avatar: {
            sideLength: '40px',
            borderRadius: '100%',
            zIndex: '1',
            marginInlineStart: '16px',
            marginBlockStart: '136px',
            boxShadow: '1px'
        },
        metricsContainer: {
            checkbox: {
                position: 'relative',
                maxInlineSize: '20px'
            },
            sparkIcon: {
                paddingInlineEnd: '4px',
                vertical: {
                    paddingInlineEnd: '4px'
                }
            },
            sparkChevronIcon: {
                fontSize: '16px'
            }
        },
        titlesContainer: {
            inlineSize: '100%'
        },
        title: {
            fontSize: '16px',
            lineHeight: '24px',
            paddingInlineEnd: '16px',
            maxInlineSize: '316px',
            minInlineSize: '72px'
        },
        subTitle: {
            fontSize: '12px',
            lineHeight: '18px',
            inlineSize: '100%',
            maxInlineSize: '460px',
            minInlineSize: '460px',
            letterSpacing: '0.25px'
        },
        sparkCardOptions: {
            gap: '16px'
        },
        optionsItem: {
            gap: '4px'
        },
        informationContainer: {
            inlineSize: '100%',
            blockSize: '100%',
            padding: '16px',
            gap: '12px',
            maxBlockSize: '289px'
        },
        propertiesContainer: {
            inlineSize: '100%',
            blockSize: '100%',
            paddingInlineStartEnd: '16px',
            paddingBlockStartEnd: '12px',
            maxBlockSize: '289px',
            gap: '16px',
            iconGap: '4px'
        },
        description: {
            fontSize: '14px',
            lineHeight: '20px',
            inlineSize: '100%',
            minBlockSize: '20px'
        }
    }
}, {
    prefix: prefix
});
