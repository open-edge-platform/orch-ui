import React from 'react';
import { LedgeFlexAlignment, LedgeFlexDirection, LedgeFlexItemSize } from '@spark-design/tokens';
import '@spark-design/css/components/ledge-flex/index.css';
export interface LedgeFlexProps extends Omit<React.HTMLAttributes<unknown>, 'unkown'> {
    showBorder?: boolean;
    showItemBorder?: boolean;
    children: any;
    alignment?: LedgeFlexAlignment;
    direction?: LedgeFlexDirection;
    cols: LedgeFlexCols[];
    colsSm?: LedgeFlexCols[];
    colsMd?: LedgeFlexCols[];
    colsLg?: LedgeFlexCols[];
    className?: string;
    style?: React.CSSProperties;
}
export type LedgeFlexRowColTotal = Record<LedgeFlexItemSize, number>;
export type LedgeFlexConfigs = Record<LedgeFlexItemSize, number[]>;
export type LedgeFlexCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare const MAX_COLS = 12;
export declare const LedgeFlex: React.FC<LedgeFlexProps>;
