import { token } from '../../setup';
import { fontFamily } from '../../typography';
export var MessageBannerAlertState;
(function (MessageBannerAlertState) {
    MessageBannerAlertState["Default"] = "default";
    MessageBannerAlertState["Info"] = "info";
    MessageBannerAlertState["Warning"] = "warning";
    MessageBannerAlertState["Error"] = "error";
    MessageBannerAlertState["Success"] = "success";
})(MessageBannerAlertState || (MessageBannerAlertState = {}));
export var MessageBannerDialogState;
(function (MessageBannerDialogState) {
    MessageBannerDialogState["Default"] = "default";
    MessageBannerDialogState["Black"] = "black";
    MessageBannerDialogState["White"] = "white";
    MessageBannerDialogState["Grey"] = "grey";
})(MessageBannerDialogState || (MessageBannerDialogState = {}));
export var MessageBannerButtonPosition;
(function (MessageBannerButtonPosition) {
    MessageBannerButtonPosition["Left"] = "left";
    MessageBannerButtonPosition["LeftReverse"] = "left-reverse";
    MessageBannerButtonPosition["Center"] = "center";
    MessageBannerButtonPosition["CenterReverse"] = "center-reverse";
    MessageBannerButtonPosition["Right"] = "right";
    MessageBannerButtonPosition["RightReverse"] = "right-reverse";
    MessageBannerButtonPosition["Spread"] = "spread";
    MessageBannerButtonPosition["SpreadReverse"] = "spread-reverse";
})(MessageBannerButtonPosition || (MessageBannerButtonPosition = {}));
export const prefix = 'spark-message-banner';
export const properties = token({
    horizontalBorderGap: '24px',
    verticalBorderGap: '16px',
    horizontalContentGap: '8px',
    verticalContentGap: '16px',
    messageContent: {
        icon: {
            sidesGap: '9px'
        },
        messageTitle: {
            marginTop: '5px',
            marginBottom: '5px',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
            fontFamily: fontFamily.intelOneText,
            letterSpacing: '0em'
        },
        messageDescription: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            fontFamily: fontFamily.intelOneText,
            letterSpacing: '0em'
        }
    }
}, {
    prefix
});
