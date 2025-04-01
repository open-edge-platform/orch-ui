import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { button, ButtonVariant, DropdownVariant, pagination, PaginationSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, Dropdown, Icon, Item, Text } from '../';
import '@spark-design/css/components/pagination/index.css';
const pg = pagination.component;
const btn = button.component;
export const Pagination = ({ size = PaginationSize.Medium, className = '', style, totalItems = 0, pageIndex, pageSize = 10, onNextPage, canNextPage, onPreviousPage, canPreviousPage, onGotoPage, onSetPageSize, hasControl = false, siblingCount = 1, onChangePage, showAllButton = false, ...rest }) => {
    const [visibleBtns, setVisibleBtns] = useState([]);
    const paginationClass = cl({
        [pg.$]: true,
        [className]: !!className
    });
    const paginationControlClass = cl({
        [pg.control.$]: true
    });
    const paginationControlItemPerPage = cl({
        [pg.control.$]: true
    });
    const paginationListClass = cl({
        [pg.list.$]: true
    });
    const buttonActive = cl({
        [btn.active.$]: true
    });
    const DEFAULT_PAGE_SIZES = [10, 30, 50, 100];
    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };
    const paginationRange = () => {
        const totalPageCount = Math.ceil(totalItems / pageSize);
        const totalPageNumbers = siblingCount * 2 + 5;
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        const leftSiblingNumber = Math.max(pageIndex - siblingCount + 1, 1);
        const rightSiblingNumber = Math.min(pageIndex + siblingCount + 1, totalPageCount);
        const shouldShowLeftDots = leftSiblingNumber > 2;
        const shouldShowRightDots = rightSiblingNumber < totalPageCount - 2;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = totalPageNumbers - 2;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, 'right', totalPageCount];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = totalPageNumbers - 2;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [1, 'left', ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingNumber, rightSiblingNumber);
            return [1, 'left', ...middleRange, 'right', totalPageCount];
        }
        return [];
    };
    useEffect(() => {
        setVisibleBtns(paginationRange());
    }, [totalItems, pageIndex, pageSize, siblingCount]);
    return (_jsxs("div", { className: paginationClass, style: style, ...rest, "data-testid": "pagination", children: [hasControl && (_jsxs("div", { className: paginationControlClass, "data-testid": "pagination-control", children: [_jsx(Text, { size: size, "data-testid": "pagination-control-total", children: `${totalItems} items found` }), showAllButton && (_jsx(Button, { variant: ButtonVariant.Primary, size: size, "data-testid": "pagination-control-showall", onPress: () => {
                            onSetPageSize(totalItems);
                            if (onChangePage)
                                onChangePage(0);
                        }, children: "Show All" })), _jsxs("div", { className: paginationControlItemPerPage, "data-testid": "pagination-control-item-per-page", style: { gap: '0' }, children: [_jsx(Text, { size: size, children: "Items per page" }), _jsx(Dropdown, { label: "", name: "pagesizeDropdown", placeholder: "Select an Option", size: size, variant: DropdownVariant.Primary, onSelectionChange: (value) => {
                                    onSetPageSize(Number(value));
                                }, "data-testid": "pagination-control-pagesize", defaultSelectedKey: pageSize, children: DEFAULT_PAGE_SIZES.map((pageSize) => (_jsx(Item, { children: pageSize }, pageSize))) })] })] })), _jsxs("div", { className: paginationListClass, "data-testid": "pagination-list", children: [_jsx(Button, { iconOnly: true, variant: ButtonVariant.Secondary, size: size, isDisabled: !canPreviousPage, onPress: () => {
                            onGotoPage(0);
                            if (onChangePage)
                                onChangePage(0);
                        }, "data-testid": "pagination-first", children: _jsx(Icon, { icon: "chevron-double-left" }) }), _jsx(Button, { iconOnly: true, variant: ButtonVariant.Secondary, size: size, isDisabled: !canPreviousPage, onPress: () => {
                            onPreviousPage();
                            if (onChangePage)
                                onChangePage(pageIndex - 1);
                        }, "data-testid": "pagination-previous", children: _jsx(Icon, { icon: "chevron-left" }) }), visibleBtns.map((n) => {
                        if (n === 'left' || n === 'right') {
                            return (_jsx(Text, { size: size, "data-testid": `${n}-dots`, children: "\u00A0...\u00A0" }, n));
                        }
                        else {
                            return (_jsx(Button, { size: size, variant: ButtonVariant.Secondary, iconOnly: true, onPress: () => {
                                    onGotoPage(n - 1);
                                    if (onChangePage)
                                        onChangePage(n - 1);
                                }, className: pageIndex === n - 1 ? buttonActive : '', "data-testid": `page-btn-${n}`, children: n }, n - 1));
                        }
                    }), _jsx(Button, { iconOnly: true, variant: ButtonVariant.Secondary, size: size, isDisabled: !canNextPage, onPress: () => {
                            onNextPage();
                            if (onChangePage)
                                onChangePage(pageIndex + 1);
                        }, "data-testid": "pagination-next", children: _jsx(Icon, { icon: "chevron-right" }) }), _jsx(Button, { iconOnly: true, variant: ButtonVariant.Secondary, size: size, isDisabled: !canNextPage, onPress: () => {
                            onGotoPage(Math.ceil(totalItems / pageSize) - 1);
                            if (onChangePage)
                                onChangePage(Math.ceil(totalItems / pageSize) - 1);
                        }, "data-testid": "pagination-last", children: _jsx(Icon, { icon: "chevron-double-right" }) })] })] }));
};
