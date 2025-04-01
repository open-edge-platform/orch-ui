import { CSSProperties, ReactNode } from 'react';
import { FC } from 'react';
import { LabelAriaProps } from 'react-aria';
import { AriaRadioGroupProps } from '@react-aria/radio';
import { RadioGroupState } from '@react-stately/radio';
import { RadioButtonSize, RadioGroupOrientation } from '@spark-design/tokens';
import '@spark-design/css/components/radio-group/index.css';
export interface RadioGroupProps extends AriaRadioGroupProps, LabelAriaProps {
    size?: `${RadioButtonSize}` | RadioButtonSize;
    children?: ReactNode;
    orientation?: `${RadioGroupOrientation}` | RadioGroupOrientation;
    label?: ReactNode;
    errorMessage?: ReactNode;
    description?: ReactNode;
    disabledMessage?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export interface RadioGroupContextProps {
    state: RadioGroupState;
    size: `${RadioButtonSize}` | RadioButtonSize;
}
export declare const RadioContext: import("react").Context<RadioGroupContextProps>;
export declare function useRadioProvider(): RadioGroupContextProps;
export declare const RadioGroup: FC<RadioGroupProps>;
