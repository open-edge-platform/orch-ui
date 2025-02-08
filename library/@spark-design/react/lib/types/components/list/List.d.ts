import React, { CSSProperties, ReactNode, RefObject } from 'react';
import { AriaListBoxOptions, AriaOptionProps } from 'react-aria';
import { ListState } from 'react-stately';
import { ListSize } from '@spark-design/tokens';
import '@spark-design/css/components/list/index.css';
export interface ListProps extends Omit<AriaListBoxOptions<any>, 'label'> {
    size?: `${ListSize}` | ListSize;
    divide?: boolean;
    shadow?: boolean;
    zebra?: boolean;
    type?: 'simple';
    style?: CSSProperties;
    className?: string;
    selectionBehavior?: 'toggle' | 'replace';
    listBoxRef?: RefObject<HTMLElement>;
    listBoxState?: ListState<any>;
    children?: ((item: any) => JSX.Element) | ReactNode;
}
export interface ListItemProps extends AriaOptionProps {
    isActive?: boolean;
    isDisabled?: boolean;
    noFocus?: boolean;
    className?: string;
    style?: CSSProperties;
    item?: any;
    state?: any;
    ariaLabel?: string;
}
export declare const List: React.FC<ListProps> & {
    Item?: React.FC<ListItemProps>;
};
export declare const ListItem: React.FC<ListItemProps>;
