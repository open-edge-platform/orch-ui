import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { shimmer } from '@spark-design/tokens';
import { ShimmerSkeleton } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/shimmer/index.css';
const shmr = shimmer.component;
const ShimmerSkeletonList = (shimmerAnimate) => {
    return (_jsxs("div", { className: `${shmr.skeleton.list.item.$}`, children: [_jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.list.avatar.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.list.shortLine.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.list.longLine.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.list.hr.$}` })] }));
};
const ShimmerSkeletonBlocks = (shimmerAnimate) => {
    return _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.block.item.$}` });
};
const ShimmerSkeletonGallery = (shimmerAnimate) => {
    return (_jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.gallery.item.$}` }));
};
const ShimmerSkeletonTable = (shimmerAnimate) => {
    return _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.table.item.$}` });
};
const ShimmerSkeletonCard = (shimmerAnimate) => {
    return (_jsxs("div", { className: `${shmr.skeleton.card.item.$}`, children: [_jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.card.cover.$}` }), _jsx("div", { style: { borderColor: 'var(--spark-shimmer-card-avatar-border-color, #333333)' }, className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.card.avatar.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.card.shortLine.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.card.longLine.$}` }), _jsx("div", { className: `${shimmerAnimate.shimmerAnimate} ${shmr.skeleton.card.hr.$}` })] }));
};
export const Shimmer = ({ children, skeleton, isEssential = false, isHidden = false, items = 3, style, className = '', ...props }) => {
    const shimmerClass = cl({
        [shmr.$]: true,
        [shmr.skeleton.list.$]: skeleton === ShimmerSkeleton.List,
        [shmr.skeleton.block.$]: skeleton === ShimmerSkeleton.Block,
        [shmr.skeleton.gallery.$]: skeleton === ShimmerSkeleton.Gallery,
        [shmr.skeleton.table.$]: skeleton === ShimmerSkeleton.Table,
        [shmr.skeleton.card.$]: skeleton === ShimmerSkeleton.Card,
        [className]: !!className
    });
    const shimmerAnimateClass = cl({
        [shmr.animate.$]: true,
        'not-essential': !isEssential
    });
    function modifyChildren(child) {
        const className = cl(child.props.className, shimmerAnimateClass);
        const props = {
            className
        };
        return React.cloneElement(child, props);
    }
    if (!children && items && items > 0) {
        const rows = [];
        switch (skeleton) {
            case ShimmerSkeleton.List:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonList, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
            case ShimmerSkeleton.Block:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonBlocks, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
            case ShimmerSkeleton.Gallery:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonGallery, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
            case ShimmerSkeleton.Table:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonTable, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
            case ShimmerSkeleton.Card:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonCard, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
            default:
                for (let step = 0; step < items; step++) {
                    rows.push(_jsx(ShimmerSkeletonList, { shimmerAnimate: shimmerAnimateClass }, step));
                }
                return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: rows }));
        }
    }
    return (_jsx("div", { className: shimmerClass, "aria-hidden": isHidden, style: style, ...props, children: React.Children.map(children, (child) => modifyChildren(child)) }));
};
