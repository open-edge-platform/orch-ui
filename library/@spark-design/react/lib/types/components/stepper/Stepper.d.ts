import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';
import React from 'react';
import type { Icon as IconType } from '@spark-design/iconfont';
import { StepperOrientation, StepperSize } from '@spark-design/tokens';
import { IconArtworkStyle } from '../';
import { StepperReferrerPolicy, StepperRelAttribute, StepperTargetType } from './types';
import '@spark-design/css/components/stepper/index.css';
export interface StepperStep {
    title?: string;
    text?: string;
    icon?: `${IconType}` | IconType;
    iconAltText?: string;
    iconArtworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    isVisited?: boolean;
    isDisabled?: boolean;
    isInvalid?: boolean;
    style?: CSSProperties;
    className?: string;
    href?: string;
    target?: StepperTargetType;
    rel?: StepperRelAttribute;
    referrerPolicy?: StepperReferrerPolicy;
    children?: ReactNode;
}
export interface StepperProps extends Omit<React.HTMLAttributes<unknown>, 'unknown'> {
    onStepPress?: () => void;
    isInteractive?: boolean;
    orientation?: `${StepperOrientation}` | StepperOrientation;
    steps?: StepperStep[];
    activeStep?: number;
    size?: `${StepperSize}` | StepperSize;
    isMultiPage?: boolean;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
}
export declare const Stepper: React.FC<StepperProps>;
export interface StepItemProps extends StepperStep {
    onPress?: () => void;
    onStepPress?: () => void;
    setCurrentStep?: Dispatch<SetStateAction<number>>;
    index: number;
    currentStep?: number;
    size?: `${StepperSize}` | StepperSize;
    isInteractive?: boolean;
    isMultiPage?: boolean;
    isInvalid?: boolean;
    isActive?: boolean;
    isVisited?: boolean;
    title?: string;
    iconAltText?: string;
    iconArtworkStyle?: `${IconArtworkStyle}` | IconArtworkStyle;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
    stepCount: number;
}
export declare const StepItem: React.FC<StepItemProps>;
