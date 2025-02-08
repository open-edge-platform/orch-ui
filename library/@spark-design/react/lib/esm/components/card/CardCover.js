import { jsx as _jsx } from "react/jsx-runtime";
import { card } from '@spark-design/tokens';
import { CardCoverObjectFit } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardCover = ({ image, fit = CardCoverObjectFit.Cover, altText = 'Cover image', style, className = '', ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const CardCoverClass = cl({
        [`${crd[orientation ? orientation : 'vertical']?.$}-bg-image`]: orientation,
        [crd.bg.fit[fit]?.$]: fit,
        [className]: !!className
    });
    return _jsx("img", { src: image, alt: altText, className: CardCoverClass, style: style, ...rest });
};
