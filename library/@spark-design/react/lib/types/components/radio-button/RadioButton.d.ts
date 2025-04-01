import { CSSProperties, FC } from 'react';
import { AriaRadioProps } from '@react-aria/radio';
import { RadioButtonSize } from '@spark-design/tokens';
import '@spark-design/css/components/radio-button/index.css';
export interface RadioButtonProps extends AriaRadioProps {
    size?: `${RadioButtonSize}` | RadioButtonSize;
    className?: string;
    style?: CSSProperties;
}
export declare const RadioButton: FC<RadioButtonProps>;
