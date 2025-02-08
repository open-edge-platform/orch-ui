import React, { CSSProperties } from 'react';
export interface ModalHeaderProps {
    title: string;
    subTitle?: string;
    className?: string;
    titleAriaLabel?: string;
    descriptionAriaLabel?: string;
    style?: CSSProperties;
}
export declare const ModalHeader: React.FC<ModalHeaderProps>;
