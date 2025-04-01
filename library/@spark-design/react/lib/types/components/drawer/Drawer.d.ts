import React, { CSSProperties } from 'react';
import { DrawerPosition, DrawerSize } from '@spark-design/tokens';
import { DrawerHeaderProps } from './DrawerHeader';
import '@spark-design/css/components/drawer/index.css';
interface DrawerProps {
    show: boolean;
    onHide?: () => void;
    backdropIsVisible?: boolean;
    backdropClosable?: boolean;
    position?: DrawerPosition;
    size?: DrawerSize;
    hasHeader?: boolean;
    headerProps?: DrawerHeaderProps;
    bodyContent?: string | JSX.Element;
    footerContent?: string | JSX.Element;
    className?: string;
    style?: CSSProperties;
}
export declare const Drawer: React.FC<DrawerProps>;
export {};
