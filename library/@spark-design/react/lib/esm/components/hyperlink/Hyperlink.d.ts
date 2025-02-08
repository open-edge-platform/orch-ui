import { CSSProperties, FC, ReactNode } from 'react';
import { AriaLinkOptions } from '@react-aria/link';
import { HyperlinkType, HyperlinkVariant, TextSize } from '@spark-design/tokens';
import { HyperlinkRefererPolicy, HyperlinkRelAttribute, HyperlinkTarget } from './types';
import '@spark-design/css/components/hyperlink/index.css';
export interface HyperlinkProps extends AriaLinkOptions {
    variant?: `${HyperlinkVariant}` | HyperlinkVariant;
    visualType?: `${HyperlinkType}` | HyperlinkType;
    size?: `${TextSize}` | TextSize;
    href?: string;
    children: ReactNode;
    as?: 'a' | 'span';
    className?: string;
    style?: CSSProperties;
    isCurrent?: boolean;
    isDisabled?: boolean;
    referrerPolicy?: HyperlinkRefererPolicy;
    target?: HyperlinkTarget;
    rel?: HyperlinkRelAttribute;
}
export declare const Hyperlink: FC<HyperlinkProps>;
