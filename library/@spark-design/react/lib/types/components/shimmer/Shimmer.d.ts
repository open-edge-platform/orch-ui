import React, { ReactNode } from 'react';
import { ShimmerSkeleton } from '@spark-design/tokens';
import '@spark-design/css/components/shimmer/index.css';
export interface ShimmerProps {
    skeleton?: `${ShimmerSkeleton}` | ShimmerSkeleton;
    items?: number;
    isEssential?: boolean;
    isHidden?: boolean;
    children?: ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
export declare const Shimmer: React.FC<ShimmerProps>;
