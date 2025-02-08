import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { useRadio } from '@react-aria/radio';
import { filterDOMProps, mergeProps } from '@react-aria/utils';
import { focusVisible as focus, radioButton } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { useRadioProvider } from '../radio-group';
import { FieldLabel } from '..';
import '@spark-design/css/components/radio-button/index.css';
export const RadioButton = ({ className = '', style, size: singleSize, ...props }) => {
    const { state, size: groupSize } = useRadioProvider();
    const ref = useRef(null);
    const { inputProps, isDisabled } = useRadio(props, state, ref);
    const domProps = filterDOMProps(props);
    const { children } = props;
    const radiobtn = radioButton.component;
    const fcs = focus.component;
    const isSingleSize = singleSize ? singleSize : groupSize;
    const radiobuttonClass = cl({
        [radiobtn.$]: true,
        [radiobtn.size[isSingleSize]?.$]: isSingleSize,
        [className]: !!className
    });
    const radiobuttonInputClass = cl({
        [fcs.$]: true,
        [fcs.suppress.$]: true,
        [fcs.adjacent.$]: true
    });
    const radiobuttonSpanFocusRegionClass = cl({
        [radiobtn.focusRegion.$]: true,
        [fcs.$]: true,
        [fcs.snap.$]: true
    });
    const radiobuttonSpanInputClass = cl({
        [radiobtn.input.$]: true,
        [radiobtn.isDisabled.$]: isDisabled
    });
    return (_jsxs(FieldLabel, { className: radiobuttonClass, style: style, isDisabled: isDisabled, children: [_jsx("input", { type: "radio", className: radiobuttonInputClass, ref: ref, ...mergeProps(inputProps, domProps) }), _jsx("span", { className: radiobuttonSpanFocusRegionClass }), _jsx("span", { className: radiobuttonSpanInputClass }), _jsx("div", { children: children })] }));
};
