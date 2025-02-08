import { FC, ReactNode } from 'react';
import { semanticLevels } from '..';
import '@spark-design/css/components/card/index.css';
export interface CardContentProps {
    title: string;
    subTitle?: string;
    description?: string;
    collapsible?: boolean;
    headerSemanticLevel?: semanticLevels;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}
export declare const CardContent: FC<CardContentProps>;
