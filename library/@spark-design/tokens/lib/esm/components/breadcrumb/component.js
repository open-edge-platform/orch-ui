import { component } from '../../setup';
import { hyperlink } from '../hyperlink';
import { mode } from './modes';
import { prefix, properties } from './properties';
export const breadcrumb = component({
    items: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: properties.margin,
        padding: properties.padding
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        '&:not(:first-of-type)': {
            '&:before': {
                content: '""',
                display: 'flex',
                blockSize: properties.blockSize,
                inlineSize: properties.inlineSize,
                marginInline: properties.splitGap,
                backgroundColor: mode.colorSplit,
                transform: 'skew(-18deg)'
            }
        }
    },
    isCurrent: {
        [`& .${hyperlink.$}.${hyperlink.isDisabled.$}`]: {
            color: `${mode.colorIsCurrent} !important`
        }
    }
}, {
    className: prefix
});
