import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { card, CardOrientation } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Heading, Icon, Text } from '..';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardContent = ({ title = '', subTitle = '', description = '', collapsible = true, headerSemanticLevel = 6, style, className = '', children, ...rest }) => {
    const { orientation } = useCardProvider();
    const [isHidden, setIsHidden] = useState(false);
    const crd = card.component;
    const cardOrientation = crd[orientation ? orientation : 'vertical']?.$;
    const CardContentClass = cl({
        [`${cardOrientation}-information-container`]: orientation,
        [className]: !!className
    });
    return (_jsxs("div", { className: CardContentClass, style: style, ...rest, children: [children, _jsxs("div", { className: `${cardOrientation}-titles-container`, children: [_jsxs("div", { className: `${cardOrientation}-metrics-container`, children: [title && (_jsx(Heading, { "data-testid": "card-content-title", semanticLevel: headerSemanticLevel, size: "xs", className: `${cardOrientation}-title`, children: title })), collapsible && orientation == CardOrientation.Vertical && (_jsx(Icon, { onClick: () => setIsHidden(!isHidden), className: `${isHidden && 'hidden-metrics'}`, icon: "chevron-small-down", artworkStyle: "regular" }))] }), !isHidden && subTitle && (_jsx(Text, { "data-testid": "card-content-subtitle", className: `${cardOrientation}-subtitle`, children: `${subTitle}` }))] }), !isHidden && description && (_jsx("div", { "data-testid": "card-content-description", className: `${cardOrientation}-description`, children: _jsx(Text, { children: description }) }))] }));
};
