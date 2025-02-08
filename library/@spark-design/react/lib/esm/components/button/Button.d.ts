import React, { MutableRefObject } from 'react';
import { AriaButtonProps, HoverProps } from 'react-aria';
import { ButtonSize, ButtonVariant, TooltipPlacement } from '@spark-design/tokens';
import '@spark-design/css/components/button/index.css';
export interface ButtonProps extends AriaButtonProps, HoverProps {
    as?: 'button' | 'a' | 'span';
    size?: `${ButtonSize}` | ButtonSize;
    variant?: `${ButtonVariant}` | ButtonVariant;
    iconOnly?: boolean;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    disabledTooltip?: string;
    disabledTooltipPlacement?: `${TooltipPlacement}` | TooltipPlacement;
    htmlDisabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    buttonRef?: MutableRefObject<any>;
    onFocus?: any;
    onBlur?: any;
    tabProps?: any;
    isMonochrome?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
