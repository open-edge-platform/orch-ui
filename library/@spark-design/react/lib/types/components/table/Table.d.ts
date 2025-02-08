import React, { CSSProperties } from 'react';
import { PaginationSize, TableSize } from '@spark-design/tokens';
import '@spark-design/css/components/table/index.css';
export interface OnSelectInputType<T> {
    selectedRowIds: {
        [key: number]: true;
    };
    selectedRowsData: T[];
}
export interface TableProps extends Omit<React.InputHTMLAttributes<unknown>, 'size' | 'variant' | 'zebra' | 'onSelect'> {
    size?: `${TableSize}` | TableSize;
    pageSize?: number;
    paginationButtonsSize?: `${PaginationSize}` | PaginationSize;
    search?: string;
    variant?: string;
    columns?: unknown;
    data?: unknown;
    zebra?: boolean;
    sort?: number[];
    selectRow?: boolean;
    pagination?: boolean;
    subComponent?: (props: {
        row: any;
    }) => JSX.Element | undefined;
    canExpand?: (props: {
        row: any;
    }) => boolean;
    onSelect?: (data: OnSelectInputType<unknown>) => void;
    selectedRowIds?: {
        [key: number]: boolean;
    };
    onChangePage?: (index: number) => void;
    onSort?: (column: string, direction: 'asc' | 'desc' | null) => void;
    initialSort?: {
        column: string;
        direction: 'asc' | 'desc';
    };
    initialExpanded?: {
        [key: number]: boolean;
    };
    totalItem?: number;
    onPageSizeChange?: (pageSize: number) => void;
    onPageIndex?: number;
    onNextPage?: boolean;
    onPreviousPage?: boolean;
    showAllButton?: boolean;
    paginationClassName?: string;
    paginationStyle?: CSSProperties;
    getRowClass?: (row: any) => string;
    getRowStyle?: (row: any) => CSSProperties;
    onSortChange?: (column: string, direction: 'desc' | 'asc' | null, index: number) => void;
}
export declare const Table: React.FC<TableProps>;
