import { FC } from 'react';
import '@spark-design/css/components/card/index.css';
export interface CardAvatarProps {
    image: string;
    altText?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare const CardAvatar: FC<CardAvatarProps>;
