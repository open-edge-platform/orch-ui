/// <reference types="react" />
import type { Icon as IconType } from '@spark-design/iconfont';
import '@spark-design/iconfont/dist.web/icons.css';
export type IconVariant = IconType;
export type IconArtworkStyle = 'light' | 'regular' | 'solid';
export interface IconProps extends React.HTMLAttributes<unknown> {
    icon?: `${IconType}` | IconType;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    isAnimated?: boolean;
    className?: string;
    altText?: string;
    style?: React.CSSProperties;
}
export declare const Icon: React.FC<IconProps>;
