import { component } from '../../setup';
import { heading } from '../heading/component';
import { mode } from './modes';
import { prefix, properties } from './properties';
import { ModalSize } from './types';
export const modalBase = component({
    backgroundColor: mode.background,
    opacity: '0.99999',
    visibility: 'visible',
    pointerEvents: 'auto',
    zIndex: '999',
    maxWidth: '90vw',
    outline: 'none',
    grid: {
        display: 'grid',
        width: '100%',
        gridTemplateAreas: `
                '. . .'
                '. header .'
                '. dividerStart .'
                '. content .'
                '. dividerEnd .'
                '. footer .'
                '. . .'`
    },
    section: {
        boxSizing: 'border-box',
        maxHeight: 'inherit',
        outline: 'none',
        display: 'flex',
        width: '100%'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    headingTitles: {},
    dividerStart: {},
    dividerEnd: {},
    content: {},
    footer: {},
    isDivided: {},
    wrapper: {
        boxSizing: 'border-box',
        width: '100vw',
        height: '100%',
        visibility: 'hidden',
        pointerEvents: 'none',
        zIndex: '2',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'fixed',
        top: '0',
        left: '0'
    },
    backdrop: {
        isOpen: {}
    },
    [ModalSize.Small]: {},
    [ModalSize.Medium]: {},
    [ModalSize.Large]: {}
}, {
    className: prefix
});
export const modal = modalBase.fork({
    [`&.${modalBase.isDivided.$} .${modalBase.header.$},
      &.${modalBase.isDivided.$} .${modalBase.content.$}`]: {
        marginBlockEnd: `${properties.noSpacing} !important`
    },
    [`& .${modalBase.header.$}`]: {
        gridArea: 'header',
        [`& .${heading.$}`]: {
            margin: `${properties.noSpacing} !important`
        },
        [`& .${modalBase.headingTitles.$}`]: {
            flex: '1'
        }
    },
    [`& .${modalBase.dividerStart.$}`]: { gridArea: 'dividerStart' },
    [`& .${modalBase.dividerEnd.$}`]: { gridArea: 'dividerEnd' },
    [`& .${modalBase.content.$}`]: { gridArea: 'content' },
    [`& .${modalBase.footer.$}`]: { gridArea: 'footer' },
    size: {
        ...Object.values(ModalSize).reduce((acc, size) => ({
            ...acc,
            [size]: {
                minInlineSize: properties[size].minInlineSize,
                inlineSize: properties[size].size,
                [`& .${modalBase.grid.$}`]: {
                    gridTemplateColumns: `${properties[size].tempCol} auto 
                                                ${properties[size].tempCol}`,
                    gridTemplateRows: `${properties[size].tempRow} auto auto auto auto
                                            auto ${properties[size].tempRow}`
                },
                [`& .${modalBase.header.$}`]: {
                    marginBlockEnd: properties[size].rowGap,
                    gap: properties[size].headerGap
                },
                [`& .${modalBase.content.$}`]: {
                    marginBlockEnd: properties[size].rowGap,
                    minBlockSize: properties[size].contentMinBlockSize
                },
                [`& .${modalBase.footer.$}`]: {},
                [`&.${modalBase.isDivided.$} .${modalBase.dividerStart.$} ,
                        &.${modalBase.isDivided.$} .${modalBase.dividerEnd.$} `]: {
                    margin: `${properties[size].margin} 0`
                }
            }
        }), {})
    },
    backdrop: {
        backgroundColor: properties.backdrop.backgroundColor,
        zIndex: properties.backdrop.zIndex,
        position: properties.backdrop.position,
        display: 'flex',
        inset: '0',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        [`&.${modalBase.backdrop.isOpen.$}`]: {
            visibility: 'visible',
            opacity: '0.9999',
            pointerEvents: 'auto'
        }
    },
    displayNone: {
        display: 'none'
    }
});
