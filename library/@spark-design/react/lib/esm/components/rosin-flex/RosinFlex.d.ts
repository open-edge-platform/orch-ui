import React from 'react';
import { RosinFlexAlignment, RosinFlexDirection, RosinFlexItemSize } from '@spark-design/tokens';
import '@spark-design/css/components/rosin-flex/index.css';
export interface RosinFlexProps extends Omit<React.HTMLAttributes<unknown>, 'unkown'> {
    showBorder?: boolean;
    showItemBorder?: boolean;
    children: any;
    alignment?: RosinFlexAlignment;
    direction?: RosinFlexDirection;
    cols: RosinFlexCols[];
    colsSm?: RosinFlexCols[];
    colsMd?: RosinFlexCols[];
    colsLg?: RosinFlexCols[];
    className?: string;
    style?: React.CSSProperties;
}
export type RosinFlexRowColTotal = Record<RosinFlexItemSize, number>;
export type RosinFlexConfigs = Record<RosinFlexItemSize, number[]>;
export type RosinFlexCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export declare const MAX_COLS = 12;
export declare const RosinFlex: React.FC<RosinFlexProps>;
