import { FC, HTMLAttributes } from 'react';
import React from 'react';
import { CardOrientation, CardVariant } from '@spark-design/tokens';
import '@spark-design/css/components/card/index.css';
type TargetType = '_self' | '_blank' | '_parent' | 'top';
type ReffererPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
export interface CardProps extends Omit<HTMLAttributes<unknown>, 'orientation' | 'variant'> {
    orientation?: `${CardOrientation}` | CardOrientation;
    variant?: `${CardVariant}` | CardVariant;
    hasCheckbox?: boolean;
    checkboxOverlay?: boolean;
    fullWidth?: boolean;
    children?: any;
    href?: string;
    target?: TargetType;
    referrerpolicy?: ReffererPolicy;
    hreflang?: string;
    rel?: string;
    style?: React.CSSProperties;
    className?: string;
    type?: string;
    download?: any;
    ping?: any;
}
export interface CardContextProps {
    orientation?: `${CardOrientation}` | CardOrientation;
}
export declare const CardContext: React.Context<CardContextProps>;
export declare function useCardProvider(): CardContextProps;
export declare const Card: FC<CardProps>;
export {};
