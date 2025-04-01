import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { mergeProps, useProgressBar, VisuallyHidden } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import { progressIndicator, ProgressIndicatorVariant, ProgressIndicatorWeight } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/progress-indicator/index.css';
export const ProgressIndicator = ({ variant = ProgressIndicatorVariant.Linear, weight = ProgressIndicatorWeight.Normal, labelUnit, error, errorMessage, success = true, successMessage, isEssential = false, className = '', style, ...props }) => {
    const { progressBarProps, labelProps } = useProgressBar(props);
    const domProps = filterDOMProps(props);
    const { value = 0, maxValue = 100, label } = props;
    let progressIndicatorRender;
    const proIndi = progressIndicator.component;
    const statusHandlerClass = cl({
        error: error,
        success: success ? value >= maxValue : null
    });
    const isEssentialHandlerClass = cl({
        'not-essential': !isEssential
    });
    const progressIndicatorClass = cl({
        [proIndi.$]: true,
        [className]: !!className
    });
    const progressIndicatorLinearClass = cl({
        [proIndi[variant].$]: variant,
        [proIndi.linear.$]: true,
        [proIndi[weight].$]: weight && variant !== ProgressIndicatorVariant.Minimum
    });
    const progressIndicatorBarClass = cl(statusHandlerClass, isEssentialHandlerClass, {
        [proIndi.bar.$]: true
    });
    const progressIndicatorLabelClass = cl({
        [proIndi.label.$]: true,
        [proIndi.linearLabel.$]: variant === ProgressIndicatorVariant.Linear,
        [proIndi.filledLabel.$]: variant === ProgressIndicatorVariant.Filled
    });
    const progressIndicatorLabelPercentage = cl({
        [proIndi.percentage.$]: true,
        [proIndi.linearLabel.$]: variant === ProgressIndicatorVariant.Linear,
        [proIndi.filledLabel.$]: variant === ProgressIndicatorVariant.Filled
    });
    const progressIndicatorLabelPercentageOverlay = cl(progressIndicatorLabelPercentage, statusHandlerClass, {
        [proIndi.overlay.$]: true
    });
    const progressIndicatorLabelClassOverlay = cl(progressIndicatorLabelClass, statusHandlerClass, {
        [proIndi.overlay.$]: true
    });
    const progressIndicatorBarClassOverlay = cl(statusHandlerClass, {
        [proIndi.bar.$]: true,
        [proIndi.overlay.$]: true
    });
    const progressIndicatorClippingMask = cl({
        [proIndi.$]: true,
        [proIndi.clippingMask.$]: true
    });
    const progressIndicatorCircularWrapperClass = cl({
        [proIndi.$]: true,
        [proIndi.circularContainer.$]: true,
        [className]: !!className
    });
    const progressIndicatorCircularClass = cl(statusHandlerClass, isEssentialHandlerClass, {
        [proIndi[variant]?.$]: variant
    });
    const statusMessageHandler = error
        ? errorMessage
            ? errorMessage
            : 'Error'
        : value >= maxValue
            ? success
                ? successMessage
                    ? successMessage
                    : 'Success'
                : label
            : label;
    const labelUnitHandlerHandler = labelUnit
        ? `${value > maxValue ? maxValue : value} of ${maxValue} ${labelUnit}`
        : progressBarProps['aria-valuetext'];
    const percentageHandler = {
        '--percentage': `${(100 * value) / maxValue + '%'}`
    };
    const labelBlock = variant === ProgressIndicatorVariant.Minimum ? (_jsx(VisuallyHidden, { children: _jsx("label", { ...labelProps, children: statusMessageHandler }) })) : (_jsxs("div", { className: proIndi.labelContainer.$, children: [_jsx("label", { ...labelProps, className: progressIndicatorLabelClass, children: statusMessageHandler }), _jsx("label", { className: progressIndicatorLabelPercentage, children: labelUnitHandlerHandler })] }));
    const progressBlock = (_jsx("div", { className: progressIndicatorLinearClass, children: _jsx("progress", { max: maxValue, value: value, className: progressIndicatorBarClass, ...mergeProps(progressBarProps, domProps), children: progressBarProps['aria-valuetext'] }) }));
    const linearProgressIndicator = (_jsxs("div", { className: progressIndicatorClass, style: style, children: [labelBlock, progressBlock] }));
    switch (variant) {
        case ProgressIndicatorVariant.Circular:
            progressIndicatorRender = (_jsxs("div", { className: progressIndicatorCircularWrapperClass, style: style, children: [_jsx("div", { className: progressIndicatorCircularClass, style: percentageHandler, children: _jsxs(VisuallyHidden, { children: [_jsx("label", { ...labelProps, children: statusMessageHandler }), _jsx("progress", { max: maxValue, value: value, ...mergeProps(progressBarProps, domProps), children: progressBarProps['aria-valuetext'] })] }) }), _jsx("div", { className: proIndi.maskCircular?.$ })] }));
            break;
        case ProgressIndicatorVariant.Minimum:
        case ProgressIndicatorVariant.Linear:
            progressIndicatorRender = linearProgressIndicator;
            break;
        case ProgressIndicatorVariant.Filled:
            progressIndicatorRender = (_jsx("div", { className: progressIndicatorClass, style: { position: 'relative', ...style }, children: _jsxs("div", { className: progressIndicatorLinearClass, children: [_jsx("div", { className: progressIndicatorClippingMask, style: {
                                clipPath: `inset(0 0 0 ${(100 * value) / maxValue + '%'})`,
                                inlineSize: '100%'
                            }, children: _jsxs("div", { className: proIndi.linear.$, style: { border: 'unset' }, children: [_jsx("label", { className: progressIndicatorLabelClass, children: statusMessageHandler }), _jsx("label", { className: progressIndicatorLabelPercentage, children: progressBarProps['aria-valuetext'] })] }) }), _jsxs("div", { className: progressIndicatorBarClassOverlay, style: percentageHandler, children: [_jsx("label", { ...labelProps, className: progressIndicatorLabelClassOverlay, children: statusMessageHandler }), _jsx("label", { className: progressIndicatorLabelPercentageOverlay, children: progressBarProps['aria-valuetext'] }), _jsx("progress", { max: maxValue, value: error ? 100 : value, className: progressIndicatorBarClass, ...mergeProps(progressBarProps, domProps), children: progressBarProps['aria-valuetext'] })] })] }) }));
            break;
        default:
            progressIndicatorRender = linearProgressIndicator;
    }
    return progressIndicatorRender;
};
