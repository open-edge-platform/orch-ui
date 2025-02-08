import React, { CSSProperties, ReactNode } from 'react';
import { GridAlignContent, GridAlignItems, GridAutoFlow, GridGap, GridJustifyContent, GridJustifyItems } from '@spark-design/tokens';
import '@spark-design/css/components/grid/index.css';
export interface GridProps {
    id?: string;
    children: ReactNode;
    alignContent?: `${GridAlignContent}` | GridAlignContent;
    alignItems?: `${GridAlignItems}` | GridAlignItems;
    justifyContent?: `${GridJustifyContent}` | GridJustifyContent;
    gap?: `${GridGap}` | GridGap;
    columnGap?: `${GridGap}` | GridGap;
    rowGap?: `${GridGap}` | GridGap;
    justifyItems?: `${GridJustifyItems}` | GridJustifyItems;
    autoFlow?: `${GridAutoFlow}` | GridAutoFlow;
    areas?: string[];
    columns?: string[];
    rows?: string[];
    gridAutoRows?: string;
    gridAutoColumns?: string;
    style?: CSSProperties;
    className?: string;
}
export declare const Grid: React.FC<GridProps>;
