import * as React from 'react';
import './style/style.css';
export declare enum IconSize {
    Small = "s",
    Medium = "m",
    Large = "l",
    XLlarge = "xl",
    '2XLarge' = "2xl"
}
export declare const iconSizes: {
    16: string;
    24: string;
    32: string;
    48: string;
    64: string;
};
export declare const mapSize: {
    s: string;
    m: string;
    l: string;
    xl: string;
    "2xl": string;
};
export type IconProps = {
    icon?: string | any;
    size?: `${IconSize}` | IconSize;
    autoSize?: boolean;
    svgProps?: React.SVGProps<SVGSVGElement>;
    className?: string;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    isAnimated?: boolean;
    altText?: string;
    style?: React.CSSProperties;
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>;
export type IconArtworkStyle = 'light' | 'regular' | 'solid';
export declare const IconWrapper: React.FC<IconProps & React.SVGProps<SVGSVGElement>>;
