import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { mergeProps, useFocusWithin, useTextField, VisuallyHidden } from 'react-aria';
import { filterDOMProps } from '@react-aria/utils';
import { focus, input, InputSize, InputVariant, textField } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, FieldTextWrapper, Icon } from '../';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/text-field/index.css';
import '@spark-design/css/components/input/index.css';
export const TextField = ({ variant = InputVariant.Outline, size = InputSize.Medium, startIcon, statusIcon, className = '', interiorButton, interiorButtonIsDisabled, interiorButtonOnPress, interiorButtonIcon, interiorButtonAltText, interiorButtonAriaLabel, interiorButtonArtworkStyle = 'regular', disabledMessage, ...props }) => {
    const ref = useRef();
    const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);
    const [isFocusWithin, setFocusWithin] = useState(false);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin)
    });
    const domProps = filterDOMProps(props);
    const { description, validationState, label, errorMessage, isDisabled, type, isReadOnly, isRequired } = props;
    let endSlotIcons = 0;
    if (statusIcon)
        endSlotIcons++;
    if (interiorButton)
        endSlotIcons++;
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    const { autoComplete } = props;
    const fcs = focus.component;
    const tf = textField.component;
    const inp = input.component;
    const textFieldClass = cl({
        [tf?.$]: true,
        [tf?.[variant]?.$]: variant,
        [tf.size?.[size]?.$]: size,
        [`${tf.startSlot.$}-1x`]: startIcon,
        [`${tf.endSlot.$}-${endSlotIcons}x`]: statusIcon,
        [tf?.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    const inputClass = cl({
        [inp.$]: true,
        [inp?.[variant]?.$]: variant,
        [inp.size?.[size]?.$]: size,
        [inp.isReadOnly.$]: isReadOnly,
        [inp.isInvalid.$]: validationState === 'invalid',
        [fcs.$]: true,
        [fcs.within.$]: true,
        [fcs.snap.$]: true,
        [tf.focusBorder.$]: isFocusWithin
    });
    const interiorButtonClass = cl({
        [tf.endSlot.$]: true,
        [tf.interiorButton.$]: true
    });
    const statusIconClass = cl({
        [tf.endSlot.$]: true,
        'is-valid': validationState === 'valid',
        'is-invalid': validationState === 'invalid',
        [tf.interiorButtonPresence.$]: type === 'password' || interiorButton
    });
    const startIconClass = cl({
        [tf.startSlot.$]: true
    });
    const startIconSlotBlock = startIcon ? (_jsx("div", { className: startIconClass, children: _jsx(Icon, { icon: startIcon, artworkStyle: "regular", style: { zIndex: '2' } }) })) : null;
    const statusIconSlotBlock = statusIcon ? (_jsx("div", { className: statusIconClass, children: _jsx(Icon, { icon: statusIcon, artworkStyle: "solid", style: { zIndex: '2' } }) })) : null;
    const interiorButtonSlot = type === 'password' ? (_jsxs(_Fragment, { children: [_jsx(Button, { iconOnly: true, onPress: () => setisPasswordVisible(!isPasswordVisible), variant: "ghost", className: interiorButtonClass, style: {
                    paddingInlineEnd: `${variant == 'outline' ? '0.5rem' : '0rem'}`,
                    zIndex: '2'
                }, "aria-label": isPasswordVisible ? 'Hide password button' : 'Show password button', isDisabled: isDisabled, children: _jsx(Icon, { icon: isPasswordVisible ? 'eye-slash' : 'eye', altText: isPasswordVisible ? 'strikethrough eye icon' : 'eye icon', artworkStyle: interiorButtonArtworkStyle }) }), _jsx(VisuallyHidden, { children: _jsx("span", { "aria-live": "polite", children: isPasswordVisible ? 'Your password is shown' : 'Your password is hidden' }) })] })) : interiorButton ? (_jsx(Button, { iconOnly: true, onPress: interiorButtonOnPress, variant: "ghost", className: interiorButtonClass, style: {
            paddingInlineEnd: `${variant == 'outline' ? '0.5rem' : '0rem'}`,
            zIndex: '2'
        }, "aria-label": interiorButtonAriaLabel, isDisabled: interiorButtonIsDisabled, children: _jsx(Icon, { icon: interiorButtonIcon, altText: interiorButtonAltText, artworkStyle: interiorButtonArtworkStyle }) })) : null;
    return (_jsx("div", { className: tf.container.$, ...focusWithinProps, style: props.style, children: _jsx(FieldTextWrapper, { isDisabled: isDisabled, validationState: validationState, isRequired: isRequired, size: size, groupLabel: label, description: description, errorMessage: errorMessage, disabledMessage: disabledMessage, labelProps: labelProps, errorMessageProps: errorMessageProps, descriptionProps: descriptionProps, disabledMessageLastChild: true, errorMessageLastChild: true, descriptionMessageLastChild: true, children: _jsxs("div", { className: textFieldClass, "data-testid": "text-field-parent-test", style: { position: 'relative' }, children: [startIconSlotBlock, _jsx("input", { className: inputClass, ref: ref, ...mergeProps(inputProps, domProps), autoComplete: autoComplete ? autoComplete : undefined, type: isPasswordVisible ? 'text' : type }), statusIconSlotBlock, interiorButtonSlot] }) }) }));
};
