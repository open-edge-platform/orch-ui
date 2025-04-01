import { FC, ReactNode } from 'react';
import { TextSize } from '@spark-design/tokens';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/text/index.css';
export interface TextProps extends Omit<React.InputHTMLAttributes<unknown>, 'size'> {
    children: ReactNode;
    size?: `${TextSize}` | TextSize;
    isDisabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Text: FC<TextProps>;
