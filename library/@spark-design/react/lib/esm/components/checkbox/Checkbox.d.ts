import React, { CSSProperties } from 'react';
import { AriaCheckboxProps } from 'react-aria';
import { CheckboxSize } from '@spark-design/tokens';
import '@spark-design/css/components/checkbox/index.css';
import '@spark-design/iconfont/dist.web/icons.css';
export interface CheckboxProps extends AriaCheckboxProps {
    size?: `${CheckboxSize}` | CheckboxSize;
    className?: string;
    style?: CSSProperties;
    errorMessage?: string;
}
export declare const Checkbox: React.FC<CheckboxProps>;
