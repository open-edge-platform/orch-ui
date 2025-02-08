import { ReactNode } from 'react';
import { AriaSwitchProps } from 'react-aria';
import { ToggleSwitchLabelAlignment, ToggleSwitchSize } from '@spark-design/tokens';
import '@spark-design/css/components/toggle-switch/index.css';
export interface ToggleSwitchProps extends AriaSwitchProps {
    size?: `${ToggleSwitchSize}` | ToggleSwitchSize;
    label?: string;
    style?: React.CSSProperties;
    className?: string;
    children: ReactNode;
    validationState?: 'valid' | 'invalid';
    labelAlignment?: `${ToggleSwitchLabelAlignment}` | ToggleSwitchLabelAlignment;
    disabledMessage?: string;
    errorMessage?: string;
    description?: string;
}
export declare const ToggleSwitch: React.FC<ToggleSwitchProps>;
