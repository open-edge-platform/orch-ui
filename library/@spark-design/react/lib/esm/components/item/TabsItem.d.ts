/// <reference types="react" />
import { ItemProps as AriaItemProps } from 'react-stately';
import type { Icon as IconType } from '@spark-design/iconfont';
import type { IconArtworkStyle } from '../icon';
export interface TabsItemProps extends AriaItemProps<React.ReactElement> {
    icon?: `${IconType}` | IconType | 'none' | unknown;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle | unknown;
    isCloseable?: boolean | unknown;
    isDisabled?: boolean | unknown;
    iconOnly?: boolean | unknown;
    badge?: string | unknown;
}
export declare const TabsItem: (props: TabsItemProps) => JSX.Element;
