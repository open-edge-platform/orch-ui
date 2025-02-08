import React, { CSSProperties } from 'react';
import { AriaProgressBarProps } from 'react-aria';
import { ProgressLoaderVariant, ProgressLoaderWeight } from '@spark-design/tokens';
import '@spark-design/css/components/progress-loader/index.css';
export interface ProgressLoaderProps extends Exclude<AriaProgressBarProps, 'label' | 'showValueLabel' | 'formatOptions' | 'valueLabel' | 'isIndeterminate' | 'value' | 'minValue' | 'maxValue'> {
    variant?: `${ProgressLoaderVariant}` | ProgressLoaderVariant;
    weight?: `${ProgressLoaderWeight}` | ProgressLoaderWeight;
    isEssential?: boolean;
    style?: CSSProperties;
    className?: string;
}
export declare const ProgressLoader: React.FC<ProgressLoaderProps>;
