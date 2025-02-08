import { CSSProperties, ReactNode } from 'react';
import { OverlayTriggerState } from '@react-stately/overlays';
interface FocusRingProps {
    children: ReactNode;
    state: OverlayTriggerState;
    disabledFocusLock?: boolean;
    style?: CSSProperties;
    className?: string;
}
export declare const FocusRing: React.FC<FocusRingProps>;
export {};
