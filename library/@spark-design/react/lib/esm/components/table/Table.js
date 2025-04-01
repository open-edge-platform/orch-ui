import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import { useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { PaginationSize, table, TableSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Icon } from '../icon';
import { Pagination } from '../';
import '@spark-design/css/components/table/index.css';
const emptyData = [];
const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current = indeterminate;
        }
    }, [inputRef, IndeterminateCheckbox]);
    return (_jsx("input", { id: "check", className: "spark-table-rows-select-checkbox", type: "checkbox", "aria-label": "checkbox", ref: inputRef, ...rest }));
};
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';
export const Table = ({ initialExpanded, search, columns = [], data, size = TableSize.Medium, paginationButtonsSize = PaginationSize.Medium, variant = '', className = '', style, paginationClassName = '', paginationStyle, zebra = false, sort = [], selectRow = false, pagination = false, pageSize = 10, onSelect, subComponent, canExpand, selectedRowIds: defaultSelectedRowIds = {}, onChangePage, onSort, initialSort, onPageSizeChange, totalItem, onNextPage, onPreviousPage, onPageIndex, showAllButton = false, getRowClass, getRowStyle, onSortChange, ...rest }) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [fullPage, setFullPage] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);
    const totalItemsValue = totalItem || (data && typeof data !== 'undefined' && Object.keys(data).length);
    if (typeof data === 'undefined') {
        data = emptyData;
    }
    const { setGlobalFilter, getTableBodyProps, headerGroups, prepareRow, page, rows, toggleAllRowsExpanded, canPreviousPage, canNextPage, nextPage, gotoPage, previousPage, setPageSize, selectedFlatRows, state: { pageIndex, selectedRowIds } } = useTable({
        columns,
        data,
        autoResetGlobalFilter: true,
        initialState: {
            expanded: initialExpanded ?? {},
            pageIndex: 0,
            pageSize: rowsPerPage,
            selectedRowIds: defaultSelectedRowIds,
            filters: [
                {
                    id: 'leaveRequestStatus',
                    value: search
                }
            ],
            sortBy: initialSort
                ?
                    [{ id: initialSort.column, desc: initialSort.direction !== 'asc' }]
                : []
        }
    }, useFilters, useGlobalFilter, useSortBy, useExpanded, usePagination, useRowSelect, (hooks) => {
        if (selectRow) {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (_jsx("span", { children: _jsx(IndeterminateCheckbox, { "data-testid": "select-all-checkbox", ...getToggleAllRowsSelectedProps() }, columns.length) })),
                    Cell: ({ row }) => (_jsx("span", { children: _jsx(IndeterminateCheckbox, { "data-testid": "select-row-checkbox", ...row.getToggleRowSelectedProps() }) }, `checkbox-${{ row }.row.index}`))
                },
                ...columns
            ]);
        }
        if (subComponent) {
            const toggleRows = (row, expanded) => {
                toggleAllRowsExpanded(false);
                row.toggleRowExpanded();
                if (expanded) {
                    row.toggleRowExpanded(false);
                }
            };
            hooks.visibleColumns.push((columns) => [
                {
                    expander: true,
                    id: 'expander',
                    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (_jsx("span", { "data-testid": "expand-all-rows", ...getToggleAllRowsExpandedProps(), children: isAllRowsExpanded ? (_jsx(Icon, { icon: "chevron-down" })) : (_jsx(Icon, { icon: "chevron-right" })) })),
                    Cell: ({ row }) => {
                        return !canExpand || canExpand({ row }) ? (_jsx("span", { children: row.isExpanded ? (_jsx(Icon, { icon: "chevron-down", onClick: () => toggleRows(row, true) })) : (_jsx(Icon, { "data-testid": "expand-row", icon: "chevron-right", onClick: () => toggleRows(row, false) })) }, `checkbox-${{ row }.row.index}`)) : null;
                    }
                },
                ...columns
            ]);
        }
    });
    useEffect(() => {
        search && search.length >= 0 && setGlobalFilter(search);
        if (rows.length === 0) {
            setIsEmpty(true);
        }
        else {
            setIsEmpty(false);
        }
    }, [search, data, rows]);
    useEffect(() => {
        if (!onSelect)
            return;
        onSelect({
            selectedRowIds,
            selectedRowsData: selectedFlatRows.map((d) => d.original)
        });
    }, [selectedRowIds]);
    const tbl = table.component;
    const outlineMap = {
        outline: tbl.outline.$,
        'outline-bold': tbl.outlineBold.$,
        ghost: '',
        minimal: tbl.minimal.$
    };
    const textAlignMap = {
        start: tbl.cellAlignStart.$,
        center: tbl.cellAlignCenter.$,
        end: tbl.cellAlignEnd.$
    };
    const tableClass = cl({
        [tbl.$]: true,
        [tbl.size[size]?.$]: size,
        [outlineMap[variant]]: true,
        [className]: !!className,
        [tbl.rowsZebra.$]: zebra,
        [tbl.rowsSort.$]: sort,
        [tbl.rowsSelect.$]: selectRow,
        [tbl.rowsSubRow.$]: subComponent
    });
    const tableHeadCellClass = cl({
        [tbl.headCell.$]: true
    });
    const tableCellClass = cl({
        [tbl.cell.$]: true
    });
    const getDirection = (dir) => {
        if (dir === undefined)
            return;
        return textAlignMap[dir];
    };
    const checkPagination = () => {
        if (pagination &&
            data &&
            typeof data !== 'undefined' &&
            pageSize < totalItemsValue) {
            return true;
        }
    };
    const handleSortChange = (column, isSortedDesc, index) => {
        if (onSortChange) {
            const direction = isSortedDesc ? 'desc' : 'asc';
            onSortChange(column.render('Header'), direction, index);
        }
    };
    return (_jsxs("div", { children: [_jsxs("table", { "data-testid": "table", className: tableClass, style: style, ...rest, children: [_jsx("thead", { className: "spark-table-head", children: headerGroups.map((headerGroup) => {
                            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                            return (_jsx("tr", { "data-testid": "table-row-header", ...restHeaderGroupProps, children: headerGroup.headers.map((column, index) => {
                                    const { key, ...restColumn } = column.getHeaderProps(sort.includes(selectRow ? index - 1 : index)
                                        ? column.getSortByToggleProps()
                                        : '');
                                    const name = column.render('Header');
                                    return (_jsx("th", { className: [
                                            tableHeadCellClass,
                                            getDirection(column.textAlign)
                                        ]
                                            .join(' ')
                                            .replace(/\s+/g, ' ')
                                            .trim(), ...restColumn, ...column.getHeaderProps(), style: column.style, children: sort.includes(selectRow ? index - 1 : index) &&
                                            !isEmpty ? (_jsxs("div", { className: "spark-table-head-cell-box-sort active-sort", onClick: () => {
                                                handleSortChange(column, column.isSortedDesc, selectRow ? index - 1 : index);
                                                setTimeout(() => {
                                                    if (onSort) {
                                                        const direction = column.isSortedDesc === true
                                                            ? 'desc'
                                                            : column.isSortedDesc ===
                                                                false
                                                                ? 'asc'
                                                                : null;
                                                        onSort(name, direction);
                                                    }
                                                }, 0);
                                            }, children: [name, _jsxs("span", { "data-testid": "sort-arrows-up", className: "spark-table-rows-sort", children: [_jsx(Icon, { className: column.isSorted &&
                                                                !column.isSortedDesc
                                                                ? 'caret-up-select'
                                                                : 'caret-up', icon: "caret-up", style: {
                                                                fontWeight: 'bold'
                                                            } }), _jsx(Icon, { className: column.isSorted &&
                                                                column.isSortedDesc
                                                                ? 'caret-down-select'
                                                                : 'caret-down', icon: "caret-down", style: {
                                                                fontWeight: 'bold'
                                                            } })] })] })) : (_jsx("div", { className: "spark-table-head-cell-box", children: column.render('Header') })) }, key));
                                }) }, key));
                        }) }), _jsxs("tbody", { ...getTableBodyProps(), className: "spark-table-body", children: [page &&
                                page.map((row) => {
                                    prepareRow(row);
                                    const { key, ...restRowProps } = row.getRowProps();
                                    const rowClass = getRowClass ? getRowClass(row) : '';
                                    const rowStyle = getRowStyle ? getRowStyle(row) : {};
                                    return (_jsxs(React.Fragment, { children: [_jsx("tr", { "data-testid": "table-rows", className: [
                                                    row.isSelected
                                                        ? 'spark-table-rows-selected'
                                                        : row.isExpanded
                                                            ? 'spark-table-row expanded'
                                                            : row.isSelected && row.isExpanded
                                                                ? 'spark-table-rows-expanded spark-table-rows-selected'
                                                                : 'spark-table-row',
                                                    rowClass
                                                ]
                                                    .join(' ')
                                                    .replace(/\s+/g, ' ')
                                                    .trim(), tabIndex: key, style: rowStyle, ...restRowProps, children: row.cells.map((cell) => {
                                                    const { key, ...restCellProps } = cell.getCellProps();
                                                    return (_jsx("td", { className: [
                                                            tableCellClass,
                                                            getDirection(cell.column.textAlign)
                                                        ]
                                                            .join(' ')
                                                            .replace(/\s+/g, ' ')
                                                            .trim(), ...restCellProps, children: _jsx("div", { className: "spark-table-cell-box", children: cell.render('Cell') }) }, key));
                                                }) }, key), row.isExpanded && subComponent && (_jsx("tr", { className: "spark-table-row spark-table-rows-sub-row-item", "data-testid": "sub-row", children: _jsx("td", { className: "spark-table-cell-box subrow-cell", colSpan: Array.isArray(columns) ? columns.length + 1 : 0, children: subComponent && subComponent({ row }) }) }, `sub-${key}`))] }, key));
                                }), isEmpty && (_jsx("tr", { className: "spark-table-row", "data-testid": "table-rows", children: _jsxs("td", { colSpan: String(columns).length, className: "spark-table-cell", children: [_jsx("div", { className: "spark-table-cell-box", children: "No Information to Display" }), ' '] }) }, "test"))] })] }), data && checkPagination() && (_jsx(_Fragment, { children: _jsx(Pagination, { "data-testid": "pagination", pageSize: rowsPerPage, size: paginationButtonsSize, className: paginationClassName, style: paginationStyle, hasControl: true, totalItems: totalItemsValue, pageIndex: onPageIndex || pageIndex, canNextPage: onNextPage || canNextPage, onNextPage: nextPage, canPreviousPage: onPreviousPage || canPreviousPage, onPreviousPage: previousPage, onGotoPage: (index) => {
                        gotoPage(index);
                        if (onChangePage) {
                            onChangePage(index);
                        }
                    }, onSetPageSize: (size) => {
                        if (fullPage) {
                            setFullPage(false);
                        }
                        else {
                            setFullPage(true);
                        }
                        setRowsPerPage(size);
                        setPageSize(size);
                        if (onPageSizeChange) {
                            onPageSizeChange(size);
                        }
                    }, onChangePage: onChangePage, showAllButton: showAllButton }) }))] }));
};
