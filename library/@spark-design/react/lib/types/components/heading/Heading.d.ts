import React from 'react';
import '@spark-design/css/components/heading/index.css';
import '@spark-design/css/components/typography/index.css';
export type semanticLevels = 1 | 2 | 3 | 4 | 5 | 6;
export interface HeadingProps extends React.HTMLAttributes<unknown> {
    semanticLevel: semanticLevels;
    size?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Heading: React.FC<HeadingProps>;
