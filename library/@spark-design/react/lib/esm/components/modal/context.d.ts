import React, { HTMLAttributes } from 'react';
import { ModalSize } from '@spark-design/tokens';
export interface DialogContextValue extends HTMLAttributes<HTMLElement> {
    type: 'modal';
    isDivided?: boolean;
    isDismissible?: boolean;
    size?: `${ModalSize}` | ModalSize;
    onClose: () => void;
}
export declare const DialogContext: React.Context<DialogContextValue>;
