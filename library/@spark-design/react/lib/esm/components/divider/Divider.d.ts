import React, { CSSProperties } from 'react';
import { SeparatorProps } from 'react-aria';
import { DividerThickness } from '@spark-design/tokens';
import { ElementType, RoleType } from './';
import '@spark-design/css/components/divider/index.css';
interface DividerProps extends SeparatorProps {
    thickness?: `${DividerThickness}` | DividerThickness;
    role?: RoleType;
    style?: CSSProperties;
    as?: ElementType;
    className?: string;
}
export declare const Divider: React.FC<DividerProps>;
export {};
