/// <reference types="react" />
import { ToastPosition, ToastState, ToastVisibility } from '@spark-design/tokens';
import '@spark-design/css/components/toast/index.css';
export interface ToastProps extends Omit<React.HTMLAttributes<unknown>, 'unkown'> {
    position?: `${ToastPosition}` | ToastPosition;
    state?: `${ToastState}` | ToastState;
    visibility?: `${ToastVisibility}` | ToastVisibility;
    message?: string;
    duration?: number;
    canClose?: boolean;
    onHide?: () => void;
}
export declare const Toast: React.FC<ToastProps>;
