import { FC } from 'react';
import '@spark-design/css/components/card/index.css';
export interface CardCoverProps {
    image?: string;
    altText?: string;
    fit?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare const CardCover: FC<CardCoverProps>;
