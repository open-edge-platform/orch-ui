import { CSSProperties, FC } from 'react';
import { AriaTextFieldProps } from 'react-aria';
import { PressEvent } from '@react-types/shared';
import type { Icon as IconType } from '@spark-design/iconfont';
import { InputSize, InputVariant } from '@spark-design/tokens';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/text-field/index.css';
import '@spark-design/css/components/input/index.css';
export interface TextFieldProps extends AriaTextFieldProps {
    variant?: `${InputVariant}` | InputVariant;
    size?: `${InputSize}` | InputSize;
    startIcon?: `${IconType}` | IconType;
    statusIcon?: 'cross' | 'check';
    interiorButton?: boolean;
    interiorButtonIsDisabled?: boolean;
    interiorButtonOnPress?: (e: PressEvent) => void;
    interiorButtonIcon?: `${IconType}` | IconType;
    interiorButtonAltText?: string;
    interiorButtonAriaLabel?: string;
    interiorButtonArtworkStyle?: 'light' | 'regular' | 'solid';
    disabledMessage?: string;
    className?: string;
    style?: CSSProperties;
}
export declare const TextField: FC<TextFieldProps>;
