import React from 'react';
import { AriaComboBoxOptions } from 'react-aria';
import { ComboboxSize, ComboboxVariant } from '@spark-design/tokens';
import '@spark-design/css/components/combobox/index.css';
export interface IComboboxProps extends Omit<AriaComboBoxOptions<any>, 'inputRef' | 'popoverRef' | 'listBoxRef'> {
    autoComplete?: string;
    allowsCustomValue?: boolean;
    size?: `${ComboboxSize}` | ComboboxSize;
    variant?: `${ComboboxVariant}` | ComboboxVariant;
    zebra?: boolean;
    type?: string;
    disabledMessage?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: any;
    popoverInlineSize?: string;
    popoverFitContent?: boolean;
}
export declare const Combobox: React.FC<IComboboxProps>;
