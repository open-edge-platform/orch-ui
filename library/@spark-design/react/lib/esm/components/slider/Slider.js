import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { mergeProps, useHover, useNumberFormatter, useSlider, useSliderThumb, VisuallyHidden } from 'react-aria';
import { useLabel } from 'react-aria';
import { useSliderState } from 'react-stately';
import { filterDOMProps } from '@react-aria/utils';
import { focus, slider } from '@spark-design/tokens';
import { FieldLabelSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { valueFormatOptions } from '../../helpers';
import { FieldLabel, Text, TextField, Tooltip } from '../';
import '@spark-design/css/components/slider/index.css';
export const Slider = ({ isRequired = false, multiThumbs = false, labelSize = FieldLabelSize.Medium, showValues = false, showMinMaxValues = false, startSlotIcon, endSlotIcon, formatOptions, tooltip, showInputs, className = '', style, ...props }) => {
    const trackRef = useRef(null);
    const numberFormatter = useNumberFormatter(formatOptions);
    const state = useSliderState({ ...props, numberFormatter });
    const { fieldProps, labelProps } = useLabel(props);
    const { groupProps, trackProps, outputProps } = useSlider({ orientation: 'horizontal', ...props }, state, trackRef);
    const domProps = filterDOMProps(props);
    const { getThumbValueLabel, setThumbValue, getThumbPercent, isDisabled, getThumbMinValue, getThumbMaxValue } = state;
    const { label } = props;
    const sldr = slider.component;
    const labelBlock = label && (_jsx(FieldLabel, { "data-testid": "slider-field-label", isDisabled: isDisabled, isRequired: isRequired, size: labelSize, className: sldr.label.$, ...labelProps, children: label }));
    const sliderClass = cl({
        [sldr.$]: true,
        [sldr.container.$]: true,
        [sldr.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    const showMinMax = (variant, place) => {
        return valueFormatOptions(variant === 'single'
            ? place === 'min'
                ? getThumbMinValue(0)
                : getThumbMaxValue(0)
            : place === 'min'
                ? getThumbMinValue(0)
                : getThumbMaxValue(1), formatOptions?.style, formatOptions?.currency, formatOptions?.maximumFractionDigits);
    };
    const trackPercentageHandler = getThumbPercent(1) * 100;
    const trackClipMaskHandler = (getThumbPercent(0) / getThumbPercent(1)) * 100;
    if (multiThumbs) {
        return (_jsxs("div", { className: sliderClass, style: style, ...mergeProps(groupProps, domProps), children: [labelBlock, _jsxs("div", { className: sldr.trackContainer.$, ...fieldProps, children: [startSlotIcon, _jsxs("div", { ...trackProps, ref: trackRef, className: sldr.track.$, children: [_jsx("div", { className: sldr.trackFill.$, style: {
                                        inlineSize: `${trackPercentageHandler}%`,
                                        clipPath: `inset(0 0 0 ${trackClipMaskHandler}%)`
                                    } }), _jsxs("div", { className: sldr.thumbTrack.$, children: [_jsx(Thumb, { multiThumbs: true, index: 0, state: state, trackRef: trackRef, tooltip: tooltip, "data-testid": "slider-thumb-multi-thumb-min" }), _jsx(Thumb, { multiThumbs: true, index: 1, state: state, trackRef: trackRef, tooltip: tooltip, "data-testid": "slider-thumb-multi-thumb-max" })] })] }), endSlotIcon] }), showValues && (_jsxs("div", { className: sldr.valuesContainer.$, children: [_jsx("output", { ...outputProps, children: _jsx(Text, { isDisabled: isDisabled, size: "xs", "data-testid": "slider-text-multi-thumb-min-value", children: getThumbValueLabel(0) }) }), _jsx("output", { ...outputProps, children: _jsx(Text, { isDisabled: isDisabled, size: "xs", "data-testid": "slider-text-multi-thumb-max-value", children: getThumbValueLabel(1) }) })] })), showMinMaxValues && (_jsxs("div", { className: sldr.valuesContainer.$, children: [_jsx(Text, { size: "xs", "data-testid": "slider-multi-thumbs-min-text", children: showMinMax('multiThumb', 'min') }), _jsx(Text, { size: "xs", "data-testid": "slider-multi-thumbs-max-text", children: showMinMax('multiThumb', 'max') })] }))] }));
    }
    else {
        return (_jsxs("div", { className: sliderClass, style: style, ...mergeProps(groupProps, domProps), children: [labelBlock, _jsxs("div", { className: sldr.trackContainer.$, ...fieldProps, children: [startSlotIcon, showMinMaxValues && (_jsx(Text, { size: "xs", "data-testid": "slider-single-thumbs-min-text", children: showMinMax('single', 'min') })), _jsxs("div", { ...trackProps, ref: trackRef, className: sldr.track.$, children: [_jsx("div", { className: sldr.trackFill.$, style: {
                                        inlineSize: `${getThumbPercent(0) * 100}%`
                                    } }), _jsx("div", { className: sldr.thumbTrack.$, children: _jsx(Thumb, { "data-testid": "slider-thumb-single-thumb", index: 0, state: state, trackRef: trackRef, tooltip: tooltip }) })] }), showMinMaxValues && (_jsx(Text, { size: "xs", "data-testid": "slider-single-thumbs-max-text", children: showMinMax('single', 'max') })), endSlotIcon, showValues && !showInputs && (_jsx("output", { ...outputProps, children: _jsx(Text, { size: "xs", "data-testid": "slider-single-thumbs-value", children: getThumbValueLabel(0) }) })), showInputs && !showValues && (_jsx("output", { ...outputProps, children: _jsx(TextField, { "data-testid": "spark-textfield-single-thumb", isDisabled: isDisabled, size: "s", inputMode: "numeric", variant: "quiet", className: sldr.textField.$, value: getThumbValueLabel(0), onChange: (e) => setThumbValue(0, Number(e.replace(/\D+/g, ''))) }) }))] })] }));
    }
};
const Thumb = ({ state, trackRef, index, multiThumbs, tooltip, ...props }) => {
    const inputRef = useRef(null);
    const { thumbProps, inputProps, isDragging, isDisabled, isFocused } = useSliderThumb({
        index,
        trackRef,
        inputRef,
        'aria-label': `Thumb ${index === 0 ? (!multiThumbs ? 'current value' : 'minimum value') : 'maximum value'}`
    }, state);
    const { hoverProps, isHovered } = useHover(props);
    const domProps = filterDOMProps(props);
    const [isTooltipClosed, setTooltipClosed] = useState(false);
    const { getThumbValueLabel } = state;
    const thumbPropsTooltip = {
        ...thumbProps,
        onKeyUp: (e) => e.key === 'Escape' && setTooltipClosed(true),
        onBlur: () => setTooltipClosed(false)
    };
    const sldr = slider.component;
    const fcs = focus.component;
    const sliderThumbClass = cl({
        [sldr.thumb.$]: true,
        [sldr.isDragged.$]: isDragging,
        [sldr.isDisabled.$]: isDisabled,
        [fcs.$]: isFocused,
        [fcs.within.$]: isFocused,
        [fcs.snap.$]: isFocused
    });
    return (_jsx(_Fragment, { children: _jsx("div", { className: sliderThumbClass, ...mergeProps(domProps, hoverProps, tooltip ? thumbPropsTooltip : thumbProps), children: tooltip ? (_jsx(Tooltip, { className: sldr.thumbTooltip.$, content: getThumbValueLabel(index ?? 0), size: "s", delay: 0, isOpen: isTooltipClosed ? false : isFocused || isHovered, children: _jsx(VisuallyHidden, { children: _jsx("input", { ref: inputRef, ...inputProps }) }) })) : (_jsx(VisuallyHidden, { children: _jsx("input", { ref: inputRef, ...inputProps }) })) }) }));
};
