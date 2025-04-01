import React, { CSSProperties, ReactNode } from 'react';
import { FormSize, FormVariant } from '@spark-design/tokens';
import { ButtonGroupAlignment, EncType, FormRelAttribute, Method, Target, ValidationState } from './';
import '@spark-design/css/components/form/index.css';
interface FormActionsProps {
    children?: ReactNode;
}
export declare const FormActions: React.FC<FormActionsProps>;
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    description?: string;
    size?: `${FormSize}` | FormSize;
    variant?: `${FormVariant}` | FormVariant;
    style?: CSSProperties;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    validationState?: ValidationState;
    action?: string;
    encType?: EncType;
    method?: Method;
    target?: Target;
    rel?: FormRelAttribute;
    buttonGroupAlignment?: ButtonGroupAlignment;
    className?: string;
    children?: ReactNode;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
}
export declare const Form: React.FC<FormProps>;
export {};
