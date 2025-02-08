import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ButtonGroupSpacing, messageBanner, MessageBannerAlertState, MessageBannerButtonPosition, MessageBannerDialogState } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { Heading } from '../heading';
import { Icon } from '../icon';
import { Text } from '../text';
import '@spark-design/css/components/message-banner/index.css';
export const MessageBanner = ({ variant = MessageBannerAlertState.Default, exposeColor = MessageBannerDialogState.Default, messageTitle, messageBody, showIcon = false, showClose = false, showActionButtons = false, primaryText = 'Confirm', disablePrimary = false, secondaryText = 'Cancel', disableSecondary = false, onClickPrimary = null, onClickSecondary = null, buttonPlacement = MessageBannerButtonPosition.Left, size = 'l', outlined = false, icon }) => {
    const [isVisible, setIsVisible] = useState(true);
    const headingIconValue = {
        info: 'information-circle',
        success: 'check-circle',
        warning: 'alert-triangle',
        error: 'alert-circle'
    }[variant];
    const headingStyle = { fontSize: { l: '18px', m: '16px', s: '14px' }[size] };
    const textStyle = { fontSize: { l: '16px', m: '14px', s: '12px' }[size] };
    const banner = messageBanner.component;
    const stateVariant = exposeColor === 'default' && variant !== 'default' ? variant : exposeColor;
    const messageBannerClass = cl({
        [banner.$]: true,
        [banner.state[stateVariant].$]: true,
        [banner.outlined.$]: outlined,
        [banner.hide.$]: !isVisible
    });
    const rowClass = cl({
        [banner.grid.row.$]: true
    });
    const columnClass = cl({
        [banner.grid.column.$]: true
    });
    const iconColumnClass = cl({
        [banner.grid.column['icon-column'].$]: true,
        [banner.grid.column['icon-column'][variant].$]: outlined
    }) + ` ${columnClass}`;
    const messageColumnClass = cl({
        [banner.grid.column['message-column'].$]: true
    }) + ` ${columnClass}`;
    const messageTitleClass = cl({
        [banner.grid.column['message-column'].content.messageTitle.$]: true
    });
    const messageDescriptionClass = cl({
        [banner.grid.column['message-column'].content.messageDescription.$]: true
    });
    const messageActionButtonClass = cl({
        [banner.grid.column['message-column'].buttonPlacement[buttonPlacement].$]: true
    });
    const closeColumnClass = cl({
        [banner.grid.column.$]: true,
        [banner.grid.column['close-column'].$]: true
    }) + ` ${columnClass}`;
    return (_jsxs("div", { className: messageBannerClass, "data-testid": "message-banner", children: [headingIconValue && showIcon && (_jsx("div", { className: iconColumnClass, children: icon ? (icon) : (_jsx(Icon, { icon: headingIconValue, artworkStyle: outlined ? 'regular' : 'solid', "data-testid": "message-banner-icon", style: headingStyle })) })), _jsxs("div", { className: messageColumnClass, "data-testid": "message-banner-message-column", children: [messageTitle && (_jsx("div", { className: rowClass, children: _jsx(Heading, { className: messageTitleClass, semanticLevel: 6, "data-testid": "message-banner-title", style: headingStyle, children: messageTitle }) })), messageBody && (_jsx("div", { className: rowClass, children: _jsx(Text, { className: messageDescriptionClass, "data-testid": "message-banner-description", style: textStyle, children: messageBody }) })), showActionButtons && (_jsxs(ButtonGroup, { className: messageActionButtonClass, orientation: "horizontal", align: "start", spacing: ButtonGroupSpacing.Large, "data-testid": "message-banner-action-buttons", children: [primaryText && (_jsx(Button, { onPress: (e) => {
                                    onClickPrimary ? onClickPrimary(e) : null;
                                }, variant: "primary", "data-testid": "message-banner-action-primary", size: size, isDisabled: disablePrimary, children: primaryText })), secondaryText && (_jsx(Button, { onPress: (e) => {
                                    onClickSecondary ? onClickSecondary(e) : setIsVisible(false);
                                }, variant: "secondary", "data-testid": "message-banner-action-secondary", size: size, isDisabled: disableSecondary, children: secondaryText }))] }))] }), showClose && (_jsx("div", { className: closeColumnClass, children: _jsx(Button, { variant: "ghost", iconOnly: true, onPress: () => {
                        setIsVisible(false);
                    }, "data-testid": "message-banner-close-button", size: size, children: _jsx(Icon, { icon: "cross" }) }) }))] }));
};
