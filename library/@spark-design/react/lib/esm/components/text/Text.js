import { jsx as _jsx } from "react/jsx-runtime";
import { levelMap, text, TextSize, typographyConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/typography/index.css';
import '@spark-design/css/components/text/index.css';
export const Text = ({ size = TextSize.Medium, isDisabled, children, className = '', style, ...rest }) => {
    const typog = typographyConfig.components;
    const txt = text.component;
    const TextClass = cl({
        [typog[0].$ + '-' + levelMap[size]]: true,
        [txt.isDisabled.$]: isDisabled,
        [className]: !!className
    });
    return (_jsx("span", { className: TextClass, style: style, ...rest, children: children }));
};
