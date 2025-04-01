import { CSSProperties, DOMAttributes, FC, LabelHTMLAttributes, ReactNode } from 'react';
import { FieldTextWrapperSize } from '@spark-design/tokens';
import '@spark-design/css/components/fieldtext-wrapper/index.css';
export type validationStateType = 'valid' | 'invalid';
export interface FieldTextWrapperProps {
    children?: ReactNode;
    size?: `${FieldTextWrapperSize}` | FieldTextWrapperSize;
    isRequired?: boolean;
    isDisabled?: boolean;
    validationState?: validationStateType;
    disabledMessageLastChild?: boolean;
    errorMessageLastChild?: boolean;
    descriptionMessageLastChild?: boolean;
    groupLabel?: ReactNode;
    description?: ReactNode;
    errorMessage?: ReactNode | any;
    disabledMessage?: ReactNode;
    className?: string;
    style?: CSSProperties;
    labelProps?: DOMAttributes<HTMLLabelElement> | LabelHTMLAttributes<HTMLLabelElement>;
    errorMessageProps?: DOMAttributes<HTMLLabelElement> | LabelHTMLAttributes<HTMLLabelElement>;
    descriptionProps?: DOMAttributes<HTMLLabelElement> | LabelHTMLAttributes<HTMLLabelElement>;
}
export declare const FieldTextWrapper: FC<FieldTextWrapperProps>;
