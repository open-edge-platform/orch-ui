/// <reference types="react" />
import type { Icon as IconType } from '@spark-design/iconfont';
import { TagIconPosition, TagIconVariant, TagRounding, TagSize, TagTheme, TagVariant } from '@spark-design/tokens';
import '@spark-design/css/components/tag/index.css';
export interface TagProps extends Omit<React.HTMLAttributes<unknown>, 'unkown'> {
    variant?: `${TagVariant}` | TagVariant;
    theme?: `${TagTheme}` | TagTheme;
    size?: `${TagSize}` | TagSize;
    rounding?: `${TagRounding}` | TagRounding;
    iconPosition?: `${TagIconPosition}` | TagIconPosition;
    iconVariant?: `${TagIconVariant}` | TagIconVariant;
    icon?: IconType;
    label: string;
    toggleShadow?: boolean;
    toggleDisabled?: boolean;
    removable?: boolean;
    onRemove?: () => void;
    as?: Extract<keyof JSX.IntrinsicElements, 'a' | 'button'>;
}
export declare const Tag: React.FC<TagProps>;
