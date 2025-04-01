/// <reference types="react" />
import { PressEvent } from '@react-types/shared';
import { MessageBannerProps as MessageBannerProperties } from '@spark-design/tokens';
import '@spark-design/css/components/message-banner/index.css';
type MessageBannerProps = MessageBannerProperties & {
    size?: 'l' | 'm' | 's';
    disablePrimary?: boolean;
    secondaryText?: string;
    disableSecondary?: boolean;
    onClickPrimary?: (e: PressEvent) => void;
    onClickSecondary?: (e: PressEvent) => void;
    icon?: JSX.Element;
};
export declare const MessageBanner: React.FC<MessageBannerProps>;
export {};
