import { FC, ReactNode } from 'react';
import '@spark-design/css/components/card/index.css';
export interface CardHorizontalContentWrapperProps {
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}
export declare const CardHorizontalContentWrapper: FC<CardHorizontalContentWrapperProps>;
