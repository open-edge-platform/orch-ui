import { CSSProperties, FC } from 'react';
import { AriaProgressBarProps } from 'react-aria';
import { ProgressIndicatorVariant, ProgressIndicatorWeight } from '@spark-design/tokens';
import '@spark-design/css/components/progress-indicator/index.css';
export interface ProgressIndicatorProps extends Exclude<AriaProgressBarProps, 'isIndeterminate' | 'showValueLabel'> {
    variant?: `${ProgressIndicatorVariant}` | ProgressIndicatorVariant;
    labelUnit?: string;
    error?: boolean;
    errorMessage?: string;
    success?: boolean;
    successMessage?: string;
    weight?: `${ProgressIndicatorWeight}` | ProgressIndicatorWeight;
    isEssential?: boolean;
    className?: string;
    style?: CSSProperties;
}
export declare const ProgressIndicator: FC<ProgressIndicatorProps>;
