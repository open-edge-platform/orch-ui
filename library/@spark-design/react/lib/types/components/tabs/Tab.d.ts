import React, { CSSProperties, MutableRefObject } from 'react';
import { AriaButtonProps } from 'react-aria';
import { AriaTabProps } from '@react-types/tabs';
import type { Icon as IconType } from '@spark-design/iconfont';
import { TabsSize } from '@spark-design/tokens';
import { IconArtworkStyle } from '../';
import '@spark-design/css/components/tabs/index.css';
export interface TabProps extends AriaTabProps, AriaButtonProps {
    isDisabled?: boolean;
    state?: any;
    item?: any;
    icon?: `${IconType}` | IconType;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    isCloseable?: boolean;
    iconOnly?: boolean;
    variant?: string;
    size?: `${TabsSize}` | TabsSize;
    badge?: string;
    buttonRef?: MutableRefObject<any>;
    className?: string;
    style?: CSSProperties;
    onCloseCb?: (elem: any) => void;
}
export declare const Tab: React.FC<TabProps>;
