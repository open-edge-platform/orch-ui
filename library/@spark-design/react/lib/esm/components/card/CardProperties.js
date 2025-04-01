import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { card } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Icon, Text } from '../';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardProperties = ({ style, children, className = '', ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const cardPropertiesClass = cl({
        [`${crd[orientation ? orientation : 'vertical']?.$}-properties-container`]: true,
        [className]: !!className
    });
    return (_jsx("div", { className: cardPropertiesClass, style: style, ...rest, children: children }));
};
export const CardPropertiesItem = ({ icon, text, altText = 'icon', className = '', style, ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const cardPropertiesItemClass = cl({
        [`${crd[orientation ? orientation : 'vertical']?.$}-icon-container`]: true,
        [className]: !!className
    });
    return (_jsxs("div", { className: cardPropertiesItemClass, style: style, ...rest, children: [icon && _jsx(Icon, { altText: altText, icon: icon, artworkStyle: "solid" }), text && _jsx(Text, { children: text })] }));
};
