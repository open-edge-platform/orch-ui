import { component } from '../../setup';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ShimmerSkeleton } from './types';
const shimmerBase = component({
    inlineSize: properties.inlineSize,
    blockSize: properties.blockSize,
    animate: {},
    skeleton: {
        [ShimmerSkeleton.List]: {
            item: {},
            avatar: {},
            shortLine: {},
            longLine: {},
            hr: {}
        },
        [ShimmerSkeleton.Block]: {
            item: {}
        },
        [ShimmerSkeleton.Gallery]: {
            item: {}
        },
        [ShimmerSkeleton.Table]: {
            item: {}
        },
        [ShimmerSkeleton.Card]: {
            item: {},
            cover: {},
            avatar: {},
            shortLine: {},
            longLine: {},
            hr: {}
        }
    }
}, {
    className: prefix
});
export const shimmer = shimmerBase.fork({
    [`&[aria-hidden=true]`]: {
        display: 'none !important'
    },
    [`& .${shimmerBase.animate.$}`]: {
        animation: 'keyframes-shimmer-animation 3s infinite linear',
        background: `linear-gradient(
          -45deg,
          ${mode.gradientColorZero} ${properties.gradientStart},
          ${mode.gradientColorMiddle} ${properties.gradientMiddle},
          ${mode.gradientColorZero} ${properties.gradientEnd}
        ) fixed`,
        backgroundColor: mode.backgroundColor,
        backgroundSize: `${properties.doubleInlineSize} ${properties.blockSize}`
    },
    [`& .${shimmerBase.skeleton.list.item.$}`]: {
        position: 'relative',
        blockSize: properties.listItemBlockSize,
        marginBlockEnd: properties.listItemMarginBlockEnd
    },
    [`& .${shimmerBase.skeleton.list.item.$} .${shimmerBase.skeleton.list.avatar.$}`]: {
        position: 'absolute',
        borderRadius: properties.listAvatarBorderRadius,
        inlineSize: properties.listAvatarInlineSize,
        blockSize: properties.listAvatarBlockSize
    },
    [`& .${shimmerBase.skeleton.list.item.$} .${shimmerBase.skeleton.list.shortLine.$}`]: {
        borderRadius: properties.listShortLineBorderRadius,
        inlineSize: properties.listShortLineInlineSize,
        blockSize: properties.listShortLineBlockSize,
        position: 'relative',
        marginInlineStart: properties.listShortLineMarginInlineStart
    },
    [`& .${shimmerBase.skeleton.list.item.$} .${shimmerBase.skeleton.list.longLine.$}`]: {
        borderRadius: properties.listLongLineBorderRadius,
        inlineSize: properties.listLongLineInlineSize,
        blockSize: properties.listLongLineBlockSize,
        position: 'relative',
        marginInlineStart: properties.listLongLineMarginInlineStart,
        marginBlockStart: properties.listLongLineMarginBlockStart
    },
    [`& .${shimmerBase.skeleton.list.item.$} .${shimmerBase.skeleton.list.hr.$}`]: {
        inlineSize: properties.listHrInlineSize,
        blockSize: properties.listHrBlockSize,
        position: 'relative',
        marginInlineStart: properties.listHrMarginInlineStart,
        marginBlockStart: properties.listHrMarginBlockStart
    },
    [`&.${shimmerBase.skeleton.block.$}`]: {
        display: 'flex',
        gap: properties.blockGap,
        justifyContent: 'left',
        flexWrap: 'wrap',
        paddingBlockStart: properties.blockPaddingBlockStart
    },
    [`&.${shimmerBase.skeleton.block.$} .${shimmerBase.skeleton.block.item.$}`]: {
        inlineSize: properties.blockItemInlineSize,
        blockSize: properties.blockItemBlockSize
    },
    [`&.${shimmerBase.skeleton.gallery.$}`]: {
        display: 'flex',
        gap: properties.galleryGap,
        justifyContent: 'left',
        flexWrap: 'wrap',
        paddingBlockStart: properties.galleryPaddingBlockStart
    },
    [`&.${shimmerBase.skeleton.gallery.$} .${shimmerBase.skeleton.gallery.item.$}`]: {
        inlineSize: properties.galleryItemInlineSize,
        blockSize: properties.galleryItemBlockSize
    },
    [`&.${shimmerBase.skeleton.table.$}`]: {
        display: 'flex',
        gap: properties.tableGap,
        justifyContent: 'left',
        flexWrap: 'wrap',
        paddingBlockStart: properties.tablePaddingBlockStart
    },
    [`&.${shimmerBase.skeleton.table.$} .${shimmerBase.skeleton.table.item.$}`]: {
        inlineSize: properties.tableItemInlineSize,
        blockSize: properties.tableItemBlockSize
    },
    [`& .${shimmerBase.skeleton.card.item.$}`]: {
        position: 'relative',
        blockSize: properties.cardItemBlockSize,
        marginBlockEnd: properties.cardItemMarginBlockEnd
    },
    [`& .${shimmerBase.skeleton.card.item.$} .${shimmerBase.skeleton.card.cover.$}`]: {
        inlineSize: properties.cardCoverInlineSize,
        blockSize: properties.cardCoverBlockSize
    },
    [`& .${shimmerBase.skeleton.card.item.$} .${shimmerBase.skeleton.card.avatar.$}`]: {
        position: 'absolute',
        borderRadius: properties.cardAvatarBorderRadius,
        inlineSize: properties.cardAvatarInlineSize,
        blockSize: properties.cardAvatarBlockSize,
        marginBlockStart: properties.cardAvatarMarginBlockStart,
        marginInlineStart: properties.cardAvatarMarginInlineStart,
        border: `${properties.cardAvatarBorderWidth} solid ${mode.cardAvatarBorderColor}`
    },
    [`& .${shimmerBase.skeleton.card.item.$} .${shimmerBase.skeleton.card.shortLine.$}`]: {
        borderRadius: properties.cardShortLineBorderRadius,
        inlineSize: properties.cardShortLineInlineSize,
        blockSize: properties.cardShortLineBlockSize,
        marginBlockStart: properties.cardShortLineMarginBlockStart,
        position: 'relative'
    },
    [`& .${shimmerBase.skeleton.card.item.$} .${shimmerBase.skeleton.card.longLine.$}`]: {
        borderRadius: properties.cardLongLineBorderRadius,
        inlineSize: properties.cardLongLineInlineSize,
        blockSize: properties.cardLongLineBlockSize,
        position: 'relative',
        marginBlockStart: properties.cardLongLineMarginBlockStart
    },
    [`& .${shimmerBase.skeleton.card.item.$} .${shimmerBase.skeleton.card.hr.$}`]: {
        inlineSize: properties.cardHrInlineSize,
        blockSize: properties.cardHrBlockSize,
        position: 'relative',
        marginBlockStart: properties.cardHrMarginBlockStart
    }
});
