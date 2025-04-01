import { FC, ReactNode } from 'react';
import '@spark-design/css/components/card/index.css';
export interface CardFooterProps {
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}
export declare const CardFooter: FC<CardFooterProps>;
