export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ExposeColorVariant = 'default' | 'white' | 'black' | 'grey';
export type ButtonPlacementVariants = 'left' | 'center' | 'right' | 'spread';
export type MessageBannerSize = 'l' | 'm' | 's';
export declare enum MessageBannerAlertState {
    Default = "default",
    Info = "info",
    Warning = "warning",
    Error = "error",
    Success = "success"
}
export declare enum MessageBannerDialogState {
    Default = "default",
    Black = "black",
    White = "white",
    Grey = "grey"
}
export declare enum MessageBannerButtonPosition {
    Left = "left",
    LeftReverse = "left-reverse",
    Center = "center",
    CenterReverse = "center-reverse",
    Right = "right",
    RightReverse = "right-reverse",
    Spread = "spread",
    SpreadReverse = "spread-reverse"
}
export interface MessageBannerProps {
    variant?: AlertVariant;
    exposeColor?: ExposeColorVariant;
    messageTitle?: string;
    messageBody?: string;
    showIcon?: boolean;
    showActionButtons?: boolean;
    showClose?: boolean;
    outlined?: boolean;
    primaryText?: string;
    secondaryText?: string;
    disablePrimary?: boolean;
    disableSecondary?: boolean;
    buttonPlacement?: ButtonPlacementVariants;
    size?: MessageBannerSize;
}
export declare const prefix = "spark-message-banner";
export declare const properties: import("@spark-design/core").TokenData<{
    horizontalBorderGap: string;
    verticalBorderGap: string;
    horizontalContentGap: string;
    verticalContentGap: string;
    messageContent: {
        icon: {
            sidesGap: string;
        };
        messageTitle: {
            marginTop: string;
            marginBottom: string;
            fontSize: string;
            fontWeight: number;
            lineHeight: string;
            fontFamily: string[];
            letterSpacing: string;
        };
        messageDescription: {
            fontSize: string;
            fontWeight: number;
            lineHeight: string;
            fontFamily: string[];
            letterSpacing: string;
        };
    };
}>;
