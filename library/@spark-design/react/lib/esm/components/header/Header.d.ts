import React, { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { HeaderSize, HeaderVariant } from '@spark-design/tokens';
import '@spark-design/css/components/header/index.css';
export interface HeaderItemProps {
    size?: `${HeaderSize}` | HeaderSize;
    selected?: boolean;
    children: ReactElement;
    className?: string;
    style?: CSSProperties;
}
export declare const HeaderItem: React.FC<HeaderItemProps>;
export interface HeaderProps {
    size?: `${HeaderSize}` | HeaderSize;
    variant?: `${HeaderVariant}` | HeaderVariant;
    logo?: ReactElement;
    title?: string;
    children?: ReactElement | ReactElement[];
    className?: string;
    style?: CSSProperties;
}
export declare const Header: React.FC<HeaderProps & HTMLAttributes<HTMLDivElement>>;
