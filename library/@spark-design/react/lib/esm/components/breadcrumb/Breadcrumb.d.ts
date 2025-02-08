import React, { AriaAttributes, CSSProperties, FC } from 'react';
import { AriaBreadcrumbItemProps, AriaBreadcrumbsProps } from 'react-aria';
import { TextSize } from '@spark-design/tokens';
import { HyperlinkProps } from '..';
import '@spark-design/css/components/breadcrumb/index.css';
export declare enum BreadcrumbType {
    Quiet = "quiet"
}
type BreadcrumbContext = Pick<HyperlinkProps, 'variant' | 'size' | 'visualType' | 'children' | 'as' | 'href'> & AriaAttributes;
type BreadcrumbStyle = {
    className?: string;
    style?: CSSProperties;
    visualType?: `${BreadcrumbType}` | BreadcrumbType;
    size?: `${TextSize}` | TextSize;
};
export type BreadcrumbProps = BreadcrumbContext & AriaBreadcrumbsProps & BreadcrumbStyle;
declare const BreadcrumbContext: React.Context<BreadcrumbContext | null>;
export declare const Breadcrumb: FC<BreadcrumbProps>;
export declare const BreadcrumbItem: FC<BreadcrumbProps & AriaBreadcrumbItemProps>;
export {};
