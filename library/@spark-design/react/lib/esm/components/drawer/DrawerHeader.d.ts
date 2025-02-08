import React, { CSSProperties } from 'react';
import '@spark-design/css/components/badge/index.css';
export interface DrawerHeaderProps {
    closable?: boolean;
    onHide?: () => void;
    title?: string;
    subTitle?: string;
    headerContent?: JSX.Element;
    className?: string;
    style?: CSSProperties;
}
export declare const DrawerHeader: React.FC<DrawerHeaderProps>;
