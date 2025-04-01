import React, { CSSProperties } from 'react';
import { BadgeShape, BadgeSize, BadgeVariant } from '@spark-design/tokens';
import '@spark-design/css/components/badge/index.css';
interface BadgeProps {
    variant?: `${BadgeVariant}` | BadgeVariant;
    size?: `${BadgeSize}` | BadgeSize;
    shape?: `${BadgeShape}` | BadgeShape;
    style?: CSSProperties;
    className?: string;
    text?: string;
}
export declare const Badge: React.FC<BadgeProps>;
export {};
