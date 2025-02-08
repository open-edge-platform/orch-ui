import { palette } from '../../palette';
import { component } from '../../setup';
import { mode } from './modes';
import { MessageBannerAlertState, MessageBannerButtonPosition, MessageBannerDialogState, prefix, properties } from './properties';
var MessageBannerGrid;
(function (MessageBannerGrid) {
    MessageBannerGrid["Row"] = "row";
    MessageBannerGrid["Column"] = "column";
})(MessageBannerGrid || (MessageBannerGrid = {}));
var MessageBannerColumns;
(function (MessageBannerColumns) {
    MessageBannerColumns["IconColumn"] = "icon-column";
    MessageBannerColumns["MessageColumn"] = "message-column";
    MessageBannerColumns["CloseColumn"] = "close-column";
})(MessageBannerColumns || (MessageBannerColumns = {}));
const messageBannerBase = component({
    state: {
        ['default']: {},
        [MessageBannerDialogState.Black]: {},
        [MessageBannerDialogState.White]: {},
        [MessageBannerDialogState.Grey]: {},
        [MessageBannerAlertState.Error]: {},
        [MessageBannerAlertState.Info]: {},
        [MessageBannerAlertState.Success]: {},
        [MessageBannerAlertState.Warning]: {}
    },
    grid: {
        [MessageBannerGrid.Row]: {},
        [MessageBannerGrid.Column]: {
            [MessageBannerColumns.IconColumn]: {
                ['default']: {},
                [MessageBannerAlertState.Error]: {},
                [MessageBannerAlertState.Info]: {},
                [MessageBannerAlertState.Success]: {},
                [MessageBannerAlertState.Warning]: {}
            },
            [MessageBannerColumns.MessageColumn]: {
                content: {
                    messageTitle: {},
                    messageDescription: {}
                },
                buttonPlacement: {
                    [MessageBannerButtonPosition.Left]: {},
                    [MessageBannerButtonPosition.Center]: {},
                    [MessageBannerButtonPosition.Right]: {},
                    [MessageBannerButtonPosition.Spread]: {},
                    [MessageBannerButtonPosition.LeftReverse]: {},
                    [MessageBannerButtonPosition.CenterReverse]: {},
                    [MessageBannerButtonPosition.RightReverse]: {},
                    [MessageBannerButtonPosition.SpreadReverse]: {}
                }
            },
            [MessageBannerColumns.CloseColumn]: {}
        }
    },
    outlined: {},
    hide: {}
}, {
    className: prefix
});
export const messageBanner = messageBannerBase.fork({
    display: 'flex',
    padding: `${properties.verticalBorderGap} ${properties.horizontalBorderGap}`,
    position: 'relative',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    ['hide']: {
        display: 'none !important'
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Row].$}`]: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: properties.horizontalContentGap,
        ['&:last-child']: {
            marginBottom: 0
        }
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column].$}`]: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: properties.verticalContentGap,
        ['&:last-child']: {
            marginRight: 0
        },
        [`&.${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn].$}`]: {
            justifyContent: 'left',
            padding: properties.messageContent.icon.sidesGap
        },
        [`&.${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].$}`]: {
            justifyContent: 'center'
        },
        [`&.${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$}`]: {
            marginLeft: 'auto'
        }
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].content
        .messageTitle.$}`]: properties.messageContent.messageTitle,
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].content
        .messageDescription.$}`]: properties.messageContent.messageDescription,
    [[MessageBannerButtonPosition.Left, MessageBannerButtonPosition.LeftReverse]
        .map((placement) => `& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].buttonPlacement[placement].$}`)
        .join(', ')]: {
        marginRight: 'auto'
    },
    [[MessageBannerButtonPosition.Right, MessageBannerButtonPosition.RightReverse]
        .map((placement) => `& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].buttonPlacement[placement].$}`)
        .join(', ')]: {
        marginLeft: 'auto'
    },
    [[MessageBannerButtonPosition.Center, MessageBannerButtonPosition.CenterReverse]
        .map((placement) => `& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].buttonPlacement[placement].$}`)
        .join(', ')]: {
        margin: 'auto'
    },
    [[MessageBannerButtonPosition.Spread, MessageBannerButtonPosition.SpreadReverse]
        .map((placement) => `& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].buttonPlacement[placement].$}`)
        .join(', ')]: {
        justifyContent: 'space-between'
    },
    [[
        MessageBannerButtonPosition.LeftReverse,
        MessageBannerButtonPosition.RightReverse,
        MessageBannerButtonPosition.CenterReverse,
        MessageBannerButtonPosition.SpreadReverse
    ]
        .map((placement) => `& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.MessageColumn].buttonPlacement[placement].$}`)
        .join(', ')]: {
        flexDirection: 'row-reverse'
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Default].$}`]: {
        color: mode.regular.default.textColor,
        border: `1px solid ${mode.regular.default.borderColor}`,
        backgroundColor: mode.regular.default.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Success].$}`]: {
        color: mode.regular.success.textColor,
        border: `1px solid ${mode.regular.success.borderColor}`,
        backgroundColor: mode.regular.success.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Info].$}`]: {
        color: mode.regular.info.textColor,
        border: `1px solid ${mode.regular.info.borderColor}`,
        backgroundColor: mode.regular.info.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Warning].$}`]: {
        color: mode.regular.warning.textColor,
        border: `1px solid ${mode.regular.warning.borderColor}`,
        backgroundColor: mode.regular.warning.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Error].$}`]: {
        color: mode.regular.error.textColor,
        border: `1px solid ${mode.regular.error.borderColor}`,
        backgroundColor: mode.regular.error.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.White].$}`]: {
        color: mode.regular.white.textColor,
        border: `1px solid ${mode.regular.white.borderColor}`,
        backgroundColor: mode.regular.white.backgroundColor
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.Grey].$}`]: {
        color: mode.regular.grey.textColor,
        border: `1px solid ${mode.regular.grey.borderColor}`,
        backgroundColor: mode.regular.grey.backgroundColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn][MessageBannerAlertState.Default].$}`]: {
        color: mode.regular.default.iconColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn][MessageBannerAlertState.Success].$}`]: {
        color: mode.regular.success.iconColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn][MessageBannerAlertState.Info].$}`]: {
        color: mode.regular.info.iconColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn][MessageBannerAlertState.Warning].$}`]: {
        color: mode.regular.warning.iconColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.IconColumn][MessageBannerAlertState.Error].$}`]: {
        color: mode.regular.error.iconColor
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button`]: {
        color: palette.themeLightGray200
    },
    [[
        MessageBannerAlertState.Default,
        MessageBannerAlertState.Success,
        MessageBannerAlertState.Warning,
        MessageBannerDialogState.White,
        MessageBannerDialogState.Grey
    ]
        .map((alertType) => `&.${messageBannerBase.state[alertType].$} .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button`)
        .join(', ') +
        `, &.${messageBannerBase.outlined.$} .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button`]: {
        color: palette.themeDarkGray50
    },
    [`& .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button:hover`]: {
        backgroundColor: palette.themeDarkGray200,
        color: palette.white
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.Grey].$} .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button:hover`]: {
        backgroundColor: palette.white,
        color: palette.themeDarkGray50
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.Default].$} .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button:hover, &.${messageBannerBase.outlined.$} .${messageBannerBase.grid[MessageBannerGrid.Column][MessageBannerColumns.CloseColumn].$} button:hover`]: {
        color: palette.themeDarkGray50,
        backgroundColor: palette.themeLightGray200
    },
    ['& .spark-button-primary']: {
        backgroundColor: palette.themeLightGray200,
        borderColor: palette.themeLightGray200,
        color: palette.themeDarkGray50,
        ['&:hover, & .spark-button-hovered']: {
            backgroundColor: palette.themeLightGray100
        }
    },
    [[
        MessageBannerAlertState.Default,
        MessageBannerDialogState.White,
        MessageBannerDialogState.Black
    ]
        .map((alertType) => `&.${messageBannerBase.state[alertType].$} .spark-button-primary`)
        .join(', ')]: {
        backgroundColor: palette.themeDarkGray50,
        color: palette.themeLightGray100,
        [`& .spark-button-hovered, &:hover`]: {
            backgroundColor: palette.themeDarkGray100
        }
    },
    ['& .spark-button-secondary']: {
        backgroundColor: palette.transparent,
        borderColor: palette.themeDarkGray50,
        color: palette.themeDarkGray50,
        ['&:hover, & .spark-button-hovered']: {
            backgroundColor: palette.themeDarkGray50,
            borderColor: palette.themeDarkGray50,
            color: palette.themeLightGray100
        }
    },
    [`&.${messageBannerBase.state[MessageBannerAlertState.Info].$} .spark-button-secondary,` +
        ` &.${messageBannerBase.state[MessageBannerAlertState.Error].$} .spark-button-secondary`]: {
        borderColor: palette.themeLightGray300,
        color: palette.themeLightGray300
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.Black].$}`]: {
        color: mode.regular.black.textColor,
        border: `1px solid ${mode.regular.black.borderColor}`,
        backgroundColor: mode.regular.black.backgroundColor,
        [`& .spark-button-secondary, & .spark-button-secondary:hover, & .spark-button-secondary .spark-button-hovered`]: {
            border: `1px solid ${palette.themeLightGray100}`,
            color: palette.themeLightGray100
        }
    },
    [`&.${messageBannerBase.state[MessageBannerDialogState.Black].$} .spark-button-secondary:hover,` +
        `&.${messageBannerBase.state[MessageBannerDialogState.Black].$} .spark-button-secondary .spark-button-hovered`]: {
        backgroundColor: palette.themeDarkGray200
    },
    [`&.${messageBannerBase.outlined.$}`]: {
        color: mode.outlined.textColor,
        backgroundColor: mode.outlined.backgroundColor,
        ['& .spark-button-primary']: {
            backgroundColor: palette.transparent
        },
        [`& .spark-button-primary:hover,` + `& .spark-button-primary .spark-button-hovered`]: {
            color: palette.themeDarkGray50
        },
        [`&.${messageBannerBase.state[MessageBannerAlertState.Info].$} .spark-button-primary`]: {
            borderColor: palette.classicBlue,
            color: palette.classicBlue
        },
        [`&.${messageBannerBase.state[MessageBannerAlertState.Success].$} .spark-button-primary`]: {
            borderColor: palette.moss,
            color: palette.moss
        },
        [`&.${messageBannerBase.state[MessageBannerAlertState.Warning].$} .spark-button-primary`]: {
            borderColor: palette.daisyShade1,
            color: palette.daisyShade1
        },
        [`&.${messageBannerBase.state[MessageBannerAlertState.Error].$} .spark-button-primary`]: {
            borderColor: palette.coralShade1,
            color: palette.coralShade1
        },
        [`&.${messageBannerBase.state[MessageBannerDialogState.Grey].$} .spark-button-primary`]: {
            backgroundColor: palette.transparent,
            border: `1px solid ${palette.themeDarkGray400}`,
            color: palette.themeDarkGray400
        },
        [[
            MessageBannerAlertState.Default,
            MessageBannerDialogState.White,
            MessageBannerDialogState.Black
        ]
            .map((alertType) => `&.${messageBannerBase.state[alertType].$} .spark-button-primary`)
            .join(', ')]: {
            backgroundColor: palette.transparent,
            border: `1px solid ${palette.themeDarkGray50}`,
            color: palette.themeDarkGray50,
            ['&:hover']: {
                backgroundColor: palette.transparent
            }
        },
        ['& .spark-button-secondary']: {
            border: `1px solid ${palette.themeDarkGray50} !important`,
            color: `${palette.themeDarkGray50} !important`,
            ['&:hover']: {
                color: `${palette.themeLightGray100} !important`
            }
        }
    }
});
