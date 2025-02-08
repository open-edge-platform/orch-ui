import { AriaAttributes, CSSProperties, HTMLProps, ReactNode } from 'react';
import '@spark-design/css/components/scrollbar/index.css';
export interface ScrollbarProps {
    y?: boolean;
    x?: boolean;
    hidden?: boolean;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}
export declare const Scrollbar: React.FC<ScrollbarProps & AriaAttributes & HTMLProps<HTMLDivElement>>;
