import { CSSProperties, ReactNode } from 'react';
import '@spark-design/css/components/shadow/index.css';
export interface ShadowProps {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}
export declare const Shadow: React.FC<ShadowProps>;
