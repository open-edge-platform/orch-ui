import React, { CSSProperties } from 'react';
import { PaginationSize } from '@spark-design/tokens';
import '@spark-design/css/components/pagination/index.css';
interface PaginationProps {
    size?: `${PaginationSize}` | PaginationSize;
    className?: string;
    style?: CSSProperties;
    hasControl?: boolean;
    totalItems: number;
    pageIndex: number;
    pageSize?: number;
    canNextPage: boolean;
    onNextPage: () => void;
    canPreviousPage: boolean;
    onPreviousPage: () => void;
    onGotoPage: (index: number) => void;
    onSetPageSize: (n: number) => void;
    siblingCount?: number;
    onChangePage?: (index: number) => void;
    showAllButton?: boolean;
}
export declare const Pagination: React.FC<PaginationProps>;
export {};
