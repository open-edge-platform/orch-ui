import { CSSProperties, ReactNode } from 'react';
import { AriaModalOverlayProps } from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';
import { OverlayProps } from '@react-types/overlays';
import { ModalSize } from '@spark-design/tokens';
import '@spark-design/css/components/modal/index.css';
interface ModalProps extends AriaModalOverlayProps, Omit<OverlayProps, 'nodeRef'> {
    children: ReactNode;
    size?: `${ModalSize}` | ModalSize;
    state: OverlayTriggerState;
    isDismissible?: boolean;
    isDivided?: boolean;
    disabledFocusLock?: boolean;
    type?: 'modal';
    style?: CSSProperties;
    className?: string;
}
export declare const Modal: React.FC<ModalProps>;
export {};
