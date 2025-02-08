import React, { CSSProperties, MutableRefObject } from 'react';
import { AriaButtonProps, AriaHiddenSelectProps, AriaSelectOptions, LabelAriaProps } from 'react-aria';
import type { Icon as IconType } from '@spark-design/iconfont';
import { DropdownSize, DropdownVariant } from '@spark-design/tokens';
import '@spark-design/css/components/dropdown/index.css';
export interface DropdownProps extends AriaSelectOptions<any>, AriaHiddenSelectProps, LabelAriaProps {
    name: string;
    label: string;
    placeholder: string;
    size?: `${DropdownSize}` | DropdownSize;
    variant?: `${DropdownVariant}` | DropdownVariant;
    zebra?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    description?: string;
    errorMessage?: string;
    disabledMessage?: string;
    className?: string;
    style?: React.CSSProperties;
    startIcon?: `${IconType}` | IconType | 'none';
    children?: any;
    popoverInlineSize?: string;
    popoverFitContent?: boolean;
}
export interface ButtonWithAriaHookProps extends AriaButtonProps {
    className?: string;
    buttonRef?: MutableRefObject<any>;
    style?: CSSProperties;
}
export declare const Dropdown: React.FC<DropdownProps>;
