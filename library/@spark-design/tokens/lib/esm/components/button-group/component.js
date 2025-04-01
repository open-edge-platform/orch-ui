import { component } from '../../setup';
import { tooltipBase } from '../tooltip';
import { prefix, properties } from './properties';
import { ButtonGroupSpacing } from './types';
export const buttonGroupBase = component({
    alignItems: 'flex-start',
    display: 'inline-flex',
    position: 'relative',
    inlineSize: '100%',
    orientation: {
        vertical: {},
        horizontal: {}
    },
    align: {
        start: {},
        end: {},
        center: {}
    },
    isDisabled: {}
}, {
    className: prefix
});
export const buttonGroup = buttonGroupBase.fork({
    [`&.${buttonGroupBase.orientation.vertical.$}`]: {
        flexDirection: 'column',
        display: 'inline-flex',
        flexWrap: 'wrap'
    },
    [`&.${buttonGroupBase.orientation.horizontal.$}`]: {
        flexDirection: 'row',
        display: 'inline-flex',
        flexWrap: 'wrap'
    },
    [`&.${buttonGroupBase.align.end.$}`]: {
        alignItems: 'flex-end',
        justifyContent: 'end'
    },
    [`&.${buttonGroupBase.align.start.$}`]: {
        alignItems: 'flex-start',
        justifyContent: 'start'
    },
    [`&.${buttonGroupBase.align.center.$}`]: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    [`&.${buttonGroupBase.isDisabled.$} > :not(.${tooltipBase.toggle.$})`]: {
        pointerEvents: 'none'
    },
    spacing: Object.values(ButtonGroupSpacing).reduce((acc, spacing) => ({
        ...acc,
        [spacing]: {
            gap: properties[spacing]?.gap
        }
    }), {})
});
