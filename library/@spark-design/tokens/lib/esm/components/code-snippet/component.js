import { component } from '../../setup';
import { button } from '../button';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { CodeSnippetSize } from './types';
export const codeSnippetBase = component({
    backgroundColor: mode.backgroundColor,
    position: 'relative',
    color: mode.color,
    lineNumbering: {
        paddingInlineStart: properties.lineNumbering.paddingInlineStart
    },
    inherit: {
        fontSize: 'inherit !important'
    },
    pre: {
        counterReset: 'count 0',
        display: 'grid',
        gridTemplateColumns: 'min-content 1fr',
        gridAutoRows: 'auto',
        margin: properties.zeroMargin,
        padding: properties.zeroPadding
    },
    hideNumbering: {},
    size: {},
    inline: {},
    checkIcon: {
        color: 'white'
    },
    copyIcon: {
        display: 'none !important'
    },
    isVisible: {
        display: 'block !important'
    },
    single: {
        copyIcon: {
            position: 'absolute !important',
            appearance: 'none !important',
            insetBlockStart: `${properties.single.insetBlockStartCopyIcon} !important`,
            insetInlineEnd: `${properties.single.insetInlineEndCopyIcon} !important`,
            padding: properties.single.padding,
            zIndex: '999',
            backgroundColor: mode.backgroundColor,
            [`& .${button.$} .spark-icon`]: {
                color: mode.color
            }
        },
        scrollbarY: {
            isHidden: {
                overflowY: 'hidden'
            }
        }
    },
    multiline: {
        copyIcon: {
            fontSize: properties.copyIcon.fontSize,
            position: 'absolute',
            insetBlockStart: `${properties.multiline.insetBlockStartCopyIcon} !important`,
            insetInlineEnd: `${properties.multiline.insetInlineEndCopyIcon} !important`,
            zIndex: '999',
            backgroundColor: mode.backgroundColor,
            [`& .${button.$} .spark-icon`]: {
                color: mode.color
            }
        }
    },
    scrollbar: {
        isHidden: {
            overflowY: 'hidden !important',
            overflowX: 'hidden !important'
        }
    },
    animate: {},
    tooltip: {
        multiline: {
            visibility: 'hidden',
            PointerEvents: 'auto',
            opacity: properties.closedOpacity
        },
        [CodeSnippetSize.Large]: {
            blockSize: `${properties.single.l.blockSize} !important`,
            alignItems: 'center !important',
            padding: `${properties.multiline.l.tooltipTop} ${properties.multiline.l.tooltipTop}`,
            gap: properties.multiline.l.gap
        },
        [CodeSnippetSize.Medium]: {
            blockSize: `${properties.single.m.blockSize} !important`,
            alignItems: 'center !important'
        },
        [CodeSnippetSize.Small]: {
            blockSize: `${properties.single.s.blockSize} !important`,
            alignItems: 'center !important'
        }
    },
    lineCount: {
        fontFamily: properties.fontFamily,
        textAlign: 'end',
        display: 'grid'
    }
}, {
    className: prefix
});
export const codeSnippet = codeSnippetBase.fork({
    [`& .${codeSnippetBase.lineCount.$}::before`]: {
        counterIncrement: 'count',
        content: 'counter(count)',
        whiteSpace: 'pre',
        color: mode.numberingColor,
        paddingInlineStart: properties.lineNumbering.paddingInlineStart,
        paddingInlineEnd: properties.lineNumbering.paddingInlineEnd,
        borderInlineEnd: `${properties.lineNumbering.borderInlineEnd} solid ${mode.borderColor}`,
        marginRight: properties.lineNumbering.marginRight
    },
    [`&.${codeSnippetBase.inline.$}`]: {
        alignItems: 'flex-start',
        display: 'inline-block',
        fontFamily: properties.fontFamily,
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Large}`]: {
            blockSize: properties.inline.l.blockSize,
            inlineSize: properties.inline.l.width,
            paddingInlineStart: properties.inline.l.paddingInline,
            paddingInlineEnd: properties.inline.l.paddingInline,
            fontSize: properties.inline.l.fontSize,
            display: 'inline-flex',
            alignItems: 'center'
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Medium}`]: {
            blockSize: properties.inline.m.blockSize,
            inlineSize: properties.inline.m.width,
            paddingInlineStart: properties.inline.m.paddingInline,
            paddingInlineEnd: properties.inline.m.paddingInline,
            fontSize: properties.inline.m.fontSize,
            display: 'inline-flex',
            alignItems: 'center'
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Small}`]: {
            blockSize: properties.inline.s.blockSize,
            inlineSize: properties.inline.s.width,
            paddingInlineStart: properties.inline.s.paddingInline,
            paddingInlineEnd: properties.inline.s.paddingInline,
            fontSize: properties.inline.s.fontSize,
            display: 'inline-flex',
            alignItems: 'center'
        }
    },
    [`&.${codeSnippetBase.single.$}`]: {
        [`& pre`]: {
            fontFamily: properties.fontFamily,
            margin: properties.preMargin
        },
        [`& code`]: {
            fontFamily: properties.fontFamily
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Large}`]: {
            blockSize: properties.single.l.blockSize,
            paddingInlineStart: properties.single.l.paddingInlineStart,
            lineHeight: properties.single.l.lineHeight,
            fontSize: properties.single.l.fontSize
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Medium}`]: {
            blockSize: properties.single.m.blockSize,
            paddingInlineStart: properties.single.m.paddingInlineStart,
            lineHeight: properties.single.m.lineHeight,
            fontSize: properties.single.m.fontSize
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Small}`]: {
            blockSize: properties.single.s.blockSize,
            paddingInlineStart: properties.single.s.paddingInlineStart,
            lineHeight: properties.single.s.lineHeight,
            fontSize: properties.single.s.fontSize
        }
    },
    [`&.${codeSnippetBase.multiline.$}`]: {
        alignItems: 'flex-start',
        [`& pre code`]: {
            fontFamily: properties.fontFamily
        },
        [`& pre.${codeSnippetBase.hideNumbering.$}`]: {
            gridTemplateColumns: 'none !important'
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Large}`]: {
            fontSize: properties.multiline.l.fontSize,
            blockSize: properties.multiline.l.blockSize,
            paddingInlineStart: properties.multiline.l.paddingInlineStart,
            paddingBlockStart: properties.multiline.l.paddingBlockStart
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Medium}`]: {
            fontSize: properties.multiline.m.fontSize,
            blockSize: properties.multiline.m.blockSize,
            paddingInlineStart: properties.multiline.m.paddingInlineStart,
            paddingBlockStart: properties.multiline.m.paddingBlockStart
        },
        [`&.${codeSnippetBase.size.$}-${CodeSnippetSize.Small}`]: {
            fontSize: properties.multiline.s.fontSize,
            blockSize: properties.multiline.s.blockSize,
            paddingInlineStart: properties.multiline.s.paddingInlineStart,
            paddingBlockStart: properties.multiline.s.paddingBlockStart
        }
    },
    size: Object.values(CodeSnippetSize)
        .filter((value) => value != CodeSnippetSize.Inherit)
        .reduce((acc, size) => ({
        ...acc,
        [size]: {
            [`& .${codeSnippetBase.animate.$}-${size}`]: {
                animation: `keyframes-spark-code-snippet-tooltip-animation-${size}`,
                animationDuration: '4s'
            }
        }
    }), {})
});
