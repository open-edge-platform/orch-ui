import React, { ReactNode } from 'react';
import { ButtonGroupAlignment, ButtonGroupOrientation, ButtonGroupSpacing, TooltipPlacement } from '@spark-design/tokens';
import '@spark-design/css/components/button-group/index.css';
export interface ButtonGroupProps {
    orientation?: `${ButtonGroupOrientation}` | ButtonGroupOrientation;
    children: ReactNode;
    align?: `${ButtonGroupAlignment}` | ButtonGroupAlignment;
    spacing?: `${ButtonGroupSpacing}` | ButtonGroupSpacing;
    isDisabled?: boolean;
    htmlDisabled?: boolean;
    disabledTooltip?: string;
    disabledTooltipPlacement?: `${TooltipPlacement}` | TooltipPlacement;
    className?: string;
    style?: React.CSSProperties;
}
export declare const ButtonGroup: React.FC<ButtonGroupProps>;
