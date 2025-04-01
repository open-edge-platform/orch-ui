import React, { CSSProperties, ReactNode } from 'react';
export interface ModalBodyProps {
    className?: string;
    content?: string | ReactNode;
    style?: CSSProperties;
}
export declare const ModalBody: React.FC<ModalBodyProps>;
