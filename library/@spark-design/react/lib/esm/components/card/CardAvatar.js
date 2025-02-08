import { jsx as _jsx } from "react/jsx-runtime";
import { card } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardAvatar = ({ image, altText = 'Avatar image', style, className = '', ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const CardAvatarClass = cl({
        [`${crd[orientation ? orientation : 'vertical']?.$}-avatar`]: orientation,
        [className]: !!className
    });
    return _jsx("img", { src: image, alt: altText, className: CardAvatarClass, style: style, ...rest });
};
