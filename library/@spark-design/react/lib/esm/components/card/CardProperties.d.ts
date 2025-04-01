import { FC, ReactNode } from 'react';
import type { Icon as IconType } from '@spark-design/iconfont';
import '@spark-design/css/components/card/index.css';
export interface CardPropertiesProps {
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
}
export interface CardPropertiesItemProps {
    icon?: IconType;
    text?: string | number;
    altText?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare const CardProperties: FC<CardPropertiesProps>;
export declare const CardPropertiesItem: FC<CardPropertiesItemProps>;
