import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import React from 'react';
import { stepper, StepperOrientation, StepperSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, FieldLabel, Hyperlink, Icon, Text } from '../';
import '@spark-design/css/components/stepper/index.css';
export const Stepper = ({ onStepPress, orientation = StepperOrientation.Horizontal, isInteractive = false, size = StepperSize.Medium, steps, activeStep = 0, isMultiPage = false, className = '', children, ...rest }) => {
    const [currentStep, setCurrentStep] = useState(activeStep);
    useEffect(() => {
        setCurrentStep(activeStep);
    }, [activeStep]);
    const st = stepper.component;
    const stepperClass = cl({
        [st.$]: true,
        [st.size[size]?.$]: size,
        [className]: !!className
    });
    const Tag = isMultiPage ? 'nav' : 'div';
    const modifyChildren = (child) => {
        const props = {
            isInteractive: true
        };
        return React.cloneElement(child, props);
    };
    return (_jsx(Tag, { className: stepperClass, role: "group", "aria-label": "progress", ...rest, children: _jsx("ol", { className: st.orientation[orientation].$, children: steps
                ? steps.map((step, index) => (_jsx(StepItem, { index: index, title: step.title, isInvalid: step.isInvalid, isDisabled: step.isDisabled, size: size, currentStep: currentStep, isInteractive: isInteractive, onStepPress: onStepPress, setCurrentStep: setCurrentStep, icon: step.icon, isMultiPage: isMultiPage, text: step.text, iconArtworkStyle: step.iconArtworkStyle, iconAltText: step.iconAltText, href: step.href, target: step.target, rel: step.rel, referrerPolicy: step.referrerPolicy, stepCount: steps.length, children: step.text }, index)))
                : isInteractive
                    ? React.Children.map(children, (child) => modifyChildren(child))
                    : children }) }));
};
export const StepItem = ({ index = 0, icon, title, isInvalid, isDisabled, size, currentStep = 0, stepCount, isInteractive, onStepPress, onPress, setCurrentStep, isMultiPage, href, target, rel, referrerPolicy, isActive, isVisited, children, iconArtworkStyle, iconAltText, className = '', ...rest }) => {
    const st = stepper.component;
    const stepClass = (isInvalid, index) => {
        return cl({
            [st.step.$]: true,
            [st.stepInvalid.$]: isInvalid,
            [st.stepVisited.$]: isVisited ? true : index < currentStep,
            [st.stepActive.$]: isActive ? true : index === currentStep,
            [className]: !!className
        });
    };
    const Tag = isMultiPage ? Hyperlink : Button;
    const stepperVisibleIndex = index + 1;
    return (_jsxs("li", { className: stepClass(isInvalid, index), "aria-label": `step ${stepperVisibleIndex}`, "aria-current": index === currentStep ? 'step' : undefined, ...rest, "aria-hidden": isDisabled ? true : undefined, children: [_jsx("div", { className: st.stepContainer.$, children: _jsx(Tag, { className: st.stepButton.$, size: size, onPress: () => Tag === Hyperlink ? undefined : setCurrentStep && setCurrentStep(index), onPressEnd: onStepPress ? onStepPress : onPress, isDisabled: isInteractive ? isDisabled : true, htmlDisabled: true, "aria-labelledby": `step-label-${index}`, "aria-describedby": `step-text-${index}`, "aria-disabled": isDisabled ? true : undefined, href: isMultiPage ? href : undefined, target: isMultiPage ? target : undefined, rel: isMultiPage ? rel : undefined, referrerPolicy: isMultiPage ? referrerPolicy : undefined, children: isInvalid ? (_jsx(Icon, { icon: "cross", artworkStyle: "solid", altText: "step has error icon" })) : icon ? (_jsx(Icon, { icon: icon, artworkStyle: iconArtworkStyle ? iconArtworkStyle : 'light', altText: iconAltText
                            ? iconAltText
                            : `step${index < currentStep ? ' completed' : ''} icon` })) : (_jsx(Text, { children: stepperVisibleIndex })) }) }), _jsxs("div", { className: st.stepTextContainer.$, children: [_jsx(FieldLabel, { size: "l", className: st.stepTitle.$, id: `step-label-${index}`, "aria-label": `Step ${stepperVisibleIndex} of ${stepCount} - ${index >= currentStep ? 'completed step' : ''}  ${index === currentStep ? 'current step' : ''}  ${isInvalid ? 'has an error' : ''} - ${title}`, children: title }), _jsx(Text, { size: size, id: `step-text-${index}`, "aria-label": `${children}`, children: children })] })] }));
};
