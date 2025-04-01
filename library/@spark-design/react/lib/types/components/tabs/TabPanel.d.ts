import { CSSProperties } from 'react';
import { AriaTabPanelProps } from '@react-types/tabs';
export interface TabPanelProps extends AriaTabPanelProps {
    state: any;
    panelX?: boolean;
    panelY?: boolean;
    panelHidden?: boolean;
    style?: CSSProperties;
    className?: string;
}
export declare const TabPanel: import("react").ForwardRefExoticComponent<TabPanelProps & import("react").RefAttributes<HTMLDivElement>>;
