import React, { ReactNode } from 'react';
import { ElementTypes } from './types';
import '@spark-design/css/components/view/index.css';
export interface ViewProps extends React.HTMLProps<HTMLDivElement> {
    id?: string;
    as?: ElementTypes;
    children?: ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
export declare const View: React.FC<ViewProps>;
