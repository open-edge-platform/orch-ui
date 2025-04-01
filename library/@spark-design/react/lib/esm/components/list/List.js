import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { useListBox, useOption } from 'react-aria';
import { useListState } from 'react-stately';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { focus, list, shadow as shadowToken } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Icon } from '../icon';
import '@spark-design/css/components/list/index.css';
export const List = ({ size = 'm', zebra = false, type = 'simple', divide, shadow, listBoxRef, listBoxState, className = '', style, ...props }) => {
    const state = useListState(props);
    const ref = useRef(null);
    const { listBoxProps } = useListBox(props, listBoxState ? listBoxState : state, listBoxRef ? listBoxRef : ref);
    const domProps = filterDOMProps(props);
    const lst = list.component;
    const listClass = cl({
        [lst.$]: true,
        [lst.size?.[size]?.$]: size,
        [lst.zebra?.$]: zebra,
        [lst.divide?.$]: divide,
        [shadowToken.component.$]: shadow,
        [className]: !!className
    });
    return (_jsx("ul", { ref: listBoxRef ? listBoxRef : ref, className: listClass, style: style, ...mergeProps(listBoxProps, domProps), children: listBoxState
            ? [...listBoxState.collection].map((item, idx) => (_jsx(ListItem, { item: item, state: listBoxState, noFocus: listBoxState ? true : false, ariaLabel: `Item option ${idx + 1} - ${item.rendered}` }, item.key)))
            : [...state.collection].map((item) => (_jsx(ListItem, { item: item, state: state }, item.key))) }));
};
export const ListItem = ({ className = '', item, state, noFocus, ariaLabel, ...props }) => {
    const ref = React.useRef(null);
    const { optionProps, isSelected, isDisabled, isFocused } = useOption({ key: item.key, 'aria-label': ariaLabel }, state, ref);
    const domProps = filterDOMProps(props);
    const lstItem = list.component;
    const fcs = focus.component;
    const ListItemClass = cl({
        [lstItem.item?.$]: true,
        [lstItem.isSelected.$]: isSelected,
        [lstItem.isDisabled.$]: isDisabled,
        [lstItem.isFocused.$]: isFocused,
        [lstItem.isDivided.$]: item.props.isDivided,
        [className]: !!className,
        [fcs.$]: isFocused && !noFocus,
        [fcs.within.$]: isFocused && !noFocus,
        [fcs.snap.$]: isFocused && !noFocus
    });
    return (_jsxs("li", { className: ListItemClass, ref: ref, style: item.props.style, ...mergeProps(optionProps, domProps), children: [_jsxs("span", { className: lstItem.itemText.$, children: [item.props.icon && (_jsx(Icon, { className: lstItem.itemIcon.$, icon: item.props.icon, artworkStyle: item.props.artworkStyle, altText: item.props.altText })), item.rendered] }), isSelected && _jsx(Icon, { icon: "check", artworkStyle: "solid" })] }));
};
