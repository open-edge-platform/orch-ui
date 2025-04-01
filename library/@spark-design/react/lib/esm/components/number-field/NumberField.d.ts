import { CSSProperties, FC } from 'react';
import { AriaNumberFieldProps } from 'react-aria';
import { InputSize, InputVariant } from '@spark-design/tokens';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/number-field/index.css';
import '@spark-design/css/components/input/index.css';
export interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'placeholder'> {
    variant?: `${InputVariant}` | InputVariant;
    size?: `${InputSize}` | InputSize;
    className?: string;
    style?: CSSProperties;
    disabledMessage?: string;
    numberUnit?: string;
}
export declare const NumberField: FC<NumberFieldProps>;
