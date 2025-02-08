/// <reference types="react" />
import { FieldLabelSize } from '@spark-design/tokens';
import '@spark-design/css/components/fieldlabel/index.css';
export interface FieldLabelProps extends Omit<React.InputHTMLAttributes<unknown>, 'size'> {
    size?: `${FieldLabelSize}` | FieldLabelSize;
    children?: React.ReactNode;
    isDisabled?: boolean;
    isRequired?: boolean;
    htmlFor?: string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const FieldLabel: React.FC<FieldLabelProps>;
