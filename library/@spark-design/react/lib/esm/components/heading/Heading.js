import { jsx as _jsx } from "react/jsx-runtime";
import { heading, typographyConfig } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/heading/index.css';
import '@spark-design/css/components/typography/index.css';
const weightMap = {
    '3xl': 700,
    '2xl': 600,
    xl: 500,
    l: 400,
    xm: 350,
    m: 300,
    s: 200,
    xs: 100
};
const semanticSizeMap = {
    1: '3xl',
    2: '2xl',
    3: 'xl',
    4: 'l',
    5: 'm',
    6: 's'
};
export const Heading = ({ children, semanticLevel, size = semanticSizeMap[semanticLevel], className = '', style, ...rest }) => {
    const hdng = heading.component;
    const typog = typographyConfig.components;
    const HeadingTag = `h${semanticLevel}`;
    const HeadingClass = cl({
        [hdng.$]: true,
        [typog[0].$ + '-' + weightMap[size]]: true,
        [className]: !!className
    });
    return (_jsx(HeadingTag, { className: HeadingClass, style: style, ...rest, children: children }));
};
