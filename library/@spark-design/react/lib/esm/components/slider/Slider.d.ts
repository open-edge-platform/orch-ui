import React, { ReactNode } from 'react';
import { AriaSliderProps, AriaSliderThumbOptions } from 'react-aria';
import { LabelAriaProps } from 'react-aria';
import { SliderState } from 'react-stately';
import { FieldLabelSize } from '@spark-design/tokens';
import '@spark-design/css/components/slider/index.css';
export interface SliderProps extends Exclude<AriaSliderProps, 'orientation'>, LabelAriaProps {
    isRequired?: boolean;
    multiThumbs?: boolean;
    label?: string;
    labelSize?: `${FieldLabelSize}` | FieldLabelSize;
    showValues?: boolean;
    showMinMaxValues?: boolean;
    startSlotIcon?: ReactNode;
    endSlotIcon?: ReactNode;
    children?: ReactNode;
    formatOptions?: Intl.NumberFormatOptions;
    tooltip?: boolean;
    showInputs?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export declare const Slider: React.FC<SliderProps>;
export interface ThumbProps extends Omit<AriaSliderThumbOptions, 'inputRef'> {
    tooltip?: boolean;
    multiThumbs?: boolean;
    state: SliderState;
    index: number;
}
