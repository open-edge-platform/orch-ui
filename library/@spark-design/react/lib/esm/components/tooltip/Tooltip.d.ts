import React, { FC, ReactNode } from 'react';
import { AriaTooltipProps, TooltipTriggerProps } from 'react-aria';
import { TooltipPlacement, TooltipSize } from '@spark-design/tokens';
import '@spark-design/css/components/tooltip/index.css';
export declare const PlacementMap: {
    top: string;
    bottom: string;
    right: string;
    left: string;
    "top-end": string;
    "top-start": string;
    "bottom-end": string;
    "bottom-start": string;
    "right-end": string;
    "right-start": string;
    "left-end": string;
    "left-start": string;
};
export interface TooltipPopoverProps extends AriaTooltipProps {
    content?: string;
    placement?: `${TooltipPlacement}` | TooltipPlacement;
    icon?: React.ReactNode;
    children?: ReactNode;
    style?: React.CSSProperties;
    className?: string;
    state?: any;
    tooltipRef?: any;
    size?: `${TooltipSize}` | TooltipSize;
}
export interface TooltipProps extends Exclude<TooltipTriggerProps, 'delay'> {
    size?: `${TooltipSize}` | TooltipSize;
    style?: React.CSSProperties;
    className?: string;
    content?: string;
    placement?: `${TooltipPlacement}` | TooltipPlacement;
    icon?: React.ReactNode;
    showDelay?: number;
    children: ReactNode;
}
export declare const TooltipPopover: React.FC<TooltipPopoverProps>;
export declare const Tooltip: FC<TooltipProps>;
