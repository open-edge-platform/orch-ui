/// <reference types="react" />
import { ItemProps as AriaItemProps } from 'react-stately';
import type { Icon as IconType } from '@spark-design/iconfont';
import type { IconArtworkStyle } from '../icon';
export interface ItemProps extends AriaItemProps<React.ReactElement> {
    icon?: `${IconType}` | IconType | 'none' | unknown;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle | unknown;
    altText?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Item: (props: ItemProps) => JSX.Element;
export interface TabsItemProps extends AriaItemProps<React.ReactElement> {
    icon?: `${IconType}` | IconType | 'none' | unknown;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle | unknown;
    isCloseable?: boolean | unknown;
    isDisabled?: boolean | unknown;
    iconOnly?: boolean | unknown;
    badge?: string | unknown;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TabsItem: (props: TabsItemProps) => JSX.Element;
