import { ReactNode } from 'react';
import type { TabsSize, TabsVariant } from '@spark-design/tokens';
import type { IconArtworkStyle, IconVariant } from '../icon';
export interface TabsProps {
    variant?: `${TabsVariant}` | TabsVariant;
    size?: `${TabsSize}` | TabsSize;
    selected?: number;
    disabled?: boolean;
    children?: ReactNode;
}
export interface TabsListProps extends Pick<TabsProps, 'variant' | 'size'> {
    className?: string;
    children: ReactNode;
}
export type TabAttributes<T = unknown> = React.AnchorHTMLAttributes<T> & React.ButtonHTMLAttributes<T> & React.HTMLAttributes<T>;
export interface TabsItemProps extends TabAttributes {
    active?: boolean;
    disabled?: boolean;
    icon?: `${IconVariant}` | IconVariant;
    artworkStyle?: IconArtworkStyle;
    close?: boolean;
    idx?: number;
    onClose?: () => void;
    as?: Extract<keyof JSX.IntrinsicElements, 'a' | 'button'>;
}
