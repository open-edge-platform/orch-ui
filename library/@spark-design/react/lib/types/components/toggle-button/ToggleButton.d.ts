import React, { CSSProperties, ReactNode } from 'react';
import { AriaToggleButtonProps, HoverProps } from 'react-aria';
import { ButtonSize, ToggleButtonVariant, TooltipPlacement } from '@spark-design/tokens';
export interface ToggleProps extends AriaToggleButtonProps, HoverProps {
    children?: ReactNode;
    size?: `${ButtonSize}` | ButtonSize;
    variant?: `${ToggleButtonVariant}` | ToggleButtonVariant;
    iconOnly?: boolean;
    startSlot?: React.ReactElement;
    endSlot?: React.ReactElement;
    disabledTooltip?: string | undefined;
    disabledTooltipPlacement?: `${TooltipPlacement}` | TooltipPlacement;
    htmlDisabled?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const ToggleButton: React.FC<ToggleProps>;
