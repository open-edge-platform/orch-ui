import React, { CSSProperties, ReactNode } from 'react';
export interface ModalFooterProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}
export declare const ModalFooter: React.FC<ModalFooterProps>;
