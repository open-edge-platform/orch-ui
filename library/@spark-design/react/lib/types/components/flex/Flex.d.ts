import React, { ReactNode } from 'react';
import { FlexAlignContent, FlexAlignItems, FlexDirection, FlexGap, FlexJustifyContent, FlexWrap } from '@spark-design/tokens';
import '@spark-design/css/components/flex/index.css';
export interface FlexProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    id?: string;
    direction?: `${FlexDirection}` | FlexDirection;
    wrap?: `${FlexWrap}` | FlexWrap;
    justifyContent?: `${FlexJustifyContent}` | FlexJustifyContent;
    alignContent?: `${FlexAlignContent}` | FlexAlignContent;
    alignItems?: `${FlexAlignItems}` | FlexAlignItems;
    gap?: `${FlexGap}` | FlexGap;
    style?: React.CSSProperties;
    className?: string;
}
export declare const Flex: React.FC<FlexProps>;
