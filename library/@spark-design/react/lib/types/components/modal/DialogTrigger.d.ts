import React, { ReactElement, ReactNode } from 'react';
import { OverlayTriggerState } from '@react-stately/overlays';
import { OverlayTriggerProps } from '@react-types/overlays';
import { ModalSize } from '@spark-design/tokens';
import { DialogProps } from './Dialog';
export type DialogClose = (close: () => void) => ReactElement;
export interface DialogTriggerProps extends OverlayTriggerProps, Omit<React.HTMLProps<HTMLDivElement>, 'size' | 'children'> {
    children: [ReactElement, DialogClose | ReactElement];
    type?: 'modal';
    size?: `${ModalSize}` | ModalSize;
    isDismissible?: boolean;
    isDivided?: boolean;
    isKeyboardDismissDisabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const DialogTrigger: React.FC<DialogTriggerProps>;
interface DialogTriggerBase {
    id: string;
    type: 'modal';
    state: OverlayTriggerState;
    isDismissible?: boolean;
    isDivided?: boolean;
    disabledFocusLock?: boolean;
    dialogProps?: DialogProps;
    triggerProps?: ReactNode;
    overlay: ReactElement;
    trigger: ReactElement;
}
export declare const DialogTriggerBase: React.FC<DialogTriggerBase>;
export {};
