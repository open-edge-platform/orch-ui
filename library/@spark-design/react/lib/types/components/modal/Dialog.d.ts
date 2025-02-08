import React, { ReactNode } from 'react';
import { AriaLabelingProps } from '@react-types/shared';
export interface DialogProps extends AriaDialogProps {
    children: ReactNode;
}
export interface AriaDialogProps extends AriaLabelingProps {
    role?: 'dialog';
}
export declare const Dialog: React.FC<DialogProps>;
