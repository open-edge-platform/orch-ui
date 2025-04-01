import { CSSProperties, ReactElement } from 'react';
import { AriaTabListProps, TabListProps } from '@react-types/tabs';
import { TabsSize, TabsVariant } from '@spark-design/tokens';
import { IconArtworkStyle } from '../';
import '@spark-design/css/components/tabs/index.css';
export type KeyboardActivation = 'automatic' | 'manual';
export interface TabsProps<T> extends AriaTabListProps<T>, TabListProps<T> {
    keyboardActivation?: KeyboardActivation;
    disabledKeys?: string[];
    selectedKeys?: string[];
    isCloseable?: boolean;
    variant?: `${TabsVariant}` | TabsVariant;
    size?: `${TabsSize}` | TabsSize;
    artworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    isDisabled?: boolean;
    panelX?: boolean;
    panelY?: boolean;
    panelHidden?: boolean;
    className?: string;
    style?: CSSProperties;
    classNamePanel?: string;
    panelStyle?: CSSProperties;
}
export declare const Tabs: {
    (props: TabsProps<Record<string, unknown>>): ReactElement;
    displayName: string;
};
