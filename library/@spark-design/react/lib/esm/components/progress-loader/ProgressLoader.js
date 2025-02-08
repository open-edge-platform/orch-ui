import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProgressBar, VisuallyHidden } from 'react-aria';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { progressLoader, ProgressLoaderVariant, ProgressLoaderWeight } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/progress-loader/index.css';
export const ProgressLoader = ({ variant = ProgressLoaderVariant.Linear, weight = ProgressLoaderWeight.Normal, isEssential = false, className = '', ['aria-label']: ariaLabel, style, ...props }) => {
    const { progressBarProps } = useProgressBar({
        ...props,
        isIndeterminate: true,
        ['aria-label']: ariaLabel ? ariaLabel : 'Loading, please wait'
    });
    const domProps = filterDOMProps(props);
    const proLoad = progressLoader.component;
    const progressLoaderClass = cl({
        [proLoad.$]: true,
        [proLoad.circularContainer.$]: variant === ProgressLoaderVariant.Circular,
        [className]: !!className
    });
    const progressLoaderLinearVariantClass = cl({
        [proLoad[variant]?.$]: variant,
        [proLoad.linear[weight].$]: weight
    });
    const progressLoaderBarFillClass = cl(progressLoaderLinearVariantClass, {
        'not-essential': !isEssential
    });
    const progressLoaderCircularClass = cl({
        [proLoad.$]: true,
        [proLoad[variant]?.$]: variant,
        'not-essential': !isEssential
    });
    let progressLoaderRender;
    const linearProgressLoader = (_jsx("div", { className: progressLoaderClass, style: style, children: _jsx("div", { className: progressLoaderLinearVariantClass, children: _jsx("progress", { className: progressLoaderBarFillClass, ...mergeProps(progressBarProps, domProps) }) }) }));
    switch (variant) {
        case ProgressLoaderVariant.Circular:
            progressLoaderRender = (_jsxs("div", { className: progressLoaderClass, style: style, children: [_jsx("div", { className: progressLoaderCircularClass, style: { '--percentage': '25%' }, children: _jsx(VisuallyHidden, { children: _jsx("progress", { ...mergeProps(progressBarProps, domProps) }) }) }), _jsx("div", { className: proLoad.whiteMask?.$ })] }));
            break;
        case ProgressLoaderVariant.Linear:
            progressLoaderRender = linearProgressLoader;
            break;
        default:
            progressLoaderRender = linearProgressLoader;
    }
    return progressLoaderRender;
};
